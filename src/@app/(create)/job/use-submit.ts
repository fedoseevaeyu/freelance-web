import { FormState } from "@app/(create)/job/form-state";
import { useJobStore } from "@app/(create)/job/store";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { uploadFiles } from "@utils/upload";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function useSubmit(formState: UseFormReturnType<FormState>) {
  const { push } = useRouter();

  const tags = useJobStore((store) => store.tags);
  const files = useJobStore((store) => store.files);
  const deadline = useJobStore((store) => store.deadline);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: typeof formState.values) => {
      const { category, description, price, title } = data;
      const token = null; // todo: check session
      if (!token)
        return showNotification({
          message: "Сессия истекла. Пожалуйста, войдите снова.",
          color: "red",
        });
      setLoading(true);
      let urls: string[] = [];
      if (files.length > 0) {
        const data = await uploadFiles(files, token).catch((err) => {
          showNotification({
            message: err?.response?.data?.message || "Что-то пошло не так...",
            color: "red",
          });
          setLoading(false);
          return null;
        });
        if (data === null) return;
        urls = data.data.paths;
      }
      await axios
        .post(
          "/api/jobs",
          {
            title,
            description,
            price: Number(price),
            category,
            tags: tags.map((t) => t.label),
            images: urls.length > 0 ? urls : undefined,
            deadline: (deadline as unknown as Date)?.toISOString(),
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        .then((d) => d.data)
        .then((d) => {
          showNotification({
            message: "Заказ успешно создан!",
            color: "green",
          });
          setTimeout(() => {
            const username = "test";
            push(`/profile/${username}/jobs/${d.slug}`);
          }, 1000);
        })
        .catch((err) => {
          showNotification({
            message: err?.response?.data?.message || "Что-то пошло не так...",
            color: "red",
          });
        })
        .finally(() => setLoading(false));
    },
    [deadline, files, formState, push, tags],
  );

  return { handleSubmit, loading };
}

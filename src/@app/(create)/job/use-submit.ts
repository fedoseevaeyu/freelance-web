import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import useUser from "@lib/use-user";
import { handleAxiosError } from "@lib/notify";
import { uploadFiles } from "@utils/upload";
import { useJobStore } from "@app/(create)/job/store";
import { FormState } from "@app/(create)/job/form-state";

export default function useSubmit(formState: UseFormReturnType<FormState>) {
  const { push } = useRouter();
  const { isAuth } = useUser();

  const tags = useJobStore((store) => store.tags);
  const files = useJobStore((store) => store.files);
  const deadline = useJobStore((store) => store.deadline);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: typeof formState.values) => {
      const { category, description, price, title } = data;
      if (!isAuth) {
        return showNotification({
          message: "Сессия истекла. Пожалуйста, войдите снова.",
          color: "red",
        });
      }
      setLoading(true);
      let urls: string[] = [];
      if (files.length > 0) {
        const data = await uploadFiles(files)
          .catch(handleAxiosError)
          .finally(() => setLoading(false));
        if (data === null) return;
        urls = data.data.paths;
      }
      const token = "";
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
          push(`/my/jobs/${d.slug}`);
        })
        .catch(handleAxiosError)
        .finally(() => setLoading(false));
    },
    [deadline, files, formState, push, tags],
  );

  return { handleSubmit, loading };
}

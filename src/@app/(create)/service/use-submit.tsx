import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import useUser from "@lib/use-user";
import { handleAxiosError } from "@lib/notify";
import { uploadFile, uploadFiles } from "@utils/upload";
import { useServiceStore } from "@app/(create)/service/store";
import { FormState } from "@app/(create)/service/form-state";

export default function useSubmit(formState: UseFormReturnType<FormState>) {
  const { push } = useRouter();
  const { isAuth } = useUser();

  const tags = useServiceStore((store) => store.tags);
  const images = useServiceStore((store) => store.images);
  const bannerImage = useServiceStore((store) => store.bannerImage);
  const features = useServiceStore((store) => store.features);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (values: typeof formState.values) => {
      if (!isAuth) {
        return showNotification({
          title: "Сессия истекла",
          message: "Пожалуйста, войдите снова",
          color: "red",
          icon: <IconX />,
        });
      }
      setLoading(true);

      if (!bannerImage) {
        setLoading(false);
        return showNotification({
          title: "Обложка обязательна",
          message: "Пожалуйста, добавьте обложку",
          color: "red",
          icon: <IconX />,
        });
      }
      const upload = await uploadFile(bannerImage).catch(handleAxiosError);
      if (upload === null) {
        setLoading(false);
        return;
      }
      const { path: bannerImagePath } = upload.data;
      let imagePaths: string[] = [];
      if (images.length > 0) {
        const uploads = await uploadFiles(images).catch(handleAxiosError);
        if (uploads === null) {
          setLoading(false);
          return;
        }
        imagePaths = uploads.data.paths;
      }
      const token = "";
      axios
        .post(
          "/api/services",
          {
            bannerImage: bannerImagePath,
            category: values.category,
            description: values.description,
            features,
            packages:
              values.packages?.map((p) => ({
                ...p,
                price: Number(p.price),
              })) ?? [],
            questions: values.questions ?? [],
            tags: tags.map((tag) => tag.value),
            title: values.title,
            images: imagePaths,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        .then((d) => d.data)
        .then((d) => {
          push(`/my/service/${d.slug}`);
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [bannerImage, features, formState, images, isAuth, push, tags],
  );

  return { handleSubmit, loading };
}

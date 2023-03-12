import { FormState } from "@app/(create)/service/form-state";
import { useServiceStore } from "@app/(create)/service/store";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { uploadFile, uploadFiles } from "@utils/upload";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function useSubmit(formState: UseFormReturnType<FormState>) {
  const { push } = useRouter();

  const tags = useServiceStore((store) => store.tags);
  const images = useServiceStore((store) => store.images);
  const bannerImage = useServiceStore((store) => store.bannerImage);
  const features = useServiceStore((store) => store.features);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (values: typeof formState.values) => {
      const token = null;
      if (!token)
        return showNotification({
          title: "Unauthorized",
          message: "Please login to continue",
          color: "red",
          icon: <IconX />,
        });
      setLoading(true);

      if (!bannerImage) {
        setLoading(false);
        return showNotification({
          title: "Banner Image is required",
          message: "Please upload a banner image",
          color: "red",
          icon: <IconX />,
        });
      }
      const upload = await uploadFile(bannerImage, token).catch(() => null);
      if (upload === null) {
        setLoading(false);
        return showNotification({
          title: "Error",
          message: "Something went wrong while uploading the banner image",
          color: "red",
          icon: <IconX />,
        });
      }
      const { path: bannerImagePath } = upload.data;
      let imagePaths: string[] = [];
      if (images.length > 0) {
        const uploads = await uploadFiles(images, token).catch(() => null);
        if (uploads === null) {
          setLoading(false);
          return showNotification({
            title: "Error",
            message: "Something went wrong while uploading the images",
            color: "red",
            icon: <IconX />,
          });
        }
        imagePaths = uploads.data.paths;
      }
      const username = "test";
      axios
        .post(
          "/api/services",
          {
            bannerImage: bannerImagePath,
            category: values.category,
            description: values.description,
            features,
            packages: values.packages!.map((p) => ({
              ...p,
              price: Number(p.price),
            })),
            questions: values.questions!,
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
          push(`/profile/${username}/service/${d.slug}`);
        })
        .catch((err) => {
          console.log(err.response);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [formState, images, push, tags],
  );

  return { handleSubmit, loading };
}

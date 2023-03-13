import { Button, Group, Modal, Rating, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";

import { handleAxiosError } from "@lib/notify";
import { useChatModalsStore } from "@app/(chat)/store/modals";

const initialValues = {
  content: "",
  rating: 0,
};

export default function ReviewModal() {
  const formState = useForm({
    initialValues,
  });
  const [loading, setLoading] = useState(false);

  const isOpen = useChatModalsStore((store) => store.reviewModal);
  const close = useChatModalsStore((store) => store.closeReviewModal);

  return (
    <Modal opened={isOpen} onClose={close} title="Отзыв" centered>
      <form
        onSubmit={formState.onSubmit((d) => {
          setLoading(true);
          const token = "";
          axios
            .post("/api/reviews", d, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then(() => {
              showNotification({
                title: "Успешно",
                message: "Ваш отзыв отправлен",
                color: "green",
              });

              close();
            })
            .catch(handleAxiosError)
            .finally(() => setLoading(false));
        })}
      >
        <Rating
          value={formState.values.rating}
          fractions={2}
          onChange={(e) => {
            formState.setFieldValue("rating", e);
          }}
        />

        <TextInput
          mt="xl"
          label="Отзыв"
          placeholder="Оставьте ваш отзыв"
          required
          {...formState.getInputProps("content")}
        />
        <Group mt="xl" position="center">
          <Button variant="outline" color="red">
            Назад
          </Button>
          <Button variant="outline" color="green" type="submit" loading={loading}>
            Отправить
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

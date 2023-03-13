import { Button, FileInput, Group, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Socket } from "socket.io-client";

import { handleAxiosError } from "@lib/notify";
import { uploadFiles } from "@utils/upload";
import { useChatModalsStore } from "@app/(chat)/store/modals";

export default function UploadWorkModal({ io }: { io?: Socket }) {
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const isOpen = useChatModalsStore((store) => store.uploadWorkModal);
  const close = useChatModalsStore((store) => store.closeUploadWorkModal);

  return (
    <Modal centered opened={isOpen} onClose={close} title="Загрузить работу">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (attachments.length === 0)
            return showNotification({
              message: "Пожалуйста, выберите хотя бы одно вложение",
              color: "red",
            });
          setLoading(true);
          const data = await uploadFiles(attachments).catch(handleAxiosError);
          if (data === null) return setLoading(false);
          const urls = data.data.paths;
          io?.emit("message", {
            message: urls,
            attachment: true,
          });
          io?.emit("message", {
            message: "Моя работа:",
            attachment: false,
          });
          setLoading(false);
          close();
          setAttachments([]);
        }}
      >
        <FileInput
          multiple
          label="Выберите файлы (до 10MB)"
          onChange={(e) => {
            const validFiles = e.filter((file) => file.size < 10000000);
            if (validFiles.length < e.length) {
              showNotification({
                title: "Ошибка",
                message: "Некоторые файлы слишком большие",
                color: "red",
              });
            }
            setAttachments(validFiles);
          }}
        />
        <Group mt="md" position="center">
          <Button type="submit" variant="outline" loading={loading}>
            Загрузить
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

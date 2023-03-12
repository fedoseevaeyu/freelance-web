import { Button, Center, FileInput, FileInputProps, Group, Modal, rem } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconPhoto } from "@tabler/icons-react";
import { useState } from "react";
import { Socket } from "socket.io-client";

import { uploadFiles } from "@utils/upload";
import { useChatModalsStore } from "@app/(chat)/store/modals";

function Value({ file }: { file: File }) {
  return (
    <Center
      inline
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
        fontSize: theme.fontSizes.xs,
        padding: `${rem(3)} ${rem(7)}`,
        borderRadius: theme.radius.sm,
      })}
    >
      <IconPhoto size={rem(14)} style={{ marginRight: rem(5) }} />
      <span
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxWidth: rem(200),
          display: "inline-block",
        }}
      >
        {file.name}
      </span>
    </Center>
  );
}

const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
  if (Array.isArray(value)) {
    return (
      <Group spacing="sm" py="xs">
        {value.map((file, index) => (
          <Value file={file} key={index} />
        ))}
      </Group>
    );
  }

  return <Value file={value!} />;
};

export default function AttachmentModal({ io }: { io?: Socket }) {
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const isOpen = useChatModalsStore((store) => store.attachmentModal);
  const close = useChatModalsStore((store) => store.closeAttachmentModal);

  return (
    <Modal
      opened={isOpen}
      onClose={close}
      centered
      closeOnClickOutside={!loading}
      closeOnEscape={!loading}
      withCloseButton={!loading}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (attachments.length === 0) {
            return showNotification({
              message: "Пожалуйста, выберите хотя бы одно вложение",
              color: "red",
            });
          }
          setLoading(true);
          const token = "";
          const data = await uploadFiles(attachments, token).catch((e) => {
            showNotification({
              message: e?.response?.data?.message || "Что-то пошло не так...",
              color: "red",
            });
            return null;
          });
          if (data === null) return setLoading(false);
          const urls = data.data.paths;
          io?.emit("message", {
            message: urls,
            attachment: true,
          });
          setLoading(false);
          close();
        }}
      >
        <FileInput
          label="Файлы"
          withAsterisk
          multiple
          valueComponent={ValueComponent}
          value={attachments}
          placeholder="Выберите файлы"
          onChange={setAttachments}
        />
        <Group position="center" mt="md">
          <Button type="submit" variant="outline" color="gray" loading={loading}>
            Отправить
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

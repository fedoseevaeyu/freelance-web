import { Button, Group, Modal } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Socket } from "socket.io-client";

import { useChatModalsStore } from "@app/(chat)/store/modals";

export default function DoneModal({ io }: { io?: Socket }) {
  const isOpen = useChatModalsStore((store) => store.doneModal);
  const close = useChatModalsStore((store) => store.closeDoneModal);

  return (
    <Modal opened={isOpen} onClose={close} centered closeOnClickOutside closeOnEscape withCloseButton>
      <div className="flex flex-col items-center justify-center w-full p-4 space-y-4">
        <IconCheck className="w-16 h-16 text-green-500" />
        <h1 className="text-xl font-semibold text-center">
          Вы уверены, что хотите отметить это задание как выполненное?
        </h1>
        <p className="text-gray-500 text-center">Это действие нельзя отменить, чат будет закрыт.</p>
        <Group position="center">
          <Button variant="outline" color="gray" onClick={close}>
            Назад
          </Button>
          <Button
            variant="filled"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => {
              io?.emit("prompt");
            }}
          >
            Работа выполнена
          </Button>
        </Group>
      </div>
    </Modal>
  );
}

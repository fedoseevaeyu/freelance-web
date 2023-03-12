import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { Socket } from "socket.io-client";

import { useChatModalsStore } from "@app/(chat)/store/modals";
import Actions from "@app/(chat)/components/BottomSection/Actions";

const initialValues = {
  message: "",
};

export default function BottomSection({ complete, io }: { complete: boolean; io?: Socket }) {
  const formState = useForm({
    initialValues,
  });

  const openAttachmentModal = useChatModalsStore((store) => store.openAttachmentModal);

  return (
    <div className="flex items-center justify-between gap-4 w-full p-2 pb-0 bg-white border-t border-gray-200">
      <form
        onSubmit={formState.onSubmit((d) => {
          io?.emit("message", d);
          formState.reset();
        })}
        className="flex flex-col items-center justify-between w-full"
      >
        <div className="flex items-center w-full">
          <IconPlus className="cursor-pointer mr-2" onClick={openAttachmentModal} />
          <TextInput
            {...formState.getInputProps("message")}
            className="w-full"
            required
            placeholder="Введите ваше сообщение..."
            onChange={(e) => {
              formState.setFieldValue("message", e.target.value);
              io?.emit("typing");
            }}
            disabled={complete}
          />
          <input type="hidden" name="send" />
        </div>
      </form>
      <Actions complete={complete} />
    </div>
  );
}

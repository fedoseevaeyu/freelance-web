import { Avatar, Button, Group, clsx } from "@mantine/core";
import { IconFile } from "@tabler/icons-react";

import { r } from "@utils/date";

export type MessageType = "BASIC" | "CONFIRM_AND_CANCEL_PROMPT";

interface Props {
  id: string;
  sender: {
    username: string;
    avatarUrl: string;
  };
  isSender: boolean;
  content: string;
  createdAt: string;
  attachments: { id: string; src: string; name: string }[];
  type: MessageType;
  acceptHandler?: () => void;
  rejectHandler?: () => void;
  completed?: boolean;
}

const isSystem = false;

export function Message({
  id,
  isSender,
  content,
  sender,
  attachments,
  createdAt,
  type,
  completed,
  acceptHandler,
  rejectHandler,
}: Props) {
  return (
    <div className={clsx("flex flex-col my-3", { "items-end": !isSender }, { "items-center": isSystem })} data-key={id}>
      <div className={`max-w-fit max-h-fit flex flex-row${!isSender ? "-reverse" : ""}`}>
        {!isSystem && <Avatar src={sender.avatarUrl} />}
        <div className="flex flex-col flex-[1]">
          {!isSystem && (
            <div className={clsx("max-w-fit flex ml-3 justify-between", { "ml-0 mr-3": !isSender })}>
              <span className="capitalize">{sender.username}</span>
              <span className="text-gray-500 ml-4">{r(createdAt)}</span>
            </div>
          )}
          <div className="flex flex-col">
            {attachments.length > 0 ? (
              <>
                {content}
                <div className="flex flex-row flex-wrap gap-3 ml-2">
                  {attachments.map((a) => (
                    <a href={a.src} target="_blank" rel="noreferrer" key={a.id}>
                      <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center justify-center w-12 h-12 rounded-full bg-gray-200">
                          <IconFile className="w-6 h-6 text-gray-500" />
                        </div>
                        <span className="text-xs text-gray-500 max-w-[30px] l-1">{a.name}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <span className={clsx("rounded-sm ml-3 break-words", { "ml-0 mr-3": !isSender })}>{content}</span>
            )}
            {type === "CONFIRM_AND_CANCEL_PROMPT" && (
              <Group position="left" className="ml-2 mt-3">
                <Button variant="outline" radius="md" onClick={acceptHandler} disabled={completed}>
                  Да
                </Button>
                <Button variant="outline" radius="md" onClick={rejectHandler} disabled={completed}>
                  Нет
                </Button>
              </Group>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

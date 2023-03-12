import { upperFirst } from "@mantine/hooks";

import { Message } from "./Message";
import Modals from "./Modals";

import useChat from "@app/(chat)/hooks/use-chat";
import BottomSection from "@app/(chat)/components/BottomSection";

type MessageType = "BASIC" | "CONFIRM_AND_CANCEL_PROMPT";

interface Props {
  orderId: string;
  chatId: string;
}

export type message = {
  id: string;
  attachments: Array<any>;
  content: string;
  client?: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  freelancer?: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
  type: MessageType;
};

const ChatContainer = ({ orderId, chatId }: Props) => {
  const {
    ref,
    acceptHandler,
    rejectHandler,
    // typing,
    // messages,
    complete,
    io,
  } = useChat(chatId, orderId);

  const typing = "user";
  const messages: {
    id: string;
    sender: {
      username: string;
      avatarUrl: string;
    };
    content: string;
    isSystem?: boolean;
    createdAt: string;
    attachments: { id: string; src: string; name: string }[];
    type: MessageType;
  }[] = [
    {
      id: "1",
      type: "BASIC",
      attachments: [],
      content: "Привет!",
      sender: {
        username: "test",
        avatarUrl: "",
      },
      createdAt: new Date(new Date().setMinutes(-10)).toString(),
    },
    {
      id: "2",
      type: "BASIC",
      attachments: [],
      content: "Как продвигается?",
      sender: {
        username: "test",
        avatarUrl: "",
      },
      createdAt: new Date(new Date().setMinutes(-2)).toString(),
    },
    {
      id: "3",
      type: "BASIC",
      attachments: [],
      content: "Все круто, завтра будет готово",
      sender: {
        username: "me",
        avatarUrl: "",
      },
      createdAt: new Date().toString(),
    },

    {
      id: "4",
      type: "BASIC",
      attachments: [],
      content: "Привет!",
      sender: {
        username: "test",
        avatarUrl: "",
      },
      createdAt: new Date(new Date().setMinutes(-10)).toString(),
    },
    {
      id: "5",
      type: "BASIC",
      attachments: [],
      content: "Как продвигается?",
      sender: {
        username: "test",
        avatarUrl: "",
      },
      createdAt: new Date(new Date().setMinutes(-2)).toString(),
    },
    {
      id: "6",
      type: "BASIC",
      attachments: [],
      content: "Все круто, завтра будет готово",
      sender: {
        username: "me",
        avatarUrl: "",
      },
      createdAt: new Date().toString(),
    },

    {
      id: "7",
      type: "BASIC",
      attachments: [],
      content: "Привет!",
      sender: {
        username: "test",
        avatarUrl: "",
      },
      createdAt: new Date(new Date().setMinutes(-10)).toString(),
    },
    {
      id: "8",
      type: "BASIC",
      attachments: [],
      content: "Как продвигается?",
      sender: {
        username: "test",
        avatarUrl: "",
      },
      createdAt: new Date(new Date().setMinutes(-2)).toString(),
    },
    {
      id: "9",
      type: "BASIC",
      attachments: [],
      content: "Все круто, завтра будет готово",
      sender: {
        username: "me",
        avatarUrl: "",
      },
      createdAt: new Date().toString(),
    },
  ];
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="overflow-y-auto pb-[12px] pl-[4px] max-h-[calc(100vh-60px-80px-60px-32px-1.25rem-60px-62px)] h-full">
          {messages.map((o) =>
            !o.isSystem ? (
              <Message
                key={o.id}
                {...o}
                isSender={o.sender.username !== "me"}
                completed={complete}
                acceptHandler={acceptHandler}
                rejectHandler={rejectHandler}
              />
            ) : (
              <div key={o.id} className="flex flex-col w-full items-center">
                {o.content}
              </div>
            ),
          )}
          <div ref={ref} />
          {typing && (
            <div className="flex flex-row mb-1 text-xs text-gray-500 w-full ">
              {upperFirst(typing)}
              <span className="ml-1"> печатает...</span>
            </div>
          )}
        </div>
        <BottomSection io={io} complete={complete} />
      </div>
      <Modals complete={complete} io={io} />
    </>
  );
};

export default ChatContainer;

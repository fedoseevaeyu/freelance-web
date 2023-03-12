import dynamic from "next/dynamic";

import useCheckQuestions from "@app/(chat)/hooks/use-check-questions";
import useChatConfig from "@app/(chat)/hooks/use-chat-config";
import { Role } from "@domain/role";

const ChatContainer = dynamic(() => import("@app/(chat)/components/Container"), {
  ssr: false,
  loading: () => <div>Загрузка...</div>,
});

import { ChatSidebar } from "@app/(chat)/components/Sidebar";

import { LoadingOverlay } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

type OrderStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export type ChatDetails = {
  chat: {
    id: string;
  };
  me: {
    id: string;
    role: Role;
    name: string;
    username: string;
    avatarUrl: string;
    verified: boolean;
  };
  user: {
    id: string;
    role: Role;
    name: string;
    username: string;
    avatarUrl: string;
    verified: boolean;
  };
  id: string;
  status: OrderStatus;
};

export default function Page() {
  const { query } = useRouter();
  const { chatConfig } = useChatConfig();

  useCheckQuestions(chatConfig.chat?.id);

  return (
    <div className="container py-[60px]">
      <LoadingOverlay visible={!chatConfig.id} overlayBlur={1} />
      {chatConfig.id && (
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">
            Чат с{" "}
            <Link
              href={`/profile/${chatConfig.user.username}`}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {chatConfig.user.name}
            </Link>
          </h1>
          <div className="flex h-full mt-5">
            <div className="flex-[0.15] border-[1px] rounded-md p-2">
              <ChatSidebar me={chatConfig.me} user={chatConfig.user} />
            </div>
            <div className="flex-1 border-[1px] rounded-md p-2 ml-1 min-h-[calc(100vh-60px-80px-60px-32px-1.25rem-60px)]">
              <ChatContainer orderId={query.id as string} chatId={chatConfig.chat.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

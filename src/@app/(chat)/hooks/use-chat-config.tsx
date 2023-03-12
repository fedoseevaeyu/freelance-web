import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { ChatDetails } from "@app/(chat)/page";
import { Role } from "@domain/role";
import Route from "config/routes";

export default function useChatConfig() {
  const [chatConfig, setChatConfig] = useState<ChatDetails>({} as ChatDetails);
  const { isReady, query, asPath, replace } = useRouter();

  useEffect(() => {
    if (!isReady) return;

    const token = "adsfsdf";
    if (!token) {
      void replace({
        pathname: Route.SignIn,
        query: {
          to: asPath,
        },
      });
    }

    setChatConfig({
      id: "1",
      status: "PENDING",
      chat: {
        id: "1",
      },
      me: {
        id: "1",
        role: Role.Client,
        name: "client user",
        username: "client",
        avatarUrl: "",
        verified: true,
      },
      user: {
        id: "1",
        role: Role.Freelancer,
        name: "freelancer user",
        username: "freelancer",
        avatarUrl: "",
        verified: true,
      },
    });
    const controller = new AbortController();
    // axios
    //   .get<ChatDetails>(`/api/chat/${query.id}`, {
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //     signal: controller.signal,
    //   })
    //   .then((d) => d.data)
    //   .then((d) => {
    //     setChatConfig(d);
    //     if (d.status === "COMPLETED") {
    //       setCompleted(true);
    //     }
    //   })
    //   .catch((err) => {
    //     if (isCancel(err)) return;
    //     if (err.code === "ERR_CANCELED") return;
    //     showNotification({
    //       title: "Ошибка",
    //       message: (err?.response?.data as any)?.message || "Что-то пошло не так...",
    //       color: "red",
    //     });
    //   });
    // return () => controller.abort();
  }, [isReady, query.id, asPath, replace]);

  return { chatConfig };
}

import { showNotification } from "@mantine/notifications";
import axios, { isCancel } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Route from "config/routes";
import { Role } from "@domain/role";

const role = Role.Client;

export default function useCheckQuestions(chatId?: string) {
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean | undefined>(undefined);
  const { asPath, replace } = useRouter();

  useEffect(() => {
    if (!chatId) return;

    const token = "asdf";
    if (!token) {
      void replace({
        pathname: Route.SignIn,
        query: {
          to: asPath,
        },
      });
    }

    const controller = new AbortController();
    if (role === Role.Client) {
      axios
        .get<{ questionAnswered: boolean }>(`/api/chat/${chatId}/info`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })
        .then((d) => setQuestionsAnswered(d.data.questionAnswered))
        .catch((err) => {
          if (isCancel(err)) return;
          showNotification({
            title: "Ошибка",
            message: (err?.response?.data as any)?.message || "Что-то пошло не так...",
            color: "red",
          });
        });
    }

    return () => controller.abort();
  }, [chatId, asPath, replace]);

  useEffect(() => {
    if (questionsAnswered === false) {
      void replace({
        pathname: asPath.replace("chat", "questions"),
        query: {
          to: asPath,
          chatId,
        },
      });
    }
  }, [asPath, chatId, questionsAnswered, replace]);
}

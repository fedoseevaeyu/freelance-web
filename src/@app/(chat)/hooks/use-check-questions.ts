import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useUser from "@lib/use-user";
import { handleAxiosError } from "@lib/notify";
import Route from "config/routes";
import { Role } from "@domain/role";

export default function useCheckQuestions(chatId?: string) {
  const [questionsAnswered, setQuestionsAnswered] = useState<boolean | undefined>(undefined);
  const { user } = useUser();
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
    if (user?.role === Role.Client) {
      axios
        .get<{ questionAnswered: boolean }>(`/api/chat/${chatId}/info`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })
        .then((d) => setQuestionsAnswered(d.data.questionAnswered))
        .catch(handleAxiosError);
    }

    return () => controller.abort();
  }, [chatId, asPath, replace, user]);

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

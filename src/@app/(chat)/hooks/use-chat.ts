import { showNotification } from "@mantine/notifications";
import axios, { isCancel } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Socket, io as socket } from "socket.io-client";

import { Role } from "@domain/role";
import { message } from "@app/(chat)/components/Container";

export default function useChat(chatId: string, orderId: string) {
  const ref = useRef<HTMLDivElement>(null);

  const [io, setIo] = useState<Socket>();
  const [messages, setMessages] = useState<message[]>([]);
  const [typing, setTyping] = useState<Role | undefined>();

  const [complete, setCompleted] = useState(false);

  useEffect(() => {
    void fetchMessages();
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  useEffect(() => {
    if (window) {
      setIo(
        socket("/api", {
          auth: {
            token: "",
          },
          query: {
            orderId,
            chatId,
          },
        }),
      );
    }
  }, [chatId, orderId]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    io?.on("connect", () => {
      io?.on("message", (d: message) => {
        setMessages((prev) => [...prev, d]);

        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      });

      io.on("typing", (d: { role: Role }) => {
        if (timeout) clearTimeout(timeout);
        setTyping(d.role);
        timeout = setTimeout(() => {
          setTyping(undefined);
        }, 3000);
      });

      io.on("completed", () => {
        setCompleted(true);
      });

      io.on("error", (err) => {
        showNotification({
          title: "Ошибка",
          message: err,
          color: "red",
        });
      });
    });

    return () => {
      io?.disconnect();

      clearTimeout(timeout);
    };
  }, [io]);

  const fetchMessages = useCallback(
    async (appendMode?: "before" | "after", take?: number, skip?: number, reverse?: boolean) => {
      const token = "";

      await axios
        .get<{ next?: number; messages: message[] }>(
          `/api/chat/${orderId}${skip ? (take ? `?take=${take}&skip=${skip}` : `?skip=${skip}`) : ``}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        )
        .then((d) => d.data)
        .then((data) => {
          if (!appendMode) {
            setMessages(reverse ? data.messages.reverse() : data.messages);
          } else {
            setMessages((prev) =>
              appendMode === "before" ? [...data.messages, ...prev] : [...prev, ...data.messages],
            );
          }
        })
        .catch((err) => {
          if (isCancel(err)) return;
          showNotification({
            title: "Ошибка",
            message: (err?.response?.data as any)?.message || "Что-то пошло не так...",
            color: "red",
          });
        });
    },
    [orderId],
  );

  function acceptHandler() {
    io?.emit("prompt");
  }
  function rejectHandler() {
    io?.emit("reject");
  }

  return {
    ref,
    io,
    typing,
    messages,
    complete,
    acceptHandler,
    rejectHandler,
  };
}

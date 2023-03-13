import { Button, Container, FileInput, Group, LoadingOverlay, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

import Route from "config/routes";
import { uploadFile } from "@utils//upload";
import { handleAxiosError } from "@lib/notify";
import Layout from "@app/layout";

type AnswerType = "TEXT" | "MULTIPLE_CHOICE" | "ATTACHMENT";
export type ChatQuestions = {
  id: string;
  isRequired: boolean;
  question: string;
  answerType: AnswerType;
};

const QuestionsPage = () => {
  const [questionsAnswered, setQuestionsAnswered] = useState(false);
  const [questions, setQuestions] = useState<ChatQuestions[]>([
    {
      id: "1",
      isRequired: false,
      question: "Какой-то вопрос",
      answerType: "TEXT",
    },
  ]);

  const { isReady, query, replace, asPath } = useRouter();
  useEffect(() => {
    if (!isReady) return;
    const token = "asdf";
    if (!token) {
      return void replace({
        pathname: Route.SignIn,
        query: { to: asPath },
      });
    }
    const controller = new AbortController();
    axios
      .get<{ questionAnswered: boolean }>(`/api/chat/${query.chatId}/info`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((d) => d.data.questionAnswered)
      .then((answered) => {
        if (answered === true)
          return void replace({
            pathname: `/profile/${query.username}/order/${query.id}/chat`,
          });
        setQuestionsAnswered(answered);
      })
      .catch(handleAxiosError);
    return () => controller.abort();
  }, [asPath, isReady, query.chatId, query.id, query.username, replace]);

  useEffect(() => {
    if (questionsAnswered) return;
    const token = "asdf";
    if (!token) {
      return void replace({
        pathname: Route.SignIn,
        query: { to: asPath },
      });
    }
    const controller = new AbortController();
    axios
      .get<ChatQuestions[]>(`/api/chat/${query.chatId}/questions`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      })
      .then((d) => d.data)
      .then(setQuestions)
      .catch(handleAxiosError);
  }, [asPath, query.chatId, questionsAnswered, replace]);
  const formState = useForm({
    initialValues: {},
  });

  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      <Container className="pt-[32px]">
        <LoadingOverlay visible={questions.length === 0} />
        <form
          onSubmit={formState.onSubmit(async (vals: any) => {
            setLoading(true);
            const answers: {
              id: string;
              answer: string;
              isAttachment: boolean;
              question?: string;
            }[] = [];
            for (const key in vals) {
              if (vals[key] instanceof File) {
                const data = await uploadFile(vals[key])
                  .catch(handleAxiosError)
                  .finally(() => setLoading(false));
                if (data === null) return;
                const url = data.data.path;
                answers.push({
                  answer: url,
                  id: key,
                  isAttachment: true,
                  question: questions.find((q) => q.id === key)?.question,
                });
              } else {
                answers.push({
                  answer: vals[key],
                  id: key,
                  isAttachment: false,
                  question: questions.find((q) => q.id === key)?.question,
                });
              }
            }
            const token = "sdfadf";
            axios
              .post(
                `/api/questions/${query.id}/answer`,
                { answers },
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                },
              )
              .then((d) => d.data)
              .then(() => {
                replace({
                  pathname: `/my/orders/${query.id}/chat`,
                });
              })
              .catch(handleAxiosError)
              .finally(() => {
                setLoading(false);
              });
          })}
        >
          {questions.map((ques) => (
            <Fragment key={ques.id}>
              {ques.answerType === "TEXT" ? (
                <TextInput
                  label={ques.question}
                  required={ques.isRequired}
                  {...formState.getInputProps(ques.id)}
                  value={(formState.values as any)[ques.id] || ""}
                />
              ) : (
                <FileInput
                  label={ques.question}
                  required={ques.isRequired}
                  {...formState.getInputProps(ques.id)}
                  value={(formState.values as any)[ques.id] || ""}
                />
              )}
            </Fragment>
          ))}
          <Group mt="xl" position="center">
            <Button type="submit" color="black" loading={loading} className="bg-gray-900 hover:bg-black">
              Отправить
            </Button>
          </Group>
        </form>
      </Container>
    </Layout>
  );
};

export default QuestionsPage;

import NextButton from "@app/(create)/service/components/NextButton";
import PrevButton from "@app/(create)/service/components/PrevButton";
import { FormState } from "@app/(create)/service/form-state";
import { AnswerType } from "@app/(create)/service/page";
import { Button, Group, Select, Textarea as T, Text, Checkbox } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

export default function Step4({ formState }: { formState: UseFormReturnType<FormState> }) {
  return (
    <>
      <Text align="center" className="text-lg font-bold text-black">
        Эти вопросы будут заданы вашему клиенту, прежде чем он наймет вас
      </Text>
      <div className="flex flex-col gap-4 mt-8">
        {formState.values.questions?.map((q, i) => (
          <div className="flex flex-col items-center gap-4" key={i}>
            <div className="flex items-end  gap-4 w-full">
              <Select
                required
                label="Тип"
                data={[
                  { label: "Текст", value: AnswerType.TEXT },
                  {
                    label: "Вложение",
                    value: AnswerType.ATTACHMENT,
                  },
                ]}
                {...formState.getInputProps(`questions.${i}.type`)}
              />
              <div className="flex gap-2 w-fit my-2">
                <Checkbox
                  checked={formState.getInputProps(`questions.${i}.required`).checked}
                  onChange={(e) => {
                    formState.setFieldValue(`questions.${i}.required`, e.currentTarget.checked ? "true" : "false");
                  }}
                  className="w-full"
                  label="Обязательный?"
                />
              </div>
              <Button
                onClick={() => {
                  formState.removeListItem("questions", i);
                }}
                variant="filled"
                className="bg-red-500 hover:bg-red-500/90 ml-auto"
              >
                <IconTrash />
              </Button>
            </div>
            <T className="w-full" required spellCheck={false} {...formState.getInputProps(`questions.${i}.question`)} />
          </div>
        ))}
        <Group position="center" className="mt-4">
          <PrevButton />

          <Button
            onClick={() => {
              formState.insertListItem("questions", {
                question: "",
                type: AnswerType.TEXT,
              });
            }}
            variant="filled"
            className="bg-purple-600 hover:bg-purple-700 max-w-fit"
          >
            Добавить
          </Button>

          <NextButton />
        </Group>
      </div>
    </>
  );
}

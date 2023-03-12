import { Button, Group, MultiSelect, Paper, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

import { FormState } from "../form-state";

import NextButton from "@app/(create)/service/components/NextButton";
import { useServiceStore } from "@app/(create)/service/store";
import Editor from "@components/Editor";
import TextareaWithLetterCounter from "@components/TextareaWithLetterCounter";

const categoriesOptions = [
  {
    value: "design",
    label: "Дизайн",
  },
  {
    value: "video_editing",
    label: "Монтаж",
  },
  {
    value: "programming",
    label: "Программирование",
  },
];

export default function Step1({ formState }: { formState: UseFormReturnType<FormState> }) {
  const tags = useServiceStore((store) => store.tags);
  const setTags = useServiceStore((store) => store.setTags);

  return (
    <Paper radius="md" p="xl" className="w-full">
      <Select
        mt="md"
        data={categoriesOptions}
        {...formState.getInputProps("category")}
        label="Категория"
        placeholder="Выберите категорию"
        searchable
        clearable
        required
        labelProps={{
          className: "text-sm font-bold text-[#495057]",
        }}
      />

      <TextareaWithLetterCounter
        id="title"
        required
        labelString="Название"
        placeholder="Введите название вашей работы"
        {...formState.getInputProps("title")}
        min={20}
        max={100}
      />

      <Editor
        labelString="Описание"
        required
        content={formState.getInputProps("description").value}
        onChange={(e) => formState.setFieldValue("description", e.currentTarget.textContent!)}
      />

      <MultiSelect
        mt="md"
        data={tags}
        label="Тэги"
        labelProps={{
          className: "text-sm text-[#495057] font-bold",
        }}
        placeholder="Введите тэги"
        searchable
        clearable
        creatable={tags.length < 5}
        getCreateLabel={(query) => `+ ${query}`}
        onChange={(newTags) => {
          setTags(newTags.map((e) => ({ value: e, label: e })));
        }}
        maxSelectedValues={5}
      />

      <Group position="center" mt="xl">
        <Button variant="default" disabled>
          Назад
        </Button>
        <NextButton />
      </Group>
    </Paper>
  );
}

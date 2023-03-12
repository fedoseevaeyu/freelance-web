import { FormState } from "@app/(create)/job/form-state";
import { useJobStore } from "@app/(create)/job/store";
import Textarea from "@components/Textarea";
import TextareaWithLetterCounter from "@components/TextareaWithLetterCounter";
import { Button, FileButton, Group, Image, MultiSelect, Paper, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import clsx from "clsx";

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
  const setActive = useJobStore((store) => store.setActive);

  const files = useJobStore((store) => store.files);
  const attachFile = useJobStore((store) => store.attachFile);
  const detachFile = useJobStore((store) => store.detachFile);

  const tags = useJobStore((store) => store.tags);
  const setTags = useJobStore((store) => store.setTags);

  return (
    <Paper radius="md" p="xl" className="max-w-3xl">
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
        value={formState.values.title}
      />
      <TextareaWithLetterCounter
        id="description"
        required
        labelString="Описание"
        placeholder="Введите описание вашей работы"
        {...formState.getInputProps("description")}
        min={100}
        max={1000}
        value={formState.values.description}
      />
      {files.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 m-2">
          {files.map((image) => (
            <div className="relative" key={image.name}>
              <Image src={URL.createObjectURL(image)} alt="image" width={100} height={100} className="rounded-md" />
              <div
                className="absolute top-[4px] right-[4px] bg-[#e53935] rounded-full cursor-pointer"
                onClick={() => detachFile(image)}
              >
                <IconX className="text-white" size={16} />
              </div>
            </div>
          ))}
        </div>
      )}
      <FileButton
        onChange={(d) => {
          if (!d) return;
          attachFile(d);
        }}
        accept="image/png,image/jpeg"
      >
        {(props) => (
          <Button disabled={files.length >= 5} {...props} className="bg-[#1e88e5] hover:bg-[#1976d2] mt-4">
            Добавить файл
          </Button>
        )}
      </FileButton>

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
        <Button variant="filled" onClick={() => setActive(1)} className="bg-[#1e88e5] hover:bg-[#1976d2]">
          Далее
        </Button>
      </Group>
    </Paper>
  );
}

import Textarea from "@components/Textarea";
import {
  Button,
  FileButton,
  Group,
  Image,
  LoadingOverlay,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Stepper,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import clsx from "clsx";
import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { IconX } from "@tabler/icons-react";
import { uploadFiles } from "@utils/upload";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const initialValues = {
  title: "",
  description: "",
  price: "",
  category: "",
};

const validate = {
  title: (value: string) =>
    value.length < 20
      ? "Название должно содержать не менее 20 символов"
      : value.length > 100
      ? "Название должно содержать не более 100 символов"
      : null,
  description: (value: string) =>
    value.length < 100
      ? "Описание должно содержать не менее 100 символов"
      : value.length > 1000
      ? "Описание должно содержать не более 1000 символов"
      : null,
  price: (value: string) => (!value ? null : Number(value) < 100 ? "Цена должна быть не менее 100" : null),
};

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

export default function Page() {
  const formState = useForm({
    initialValues,
    validate,
    validateInputOnBlur: true,
  });
  const [tags, setTags] = useState<{ value: string; label: string }[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [active, setActive] = useState(0);
  const [deadline, setDeadline] = useState<Date>();
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: typeof formState.values) => {
    const { category, description, price, title } = data;
    const token = null; // todo: check session
    if (!token)
      return showNotification({
        message: "Сессия истекла. Пожалуйста, войдите снова.",
        color: "red",
      });
    setLoading(true);
    let urls: string[] = [];
    if (files.length > 0) {
      const data = await uploadFiles(files, token).catch((err) => {
        showNotification({
          message: err?.response?.data?.message || "Something went wrong",
          color: "red",
        });
        setLoading(false);
        return null;
      });
      if (data === null) return;
      urls = data.data.paths;
    }
    await axios
      .post(
        "/api/jobs",
        {
          title,
          description,
          price: Number(price),
          category,
          tags: tags.map((t) => t.label),
          images: urls.length > 0 ? urls : undefined,
          deadline: (deadline as unknown as Date)?.toISOString(),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((d) => d.data)
      .then((d) => {
        showNotification({
          message: "Заказ успешно создан!",
          color: "green",
        });
        setTimeout(() => {
          const username = "test";
          push(`/profile/${username}/jobs/${d.slug}`);
        }, 1000);
      })
      .catch((err) => {
        showNotification({
          message: err?.response?.data?.message || "Что-то пошло не так...",
          color: "red",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col items-center p-20">
      <div className="flex flex-row flex-wrap xl:items-center xl:justify-center gap-4">
        <form onSubmit={formState.onSubmit((d) => handleSubmit(d))}>
          <Stepper active={active} color="green" onStepClick={setActive} breakpoint="sm">
            <Stepper.Step label="Описание" description="Опишите вашу работу" allowStepSelect={active > 0}>
              <Paper radius="md" p="xl" className="max-w-3xl">
                <>
                  <Textarea
                    id="title"
                    required
                    labelString="Название"
                    placeholder="Введите название вашей работы"
                    {...formState.getInputProps("title")}
                    minLength={20}
                    maxLength={100}
                    wordsComponent={
                      <span
                        className={clsx("text-sm ml-auto pr-3 my-2", {
                          "text-[#ef4444]": formState.values.title.length < 20,
                          "text-[#28a745]": formState.values.title.length >= 20 && formState.values.title.length < 1000,
                        })}
                      >
                        {formState.values.title.length}/100
                      </span>
                    }
                  />
                  <Textarea
                    id="description"
                    required
                    labelString="Описание"
                    placeholder="Введите описание вашей работы"
                    {...formState.getInputProps("description")}
                    minLength={100}
                    maxLength={1000}
                    wordsComponent={
                      <div className="flex flex-col">
                        <span
                          className={clsx("text-sm ml-auto pr-3 my-2", {
                            "text-[#ef4444]": formState.values.description.length < 100,
                            "text-[#28a745]":
                              formState.values.description.length >= 100 && formState.values.description.length <= 1000,
                          })}
                        >
                          {formState.values.description.length}/1000
                        </span>
                      </div>
                    }
                  />
                  {files.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-2 m-2">
                      {files.map((image) => (
                        <div className="relative" key={image.name}>
                          <Image
                            src={URL.createObjectURL(image)}
                            alt="image"
                            width={100}
                            height={100}
                            className="rounded-md"
                          />
                          <div
                            className="absolute top-[4px] right-[4px] bg-[#e53935] rounded-full cursor-pointer"
                            onClick={() => {
                              setFiles((prev) => prev.filter((prevImage) => prevImage !== image));
                            }}
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

                      setFiles((o) => [...o, d]);
                    }}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => (
                      <Button disabled={files.length >= 5} {...props} className="bg-[#1e88e5] hover:bg-[#1976d2] mt-4">
                        Добавить файл
                      </Button>
                    )}
                  </FileButton>

                  <div>
                    <LoadingOverlay overlayBlur={2} visible={loading} />

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
                  </div>
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
                    onCreate={(query) => {
                      const item = { value: query, label: query };
                      setTags((current) => [...current, item]);
                      return item;
                    }}
                    maxSelectedValues={5}
                  />
                  <Group position="center" mt="xl">
                    <Button variant="default" disabled>
                      Назад
                    </Button>
                    <Button onClick={() => setActive(1)} variant="filled" className="bg-[#1e88e5] hover:bg-[#1976d2]">
                      Следующий шаг
                    </Button>
                  </Group>
                </>
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              label="Бюджет и дедлайн"
              description="Установите сроки выполнения и бюджет"
              allowStepSelect={active > 1}
            >
              <Paper radius="md" p="xl" className="max-w-3xl lg:min-w-[30vw] flex flex-col items-center">
                <Text className="text-sm font-bold text-[#495057] py-2">Дедлайн (опционально)</Text>
                <DatePicker
                  onChange={(d) => {
                    if (d) setDeadline(d);
                  }}
                  value={deadline}
                  excludeDate={(date) =>
                    date.getMonth() < new Date().getMonth() && date.getFullYear() <= new Date().getFullYear()
                  }
                />
                <Text className="text-sm font-bold text-[#495057] py-2 mt-5">Бюджет (опционально)</Text>
                <NumberInput {...formState.getInputProps("price")} min={100} icon="₽" />
                <Group position="center" mt="xl">
                  <Button variant="default" loading={loading} onClick={() => setActive(0)}>
                    Назад
                  </Button>
                  <Button type="submit" variant="filled" loading={loading} className="bg-[#1e88e5] hover:bg-[#1976d2]">
                    Создать
                  </Button>
                </Group>
              </Paper>
            </Stepper.Step>
          </Stepper>
        </form>
      </div>
    </div>
  );
}

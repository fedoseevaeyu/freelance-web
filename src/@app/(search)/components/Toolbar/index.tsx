import SelectWithSkeleton from "@components/SelectWithSkeleton";
import { Button, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect } from "react";

const categoriesLoading = false;
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

const typeOptions = [
  {
    value: "developer",
    label: "Разработчика",
  },
  {
    value: "job",
    label: "Работу",
  },
];

const initialValues = {
  search: "",
  category: "",
  type: "",
};

export default function Toolbar() {
  const { query, isReady, replace } = useRouter();

  const formState = useForm({
    initialValues,
  });

  useEffect(() => {
    if (!isReady) return;

    formState.setFieldValue("search", query.q as string);
    formState.setFieldValue("type", query.type as string);
    formState.setFieldValue("category", query.category as string);
    formState.resetDirty();
  }, [isReady, query.category, query.q, query.type]);

  async function refetchSearchResults() {}

  function handleChangeParam(key: string) {
    return async function (val: string) {
      await replace({
        pathname: "/search",
        query: {
          ...query,
          [key]: val,
        },
      });
    };
  }

  return (
    <form
      onSubmit={formState.onSubmit(async () => {
        await refetchSearchResults();
      })}
      className="w-full flex gap-3 items-center flex-wrap"
    >
      <TextInput
        label="Поиск"
        name="search"
        {...formState.getInputProps("search")}
        onChange={(e) => handleChangeParam("q")(e.target.value)}
      />
      <SelectWithSkeleton
        isLoading={categoriesLoading}
        label="Категория"
        name="category"
        data={categoriesOptions}
        {...formState.getInputProps("category")}
        placeholder="Выберите категорию"
        defaultValue={(query.category as string) || undefined}
        onChange={handleChangeParam("category")}
      />
      <Select
        label="Я ищу"
        name="type"
        data={typeOptions}
        {...formState.getInputProps("type")}
        defaultValue={(query.type as string) || "developer"}
        onChange={handleChangeParam("type")}
      />

      <Button type="submit" variant="outline" className="mt-auto">
        Поиск
      </Button>
    </form>
  );
}

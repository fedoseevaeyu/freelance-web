import { Button, Checkbox, Divider, Select, SimpleGrid, Textarea as T, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

import NextButton from "@app/(create)/service/components/NextButton";
import PrevButton from "@app/(create)/service/components/PrevButton";
import { FormState } from "@app/(create)/service/form-state";
import { useServiceStore } from "@app/(create)/service/store";
import { decline } from "@utils/decline";
import { range } from "@utils/range";

const DELIVERY_DAYS = [...range(1, 7), 10, 12, 14, 15, 20, 30, 60, 90].map((e) => ({
  value: `${e}`,
  label: `${e} ${decline(e, ["день", "дня", "дней"])}`,
}));

export default function Step3({ formState }: { formState: UseFormReturnType<FormState> }) {
  const features = useServiceStore((store) => store.features);
  const addIncludeInFeature = useServiceStore((store) => store.addIncludeInFeature);
  const removeIncludeInFeature = useServiceStore((store) => store.removeIncludeInFeature);

  return (
    <>
      <div className="flex gap-4 mt-8">
        <SimpleGrid
          cols={formState.values.packages?.length === 1 ? 1 : formState.values.packages?.length === 2 ? 2 : 3}
          className="w-full"
        >
          {formState.values.packages?.map((p, index) => (
            <div className="flex flex-col border-r-[1px] w-full border-gray-400 pr-3" key={index}>
              <Text className="text-sm font-bold text-center">{formState.values.packages[index].name}</Text>
              <TextInput
                placeholder="Название тарифа"
                required
                {...formState.getInputProps(`packages.${index}.name`)}
              />
              <Divider className="my-2" />
              <T placeholder="Описание" required {...formState.getInputProps(`packages.${index}.description`)} />
              <Select
                label="Время исполнения"
                {...formState.getInputProps(`packages.${index}.deliveryDays`)}
                required
                data={DELIVERY_DAYS}
                placeholder="Выберите вариант"
              />
              <Text className="text-sm font-bold text-center mt-2">Что входит?</Text>
              {features.map((feature, id) => (
                <div className="flex flex-row gap-2 w-full my-2" key={id}>
                  <Checkbox
                    checked={feature.includedIn?.includes(p.name)}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        removeIncludeInFeature(feature.name, p.name);
                      } else if (!feature.includedIn?.includes(p.name)) {
                        addIncludeInFeature(feature.name, p.name);
                      }
                    }}
                    className="w-full"
                    label={feature.name}
                  />
                </div>
              ))}
              <TextInput
                required
                label="Стоимость в рублях"
                {...formState.getInputProps(`packages.${index}.price`)}
                type="number"
              />
            </div>
          ))}
        </SimpleGrid>
        <div className="flex flex-col">
          <Text className="text-lg font-bold text-black">Тариф</Text>
          <Button
            onClick={() => {
              formState.insertListItem("packages", {
                name: "Название",
                price: 0,
                description: "",
              });
            }}
            disabled={formState.values.packages?.length === 3}
            variant="filled"
            className="bg-[#1e88e5] hover:bg-[#1976d2]"
          >
            <IconPlus />
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center justify-center mt-4">
        <PrevButton />

        <NextButton
          customClick={(onNext) => () => {
            if (formState.values.packages?.length === 0) {
              return showNotification({
                color: "red",
                message: "Вы должны указать как минимум 1 пакет",
              });
            }
            onNext();
          }}
        />
      </div>
    </>
  );
}

import { useJobStore } from "@app/(create)/job/store";
import { Button, Group, NumberInput, Paper, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";

import { FormState } from "../form-state";

export default function Step2({ formState }: { formState: UseFormReturnType<FormState> }) {
  const setActive = useJobStore((store) => store.setActive);

  const deadline = useJobStore((store) => store.deadline);
  const setDeadline = useJobStore((store) => store.setDeadline);

  return (
    <Paper radius="md" p="xl" className="max-w-3xl flex flex-col items-center">
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
        <Button variant="default" onClick={() => setActive(0)}>
          Назад
        </Button>
        <Button variant="filled" type="submit" className="bg-[#1e88e5] hover:bg-[#1976d2]">
          Создать
        </Button>
      </Group>
    </Paper>
  );
}

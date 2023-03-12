import NextButton from "@app/(create)/service/components/NextButton";
import PrevButton from "@app/(create)/service/components/PrevButton";
import { FormState } from "@app/(create)/service/form-state";
import { useServiceStore } from "@app/(create)/service/store";
import { Button, Group, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

export default function Step2({ formState }: { formState: UseFormReturnType<FormState> }) {
  const features = useServiceStore((store) => store.features);
  const setFeatures = useServiceStore((store) => store.setFeatures);
  const addFeature = useServiceStore((store) => store.addFeature);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-3   gap-4 w-full">
        <Text align="center" className="text-lg font-bold text-center">
          Список того, что входит в вашу услугу
        </Text>
        <div className="mt-5 w-full">
          {features.map((feature, id) => (
            <div className="flex flex-row gap-2 w-full my-2" key={id}>
              <TextInput
                value={feature.name}
                onChange={(e) => {
                  setFeatures(
                    features.map((f, index) =>
                      index === id
                        ? {
                            name: e.target.value,
                            includedIn: f.includedIn,
                          }
                        : f,
                    ),
                  );
                }}
                className="w-full"
              />
              <Button
                variant="filled"
                className="bg-[#e53935] hover:bg-[#d32f2f]"
                onClick={() => {
                  formState.removeListItem("features", id);
                }}
              >
                <IconX />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Group position="center">
          <PrevButton />

          <Button color="purple" className="bg-purple-600 hover:bg-purple-700" onClick={addFeature}>
            Добавить
          </Button>

          <NextButton
            customClick={(onNext) => () => {
              if (features.length === 0) {
                return showNotification({
                  color: "red",
                  message: "You must add at least one feature",
                });
              }
              onNext();
            }}
          />
        </Group>
      </div>
    </>
  );
}

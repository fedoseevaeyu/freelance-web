import { Container, LoadingOverlay, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck } from "@tabler/icons-react";

import Step3 from "./steps/Step3";
import Step2 from "./steps/Step2";
import Step1 from "./steps/Step1";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { useServiceStore } from "./store";

import validateTitleInput from "@app/(create)/validate/title";
import validatePriceInput from "@app/(create)/validate/price";
import validateDescriptionInput from "@app/(create)/validate/description";
import { FormState } from "@app/(create)/service/form-state";
import useSubmit from "@app/(create)/service/use-submit";

export const AnswerType = {
  TEXT: "TEXT",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  ATTACHMENT: "ATTACHMENT",
};

const initialValues: FormState = {
  title: "",
  description: "",
  price: "",
  category: "",
  packages: [
    {
      name: "",
      price: 10000,
      description: "",
      deliveryDays: 7,
    },
  ],
  questions: [
    {
      question: "",
      type: "TEXT",
      required: false,
    },
  ],
};

const validate = {
  title: validateTitleInput,
  description: validateDescriptionInput,
  price: validatePriceInput,
};

export default function Page() {
  const formState = useForm<FormState>({
    initialValues,
    validate,
    validateInputOnBlur: true,
  });

  const { handleSubmit, loading } = useSubmit(formState);

  const active = useServiceStore((store) => store.active);
  const setActive = useServiceStore((store) => store.setActive);

  return (
    <div className="flex flex-col p-20">
      <LoadingOverlay visible={loading} />
      <Container className="flex flex-wrap xl:items-center justify-center gap-4 w-full">
        <form
          className="w-full"
          onSubmit={formState.onSubmit((d) => {
            handleSubmit(d);
          })}
        >
          <Stepper active={active} color="green" onStepClick={setActive} breakpoint="sm" completedIcon={<IconCheck />}>
            <Stepper.Step label="Основное" allowStepSelect={active > 0}>
              <Step1 formState={formState} />
            </Stepper.Step>
            <Stepper.Step label="Особенности" allowStepSelect={active > 1}>
              <Step2 formState={formState} />
            </Stepper.Step>
            <Stepper.Step label="Тарифы" allowStepSelect={active > 2}>
              <Step3 formState={formState} />
            </Stepper.Step>
            <Stepper.Step label="Опросник" allowStepSelect={active > 3}>
              <Step4 formState={formState} />
            </Stepper.Step>
            <Stepper.Step label="Вложения" allowStepSelect={active > 4}>
              <Step5 formState={formState} />
            </Stepper.Step>
          </Stepper>
        </form>
      </Container>
    </div>
  );
}

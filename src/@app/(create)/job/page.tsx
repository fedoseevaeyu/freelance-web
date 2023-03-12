import { LoadingOverlay, Stepper } from "@mantine/core";
import { useForm } from "@mantine/form";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";

import { FormState } from "@app/(create)/job/form-state";
import { useJobStore } from "@app/(create)/job/store";
import useSubmit from "@app/(create)/job/use-submit";
import validateDescriptionInput from "@app/(create)/validate/description";
import validatePriceInput from "@app/(create)/validate/price";
import validateTitleInput from "@app/(create)/validate/title";

const initialValues: FormState = {
  title: "",
  description: "",
  price: "",
  category: "",
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

  const active = useJobStore((store) => store.active);
  const setActive = useJobStore((store) => store.setActive);

  return (
    <div className="flex flex-col items-center p-20">
      <LoadingOverlay visible={loading} />
      <div className="flex flex-row flex-wrap xl:items-center xl:justify-center gap-4">
        <form onSubmit={formState.onSubmit((d) => handleSubmit(d))}>
          <Stepper color="green" active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step label="Описание" description="Опишите вашу работу" allowStepSelect={active > 0}>
              <Step1 formState={formState} />
            </Stepper.Step>
            <Stepper.Step
              label="Бюджет и дедлайн"
              description="Установите сроки выполнения и бюджет"
              allowStepSelect={active > 1}
            >
              <Step2 formState={formState} />
            </Stepper.Step>
          </Stepper>
        </form>
      </div>
    </div>
  );
}

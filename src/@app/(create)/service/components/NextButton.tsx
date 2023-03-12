import { useServiceStore } from "@app/(create)/service/store";
import { Button, ButtonProps } from "@mantine/core";
import { PolymorphicComponentProps } from "@mantine/utils";

export default function NextButton({
  children,
  customClick,
  ...rest
}: PolymorphicComponentProps<"button", ButtonProps> & { customClick?: (onNext: () => void) => () => void }) {
  const onNext = useServiceStore((store) => store.onNext);
  return (
    <Button
      onClick={customClick ? customClick(onNext) : onNext}
      variant="filled"
      className="bg-[#1e88e5] hover:bg-[#1976d2]"
      {...rest}
    >
      {children || "Далее"}
    </Button>
  );
}

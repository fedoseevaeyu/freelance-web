import { Button, ButtonProps } from "@mantine/core";
import { PolymorphicComponentProps } from "@mantine/utils";

import { useServiceStore } from "@app/(create)/service/store";

export default function PrevButton({
  children,
  customClick,
  ...rest
}: PolymorphicComponentProps<"button", ButtonProps> & { customClick?: (onNext: () => void) => () => void }) {
  const onPrev = useServiceStore((store) => store.onPrev);
  return (
    <Button
      onClick={customClick ? customClick(onPrev) : onPrev}
      variant="filled"
      className="bg-[#1e88e5] hover:bg-[#1976d2]"
      {...rest}
    >
      {children || "Назад"}
    </Button>
  );
}

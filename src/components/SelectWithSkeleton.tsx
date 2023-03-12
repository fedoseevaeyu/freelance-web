import { Select, SelectProps } from "@mantine/core";

const Skeleton = () => (
  <div className="flex flex-row gap-3 items-center justify-center flex-wrap">
    <div className="w-40 h-10 bg-gray-200 animate-pulse"></div>
  </div>
);

export default function SelectWithSkeleton({ isLoading, ...props }: { isLoading: boolean } & SelectProps) {
  if (isLoading) {
    return <Skeleton />;
  }

  return <Select {...props} />;
}

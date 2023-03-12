import { ReactNode } from "react";
import { Textarea as T, TextareaProps, useMantineColorScheme } from "@mantine/core";
import clsx from "clsx";

type Props = {
  id: string;
  labelString: string;
  required?: boolean;
  wordsComponent?: ReactNode;
} & TextareaProps;

export default function Textarea({ labelString, wordsComponent, ...props }: Props) {
  return (
    <div className="mt-4">
      <label className="text-sm font-bold py-2 text-[#495057]" htmlFor={props.id}>
        {labelString}
        {props.required && (
          <span>
            <span className="text-red-500">*</span>
          </span>
        )}
      </label>
      <div className="border-[1px] border-[#ced4da] rounded-sm flex flex-col">
        <T
          {...props}
          classNames={{
            input: "border-0",
            ...props.classNames,
          }}
          error={null}
        />
        {wordsComponent}
      </div>
      <span className="text-red-500 text-sm">{props.error}</span>
    </div>
  );
}

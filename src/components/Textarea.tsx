import { ReactNode } from "react";
import { Textarea as T, TextareaProps as TP } from "@mantine/core";

export type TextareaProps = {
  id: string;
  labelString: string;
  required?: boolean;
  wordsComponent?: ReactNode;
} & TP;

export default function Textarea({ labelString, wordsComponent, ...props }: TextareaProps) {
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

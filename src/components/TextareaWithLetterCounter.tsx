import Textarea, { TextareaProps } from "@components/Textarea";
import clsx from "clsx";

type Props = { min: number; max: number; value: string } & Omit<TextareaProps, "minLength" | "maxLength">;

export default function TextareaWithLetterCounter({ min, max, value, ...rest }: Props) {
  return (
    <Textarea
      {...rest}
      value={value}
      minLength={min}
      maxLength={max}
      wordsComponent={
        <span
          className={clsx("text-sm ml-auto pr-3 my-2", {
            "text-[#ef4444]": value.length < min,
            "text-[#28a745]": value.length >= min && value.length < max,
          })}
        >
          {value.length}/{max}
        </span>
      }
    />
  );
}

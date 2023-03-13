import { showNotification } from "@mantine/notifications";
import { AxiosError, isCancel } from "axios";

export function handleAxiosError(err: AxiosError<{ errors?: { message: string }[]; message: string }>) {
  const data = err?.response?.data;
  /* error response is:
   * {
   *    errors: { message: string }[];
   * }
   *
   * or
   *
   * {
   *    message: string;
   * }
   */
  if (isCancel(err)) return null;

  showNotification({
    message: data?.errors?.[0].message || data?.message || "Что-то пошло не так...",
    color: "red",
  });

  return null;
}

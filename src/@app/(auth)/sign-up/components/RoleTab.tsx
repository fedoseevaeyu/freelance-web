import { Paper } from "@mantine/core";
import clsx from "clsx";
import { useRouter } from "next/router";

import Route from "config/routes";
import { Role } from "@domain/role";

export default function RoleTab({
  title,
  value,
  current,
  setCurrent,
}: {
  title: string;
  value: Role;
  current?: Role;
  setCurrent: (val: Role) => void;
}) {
  const { replace, query } = useRouter();
  return (
    <Paper
      radius="md"
      p="xl"
      className={clsx("border-[1px] cursor-pointer text-lg hover:border-pink-400", {
        "border-pink-400": current === value,
      })}
      onClick={() => {
        replace({
          pathname: Route.SignUp,
          query: {
            ...query,
            roleSelect: value,
          },
        });
        setCurrent(Role.Client);
      }}
    >
      {title}
    </Paper>
  );
}

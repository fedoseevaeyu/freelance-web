import { Avatar, Menu } from "@mantine/core";
import Link from "next/link";

import { Role } from "@domain/role";
import useUser from "@lib/use-user";
import Route from "config/routes";

export default function HeaderMenu() {
  const { user } = useUser();

  return (
    <Menu withArrow width={200}>
      <Menu.Target>
        <Avatar className="cursor-pointer" src={user?.avatarUrl} radius="xl" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href={Route.My}>
          Профиль
        </Menu.Item>
        <Menu.Item component={Link} href={Route.Search}>
          Поиск
        </Menu.Item>
        {user?.role === Role.Client ? (
          <Menu.Item color="green" component={Link} href={Route.CreateJob}>
            Новая работа
          </Menu.Item>
        ) : (
          <Menu.Item color="green" component={Link} href={Route.CreateService}>
            Новая услуга
          </Menu.Item>
        )}
        {!user?.completed && (
          <Menu.Item color="yellow" component={Link} href="/my/settings?tab=complete-profile">
            Заполнить профиль
          </Menu.Item>
        )}
        <Menu.Item component={Link} href="/my/orders">
          Заказы
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red" component={Link} href="/sign-out">
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

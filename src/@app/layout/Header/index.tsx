import { Button, Group, clsx } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

import useUser from "@lib/use-user";
import HeaderMenu from "@app/layout/Header/UserArea";
import app from "config/app";
import Route from "config/routes";
import { Role } from "@domain/role";

export default function Header() {
  const { asPath } = useRouter();
  const { user, isAuth } = useUser();

  return (
    <header className="z-[1001] h-[60px] static bg-white px-4 border-b-[#e9ecef] border-b border-solid top-0 inset-x-0">
      <div className="container flex items-center justify-between h-full">
        <Link
          href={isAuth ? Route.My : Route.Home}
          className={clsx("flex items-center gap-[12px]", {
            "lg:min-w-[183px]": !isAuth,
          })}
        >
          <svg viewBox="0 0 512 512" width={32} height={32}>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M160 368L32 256l128-112M352 368l128-112-128-112M304 96l-96 320"
            />
          </svg>
          <span className="text-lg font-semibold tracking-wide pt-[4px]">{app.Name}</span>
        </Link>

        <Group className="max-md:hidden">
          {user?.role !== Role.Client && (
            <Link href={Route.SearchJob}>
              <Button variant="default">Найти заказчика</Button>
            </Link>
          )}
          {user?.role !== Role.Freelancer && (
            <Link href={Route.SearchDeveloper}>
              <Button variant="default">Найти работу</Button>
            </Link>
          )}
        </Group>

        {isAuth ? (
          <HeaderMenu />
        ) : (
          <Group className="max-md:hidden">
            <Link
              href={{
                pathname: Route.SignIn,
                query: { to: asPath },
              }}
            >
              <Button variant="default">Войти</Button>
            </Link>
            <Link
              href={{
                pathname: Route.SignUp,
                query: { to: asPath },
              }}
            >
              <Button variant="outline">Регистрация</Button>
            </Link>
          </Group>
        )}
      </div>
    </header>
  );
}

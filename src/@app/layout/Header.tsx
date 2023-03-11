import { Button, Group } from "@mantine/core";
import clsx from "clsx";
import app from "config/app";
import Route from "config/routes";
import Link from "next/link";
import { useRouter } from "next/router";

import { Role } from "@/domain/role";

const isAuth = true;
const role: Role | null = null;

export default function Header() {
  const { asPath } = useRouter();

  return (
    <header className="z-[1001] h-[60px] static bg-white px-4 border-b-[#e9ecef] border-b border-solid top-0 inset-x-0">
      <div className="container flex items-center justify-between h-full">
        <Link
          href={isAuth ? Route.Dashboard : Route.Home}
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
          {role !== Role.Client && (
            <Link href={Route.SearchJob}>
              <Button variant="default">Найти заказчика</Button>
            </Link>
          )}
          {role !== Role.Freelancer && (
            <Link href={Route.SearchDeveloper}>
              <Button variant="default">Найти работу</Button>
            </Link>
          )}
        </Group>

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
      </div>
    </header>
  );
}

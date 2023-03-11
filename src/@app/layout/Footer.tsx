import { Group } from "@mantine/core";
import clsx from "clsx";
import app from "config/app";
import Route from "config/routes";
import Link from "next/link";

const isAuth = true;

const links = [
  {
    label: "Пользовательское соглашение",
    link: Route.Agreement,
  },
  {
    label: "Политика конфиденциальности",
    link: Route.Privacy,
  },
];

export default function Footer() {
  return (
    <footer className="h-[80px] bg-white px-4  border-t-[#e9ecef] border-t border-solid">
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

        <Group>
          {links.map((link) => (
            <Link
              color="dimmed"
              key={link.label}
              href={link.link}
              className="hover:underline"
              target={link.link.startsWith("mailto:") ? "_self" : "_blank"}
              rel={link.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            >
              {link.label}
            </Link>
          ))}
        </Group>
      </div>
    </footer>
  );
}

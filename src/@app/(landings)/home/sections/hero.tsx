import { Button, clsx } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import { config } from "react-spring";

import TextTransition from "@components/TextTransition";
import Route from "config/routes";
const forWho = ["разработчиков", "писателей", "видеоредакторов", "каждого"];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((i) => i + 1);
    }, 2000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <section className="min-h-[calc(100vh-60px)] container flex flex-col items-center justify-center">
      <h1 className="text-center text-[5.5rem] font-bold leading-[1.125] tracking-[-0.02em] mb-12">
        Платформа для
        <TextTransition springConfig={config.gentle}>
          <span
            className={clsx("text-center tracking-[0.045em]", {
              "bg-gradient-to-r from-[#3b82f6] to-[#2dd4bf] bg-clip-text text-transparent":
                index % forWho.length === forWho.length - 1,
            })}
          >
            {forWho[index % forWho.length]}
          </span>
        </TextTransition>
      </h1>
      <p className="text-xl text-gray-600 mb-8 font-lighter text-center">Доверьте свою работу опытным фрилансерам</p>
      <div className="mt-4 mb-8" data-aos="zoom-in">
        <Link href={`${Route.SignIn}?to=${Route.My}`} passHref>
          <Button
            variant="filled"
            className="bg-black hover:bg-gray-900 duration-[125ms] transition-all hover:scale-110"
            color="dark"
            size="md"
          >
            Начать
          </Button>
        </Link>
      </div>
    </section>
  );
}

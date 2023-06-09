import { Anchor, Button, Container, Group, Paper, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import axios, { AxiosResponse } from "axios";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";

import { handleAxiosError } from "@lib/notify";
import Route from "config/routes";
import { passwordFormValidate } from "@utils/validate/password";
import { emailFormValidate } from "@utils/validate/email";

const initialValues = {
  email: "",
  password: "",
};

const validate = {
  email: emailFormValidate,
  password: passwordFormValidate,
};

export default function Page() {
  const { replace, query } = useRouter();
  const form = useForm({
    initialValues,
    validate,
    validateInputOnBlur: true,
  });

  function handleSubmit(values: typeof form.values) {
    const { email, password } = values;
    axios
      .post("/api/auth/sign-in", {
        email,
        password,
      })
      .then((e: AxiosResponse) => e.data)
      .then((e: { username: string }) => {
        showNotification({
          message: `Добро пожаловать назад, @${e.username}`,
          color: "green",
        });
        void replace((query.to as string) || Route.My);
      })
      .catch(handleAxiosError);
  }

  return (
    <Container className="h-full min-h-[calc(100vh-60px-80px)] flex flex-col justify-center pb-[60px]" size={500}>
      <Text
        size="lg"
        weight={500}
        className="text-center text-2xl bg-gradient-to-r from-[#3b82f6] to-[#2dd4bf] bg-clip-text text-transparent font-bold mb-4"
      >
        Freelance
      </Text>

      <Paper radius="md" p="xl" withBorder>
        <form onSubmit={form.onSubmit((d) => handleSubmit(d))}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="example@freelance.com"
              type="email"
              {...form.getInputProps("email")}
            />

            <PasswordInput required label="Пароль" {...form.getInputProps("password")} />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component={Link}
              href={{
                pathname: Route.SignUp,
                query,
              }}
              type="button"
              size="xs"
              className="text-[#3b82f6] hover:underline"
            >
              Нет аккаунта? Регистрация
            </Anchor>
            <Button
              type="submit"
              fullWidth
              color="black"
              className="bg-gray-900 hover:bg-black dark:bg-gradient-to-r dark:from-[#3b82f6] dark:to-[#2dd4bf] dark:text-white"
            >
              Войти
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

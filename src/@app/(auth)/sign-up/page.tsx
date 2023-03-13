import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  clsx,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import axios, { AxiosResponse } from "axios";
import { showNotification } from "@mantine/notifications";
import { upperFirst } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { handleAxiosError } from "@lib/notify";
import Route from "config/routes";
import { passwordFormValidate } from "@utils/validate/password";
import { emailFormValidate } from "@utils/validate/email";
import RoleTab from "@app/(auth)/sign-up/components/RoleTab";
import { Role } from "@domain/role";

const initialValues = {
  email: "",
  name: "",
  password: "",
  terms: false,
  username: "",
  confirmPass: "",
  country: "",
};

const validate = {
  username: (val: string) => (val.length < 6 ? "Имя пользователя должно содержать не менее 6 символов" : null),
  email: emailFormValidate,
  password: passwordFormValidate,
  confirmPass: (val: string, values: { password: string }) => (val === values.password ? null : "Пароли не совпадают"),
  terms: (val: boolean) => (val ? null : "Необходимо согласиться с пользовательским соглашением"),
};

export default function Page() {
  const [roleSelect, setRoleSelect] = useState<Role>();
  const [role, setRole] = useState<Role>();
  const { isReady, replace, query } = useRouter();
  const form = useForm({
    initialValues,
    validate,
    validateInputOnBlur: true,
  });

  useEffect(() => {
    if (!isReady) return;

    if (query.role === Role.Client) {
      setRole(Role.Client);
    }
    if (query.role === Role.Freelancer) {
      setRole(Role.Freelancer);
    }

    if (query.roleSelect === Role.Client) {
      setRoleSelect(Role.Client);
    }
    if (query.roleSelect === Role.Freelancer) {
      setRoleSelect(Role.Freelancer);
    }
  }, [isReady, query.role, query.roleSelect]);

  function handleSubmit(values: typeof form.values) {
    const { email, password, username, terms, name, confirmPass } = values;
    axios
      .post("/api/auth/sign-up", {
        confirm_password: confirmPass,
        email,
        name,
        password,
        username,
        terms,
      })
      .then((e: AxiosResponse) => e.data)
      .then((e: { username: string }) => {
        showNotification({
          message: `Вы успешно зарегестрированны, @${upperFirst(e.username)}!`,
          color: "green",
        });
        void replace((query.to as string) || Route.My);
      })
      .catch(handleAxiosError);
  }

  return (
    <Container className="h-full min-h-[calc(100vh-60px-80px)] flex flex-col justify-center py-[40px]" size={500}>
      <Text
        size="lg"
        weight={500}
        className="text-center text-2xl bg-gradient-to-r from-[#3b82f6] to-[#2dd4bf] bg-clip-text text-transparent font-bold mb-4"
      >
        Freelance{role ? ` - для ${role === Role.Client ? "заказчиков" : "исполнителей"}` : ""}
      </Text>

      <Paper radius="md" p="xl" withBorder>
        {role ? (
          <form onSubmit={form.onSubmit((d) => handleSubmit(d))}>
            <Stack>
              <TextInput label="Имя" placeholder="Иван Иванович" required {...form.getInputProps("name")} />

              <TextInput
                required
                label="Имя пользователя"
                placeholder="ivan_ivanovich"
                {...form.getInputProps("username")}
              />

              <TextInput
                required
                label="Email"
                placeholder="example@freelance.com"
                type="email"
                {...form.getInputProps("email")}
              />

              <PasswordInput required label="Пароль" {...form.getInputProps("password")} />
              <PasswordInput required label="Подтверждение пароля" {...form.getInputProps("confirmPass")} />

              <Checkbox
                label={
                  <>
                    Я согласен с{" "}
                    <Link href={Route.Agreement} className={"text-[#3b82f6] hover:underline"}>
                      Пользовательским соглашением
                    </Link>
                  </>
                }
                {...form.getInputProps("terms")}
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor
                component={Link}
                href={{
                  pathname: Route.SignIn,
                  query,
                }}
                type="button"
                size="xs"
                className="text-[#3b82f6] hover:underline"
              >
                Уже есть аккаунт? Авторизация
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
        ) : (
          <Group position="center" className="flex flex-col gap-4 flex-wrap">
            <div className="flex flex-row gap-4 items-center justify-center flex-wrap">
              <RoleTab
                title="Я клиент, я ищу разработчиков"
                value={Role.Client}
                current={roleSelect}
                setCurrent={setRoleSelect}
              />
              <RoleTab
                title="Я фрилансер, я ищу клиентов"
                value={Role.Freelancer}
                current={roleSelect}
                setCurrent={setRoleSelect}
              />
            </div>
            <Button
              variant="filled"
              className={clsx("bg-pink-400 hover:bg-pink-500")}
              onClick={() => {
                setRole(roleSelect);
                const newQuery: {
                  role: Role | undefined;
                  roleSelect: Role | undefined;
                } = {
                  ...query,
                  roleSelect: undefined,
                  role: roleSelect,
                };
                delete newQuery.roleSelect;
                void replace({
                  pathname: Route.SignUp,
                  query: newQuery,
                });
              }}
            >
              Подтвердить
            </Button>
          </Group>
        )}
      </Paper>
    </Container>
  );
}

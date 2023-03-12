import PrevButton from "@app/(create)/service/components/PrevButton";
import { FormState } from "@app/(create)/service/form-state";
import { useServiceStore } from "@app/(create)/service/store";
import { Button, FileButton, Group, Image, Paper, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconUpload, IconX } from "@tabler/icons-react";
import React from "react";

import NextButton from "../components/NextButton";

export default function Step5({ formState }: { formState: UseFormReturnType<FormState> }) {
  const bannerImage = useServiceStore((store) => store.bannerImage);
  const setBannerImage = useServiceStore((store) => store.setBannerImage);

  const images = useServiceStore((store) => store.images);
  const attachImage = useServiceStore((store) => store.attachImage);
  const detachImage = useServiceStore((store) => store.detachImage);

  return (
    <>
      <Text align="center" className="text-lg font-bold mt-4 text-black">
        Добавьте несколько изображений в вашу услугу, чтобы сделать её более привлекательной и выделяющейся
      </Text>
      <div className="flex gap-5 flex-wrap">
        <FileButton
          onChange={(d) => {
            if (d?.type.includes("image")) {
              setBannerImage(d);
            }
          }}
        >
          {({ onClick }) => (
            <>
              {bannerImage ? (
                <div className="flex flex-col gap-4 w-full h-full items-center justify-center mb-[32px] border-gray border-[1px] mt-[24px] pb-[24px]">
                  <Image
                    className="cursor-pointer rounded-md w-full h-full min-h-[250px] min-w-[250px] max-h-[250px] max-w-[250px]"
                    src={URL.createObjectURL(bannerImage)}
                    onClick={onClick}
                    classNames={{
                      image: "object-cover  rounded-md",
                    }}
                  />
                  <span className="text-sm  cursor-pointer">Обложка</span>
                </div>
              ) : (
                <div className="flex flex-col w-full items-center mt-4 justify-center mx-auto">
                  <Paper withBorder p="md" radius="md" mb="md" onClick={onClick} className="max-w-fit cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full min-h-[250px] min-w-[250px]">
                      <IconUpload className="w-16 h-16 text-gray-500" />
                      <Text className="text-gray-500">Загрузить Обложку</Text>
                    </div>
                  </Paper>
                </div>
              )}
            </>
          )}
        </FileButton>
      </div>
      <div className="flex flex-row flex-wrap gap-4 mb-[60px]">
        {images.map((f, index) => (
          <div className="flex flex-col items-center justify-center gap-2" key={index}>
            <div className="relative">
              <Image
                className="cursor-pointer rounded-md"
                width={100}
                height={100}
                src={URL.createObjectURL(f)}
                classNames={{
                  image: "object-cover  rounded-md",
                }}
              />
              <div className="absolute top-0 right-0">
                <Button
                  onClick={() => {
                    detachImage(f);
                  }}
                  variant="filled"
                  compact
                  className="p-0 rounded-full bg-red-500 hover:bg-red-500/90"
                >
                  <IconX />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center mt-8 w-full">
          <FileButton
            onChange={(files) => {
              if (files) {
                for (const file of files) {
                  attachImage(file);
                }
              }
            }}
            multiple
          >
            {({ onClick }) => (
              <>
                <Paper withBorder p="md" radius="md" onClick={onClick} className="max-w-fit cursor-pointer">
                  <div className="flex flex-col items-center justify-center">
                    <IconUpload className="w-16 h-16 text-gray-500" />
                    <Text className="text-gray-500">Загрузить изображения</Text>
                    <p className="text-gray-500">
                      Изображения будут отображаться в виде слайд-шоу на странице вашей услуги
                    </p>
                  </div>
                </Paper>
              </>
            )}
          </FileButton>
        </div>
      </div>
      <Group position="center" mt="md">
        <PrevButton />
        <NextButton
          type="submit"
          className="bg-green-500 hover:bg-green-500/90"
          onClick={() => {
            const error = formState.errors[Object.keys(formState.errors)[0]];
            if (error) {
              showNotification({
                message: error,
                color: "red",
              });
            }
          }}
        >
          Создать
        </NextButton>
      </Group>
    </>
  );
}

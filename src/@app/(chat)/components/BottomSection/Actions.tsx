import { Button, Group } from "@mantine/core";

import useUser from "@lib/use-user";
import { useChatModalsStore } from "@app/(chat)/store/modals";
import { Role } from "@domain/role";

export default function Actions({ complete }: { complete: boolean }) {
  const { user } = useUser();

  const openUploadWorkModal = useChatModalsStore((store) => store.openUploadWorkModal);
  const openDoneModal = useChatModalsStore((store) => store.openDoneModal);
  const openReviewModal = useChatModalsStore((store) => store.openReviewModal);

  return (
    <Group position="center">
      {user?.role === Role.Freelancer && !complete && (
        <Button variant="outline" onClick={openUploadWorkModal}>
          Работа выполнена
        </Button>
      )}
      {user?.role === Role.Client && !complete && (
        <Button onClick={openDoneModal} variant="outline">
          Работа выполнена
        </Button>
      )}
      {complete && (
        <Button variant="outline" onClick={openReviewModal}>
          Оставить отзыв
        </Button>
      )}
    </Group>
  );
}

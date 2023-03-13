import { Socket } from "socket.io-client";

import ReviewModal from "./ReviewModal";

import useUser from "@lib/use-user";
import AttachmentModal from "@app/(chat)/components/Modals/AttachmentModal";
import DoneModal from "@app/(chat)/components/Modals/DoneModal";
import UploadWorkModal from "@app/(chat)/components/Modals/UploadWorkModal";
import { Role } from "@domain/role";

export default function Modals({ complete, io }: { complete: boolean; io?: Socket }) {
  const { user } = useUser();

  return (
    <>
      {user?.role === Role.Freelancer && !complete && <UploadWorkModal io={io} />}
      {user?.role === Role.Client && !complete && <DoneModal io={io} />}
      {!complete && <AttachmentModal io={io} />}
      {complete && <ReviewModal />}
    </>
  );
}

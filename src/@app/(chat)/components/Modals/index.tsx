import { Socket } from "socket.io-client";

import ReviewModal from "./ReviewModal";

import AttachmentModal from "@app/(chat)/components/Modals/AttachmentModal";
import DoneModal from "@app/(chat)/components/Modals/DoneModal";
import UploadWorkModal from "@app/(chat)/components/Modals/UploadWorkModal";
import { Role } from "@domain/role";

const role = Role.Freelancer as Role;
export default function Modals({ complete, io }: { complete: boolean; io?: Socket }) {
  return (
    <>
      {role === Role.Freelancer && !complete && <UploadWorkModal io={io} />}
      {role === Role.Client && !complete && <DoneModal io={io} />}
      {!complete && <AttachmentModal io={io} />}
      {complete && <ReviewModal />}
    </>
  );
}

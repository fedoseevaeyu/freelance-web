import { create } from "zustand";

type ChatModalsStore = {
  attachmentModal: boolean;
  openAttachmentModal: () => void;
  closeAttachmentModal: () => void;

  uploadWorkModal: boolean;
  openUploadWorkModal: () => void;
  closeUploadWorkModal: () => void;

  reviewModal: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;

  doneModal: boolean;
  openDoneModal: () => void;
  closeDoneModal: () => void;
};

export const useChatModalsStore = create<ChatModalsStore>((set) => ({
  attachmentModal: false,
  openAttachmentModal: () => set({ attachmentModal: true }),
  closeAttachmentModal: () => set({ attachmentModal: false }),

  uploadWorkModal: false,
  openUploadWorkModal: () => set({ uploadWorkModal: true }),
  closeUploadWorkModal: () => set({ uploadWorkModal: false }),

  reviewModal: false,
  openReviewModal: () => set({ reviewModal: true }),
  closeReviewModal: () => set({ reviewModal: false }),

  doneModal: false,
  openDoneModal: () => set({ doneModal: true }),
  closeDoneModal: () => set({ doneModal: false }),
}));

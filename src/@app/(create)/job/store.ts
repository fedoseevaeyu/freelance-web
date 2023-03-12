import { create } from "zustand";

export const useJobStore = create<{
  tags: { value: string; label: string }[];
  setTags: (val: { value: string; label: string }[]) => void;

  files: File[];
  attachFile: (val: File) => void;
  detachFile: (val: File) => void;

  active: number;
  setActive: (val: number) => void;

  deadline?: Date;
  setDeadline: (val: Date) => void;
}>((set, get) => ({
  tags: [],
  setTags: (val) => set({ tags: val }),

  files: [],
  attachFile: (val) => set({ files: [...get().files, val] }),
  detachFile: (val) => set({ files: get().files.filter((f) => f !== val) }),

  active: 0,
  setActive: (val) => set({ active: val }),

  deadline: undefined,
  setDeadline: (val) => set({ deadline: val }),
}));

import { create } from "zustand";

export const useServiceStore = create<{
  tags: { value: string; label: string }[];
  setTags: (val: { value: string; label: string }[]) => void;

  images: File[];
  attachImage: (val: File) => void;
  detachImage: (val: File) => void;

  active: number;
  setActive: (val: number) => void;

  bannerImage?: File;
  setBannerImage: (val: File) => void;

  features: { name: string; includedIn: string[] }[];
  setFeatures: (val: { name: string; includedIn: string[] }[]) => void;
  addFeature: () => void;
  addIncludeInFeature: (name: string, val: string) => void;
  removeIncludeInFeature: (name: string, val: string) => void;

  onNext: () => void;
  onPrev: () => void;
}>((set, get) => ({
  tags: [],
  setTags: (val) => set({ tags: val }),

  bannerImage: undefined,
  setBannerImage: (val) => set({ bannerImage: val }),

  images: [],
  attachImage: (val) => set({ images: [...get().images, val] }),
  detachImage: (val) => set({ images: get().images.filter((f) => f !== val) }),

  features: [{ name: "", includedIn: [] }],
  setFeatures: (val) => set({ features: val }),
  addFeature: () => set({ features: [...get().features, { name: "", includedIn: [] }] }),
  addIncludeInFeature: (name, val) =>
    set({
      features: get().features.map((f) =>
        f.name === name
          ? {
              ...f,
              includedIn: [...f.includedIn, val],
            }
          : f,
      ),
    }),
  removeIncludeInFeature: (name, val) =>
    set({
      features: get().features.map((f) =>
        f.name === name
          ? {
              ...f,
              includedIn: f.includedIn.filter((e) => e !== val),
            }
          : f,
      ),
    }),

  active: 0,
  setActive: (val) => set({ active: val }),

  onNext: () => set({ active: get().active + 1 }),
  onPrev: () => set({ active: get().active - 1 }),
}));

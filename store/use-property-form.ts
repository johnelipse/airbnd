import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PropertyFormState {
  step: number;
  title: string;
  description: string;
  propertyType: string;
  maxGuests: string;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  price: string;
  checkIn: string;
  checkOut: string;
  images: string[];
  // Actions
  setStep: (step: number) => void;
  updateField: <
    K extends keyof Omit<PropertyFormState, "setStep" | "updateField" | "reset">
  >(
    field: K,
    value: PropertyFormState[K]
  ) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  title: "",
  description: "",
  propertyType: "entire-place",
  maxGuests: "",
  bedrooms: "",
  bathrooms: "",
  amenities: [],
  price: "",
  checkIn: "",
  checkOut: "",
  images: [],
};

export const usePropertyForm = create<PropertyFormState>()(
  devtools(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      updateField: (field, value) =>
        set((state) => ({ ...state, [field]: value })),
      reset: () => set(initialState),
    }),
    {
      name: "property-form-storage",
    }
  )
);

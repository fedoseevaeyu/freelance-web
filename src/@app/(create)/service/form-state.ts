export type FormState = {
  title: string;
  description: string;
  price: string;
  category: string;
  packages: {
    name: string;
    price: number;
    description: string;
    deliveryDays: number;
  }[];
  questions: {
    question: string;
    type: "TEXT";
    required: boolean;
  }[];
};

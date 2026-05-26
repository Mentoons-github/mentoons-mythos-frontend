export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type QuizTypes = {
  _id?: string;
  category: string;
  questions: QuizQuestion[];
};
export type QuizCategory = "ramayan" | "mahabharat" | "quran" | "bible";

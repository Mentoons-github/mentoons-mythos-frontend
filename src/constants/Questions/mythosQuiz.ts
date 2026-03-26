import { QuizCategory, QuizQuestion } from "../../types/redux/mythosQuizType";

export const MYTHOLOGYQUIZ: Record<QuizCategory, QuizQuestion[]> = {
  ramayan: [
    {
      id: 1,
      question: "Who wrote the Ramayana?",
      options: ["Tulsidas", "Vyasa", "Kalidasa", "Valmiki"],
      answer: "Valmiki",
    },
    {
      id: 2,
      question: "When was the Ramayana written?",
      options: [
        "100 years ago",
        "Around 500 BCE",
        "In 2020",
        "During Mughal period",
      ],
      answer: "Around 500 BCE",
    },
    {
      id: 3,
      question: "In which language was the Ramayana originally written?",
      options: ["Hindi", "Tamil", "Sanskrit", "English"],
      answer: "Sanskrit",
    },
    {
      id: 4,
      question: "How many verses (shlokas) are in the Ramayana?",
      options: ["10,000", "24,000", "50,000", "1,000"],
      answer: "24,000",
    },
    {
      id: 5,
      question: "Into how many parts (Kandas) is the Ramayana divided?",
      options: ["5", "6", "7", "10"],
      answer: "7",
    },
    {
      id: 6,
      question: "What does Ramayana teach us?",
      options: [
        "To follow Dharma",
        "To be rich",
        "To be powerful",
        "To win wars",
      ],
      answer: "To follow Dharma",
    },
    {
      id: 7,
      question: "Where does the story of Ramayana begin?",
      options: ["Lanka", "Ayodhya", "Mathura", "Dwarka"],
      answer: "Ayodhya",
    },
    {
      id: 8,
      question: "Where was Ravana’s kingdom located?",
      options: ["Ayodhya", "Hastinapur", "Lanka", "Indraprastha"],
      answer: "Lanka",
    },
    {
      id: 9,
      question: "How was the Ramayana first created?",
      options: [
        "As a movie",
        "As a poem (shlokas)",
        "As a song album",
        "As a painting",
      ],
      answer: "As a poem (shlokas)",
    },
    {
      id: 10,
      question: "Who is the hero of the Ramayana?",
      options: ["Krishna", "Rama", "Arjuna", "Shiva"],
      answer: "Rama",
    },
    {
      id: 11,
      question: "Who is Rama’s wife?",
      options: ["Draupadi", "Radha", "Sita", "Lakshmi"],
      answer: "Sita",
    },
    {
      id: 12,
      question: "Why did Rama go to the forest?",
      options: [
        "Because he was exiled",
        "For fun",
        "To fight demons",
        "To find treasure",
      ],
      answer: "Because he was exiled",
    },
    {
      id: 13,
      question: "How many years was Rama in exile?",
      options: ["7", "10", "14", "20"],
      answer: "14",
    },
    {
      id: 14,
      question: "Who kidnapped Sita?",
      options: ["Kansa", "Ravana", "Bali", "Duryodhana"],
      answer: "Ravana",
    },
    {
      id: 15,
      question: "Who helped Rama search for Sita?",
      options: ["Hanuman", "Indra", "Narada", "Ganesha"],
      answer: "Hanuman",
    },
    {
      id: 16,
      question: "Who built the bridge to Lanka?",
      options: ["Rama", "Lakshmana", "Nala", "Sugriva"],
      answer: "Nala",
    },
    {
      id: 17,
      question: "Who is Rama’s loyal brother?",
      options: ["Lakshmana", "Bharata", "Shatrughna", "Karna"],
      answer: "Lakshmana",
    },
    {
      id: 18,
      question: "What festival celebrates Rama’s return to Ayodhya?",
      options: ["Diwali", "Holi", "Navratri", "Pongal"],
      answer: "Diwali",
    },
  ],
};

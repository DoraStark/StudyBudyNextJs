export type User = {
  id: string;
  name: string;
  city: string;
  skills: string[];
  about?: string;
};

export const USERS: User[] = [
  {
    id: "1",
    name: "Anna",
    city: "Berlin",
    skills: ["musik", "mathe"],
    about: "Musik Theorie",
  },
  {
    id: "2",
    name: "Mark",
    city: "London",
    skills: ["kunst", "bio"],
    about: "Maler, interessiere mich an Bio",
  },
  {
    id: "3",
    name: "Lara",
    city: "Mainz",
    skills: ["mathe", "musik"],
    about: "Kann mit Mathe helfen",
  },
  { id: "4", name: "Erik", city: "Paris", skills: ["musik", "mathe"] },
  { id: "5", name: "Karina", city: "Oslo", skills: ["kunst", "bio"] },
  { id: "6", name: "Louise", city: "Berlin", skills: ["mathe", "musik"] },
];

import { IconType } from "react-icons/lib";

export interface MythosCardProps {
  img: string;
  description: string;
}

export interface JoinCardsProps {
  name: string;
  img?: string;
  description?: string;
  date?: string;
}

export interface MythosPlan {
  duration: string;
  benefits: string[];
  price: number;
}

export interface FooterLists {
  icon: IconType;
  value: string;
}

export interface News {
  category: string;
  date: string;
  news: string;
  name?: string;
  img?: string;
  redirect?:string
}

export interface Sunshine {
  id:string,
  rashi:string,
  name:string,
  description:string,
  imageUrl:string,
  zodiacSign:string,
  color:string
}

export interface Intelligence {
  id:string,
  name:string,
  description:string,
  imageUrl:string,
  zodiacSign:string,
  color:string
}
import { Product } from "./products";
import { IUser } from "./user/userInterface";
import { IAstrologyDetail } from "./user/userInterface";
import { IBlog } from "./blog/blog";
import { ZodiacDetails } from "./user/userInterface";
import { AstroFormData } from "./astrology/astrology";
import { changePassword } from "../features/auth/authApi";

export type {
  Product,
  IUser,
  IAstrologyDetail,
  IBlog,
  ZodiacDetails,
  AstroFormData,
  changePassword,
};

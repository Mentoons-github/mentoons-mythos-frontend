import { COUNTRY_NAMES } from "../constants";

export const getFullCountryName = (countryCode: string): string => {
  return COUNTRY_NAMES[countryCode?.toUpperCase()] || countryCode;
};

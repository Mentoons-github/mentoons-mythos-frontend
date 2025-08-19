import axios from "axios";

export interface Country {
  name: string;
  flag: string;
  code: string;
}

export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all", {
      params: {
        fields: "name,flags,cca2",
      },
    });

    const countries: Country[] = response.data.map((country: any) => ({
      name: country.name.common,
      flag: country.flags.png,
      code: country.cca2,
    }));

    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Failed to fetch countries from API");
  }
};

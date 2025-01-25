export interface Country {
  name: string;
  topLevelDomain: string[]; // Array für TLDs
  capital: string[];
  subregion: string;
  region: string;
  population: number;
  borders: string[]; // Array für Grenzländer
//   nativeName: string;
  flag: string;
  // currencies: [];
  languages: string[];
}
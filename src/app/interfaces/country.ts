export interface Country {
  name: string;
  topLevelDomain: string[]; // Array für TLDs
  capital: string;
  subregion: string;
  region: string;
  population: number;
  borders: string[]; // Array für Grenzländer
//   nativeName: string;
  flags: {
    png: string;
    svg: string;
  };
//   currencies: string; // Komma-getrennte Liste von Währungen
  languages: string;  // Komma-getrennte Liste von Sprachen
}
export interface Country {
  name: Name
  flags: Flag
  cca3: string
  independent: boolean
  population: number
  area: number
}

interface Name {
  common: string
  official: string
  nativeName: string
}

interface Flag {
  svg: string
  png: string
  alt: string
}

export interface SortingMap {
  [key: string]: (a: Country, b: Country) => number
}

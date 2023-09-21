interface Country {
  name: Name
  cca3: string
  capital: string
  continents: string
  flags: Flag
  independent: boolean
  population: number
  area: number
  region: string
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

interface SortingMap {
  [key: string]: (a: Country, b: Country) => number
}

interface NavBarItem {
  text: string
  icon?: string
  path: string
}

interface IconData {
  [key: string]: string
}

export type { Country, SortingMap, NavBarItem, IconData }

interface Country {
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
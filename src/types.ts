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

export interface NavBarItem {
  text: string
  icon?: string
  path: string
}

export interface IconData {
  [key: string]: string
}

export interface SearchBarData {
  placeholder: string
  searchThreshold?: number
  searchList: String[]
}

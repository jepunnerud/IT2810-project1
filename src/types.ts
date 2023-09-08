export interface Country {
  name: Name
  flags: Flag
  cca3: string
  independent: boolean
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

export interface NavBarItem {
  text: string
  icon?: string
  path: string
}

export interface IconData {
  [key: string]: string
}

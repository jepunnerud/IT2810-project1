import { SortingMap, Country } from '../types'

const sortingFns: SortingMap = {
  alphabetically: (c1: Country, c2: Country) =>
    c1.name.common > c2.name.common ? 1 : -1,
  population: (c1: Country, c2: Country) =>
    c1.population > c2.population ? -1 : 1,
  area: (c1: Country, c2: Country) => (c1.area > c2.area ? -1 : 1),
}

export { sortingFns }

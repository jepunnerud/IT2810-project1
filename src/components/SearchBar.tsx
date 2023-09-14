import './SearchBar.css'
import Fuse from 'fuse.js'
import { SearchBarData } from '../types'
import { useSearch } from '../context/SearchContext'

const SearchBar = (props: SearchBarData) => {
  const { search, setSearch } = useSearch()
  const search = () => {
    const searchOptions = {
      keys: ['value'],
      threshold: props.searchThreshold,
    }
    const fuse = new Fuse(props.searchList, searchOptions)
    let fuseResults = fuse.search(
      (document.getElementById('input') as HTMLInputElement).value
    )
    let results = [] as string[]
    fuseResults.map((result: any) => results.push(result.item))
    return results
  }
  return (
    <div className="searchbar-container">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <span className="material-symbols-outlined">search</span>
      <input
        id="input"
        className="searchbar-input"
        placeholder={props.placeholder}
        onInput={search}
      ></input>
    </div>
  )
}

export default SearchBar

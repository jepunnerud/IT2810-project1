import { NavBarItem } from '../types'
import './NavBarStyling.css'

const NavBar = (props: { items: NavBarItem[] }) => {
  return (
    <div className="parent">
      {props.items.map((item: NavBarItem) => (
        <a href={item.path}>
          <div className="nav-bar-item">
            {!item.icon && item.text}
            <img src={item.icon}></img>
          </div>
        </a>
      ))}
    </div>
  )
}

export default NavBar

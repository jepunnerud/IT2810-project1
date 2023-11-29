import { Link } from 'react-router-dom'
import { NavBarItem } from '../types'
import './NavBar.css'

const NavBar = (props: { items: NavBarItem[] }) => {
  return (
    <div className="nav-bar-parent-container" data-testid="navbar-container">
      <Link to="/" key="logo">
        <img className="logo" src="/logo.png" width="150" height="40"></img>
      </Link>
      <div className="nav-bar-parent">
        {props.items.map((item: NavBarItem) => (
          <Link to={item.path} key={item.text}>
            <div className="nav-bar-item">{item.text}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NavBar

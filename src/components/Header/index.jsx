import { Link, NavLink } from 'react-router-dom'
import * as S from './styles'

export default function Header() {
  const activeStyles = {
    color: '#161616',
    fontWeight: 'bold',
    textDecoration: 'underline',
  }

  return (
    <S.Header>
      <S.Nav>
        <S.NavBrand>
          <Link to="/">#VanLife</Link>
        </S.NavBrand>
        <S.NavList>
          <S.NavItem>
            <NavLink
              to="host"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Host
            </NavLink>
          </S.NavItem>
          <S.NavItem>
            <NavLink
              to="about"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              About
            </NavLink>
          </S.NavItem>
          <S.NavItem>
            <NavLink
              to="vans"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Vans
            </NavLink>
          </S.NavItem>
        </S.NavList>
      </S.Nav>
    </S.Header>
  )
}

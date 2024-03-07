import { Link } from 'react-router-dom'
import * as S from './styles'

export default function Header() {
  return (
    <S.Header>
      <S.Nav>
        <S.NavBrand>
          <Link to="/">#VanLife</Link>
        </S.NavBrand>
        <S.NavList>
          <S.NavItem>
            <Link to="/host">Host</Link>
          </S.NavItem>
          <S.NavItem>
            <Link to="/about">About</Link>
          </S.NavItem>
          <S.NavItem>
            <Link to="/vans">Vans</Link>
          </S.NavItem>
        </S.NavList>
      </S.Nav>
    </S.Header>
  )
}

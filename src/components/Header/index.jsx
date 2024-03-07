import * as S from './styles'

export default function Header() {
  return (
    <S.Header>
      <S.Nav>
        <S.NavBrand>#Vanlife</S.NavBrand>
        <S.NavList>
          <S.NavItem>Host</S.NavItem>
          <S.NavItem>About</S.NavItem>
          <S.NavItem>Vans</S.NavItem>
        </S.NavList>
      </S.Nav>
    </S.Header>
  )
}

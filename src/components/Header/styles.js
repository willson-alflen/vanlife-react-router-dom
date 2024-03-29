import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
`

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`

export const NavBrand = styled.span`
  color: #000000;
  font-size: 2rem;
  font-weight: 700;
`

export const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  list-style: none;
`

export const NavItem = styled.li`
  color: #4d4d4d;

  &:hover {
    color: #161616;
    font-weight: bold;
    text-decoration: underline;
  }
`

import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin: 3rem 0 3rem 2rem;
`

export const StyledLink = styled(NavLink)`
  color: #4d4d4d;

  &:hover {
    color: #161616;
    font-weight: bold;
    text-decoration: underline;
  }
`

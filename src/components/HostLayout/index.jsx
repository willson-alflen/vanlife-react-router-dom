import { Outlet } from 'react-router-dom'
import * as S from './styles'

export default function HostLayout() {
  const activeStyles = {
    color: '#161616',
    fontWeight: 'bold',
    textDecoration: 'underline',
  }

  return (
    <>
      <S.Nav>
        <S.StyledLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Dashboard
        </S.StyledLink>
        <S.StyledLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Income
        </S.StyledLink>
        <S.StyledLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Vans
        </S.StyledLink>
        <S.StyledLink
          to="reviews"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Reviews
        </S.StyledLink>
      </S.Nav>

      <Outlet />
    </>
  )
}

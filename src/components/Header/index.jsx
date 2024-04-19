import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import * as S from './styles'
import { FaBarsStaggered } from 'react-icons/fa6'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768)
  const activeStyles = {
    color: '#161616',
    fontWeight: 'bold',
    textDecoration: 'underline',
  }
  const menuRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const updateWindowWidth = () => {
      setIsLargeScreen(window.innerWidth > 768)
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', updateWindowWidth)
    document.addEventListener('mousedown', handleClickOutside)

    updateWindowWidth()

    return () => {
      window.removeEventListener('resize', updateWindowWidth)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isLargeScreen) {
      setIsMenuOpen(false)
    }
  }, [isLargeScreen])

  return (
    <S.Header>
      <S.Nav>
        <S.NavBrand>
          <Link to="/">#VanLife</Link>
        </S.NavBrand>

        <S.MenuWrapper ref={menuRef}>
          <S.HamburgerMenu>
            <FaBarsStaggered onClick={toggleMenu} className="hamburger" />
          </S.HamburgerMenu>

          <S.NavList $isOpen={isMenuOpen}>
            <S.NavItem $isOpen={isMenuOpen} $largeScreen={isLargeScreen}>
              <NavLink
                to="host"
                style={({ isActive }) => (isActive ? activeStyles : null)}
                onClick={closeMenu}
              >
                Host
              </NavLink>
            </S.NavItem>

            <S.NavItem $isOpen={isMenuOpen} $largeScreen={isLargeScreen}>
              <NavLink
                to="about"
                style={({ isActive }) => (isActive ? activeStyles : null)}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </S.NavItem>

            <S.NavItem $isOpen={isMenuOpen} $largeScreen={isLargeScreen}>
              <NavLink
                to="vans"
                style={({ isActive }) => (isActive ? activeStyles : null)}
                onClick={closeMenu}
              >
                Vans
              </NavLink>
            </S.NavItem>

            <S.NavItem $isOpen={isMenuOpen} $largeScreen={isLargeScreen}>
              <NavLink
                to="login"
                style={({ isActive }) => (isActive ? activeStyles : null)}
                onClick={closeMenu}
              >
                Login
              </NavLink>
            </S.NavItem>
          </S.NavList>
        </S.MenuWrapper>
      </S.Nav>
    </S.Header>
  )
}

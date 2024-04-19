import styled, { css } from 'styled-components'

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

  @media (max-width: 548px) {
    font-size: 1.5rem;
  }
`

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const HamburgerMenu = styled.div`
  cursor: pointer;

  .hamburger {
    display: none;
    visibility: hidden;
  }

  @media (max-width: 768px) {
    .hamburger {
      display: block;
      visibility: visible;
      font-size: 1.5rem;
    }
  }

  @media (max-width: 548px) {
    .hamburger {
      font-size: 1.25rem;
    }
  }
`

export const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  list-style: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    flex-direction: column;
    gap: 0;
    position: absolute;
    top: 2rem;
    right: 0;
    background-color: ${(props) => (props.$isOpen ? '#FFCC8D' : '')};
    width: 150px;
    border-radius: 4px;
    padding: 0.5rem;
  }
`

export const NavItem = styled.li`
  color: #4d4d4d;
  width: ${(props) => (props.$isOpen ? '100%' : 'auto')};
  padding: ${(props) =>
    props.$isOpen && !props.$largeScreen ? '0.5rem' : '0'};
  text-align: ${(props) => (props.$isOpen ? 'end' : '')};

  &:hover {
    color: #161616;
    font-weight: bold;
    text-decoration: underline;
  }

  ${(props) =>
    props.$isOpen &&
    css`
      &:hover {
        background-color: white;
        border-radius: 4px;
      }
    `}
`

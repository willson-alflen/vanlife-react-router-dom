import styled from 'styled-components'
import { Link } from 'react-router-dom'
import HomeHeroBg from '../../assets/images/home-hero.png'

export const Container = styled.div`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, 0.46)),
    url(${HomeHeroBg});
  background-position: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: #fff;
  margin: 25px 0 100px;

  @media (max-width: 548px) {
    padding: 2rem;
  }
`

export const Title = styled.h1`
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 42px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  @media (max-width: 548px) {
    font-size: 2rem;
    text-align: center;
  }
`

export const SubTitle = styled.p`
  line-height: 24px;
  margin-bottom: 2rem;

  @media (max-width: 548px) {
    text-align: center;
  }
`

export const StyledLink = styled(Link)`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  background-color: #ff8c38;
  border: none;
  width: 50%;
  margin-top: 27px;
  padding-block: 0.75rem;
  color: white;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translate(1px, 1px);
  }
`

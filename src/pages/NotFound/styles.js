import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NotFoundBg from '../../assets/images/not-found-bg.jpg'

export const Section = styled.section`
  height: 650px;
  background-image: url(${NotFoundBg});
  background-size: cover;
  background-position: center;
  margin-bottom: 3rem;
`

export const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 50%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Title = styled.h1`
  font-size: 5rem;
  font-weight: 700;
`

export const Subtitle = styled.h2`
  margin-bottom: 2rem;
`

export const StyledLink = styled(Link)`
  padding: 1rem 2rem;
  background-color: #f8c300;
  border-radius: 4px;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translate(1px, 1px);
  }
`

import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const AboutWrapper = styled.div`
  color: #161616;
`

export const Image = styled.img`
  max-width: 100%;
`

export const Content = styled.div`
  padding: 3rem 2rem;
`

export const Title = styled.h1`
  line-height: 38px;
  margin-bottom: 2rem;
`

export const Paragraph = styled.p`
  line-height: 22px;
  margin-bottom: 1rem;
`

export const Cta = styled.div`
  background-color: #ffcc8d;
  padding: 3rem 2rem;
  border-radius: 4px;
  margin-inline: 2rem;
  margin-bottom: 3rem;
`

export const CtaTitle = styled.h2`
  margin-bottom: 2rem;
`

export const LinkButton = styled(Link)`
  background-color: #161616;
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
`

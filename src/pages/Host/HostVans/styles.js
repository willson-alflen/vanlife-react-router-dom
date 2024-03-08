import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HostVansSection = styled.section`
  padding-inline: 2rem;
`

export const HostVansTitle = styled.h1`
  padding-inline: 26px;
`

export const HostVansList = styled.ul`
  margin-block: 2rem;
`

export const VanItem = styled.li`
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 15px;
  padding-block: 18px;
  padding-left: 24px;
  border-radius: 6px;
`

export const VanImage = styled.img`
  height: 100px;
  border-radius: 6px;
  margin-right: 16px;
`

export const VanInfo = styled.div``

export const VanName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-block: 10px;
`

export const VanPrice = styled.p`
  margin-block: 10px;
`

export const StyledLink = styled(Link)`
  color: unset;
  text-decoration: unset;
`

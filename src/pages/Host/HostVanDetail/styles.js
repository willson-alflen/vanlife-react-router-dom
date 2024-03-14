import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Section = styled.section`
  padding: 0 2rem;
  min-height: 30vh;
`

export const StyledLink = styled(Link)`
  margin-left: 2rem;

  img {
    margin-right: 0.5rem;
  }
  &:hover {
    color: #161616;
    font-weight: bold;
    text-decoration: underline;
  }
`

export const HostVanDetailWrapper = styled.div`
  padding: 2rem;
  margin: 2rem 0 6rem;
  background-color: #fff;
`

export const HostVanDetailHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`

export const Image = styled.img`
  border-radius: 6px;
  margin-right: 1rem;
  width: 300px;
`

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const VanType = styled.span`
  display: block;
  width: fit-content;
  height: 34px;
  padding: 6px 26px;
  font-style: normal;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  background-color: #ffead0;
  color: #4d4d4d;
  transition: 200ms all cubic-bezier(0.4, 0, 0.2, 1);

  &.van-type.simple:hover,
  &.van-type.simple.selected {
    background-color: #e17654;
    color: #ffead0;
  }

  &.van-type.rugged:hover,
  &.van-type.rugged.selected {
    background-color: #115e59;
    color: #ffead0;
  }

  &.van-type.luxury:hover,
  &.van-type.luxury.selected {
    background-color: #161616;
    color: #ffead0;
  }
`

export const VanName = styled.h2`
  font-size: 2rem;
`

export const VanPrice = styled.p`
  span {
    font-weight: 700;
    font-size: 1.5rem;
  }
`

export const HostVanDetailNav = styled.nav`
  display: flex;
  column-gap: 1.5rem;
  margin-bottom: 2rem;
`

export const ErrorMessage = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 15vh;
  margin-bottom: 3rem;
`

export const BackToHomeLink = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #f8c300;
  border-radius: 4px;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translate(1px, 1px);
  }
`

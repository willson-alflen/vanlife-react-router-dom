import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const VansWrapper = styled.div`
  padding: 0 2rem;
  min-height: 30vh;
`

export const VansList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  justify-content: center;
  margin: 3rem 0 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

export const StyledLink = styled(Link)`
  color: #161616;
  text-decoration: none;
`

export const VanCard = styled.div`
  margin-bottom: 1.5rem;
`

export const VanImg = styled.img`
  max-width: 100%;
  max-height: 460px;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    max-height: 100%;
  }
`

export const VanInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`

export const VanName = styled.h2`
  font-weight: bold;
`

export const VanPrice = styled.p`
  font-weight: bold;
  font-size: 1.5rem;

  span {
    display: block;
    font-weight: normal;
    font-size: 1rem;
    text-align: right;
  }
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

  &:focus {
    outline: none;
  }

  &.van-type.selected {
    color: #ffead0;
  }

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

export const VansFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`

export const FilterButton = styled.button`
  height: 34px;
  padding: 6px 26px;
  font-style: normal;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  background-color: #ffead0;
  color: #4d4d4d;
  transition: 200ms all cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &.selected {
    color: #ffead0;
  }

  &.simple:hover,
  &.simple.selected {
    background-color: #e17654;
    color: #ffead0;
  }

  &.rugged:hover,
  &.rugged.selected {
    background-color: #115e59;
    color: #ffead0;
  }

  &.luxury:hover,
  &.luxury.selected {
    background-color: #161616;
    color: #ffead0;
  }
`

export const ClearFilterButton = styled.button`
  height: 34px;
  padding: 6px 26px;
  font-style: normal;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  background-color: #ffead0;
  color: #4d4d4d;
  cursor: pointer;

  &:hover {
    background-color: #fff;
  }
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

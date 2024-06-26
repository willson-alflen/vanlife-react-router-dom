import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const VanDetailWrapper = styled.div`
  padding: 0 2rem;
  margin: 2rem 0 6rem;
  min-height: 30vh;

  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
`

export const StyledMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #161616;
    font-weight: bold;
    text-decoration: underline;
  }
`

export const VanDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: #161616;
  gap: 5rem;
`

export const VanlImg = styled.img`
  border-radius: 6px;
  margin: 3rem 0;
`

export const VanInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const VanType = styled.span`
  align-self: flex-start;

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
  font-size: 1.25rem;
  margin: 1rem 0;

  span {
    font-weight: 700;
    font-size: 1.5rem;
  }
`

export const VanDescription = styled.p`
  color: #161616;
`

export const StyledLink = styled(Link)`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  background-color: #ff8c38;
  border: none;
  margin-top: 27px;
  padding-block: 1.5rem;
  color: white;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: translate(1px, 1px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

export const ErrorMessage = styled.p`
  color: #ff0000;
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

export const VanReviews = styled.div`
  min-height: 30vh;
`

export const ReviewList = styled.ul`
  margin-block: 2rem;
`

export const ReviewItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  list-style-type: none;
  background-color: white;
  margin-bottom: 15px;
  padding-block: 2rem;
  padding-left: 1.5rem;
  border-radius: 6px;
`

export const ReviewAuthor = styled.div`
  .avatar {
    font-size: 3rem;
  }
`

export const ReviewContent = styled.div``

export const ReviewRating = styled.p`
  margin-bottom: 0.5rem;

  .star-icon {
    color: #ffd700;
    font-size: 1.25rem;
    margin-right: 0.5rem;
  }

  span {
    font-weight: bold;
    font-size: 1.3rem;
  }
`

export const ReviewComment = styled.p``

export const NoReviewsMessage = styled.p`
  margin-top: 2rem;
`

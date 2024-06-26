import styled from 'styled-components'

export const ReviewsSection = styled.section`
  padding-inline: 2rem;
  margin-bottom: 5rem;
`

export const NoReviewsMessage = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const NoReviewsText = styled.p`
  color: #ff8c38;
  font-size: 2.5rem;
  font-weight: bold;

  span {
    display: block;
    color: #161616;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  @media (max-width: 648px) {
    font-size: 2rem;
  }

  @media (max-width: 548px) {
    font-size: 1.5rem;

    span {
      font-size: 0.9rem;
    }
  }
`

export const ReviewsSectionTitle = styled.h2`
  color: #161616;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 2rem;

  @media (max-width: 648px) {
    font-size: 2rem;
  }
`

export const ReviewList = styled.ul`
  margin-block: 2rem;
`

export const ReviewItem = styled.li`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style-type: none;
  background-color: white;
  margin-bottom: 15px;
  padding-block: 2rem;
  padding-inline: 1.5rem;
  border-radius: 6px;

  @media (max-width: 648px) {
    flex-direction: column;
  }
`

export const ReviewAuthor = styled.div`
  .avatar {
    font-size: 3rem;
  }
`

export const ReviewContent = styled.div`
  flex: 1;
`

export const ReviewVan = styled.div`
  img {
    width: 5rem;
    border-radius: 6px;
  }

  @media (max-width: 648px) {
    img {
      width: 100%;
    }
  }
`

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

export const ReviewComment = styled.p`
  @media (max-width: 648px) {
    text-align: center;
  }
`

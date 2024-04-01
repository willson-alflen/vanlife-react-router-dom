import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../../UserContext'
import { getHostVanReviews } from '../../../../api'
import VanLoadingSpinner from '../../../../components/VanLoadingSpinner'
import { FaRegCircleUser, FaRegStar } from 'react-icons/fa6'
import * as S from './styles'

export default function Reviews() {
  const { user } = useContext(UserContext)
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getHostVanReviews(user.uid)
        setReviews(data)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [user.uid])

  if (isLoading) {
    return <VanLoadingSpinner />
  }

  return (
    <S.ReviewsSection>
      {reviews.length === 0 ? (
        <S.NoReviewsMessage>
          <S.NoReviewsText>
            <span>You&apos;ve got no reviews yet.</span>
            Share your van with the world <br />
            and get some feedback!
          </S.NoReviewsText>
        </S.NoReviewsMessage>
      ) : (
        <S.ReviewList>
          {reviews.map((review) => (
            <S.ReviewItem key={review.reviewId}>
              <S.ReviewAuthor>
                {review.avatar === 'anonymous' ? (
                  <FaRegCircleUser className="avatar" />
                ) : (
                  <img
                    src={review.avatar}
                    alt={`${review.author}'s avatar`}
                    className="avatar"
                  />
                )}
              </S.ReviewAuthor>
              <S.ReviewContent>
                <S.ReviewRating>
                  <FaRegStar className="star-icon" />
                  <span>{review.rating}</span>/10
                </S.ReviewRating>
                <S.ReviewComment>
                  {review.comment !== ''
                    ? review.comment
                    : `The user didn't leave a comment.`}
                </S.ReviewComment>
              </S.ReviewContent>
            </S.ReviewItem>
          ))}
        </S.ReviewList>
      )}
    </S.ReviewsSection>
  )
}

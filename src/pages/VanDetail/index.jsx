import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { fetchVanById } from '../../api'
import VanRating from '../../components/VanRating'
import VanLoadingSpinner from '../../components/VanLoadingSpinner'
import * as S from './styles'
import { FaArrowLeftLong, FaRegCircleUser, FaRegStar } from 'react-icons/fa6'

export default function VanDetail() {
  const { id } = useParams()
  const location = useLocation()
  const [van, setVan] = useState(null)
  const search = location.state ? `?${location.state.search}` : ''
  const type = location.state?.type || 'all'
  const [isLoading, setIsLoading] = useState(false)
  const [fetchingError, setFetchingError] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    // Simulate a slow network
    setTimeout(async () => {
      try {
        const data = await fetchVanById(id)
        setVan(data)
      } catch (error) {
        setFetchingError(error)
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }, [id])

  if (isLoading) {
    return <VanLoadingSpinner />
  }

  if (fetchingError) {
    return (
      <S.VanDetailWrapper>
        <S.ErrorMessage aria-live="assertive">
          {fetchingError.message}
        </S.ErrorMessage>
        <S.BackToHomeLink
          to={`..${search}`}
          relative="path"
          aria-label={`Back to ${type} vans`}
        >
          Back to {type} vans
        </S.BackToHomeLink>
      </S.VanDetailWrapper>
    )
  }

  return (
    <section>
      <S.VanDetailWrapper>
        <S.StyledMenuLink
          to={`..${search}`}
          relative="path"
          aria-label={`Back to ${type} vans`}
        >
          <FaArrowLeftLong />
          Back to {type} vans
        </S.StyledMenuLink>
        {van !== null && (
          <S.VanDetail>
            <S.VanInfo>
              <S.VanlImg src={van.imageUrl} alt={van.name} />
              <S.VanType className={`van-type ${van.type}`}>
                {van.type}
              </S.VanType>
              <S.VanName>{van.name}</S.VanName>
              <VanRating vanId={id} imageUrl={van.imageUrl} />
              <S.VanPrice>
                <span>${van.price}</span>/day
              </S.VanPrice>
              <S.VanDescription>{van.description}</S.VanDescription>
              <S.StyledLink to="/rent" aria-label="Go to rental page">
                Rent this van
              </S.StyledLink>
            </S.VanInfo>
            <S.VanReviews>
              <h2>Reviews</h2>
              <S.ReviewList>
                {van.reviews.length === 0 ? (
                  <S.NoReviewsMessage>
                    Be the first to review this van!{' '}
                    <span role="img" aria-label="smiling face">
                      😊
                    </span>
                  </S.NoReviewsMessage>
                ) : (
                  van.reviews.map((review) => (
                    <S.ReviewItem key={review.id}>
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
                  ))
                )}
              </S.ReviewList>
            </S.VanReviews>
          </S.VanDetail>
        )}
      </S.VanDetailWrapper>
    </section>
  )
}

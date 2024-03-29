import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../UserContext'
import { fetchHostVans } from '../../../api'
import VanLoadingSpinner from '../../../components/VanLoadingSpinner'
import * as S from './styles'

export default function HostVans() {
  const { user } = useContext(UserContext)
  const [hostVans, setHostVans] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchingError, setFetchingError] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    // Simulate a slow network
    setTimeout(async () => {
      try {
        const data = await fetchHostVans(user.uid)
        setHostVans(data)
      } catch (error) {
        setFetchingError(error)
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }, [user])

  const hostVansElements = hostVans.map((van) => (
    <S.StyledLink
      key={van.id}
      to={van.id}
      aria-label={`Go to ${van.name} van detail`}
    >
      <S.VanItem>
        <S.VanImage src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <S.VanInfo>
          <S.VanName>{van.name}</S.VanName>
          <S.VanPrice>${van.price}/day</S.VanPrice>
        </S.VanInfo>
      </S.VanItem>
    </S.StyledLink>
  ))

  if (isLoading) {
    return <VanLoadingSpinner />
  }

  if (fetchingError) {
    return (
      <S.HostVansSection>
        <S.ErrorMessage aria-live="assertive">
          {fetchingError.message}
        </S.ErrorMessage>
        <S.BackToHomeLink
          to=".."
          relative="path"
          aria-label="Return to your dashboard"
        >
          Go back to your dashboard
        </S.BackToHomeLink>
      </S.HostVansSection>
    )
  }

  return (
    <S.HostVansSection>
      {hostVansElements.length !== 0 && (
        <S.HostVansTitle>Your listed vans</S.HostVansTitle>
      )}

      <S.HostVansList>
        {hostVansElements.length ? (
          hostVansElements
        ) : (
          <S.NoVansMessage>
            <S.NoVansText>You haven&apos;t listed any vans yet.</S.NoVansText>
            <S.StyledLink to="/host/add-van" className="list-a-van">
              List a van now
            </S.StyledLink>
          </S.NoVansMessage>
        )}
      </S.HostVansList>
    </S.HostVansSection>
  )
}

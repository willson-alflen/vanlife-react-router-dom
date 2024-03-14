import { useEffect, useState } from 'react'
import { fetchHostVans } from '../../../api'
import * as S from './styles'

export default function HostVans() {
  const [hostVans, setHostVans] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchingError, setFetchingError] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    // Simulate a slow network
    setTimeout(async () => {
      try {
        const data = await fetchHostVans()
        setHostVans(data)
      } catch (error) {
        setFetchingError(error)
      } finally {
        setIsLoading(false)
      }
    }, 1000)
  }, [])

  const hostVansElements = hostVans.map((van) => (
    <S.StyledLink key={van.id} to={van.id}>
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
    return (
      <S.HostVansSection>
        <h1>Loading your vans...</h1>
      </S.HostVansSection>
    )
  }

  if (fetchingError) {
    return (
      <S.HostVansSection>
        <S.ErrorMessage>{fetchingError.message}</S.ErrorMessage>
        <S.BackToHomeLink to=".." relative="path">
          Go back to your dashboard
        </S.BackToHomeLink>
      </S.HostVansSection>
    )
  }

  return (
    <S.HostVansSection>
      <S.HostVansTitle>Your listed vans</S.HostVansTitle>

      <S.HostVansList>
        {hostVansElements.length ? (
          hostVansElements
        ) : (
          <p>You haven&apos;t listed any vans yet.</p>
        )}
      </S.HostVansList>
    </S.HostVansSection>
  )
}

import { useEffect, useState } from 'react'
import * as S from './styles'

export default function HostVans() {
  const [hostVans, setHostVans] = useState([])

  useEffect(() => {
    const fetchHostVans = async () => {
      const response = await fetch('http://localhost:8000/vans')
      const data = await response.json()

      const filteredVans = data.filter((van) => van.hostId === 123)

      setHostVans(filteredVans)
    }
    fetchHostVans()
  }, [])

  const hostVansElements = hostVans.map((van) => (
    <S.StyledLink key={van.id} to={`vans/${van.id}`}>
      <S.VanItem>
        <S.VanImage src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <S.VanInfo>
          <S.VanName>{van.name}</S.VanName>
          <S.VanPrice>${van.price}/day</S.VanPrice>
        </S.VanInfo>
      </S.VanItem>
    </S.StyledLink>
  ))

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

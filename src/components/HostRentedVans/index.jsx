import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { fetchHostRentedVans, fetchHostSingleVan } from '../../api'
import * as S from './styles'

export default function HostRentedVans() {
  const { user } = useContext(UserContext)
  const [rentedVans, setRentedVans] = useState([])

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const ids = await fetchHostRentedVans(user.uid)
        const vans = await Promise.all(ids.map(fetchHostSingleVan))
        setRentedVans(vans)
      } catch (error) {
        console.error(error)
      }
    }

    fetchVans()
  }, [user])

  const hostRentedVansEls = rentedVans.map((van) => (
    <S.VanItem key={van.id}>
      <S.VanImage src={van.imageUrl} alt={van.name} />
      <S.VanInfo>
        <S.VanName>{van.name}</S.VanName>
        <S.VanPrice>${van.price}/day</S.VanPrice>
      </S.VanInfo>
    </S.VanItem>
  ))

  return (
    <S.HostRentedVansWrapper>
      <S.HostRentedVansTitle>Your rented vans</S.HostRentedVansTitle>
      <S.HostRentedVansList>
        {hostRentedVansEls.length ? (
          hostRentedVansEls
        ) : (
          <S.NoRentedVansMessage>
            None of your vans were rented.
          </S.NoRentedVansMessage>
        )}
      </S.HostRentedVansList>
    </S.HostRentedVansWrapper>
  )
}

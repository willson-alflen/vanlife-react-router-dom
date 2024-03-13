import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as S from './styles'

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get('type')
  const [vans, setVans] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/vans')
      .then((res) => res.json())
      .then((data) => setVans(data))
  }, [])

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans

  const vanElements = displayedVans.map((van) => (
    <S.VanCard key={van.id}>
      <S.StyledLink
        to={van.id}
        state={{ search: searchParams.toString(), type: typeFilter }}
      >
        <S.VanImg src={van.imageUrl} />
        <S.VanInfo>
          <S.VanName>{van.name}</S.VanName>
          <S.VanPrice>
            ${van.price}
            <span>/day</span>
          </S.VanPrice>
        </S.VanInfo>
        <S.VanType className={`van-type ${van.type}`}>{van.type}</S.VanType>
      </S.StyledLink>
    </S.VanCard>
  ))

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  return (
    <S.VansWrapper>
      <h1>Explore our van options</h1>
      <S.VansFilter>
        <S.FilterButton
          onClick={() => handleFilterChange('type', 'simple')}
          className={`simple ${typeFilter === 'simple' ? 'selected' : ''}`}
        >
          Simple
        </S.FilterButton>
        <S.FilterButton
          onClick={() => handleFilterChange('type', 'luxury')}
          className={`luxury ${typeFilter === 'luxury' ? 'selected' : ''}`}
        >
          Luxury
        </S.FilterButton>
        <S.FilterButton
          onClick={() => handleFilterChange('type', 'rugged')}
          className={`rugged ${typeFilter === 'rugged' ? 'selected' : ''}`}
        >
          Rugged
        </S.FilterButton>
        {typeFilter ? (
          <S.ClearFilterButton onClick={() => handleFilterChange('type', null)}>
            Clear Filter
          </S.ClearFilterButton>
        ) : null}
      </S.VansFilter>
      <S.VansList>{vanElements}</S.VansList>
    </S.VansWrapper>
  )
}

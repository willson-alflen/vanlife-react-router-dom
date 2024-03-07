import { useEffect, useState } from 'react'
import * as S from './styles'

export default function Vans() {
  const [vans, setVans] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/vans')
      .then((res) => res.json())
      .then((data) => setVans(data))
  }, [])

  const vanElements = vans.map((van) => (
    <S.VanCard key={van.id}>
      <S.StyledLink to={`/vans/${van.id}`}>
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

  return (
    <div>
      <h1>Explore our van options</h1>
      <S.VansList>{vanElements}</S.VansList>
    </div>
  )
}

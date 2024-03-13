import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import * as S from './styles'
import ArrowLeft from '../../assets/images/arrow-left.png'

export default function VanDetail() {
  const { id } = useParams()
  const location = useLocation()
  const [van, setVan] = useState(null)
  const search = location.state ? `?${location.state.search}` : ''
  const type = location.state?.type || 'all'

  useEffect(() => {
    fetch(`http://localhost:8000/vans`)
      .then((res) => res.json())
      .then((data) => {
        const foundVan = data.find((van) => van.id === id)
        setVan(foundVan)
      })
  }, [id])

  return (
    <section>
      <S.VanDetailWrapper>
        <S.StyledMenuLink to={`..${search}`} relative="path">
          <img src={ArrowLeft} alt="Back to all vans" />
          Back to {type} vans
        </S.StyledMenuLink>
        {van ? (
          <S.VanDetail>
            <S.VanInfo>
              <S.VanlImg src={van.imageUrl} />
              <S.VanType className={`van-type ${van.type}`}>
                {van.type}
              </S.VanType>
              <S.VanName>{van.name}</S.VanName>
              <S.VanPrice>
                <span>${van.price}</span>/day
              </S.VanPrice>
              <S.VanDescription>{van.description}</S.VanDescription>
              <S.StyledLink to="/rent">Rent this van</S.StyledLink>
            </S.VanInfo>
          </S.VanDetail>
        ) : (
          <h2>Loading...</h2>
        )}
      </S.VanDetailWrapper>
    </section>
  )
}

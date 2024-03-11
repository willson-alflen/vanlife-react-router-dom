import { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import * as S from './styles'
import ArrowLeft from '../../../assets/images/arrow-left.png'

export default function HostVanDetail() {
  const { id } = useParams()
  const [currentVan, setCurrentVan] = useState(null)

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  useEffect(() => {
    fetch(`http://localhost:8000/vans`)
      .then((res) => res.json())
      .then((data) => {
        const foundVan = data.find((van) => van.id === id)
        setCurrentVan(foundVan)
      })
  }, [id])

  return (
    <S.Section>
      <S.StyledLink to=".." relative="path">
        <img src={ArrowLeft} alt="Back to all vans" />
        Back to all vans
      </S.StyledLink>

      {currentVan ? (
        <S.HostVanDetailWrapper>
          <S.HostVanDetailHeader>
            <S.Image src={currentVan.imageUrl} />

            <S.InfoText>
              <S.VanType className={`van-type ${currentVan.type}`}>
                {currentVan.type}
              </S.VanType>
              <S.VanName>{currentVan.name}</S.VanName>
              <S.VanPrice>
                <span>${currentVan.price}</span>/day
              </S.VanPrice>
            </S.InfoText>
          </S.HostVanDetailHeader>

          <S.HostVanDetailNav>
            <NavLink
              to="."
              end
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Pricing
            </NavLink>
            <NavLink
              to="photos"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Photos
            </NavLink>
          </S.HostVanDetailNav>

          <Outlet context={{ currentVan }} />
        </S.HostVanDetailWrapper>
      ) : (
        <h2>Loading...</h2>
      )}
    </S.Section>
  )
}

import { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { fetchHostSingleVan } from '../../../api'
import VanLoadingSpinner from '../../../components/VanLoadingSpinner'
import * as S from './styles'
import ArrowLeft from '../../../assets/images/arrow-left.png'

export default function HostVanDetail() {
  const { id } = useParams()
  const [currentVan, setCurrentVan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fetchingError, setFetchingError] = useState(null)

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  useEffect(() => {
    setIsLoading(true)

    // Simulate a slow network
    setTimeout(async () => {
      try {
        const data = await fetchHostSingleVan(id)
        setCurrentVan(data)
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
      <S.Section>
        <S.ErrorMessage aria-live="assertive">
          {fetchingError.message}
        </S.ErrorMessage>
        <S.BackToHomeLink
          to=".."
          relative="path"
          aria-label="Go back to your vans"
        >
          Go back to your vans
        </S.BackToHomeLink>
      </S.Section>
    )
  }

  return (
    <S.Section>
      <S.StyledLink to=".." relative="path" aria-label="Go back to all vans">
        <img src={ArrowLeft} alt="" />
        Back to all vans
      </S.StyledLink>

      {currentVan !== null && (
        <S.HostVanDetailWrapper>
          <S.HostVanDetailHeader>
            <S.Image src={currentVan.imageUrl} alt={currentVan.name} />

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
              aria-label="Go to details section of the van detail page"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              aria-label="Go to pricing section of the van detail page"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Pricing
            </NavLink>
            <NavLink
              to="photos"
              aria-label="Go to photos section of the van detail page"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Photos
            </NavLink>
          </S.HostVanDetailNav>

          <Outlet context={{ currentVan }} />
        </S.HostVanDetailWrapper>
      )}
    </S.Section>
  )
}

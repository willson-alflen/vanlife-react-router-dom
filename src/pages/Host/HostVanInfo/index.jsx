import * as S from './styles'
import { useOutletContext } from 'react-router-dom'

export default function HostVanInfo() {
  const { currentVan } = useOutletContext()

  return (
    <S.HostVanInfoSection>
      <S.HostVanInfoTitle>
        Name: <span>{currentVan.name}</span>
      </S.HostVanInfoTitle>
      <S.HostVanInfoTitle>
        Category: <span>{currentVan.type}</span>
      </S.HostVanInfoTitle>
      <S.HostVanInfoTitle>
        Description: <span>{currentVan.description}</span>
      </S.HostVanInfoTitle>
      <S.HostVanInfoTitle>
        Visibility: <span>Public</span>
      </S.HostVanInfoTitle>
    </S.HostVanInfoSection>
  )
}

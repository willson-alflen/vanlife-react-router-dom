import { useOutletContext } from 'react-router-dom'
import * as S from './styles'

export default function HostVanPricing() {
  const { currentVan } = useOutletContext()

  return (
    <S.HostVanPrice>
      ${currentVan.price}
      <span>/day</span>
    </S.HostVanPrice>
  )
}

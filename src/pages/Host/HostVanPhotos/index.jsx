import { useOutletContext } from 'react-router-dom'
import * as S from './styles'

export default function HostVanPhotos() {
  const { currentVan } = useOutletContext()

  return <S.Image src={currentVan.imageUrl} />
}

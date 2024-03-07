import * as S from './styles'

export default function Home() {
  return (
    <S.Container>
      <S.Title>You got the travel plans, we got the travel vans.</S.Title>
      <S.SubTitle>
        Add adventure to your life by joining the #vanlife movement. Rent the
        perfect van to make your perfect road trip.
      </S.SubTitle>
      <S.StyledLink to="vans">Find your van</S.StyledLink>
    </S.Container>
  )
}

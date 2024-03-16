import * as S from './styles'

export default function NotFound() {
  return (
    <S.Section>
      <S.Wrapper>
        <S.Title>404</S.Title>
        <S.Subtitle>Page not found</S.Subtitle>
        <S.StyledLink to="/" aria-label="Return to homepage">
          Go back to home
        </S.StyledLink>
      </S.Wrapper>
    </S.Section>
  )
}

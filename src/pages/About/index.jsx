import * as S from './styles'
import AboutHeroImg from '../../assets/images/about-hero.png'

export default function About() {
  return (
    <S.AboutWrapper>
      <S.Image src={AboutHeroImg} />

      <S.Content>
        <S.Title>
          Don’t squeeze in a sedan when you could relax in a van.
        </S.Title>
        <S.Paragraph>
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch. (Hitch costs extra 😉)
        </S.Paragraph>
        <S.Paragraph>
          Our team is full of vanlife enthusiasts who know firsthand the magic
          of touring the world on 4 wheels.
        </S.Paragraph>
      </S.Content>

      <S.Cta>
        <S.CtaTitle>
          Your destination is waiting.
          <br />
          Your van is ready.
        </S.CtaTitle>
        <S.LinkButton to="/vans">Explore our vans</S.LinkButton>
      </S.Cta>
    </S.AboutWrapper>
  )
}

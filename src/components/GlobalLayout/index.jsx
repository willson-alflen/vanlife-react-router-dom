import { Outlet } from 'react-router-dom'
import SiteWrapper from '../SiteWrapper'
import Header from '../Header'
import MainSection from '../MainSection'
import Footer from '../Footer'

export default function GlobalLayout() {
  return (
    <SiteWrapper>
      <Header />
      <MainSection>
        <Outlet />
      </MainSection>
      <Footer />
    </SiteWrapper>
  )
}

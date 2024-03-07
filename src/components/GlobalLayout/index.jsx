import { Outlet } from 'react-router-dom'
import SiteWrapper from '../SiteWrapper'
import Header from '../Header'
import Footer from '../Footer'

export default function GlobalLayout() {
  return (
    <SiteWrapper>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </SiteWrapper>
  )
}

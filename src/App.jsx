import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../GlobalStyles'
import GlobalLayout from './components/GlobalLayout'
import HostLayout from './components/HostLayout'
import AuthRequired from './components/AuthRequired'
import Home from './pages/Home'
import About from './pages/About'
import Vans from './pages/Vans'
import VanDetail from './pages/VanDetail'
import Dashboard from './pages/Host/HostMenu/Dashboard'
import Income from './pages/Host/HostMenu/Income'
import HostVans from './pages/Host/HostVans'
import HostVanDetail from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import Reviews from './pages/Host/HostMenu/Reviews'
import AddVan from './pages/Host/HostMenu/AddVan'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RentVan from './pages/RentVan'
import SuccessfulPurchase from './pages/SuccessfulPurchase'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51P1WxnJ3sUV6r9M5PTBYMro1nugOsnwlwLdzvZBNLd3d0YsAXCSkldPqxXTTuYJJLU2KLoY2EESVFxbUIX2VdLO100dc0hlBQk'
)

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer autoClose={3000} />
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GlobalLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="vans" element={<Vans />} />
              <Route path="vans/:id" element={<VanDetail />} />
              <Route path="vans/:id/rent" element={<RentVan />} />
              <Route
                path="successful-purchase"
                element={<SuccessfulPurchase />}
              />

              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />

              <Route element={<AuthRequired />}>
                <Route path="host" element={<HostLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="income" element={<Income />} />
                  <Route path="vans" element={<HostVans />} />
                  <Route path="vans/:id" element={<HostVanDetail />}>
                    <Route index element={<HostVanInfo />} />
                    <Route path="pricing" element={<HostVanPricing />} />
                    <Route path="photos" element={<HostVanPhotos />} />
                  </Route>
                  <Route path="reviews" element={<Reviews />} />
                  <Route path="add-van" element={<AddVan />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Elements>
    </>
  )
}

export default App

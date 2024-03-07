import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GlobalStyle from '../GlobalStyles'
import GlobalLayout from './components/GlobalLayout'
import Home from './pages/Home'

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GlobalLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Business from './pages/Business'
import Chapter from './pages/Chapter'
import Team from './pages/Team'
import About from './pages/About'
import Entry from './pages/Entry'
import CustomCursor from './components/CustomCursor'

const INTRO_COMPLETE_KEY = 'sbi-network-intro-complete'

function HomeRoute() {
  const hasCompletedIntro = window.sessionStorage.getItem(INTRO_COMPLETE_KEY) === 'true'
  return hasCompletedIntro ? <Landing /> : <Navigate to="/enter" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/enter" element={<Entry />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/business" element={<Business />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

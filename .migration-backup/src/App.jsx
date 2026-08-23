import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Business from './pages/Business'
import Chapter from './pages/Chapter'
import Team from './pages/Team'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/business" element={<Business />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

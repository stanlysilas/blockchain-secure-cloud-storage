import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Upload from "./pages/Upload"
import SharedFiles from "./pages/SharedFiles"

import MainLayout from "./layouts/MainLayout"
import Profile from "./pages/Profile"

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/upload" element={<Upload />} />

          <Route path="/shared" element={<SharedFiles />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
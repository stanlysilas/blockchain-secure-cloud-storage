import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <main className="p-6">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { Landing } from './pages/Landing'
import { Onboarding } from './pages/Onboarding'
import { Swipe } from './pages/Swipe'
import { Matches } from './pages/Matches'
import { Profile } from './pages/Profile'
import { Demo } from './pages/Demo'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #333',
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

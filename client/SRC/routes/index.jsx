import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from '../App'
import Editor from '../pages/Editor'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

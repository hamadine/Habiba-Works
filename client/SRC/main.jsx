import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AppRoutes from './routes'
ReactDOM.createRoot(document.getElementById('root')).render(<AppRoutes />)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

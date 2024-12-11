// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Footer from './components/Footer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <App />
      </div>
      <Footer />
    </div>
  </React.StrictMode>,
)
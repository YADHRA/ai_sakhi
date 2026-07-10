import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Chat from './pages/Chat.jsx'
import Emergency from './pages/Emergency.jsx'
import QuickExit from './components/common/QuickExit.jsx'

export default function App() {
  return (
    <div className="app-shell">
      <QuickExit />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/emergency" element={<Emergency />} />
      </Routes>
    </div>
  )
}
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ModelViewer from "./Model"

import './App.css'

export default function App() {
  return (
      <div className="App font-vcr">
          <nav className="flex text-white uppercase space-x-4 content-center justify-center">
              <li>shop</li>
              <li>about</li>
              <li>contact</li>
          </nav>
          <div className="hero">
              <ModelViewer />
          </div>
          <div className="footer">
              <h1>YOOOOOOOO</h1>
          </div>
      </div>
  )
}
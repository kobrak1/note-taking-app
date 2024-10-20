import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PromisePolyfill from 'promise-polyfill'
import './index.css'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
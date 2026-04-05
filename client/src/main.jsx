import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppProvider'
import './index.css'
import App from './App'



createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>

)

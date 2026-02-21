import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './global.scss'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import ToastMessage from './components/context/components/ToastMessage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastMessage>
        <App />
      </ToastMessage>
    </Provider>
  </BrowserRouter>,
)

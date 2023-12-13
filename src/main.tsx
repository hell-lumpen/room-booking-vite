import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
document.documentElement.setAttribute('data-theme', 'dark')
ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
);
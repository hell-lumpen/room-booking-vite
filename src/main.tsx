import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthenticatedUserProvider} from "@/context/AuthContext/AuthUserProvider.tsx";

document.documentElement.setAttribute('data-theme', 'dark')
ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthenticatedUserProvider>
        <>
            <App/>
        </>
    </AuthenticatedUserProvider>
);
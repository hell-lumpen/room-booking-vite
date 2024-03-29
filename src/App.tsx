import {BrowserRouter as Router, Redirect, Route, RouteProps, Switch} from 'react-router-dom';
import '@/styles/global.css';
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import React, {ReactNode, useEffect} from "react";
import './App.css';
// import BrandHeader from "@/components/BrandHeader.tsx";
import Header from "@/components/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {SchedulePage} from './pages/ShedulePage';
import {useAuthenticatedUserState} from "@/context/AuthContext/AuthUserContext.ts";
import {jwtDecode} from "jwt-decode";
import {AuthenticatedUser} from "@/models/userTypes.ts";
import {CalendarCheck, CalendarClock, Home, ShieldEllipsis, Warehouse} from 'lucide-react';


interface JwtCustomPayload {
    exp: number;
    fullName: string;
    iat: number;
    role: string;
    sub: string;
}

const LC_TOKEN_KEY = 'SC_AUTH_TOKEN'

function saveToken(jwt: string) {
    localStorage.setItem(LC_TOKEN_KEY, jwt)
}

export function getToken(): string | null {
    return localStorage.getItem(LC_TOKEN_KEY);
}

export function deleteToken() {
    return localStorage.removeItem(LC_TOKEN_KEY);
}

export function restoreAuthUserFromJWT(): AuthenticatedUser;
export function restoreAuthUserFromJWT(jwt: string): AuthenticatedUser;

export function restoreAuthUserFromJWT(jwt?: string): AuthenticatedUser | undefined {

    function decode(jwt: string): JwtCustomPayload {
        return jwtDecode<JwtCustomPayload>(jwt);
    }

    let decodedToken: JwtCustomPayload | null = null;

    if (jwt === undefined) {
        const jwt = getToken()
        if (!jwt) {
            console.error('token not found in LC');
            return undefined;
        }
        decodedToken = decode(jwt);
    } else {
        decodedToken = decode(jwt);
    }

    return {fullName: decodedToken.fullName, role: decodedToken.role}
}

export const SidebarNavUnits = [
    {text: 'Главная', icon: <Home size={'1.4rem'}/>, path: '/main', JSXContent: <HomePage/>},
    {
        text: 'Все бронирования', icon: <CalendarClock size={'1.4rem'}/>, path: '/booking',
        JSXContent: <div className="flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">
                    Страница находится в разработке 😅🛠️
                </h2>
                <p className="text-gray-500">
                    Мы работаем над улучшениями. Пожалуйста, вернитесь позже.
                </p>
            </div>
        </div>
    },
    {
        text: 'Инвентаризация', icon: <Warehouse size={'1.4rem'}/>, path: '/inventory',
        JSXContent: <div className="flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">
                    Модуль "Инвентаризация" находится в разработке 😅🛠️
                </h2>
                <p className="text-gray-500">
                    Мы работаем над улучшениями. Пожалуйста, вернитесь позже.
                </p>
            </div>
        </div>
    },
    {
        text: 'Администрирование', icon: <ShieldEllipsis size={'1.4rem'}/>, path: '/admin',
        JSXContent: <div className="flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">
                    Страница администратора находится в разработке 😅🛠️
                </h2>
                <p className="text-gray-500">
                    Мы работаем над улучшениями. Пожалуйста, вернитесь позже.
                </p>
            </div>
        </div>
    },
    {
        text: 'Расписание', icon: <CalendarCheck size={'1.4rem'}/>, path: '/schedule',
        JSXContent: <SchedulePage/>
    },
];

interface PrivateRouteProps extends RouteProps {
    jsxContent: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({jsxContent, ...rest}) => {

    const [authenticatedUser, setAuthenticatedUser] = useAuthenticatedUserState();

    useEffect(() => {
        setAuthenticatedUser(restoreAuthUserFromJWT('eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoi0J3QtdC90LDRhdC-0LIg0JXQstCz0LXQvdC40Lkg0JLQsNC70LXQvdGC0LjQvdC-0LLQuNGHIiwic3ViIjoidXNlcm5hbWUiLCJpYXQiOjE3MDQyOTM5NjUsImV4cCI6MTcxMjkzMzk2NX0.cyhtonQk6F8DHiHdjTCjTnD3pQyUnvdJtHJa3TwQa3I'));
    }, [])

    return (
        <Route
            {...rest}
            render={() =>
                authenticatedUser ? (
                    <>
                        <Header/>
                        <div className="app-container">
                            {/* <div className="sidebar-container">
                                <Sidebar navUnits={SidebarNavUnits} />
                            </div> */}

                            <div className="content-container">
                                <div className="h-full px-4 py-6 lg:px-8">
                                    {jsxContent}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Redirect to="/main"/>
                )
            }
        />
    );
};

function App() {
    return (
        <Router>
            <div className="bg-background text-foreground">
                <Toaster/>
                <Switch>
                    {/* Страница логина */}
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    {/* Остальные страницы с Sidebar */}
                    <Route path="/">
                        <Switch>
                            {SidebarNavUnits.map((navUnit, index) => (
                                <PrivateRoute
                                    key={index}
                                    path={navUnit.path}
                                    jsxContent={navUnit.JSXContent}
                                />
                            ))}
                            {/* Дополнительный маршрут для отлавливания несуществующих путей */}
                            <Route path="*">
                                <Redirect to="/main"/>
                            </Route>
                        </Switch>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

import {BrowserRouter as Router, Redirect, Route, RouteProps, Switch} from 'react-router-dom';
import '@/styles/global.css';
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import {FC, ReactNode, useEffect, useState} from "react";
import './App.css';
import Header from "@/components/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {SchedulePage} from './pages/ShedulePage';
import {jwtDecode} from "jwt-decode";
import {AuthenticatedUser} from "@/models/userTypes.ts";
import {CalendarCheck, CalendarClock, Home, ShieldEllipsis, Warehouse} from 'lucide-react';
import TokenService from "@/services/UtilServices.ts";
import {asyncRestoreAuthUserFromJWT} from "@/AsyncRestoreAuthUserFromJWT.tsx";
import {useAuth} from "@/context/AuthContext/AuthUserContext.ts";


interface JwtCustomPayload {
    exp: number;
    fullName: string;
    iat: number;
    role: string;
    sub: string;
}

export function restoreAuthUserFromJWT(): AuthenticatedUser;
export function restoreAuthUserFromJWT(jwt: string): AuthenticatedUser;
export function restoreAuthUserFromJWT(jwt?: string): AuthenticatedUser | undefined {

    function decode(jwt: string): JwtCustomPayload {
        return jwtDecode<JwtCustomPayload>(jwt);
    }

    let decodedToken: JwtCustomPayload | null = null;

    if (jwt === undefined) {
        const jwt = TokenService.getToken()
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

export function asyncRestoreAuthUserFromJWT(jwt?: string): Promise<AuthenticatedUser | undefined> {
    return new Promise((resolve, ) => {
        function decode(jwt: string): JwtCustomPayload {
            return jwtDecode<JwtCustomPayload>(jwt);
        }

        let decodedToken: JwtCustomPayload | null = null;

        if (jwt === undefined) {
            const jwt = TokenService.getToken()
            if (!jwt) {
                console.error('token not found in local storage');
                resolve(undefined);
            } else {
                decodedToken = decode(jwt);
                resolve({fullName: decodedToken.fullName, role: decodedToken.role});
            }
        } else {
            decodedToken = decode(jwt);
            resolve({fullName: decodedToken.fullName, role: decodedToken.role});
        }
    });
}


function MocComponent() {
    return <div className="flex items-center justify-center">
        <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
                Страница находится в разработке 😅🛠️
            </h2>
            <p className="text-gray-500">
                Мы работаем над улучшениями. Пожалуйста, вернитесь позже.
            </p>
        </div>
    </div>;
}

const IconSize = '1.4rem';
export const SidebarNavUnits = [
    {
        text: 'Главная',
        icon: <Home size={IconSize}/>,
        path: '/main',
        JSXContent: <HomePage/>
    },
    {
        text: 'Все бронирования',
        icon: <CalendarClock size={IconSize}/>,
        path: '/booking',
        JSXContent: <MocComponent/>
    },
    {
        text: 'Инвентаризация',
        icon: <Warehouse size={IconSize}/>,
        path: '/inventory',
        JSXContent: <MocComponent/>
    },
    {
        text: 'Администрирование',
        icon: <ShieldEllipsis size={IconSize}/>,
        path: '/admin',
        JSXContent: <MocComponent/>
    },
    {
        text: 'Расписание',
        icon: <CalendarCheck size={IconSize}/>,
        path: '/schedule',
        JSXContent: <SchedulePage/>
    },
];

const LoadingScreen = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <div
                style={{
                    border: '4px solid rgba(0, 0, 0, 0.1)',
                    borderTop: '4px solid #333',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    animation: 'spin 1s linear infinite',
                }}
            ></div>
            <p
                style={{
                    marginTop: '20px',
                    fontSize: '18px',
                    color: '#333',
                }}
            >
                Идет загрузка...
            </p>
        </div>
    );
};

interface PrivateRouteProps extends RouteProps {
    jsxContent: ReactNode;
    authState?: AuthenticatedUser
}

const PrivateRoute: FC<PrivateRouteProps> = ({jsxContent, authState, ...rest}) => {
    return (
        <Route
            {...rest}
            render={() => {
                return (authState ? (
                    <>
                        <Header/>
                        <div className="app-container">
                            <div className="content-container">
                                <div className="h-full px-4 py-6 lg:px-8">
                                    {jsxContent}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Redirect to="/login"/>
                ))
            }
            }
        />
    );
};

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [authState, setAuthState] = useState<AuthenticatedUser | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const user = await asyncRestoreAuthUserFromJWT(); // Асинхронно восстанавливаем пользователя из JWT
            setAuthState(user);
            setIsLoading(false); // Устанавливаем isLoading в false после завершения восстановления пользователя
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <LoadingScreen/>; // Показываем индикатор загрузки, пока данные пользователя загружаются
    }

    return (
        <Router>
            <div className="bg-background text-foreground">
                <Toaster/>
                <Switch>
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
                                    authState={authState}
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

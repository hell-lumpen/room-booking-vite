import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import '@/styles/global.css';
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import './App.css';
import Header from "@/components/Header.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { SchedulePage } from './pages/ShedulePage';
import { useAuth } from "@/context/AuthContext/AuthUserContext.ts";
import { jwtDecode } from "jwt-decode";
import { AuthenticatedUser } from "@/models/userTypes.ts";
import { CalendarCheck, CalendarClock, Home, ShieldEllipsis, Warehouse } from 'lucide-react';
import TokenService from "@/services/UtilServices.ts";
import API from './http/setupAxios';


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

    return { fullName: decodedToken.fullName, role: decodedToken.role }
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
        icon: <Home size={IconSize} />,
        path: '/main',
        JSXContent: <HomePage />
    },
    {
        text: 'Все бронирования',
        icon: <CalendarClock size={IconSize} />,
        path: '/booking',
        JSXContent: <MocComponent />
    },
    {
        text: 'Инвентаризация',
        icon: <Warehouse size={IconSize} />,
        path: '/inventory',
        JSXContent: <MocComponent />
    },
    {
        text: 'Администрирование',
        icon: <ShieldEllipsis size={IconSize} />,
        path: '/admin',
        JSXContent: <MocComponent />
    },
    {
        text: 'Расписание',
        icon: <CalendarCheck size={IconSize} />,
        path: '/schedule',
        JSXContent: <SchedulePage />
    },
];

interface PrivateRouteProps extends RouteProps {
    jsxContent: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ jsxContent, ...rest }) => {

    const [authenticatedUser, setAuthenticatedUser] = useAuth();

    useEffect(() => {
        const token = TokenService.getToken()
        console.log('tok', token);
        token && setAuthenticatedUser(restoreAuthUserFromJWT(token));
    }, [])

    return (
        <Route
            {...rest}
            render={() => {
                const token = TokenService.getToken()
                console.log('tok0', token);
                console.log('redirect')
                return (authenticatedUser ? (
                    <>
                        <Header />
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
                    <Redirect to="/login" />
                ))
            }
            }
        />
    );
};

export const DataForMoreInfo = createContext<
    {
        allRoom: { id: number, name: string }[],
        allParticipants: { id: number, fullName: string }[]
        allGroup: { id: number, name: string }[]
        allTags: { id: number, fullName: string, shortName: string, color: string }[]
    }
>({ allRoom: [], allParticipants: [], allGroup: [], allTags: [] });

function App() {

    const [allRoom, setAllRoom] = useState<{ id: number, name: string }[]>([]);
    const [allParticipants, setAllParticipants] = useState<{ id: number, fullName: string }[]>([]);
    const [allGroup, setAllGroup] = useState<{ id: number, name: string }[]>([]);
    const [allTags, setAllTags] = useState<{ id: number, fullName: string, shortName: string, color: string }[]>([]);

    //Получение комнат, участников и тегов
    useEffect(() => {
        API.get(`/room/all`)
            .then((data) => {
                setAllRoom(data.data);
            });

        API.get(`/user/all`)
            .then((data) => {
                setAllParticipants(data.data);
            });

        API.get(`/group/all`)
            .then((data) => {
                setAllGroup(data.data);
            });

        API.get(`/tag/get/all`)
            .then((data) => {
                setAllTags(data.data);
            });
    }, []);


    useEffect(() => {
        const token = TokenService.getToken()
        console.log('tok00', token);
    }, [])

    return (
        <Router>
            <div className="bg-background text-foreground">
                <Toaster />
                <Switch>
                    <Route path="/login">
                        <LoginPage />
                    </Route>

                    {/* Остальные страницы с Sidebar */}
                    <Route path="/">
                        <DataForMoreInfo.Provider value={{
                            allRoom: allRoom,
                            allParticipants: allParticipants,
                            allGroup: allGroup,
                            allTags: allTags
                        }}>
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
                                    <Redirect to="/main" />
                                </Route>
                            </Switch>
                        </DataForMoreInfo.Provider>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

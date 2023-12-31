import {BrowserRouter as Router, Redirect, Route, RouteProps, Switch} from 'react-router-dom';
import '@/styles/global.css';
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import {Sidebar} from "@/components/Sidebar/Sidebar.tsx";
import React, {ReactNode} from "react";
import './App.css';
// import BrandHeader from "@/components/BrandHeader.tsx";
import Header from "@/components/Header.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";

const SidebarNavUnits = [
    {text: 'Главная', path: '/main', JSXContent: <HomePage/>},
    {text: 'Все бронирования', path: '/booking',
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
    {text: 'Инвентаризация', path: '/inventory',
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
    {text: 'Администрирование', path: '/admin',
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
    {text: 'Расписание', path: '/schedule',
        JSXContent: <div className="flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-semibold tracking-tight mb-4">
                    Модуль "Расписание" находится в разработке 😅🛠️
                </h2>
                <p className="text-gray-500">
                    Мы работаем над улучшениями. Пожалуйста, вернитесь позже.
                </p>
            </div>
        </div>
    },
];

interface PrivateRouteProps extends RouteProps {
    jsxContent: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({jsxContent, ...rest}) => {
    const user = "useAuth()";

    return (
        <Route
            {...rest}
            render={() =>
                user ? (
                    <>
                        <Header />
                        <div className="app-container">
                            <div className="sidebar-container">
                                <Sidebar navUnits={SidebarNavUnits}/>
                            </div>
                            <div className="content-container">
                                <div className="h-full px-4 py-6 lg:px-8">
                                    {jsxContent}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <Redirect to="/login"/>
                )
            }
        />
    );
};

function App() {
    return (
        <Router>
            <div className="bg-background text-foreground">
                <Toaster />
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

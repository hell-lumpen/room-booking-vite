import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import '@/styles/global.css';
import AdminPage from "@/pages/AdminPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import { Sidebar } from "@/components/Sidebar/Sidebar.tsx";
import React, { ReactNode } from "react";
import './App.css';

const SidebarNavUnits = [
    { text: 'Главная', path: '/main', JSXContent: <HomePage /> },
    { text: 'Бронирование аудиторий', path: '/booking', JSXContent: <div>Бронирование аудиторий</div> },
    { text: 'Инвентаризация', path: '/inventory', JSXContent: <div>Инвентаризация</div> },
    { text: 'Администрирование', path: '/admin', JSXContent: <AdminPage /> },
    { text: 'Расписание', path: '/schedule', JSXContent: <div>Расписание</div> },
];

interface PrivateRouteProps extends RouteProps {
    jsxContent: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ jsxContent, ...rest }) => {
    const user = "useAuth()";

    return (
        <Route
            {...rest}
            render={() =>
                user ? (
                    <div className="app-container">
                        <div className="sidebar-container">
                            <Sidebar navUnits={SidebarNavUnits} />
                        </div>
                        <div className="content-container">
                            <div className="h-full px-4 py-6 lg:px-8">
                                {jsxContent}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

function App() {
    return (
        <Router>
            <div className="bg-background text-foreground">
                <Switch>
                    {/* Страница логина */}
                    <Route path="/login">
                        <LoginPage />
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
                                <Redirect to="/main" />
                            </Route>
                        </Switch>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

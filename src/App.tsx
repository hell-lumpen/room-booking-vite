import {BrowserRouter as Router, Redirect, Route, RouteProps, Switch} from 'react-router-dom';
import '@/styles/global.css';
import AdminPage from "@/pages/AdminPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import {Sidebar} from "@/components/Sidebar/Sidebar.tsx";
import React, {ReactNode} from "react";

const SidebarNavUnits = [
    {text: 'Главная', path: '/main', JSXContent: <HomePage/>},
    {text: 'Бронирование аудиторий', path: '/booking', JSXContent: <div>Бронирование аудиторий</div>},
    {text: 'Инвентаризация', path: '/inventory', JSXContent: <div>Инвентаризация</div>},
    {text: 'Администрирование', path: '/admin', JSXContent: <AdminPage/>},
    {text: 'Расписание', path: '/schedule', JSXContent: <div>Расписание</div>},
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
                    <div className="col-span-5 lg:col-span-3">
                        <div className="h-full px-4 py-6 lg:px-8">
                            {jsxContent}
                        </div>
                    </div>
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
                {/*<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl lg:border-b">*/}
                {/*    Smart Campus*/}
                {/*</h1>*/}
                <Switch>
                    {/* Страница логина */}
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    {/* Остальные страницы с Sidebar */}
                    <Route path="/">
                        <div className="grid lg:grid-cols-6">
                            <div className="col-span-1 lg:col-span-1">
                                <Sidebar navUnits={SidebarNavUnits}/>
                            </div>
                            <div className='col-span-5 lg:col-span-5'>
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
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
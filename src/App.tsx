import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import '@/styles/global.css';
import { Sidebar } from '@/components/Sidebar/Sidebar.tsx';
import Content from "@/pages/Content.tsx";

const SidebarNavUnits = [
    { text: 'Главная', path: '/main', JSXContent: <Content /> },
    { text: 'Бронирование аудиторий', path: '/booking', JSXContent: <div>Бронирование аудиторий</div> },
    { text: 'Инвентаризация', path: '/inventory', JSXContent: <div>Инвентаризация</div> },
    { text: 'Администрирование', path: '/admin', JSXContent: <div>Администрирование</div> },
    { text: 'Расписание', path: '/schedule', JSXContent: <div>Расписание</div> },
];

function App() {
    return (
        <Router>
            <div className="bg-background text-foreground p-8">
                <h1 className="font-extrabold ml-16">Smart Campus</h1>
                <div className="grid lg:grid-cols-6">
                    <Sidebar navUnits={SidebarNavUnits} />
                    <Switch>
                        {SidebarNavUnits.map((navUnit, index) => (
                            <Route key={index} path={navUnit.path}>
                                {navUnit.JSXContent}
                            </Route>
                        ))}
                        {/* Дополнительный маршрут для отлавливания несуществующих путей */}
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
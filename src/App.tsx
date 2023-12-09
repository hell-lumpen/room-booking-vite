import '@/styles/global.css'
import {Sidebar} from "@/components/Sidebar/Sidebar.tsx";

function App() {
    return (
        <div className="bg-background text-foreground p-8">
            <h1>Заголовок первого уровня</h1>
            <h2>Заголовок второго уровня</h2>
            <h3>Заголовок третьего уровня</h3>
            Обычный текст
            <p>Параграф</p>
            <div className="grid lg:grid-cols-6">
                <Sidebar/>
                <div className="col-span-3 lg:col-span-3 lg:border-l">
                    <div className="h-full px-4 py-6 lg:px-8">
                        <p>vwerbiwnevinwiebnins wei iwineivb</p>
                        <div><a>vbneibieribei</a></div>
                        <button>Моя Кнопка</button>
                    </div>
                </div>
                <div className="col-span-2 lg:col-span-2 lg:border-l">
                    <div className="h-full px-4 py-6 lg:px-8">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

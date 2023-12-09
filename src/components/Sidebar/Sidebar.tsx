import {Button} from "@/components/ui/button"

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
// }

// export function Sidebar({className}: SidebarProps) {
export function Sidebar() {
    return (
        <div className="space-y-4 py-4">
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Library
                </h2>
                <div className="space-y-1">
                    <Button variant="default" className="w-full justify-start">
                        Бронирование аудиторий
                    </Button>
                    <Button variant="default" className="w-full justify-start">
                        Инвентаризация
                    </Button>
                    <Button variant="default" className="w-full justify-start">
                        Администрирование
                    </Button>
                    <Button variant="default" className="w-full justify-start">
                        Расписание
                    </Button>
                </div>
            </div>
        </div>
    )
}
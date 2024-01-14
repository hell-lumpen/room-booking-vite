import React, {useEffect} from "react";
import {TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {SettingDate} from "@/components/SettingDate/SettingDate"
import {GanttChartSquare, List} from "lucide-react";
import '@/styles/global.css'


export const SettingDatePanel: React.FC<{ date: Date, setDate: (date: Date) => void }> = (props) => {

    useEffect(() => {

    }, []);

    return (
        <div className='flex flex-row items-center justify-between align-bottom w-[80%] mx-auto'>
            <SettingDate date={props.date} setDate={props.setDate}/>

            <TabsList>
                <TabsTrigger value="card">
                    <List/>
                </TabsTrigger>
                <TabsTrigger value="timeline">
                    <GanttChartSquare/>
                </TabsTrigger>
            </TabsList>
        </div>

    );
}
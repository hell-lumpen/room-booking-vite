import React, {useEffect} from "react";
import {TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {ChevronLeft, ChevronRight, GanttChartSquare, List} from "lucide-react";
import '@/styles/global.css'

export const  SettingDatePanel: React.FC<{ date: Date, setDate: (date: Date) => void }> = (props) => {

    useEffect(() => {

    }, []);

    return (
        <div className='flex flex-row items-center justify-between align-bottom'>
            <div className='flex flex-row items-center h-max '>
                <ChevronLeft size={20} strokeWidth={2.25}
                             onClick={() => {
                                 props.setDate(new Date(props.date.getTime() - 1000 * 60 * 60 * 24))
                             }
                             }/>
                <span className='w-[128px]' >{props.date && props.date.toDateString()}</span>
                <ChevronRight size={20} strokeWidth={2.25}
                              onClick={() => {
                                  props.setDate(new Date(props.date.getTime() + 1000 * 60 * 60 * 24))
                              }
                              }/>
            </div>

            <TabsList>
                <TabsTrigger value="account">
                    <List/>
                </TabsTrigger>
                <TabsTrigger value="password">
                    <GanttChartSquare/>

                </TabsTrigger>
            </TabsList>
        </div>

    );
}
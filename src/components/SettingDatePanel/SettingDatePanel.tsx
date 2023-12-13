import React, { useEffect} from "react";
import {TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {CalendarIcon, ChevronLeft, ChevronRight, GanttChartSquare, List} from "lucide-react";
import '@/styles/global.css'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {DayPicker} from "react-day-picker";


const getFormatDate = (date: Date) => {
    let line_m: string[] = 'января, февраля, марта, апреля, мая, июня, июля, августа, сентября, октября, ноября, декабря'.split(',');
    let line_day = 'Воскресенье, Понедельник, Вторник, Среда, Четверг, Пятница, Суббота'.split(',');
    return (
        <div className='text-center'>
            <div>
                {date.getDate()} {line_m[date.getMonth()]}
            </div>
            <div>
                {line_day[date.getDay()]}
            </div>
        </div>
    );

}

export const SettingDatePanel: React.FC<{ date: Date, setDate: (date: Date) => void }> = (props) => {

    useEffect(() => {

    }, []);

    return (
        <div className='flex flex-row items-center justify-between align-bottom w-[80%] mx-auto'>
            <div className='flex flex-row items-center h-max '>
                <ChevronLeft size={20} strokeWidth={2.25}
                             onClick={() => {
                                 props.setDate(new Date(props.date.getTime() - 1000 * 60 * 60 * 24))
                             }
                             }/>

                <Popover>
                <PopoverTrigger asChild>
                    <span className='w-[128px]'


                    >{props.date && getFormatDate(props.date)}</span>


                    {/*<Button*/}
                    {/*    variant={"outline"}*/}
                    {/*    className={cn(*/}
                    {/*        "w-[100%] justify-start text-left text-foreground font-normal",*/}
                    {/*        !props.date && "text-sm"*/}
                    {/*    )}*/}
                    {/*>*/}
                    {/*    {props.date ? format(props.date, "PPP", {locale: ru}) :*/}
                    {/*        <span>Выберите дату бронирования</span>}*/}
                    {/*</Button>*/}
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <DayPicker mode="single"
                               locale={ru}
                               weekStartsOn={1}
                               selected={props.date}
                               onSelect={(value) => {
                                   value&&props.setDate(value)
                               }}/>
                </PopoverContent>
                </Popover>


                <ChevronRight size={20} strokeWidth={2.25}
                              onClick={() => {
                                  props.setDate(new Date(props.date.getTime() + 1000 * 60 * 60 * 24))
                              }
                              }/>
            </div>

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
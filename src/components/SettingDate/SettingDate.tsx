import {ChevronLeft, ChevronRight} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {ru} from "date-fns/locale";
import {DayPicker} from "react-day-picker";
import {useState} from "react";


const getFormatDate = (date: Date) => {
    const line_m: string[] = 'января, февраля, марта, апреля, мая, июня, июля, августа, сентября, октября, ноября, декабря'.split(',');
    const line_day = 'Воскресенье, Понедельник, Вторник, Среда, Четверг, Пятница, Суббота'.split(',');
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

export const SettingDate: React.FC<{ date: Date, setDate: (date: Date) => void }> = (props) => {
    const [weekNumber, setWeekNumber] = useState<number>();

    return (
        <div className='flex flex-row items-center h-max '>
            <ChevronLeft size={20} strokeWidth={2.25}
                         onClick={() => {
                             props.setDate(new Date(props.date.getTime() - 1000 * 60 * 60 * 24))
                         }
                         }
            />
            <Popover>
                <PopoverTrigger asChild>
                    <span className='w-[128px]'


                    >{props.date && getFormatDate(props.date)}</span>


                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <DayPicker mode="single"
                               showWeekNumber
                               onWeekNumberClick={setWeekNumber}
                               locale={ru}
                               defaultMonth={props.date}
                               weekStartsOn={1}
                               selected={props.date}
                               onSelect={(value) => {

                                   if (value) {
                                       props.setDate(value);
                                   }
                               }}/>
                </PopoverContent>
            </Popover>


            <ChevronRight size={20} strokeWidth={2.25}
                          onClick={() => {
                              props.setDate(new Date(props.date.getTime() + 1000 * 60 * 60 * 24))
                          }
                          }/>
        </div>
    );


}
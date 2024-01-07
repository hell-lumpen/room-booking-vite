import {ChevronLeft, ChevronRight} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {ru} from "date-fns/locale";
import {DayPicker} from "react-day-picker";


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
    console.log('date', props.date);
    return (
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

                                       if (value) {
                                           console.log('set day');
                                           // value.setSeconds(0);
                                           // value.setMinutes(0);
                                           // value.setHours(3);
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
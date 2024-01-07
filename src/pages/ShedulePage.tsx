import BookingCard from "@/components/BookingCard/BookingCard";
import {useState} from "react";
import {Booking} from "../components/BookingCard/bookingModels";
import {SettingSchedulePanel} from "../components/SettingSchedule/SettingSchedulePanel";

export const SchedulePage = () => {

    const [dateForSchedule, setDateSchedule] = useState(new Date((new Date()).setHours(3, 0, 0)))

    // console.log('date0', dateForSchedule);

    const card_data:Booking = {
        startTime: '9:00',
        endTime: '10:30',
        title: 'Математическое моделирование, численные методы и комплексы программ',
        audience: 'IT-5',
        owner: {
            id: 5,
            value: 'Филимонов',
        },
        tag: {
            id: 2,
            fullName: 'Лекция',
            color: 'red'
        },
    }


    return (
        <div>
            Расписание
            
            <SettingSchedulePanel  date={dateForSchedule} setDate={setDateSchedule}/>
            <BookingCard {...card_data}/>


        </div>

    );
}

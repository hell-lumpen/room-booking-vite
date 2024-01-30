import BookingCard from "@/components/BookingCard/BookingCard";
import { useEffect, useState } from "react";
import { Booking } from "../components/BookingCard/bookingModels";
import { SettingSchedulePanel } from "../components/SettingSchedule/SettingSchedulePanel";
import API from "@/http/setupAxios.ts";

export const SchedulePage = () => {
    const getNextDate = (date: Date): Date => {
        return new Date(date.getTime() + 1000 * 60 * 60 * 24);
    }

    const [dateForSchedule, setDateSchedule] = useState(new Date((new Date()).setHours(3, 0, 0)))
    const [groupForSchedule, setGroupSchedule] = useState<string>('');
    const [scheduleCardData, setCardData] = useState<Booking[]>([]);


    useEffect(() => {
        console.log('date', dateForSchedule);
        console.log('group', groupForSchedule);

        if (groupForSchedule === '') {
            return;
        }

        // return;
        API.get(`/bookings/group/${Number(groupForSchedule)}?startTime=${dateForSchedule.toISOString()}&endTime=${getNextDate(dateForSchedule).toISOString()}`)
            .then((data) => {
                console.log('data', data.data)
                setCardData(data.data);
            })

    }, [dateForSchedule, groupForSchedule]);


    return (
        <div className=" w-[80%] mx-auto max-md:w-[100%]">
            <h1>Расписание занятий</h1>
            <SettingSchedulePanel date={dateForSchedule} setDate={setDateSchedule} setGroup={setGroupSchedule}/>
            {(scheduleCardData.length !== 0 || groupForSchedule === '') ? (
                (groupForSchedule === '' ? (
                    <div>
                        <p className="mt-4 text-center">
                            ❗ Для просмотра расписания выберите группу...
                        </p>
                    </div>
                ) : (
                        <div className="mt-[2%]">
                            {scheduleCardData.sort((a, b) => {
                                    const date_a = new Date(a.startTime);
                                    const date_b = new Date(b.startTime);
                                    return date_a.getTime() - date_b.getTime();
                                }
                            ).map(
                                (data: Booking) => (
                                    <BookingCard booking={data} />
                                )
                            )}
                        </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center p-4">
                    <div className="p-4 rounded-lg">
                        <h2 className="text-2xl font-bold text-center">
                            🎉 Ура!
                        </h2>
                        <p className="mt-2 text-lg text-center">
                            Сегодня у вашей группы нет занятий. Можно отдохнуть! 😄
                        </p>
                        <p className="mt-4 text-sm text-center">
                            Наслаждайтесь свободным временем и заряжайтесь энергией для новых достижений! 🌟
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

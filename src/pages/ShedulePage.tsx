import BookingCard from "@/components/BookingCard/BookingCard";
import { useEffect, useState } from "react";
import { Booking } from "../components/BookingCard/bookingModels";
import { SettingSchedulePanel } from "../components/SettingSchedule/SettingSchedulePanel";
import axios from 'axios';
import BookingList from "@/components/BookingCard/BookingList";

export const SchedulePage = () => {
    const getNextDate = (date: Date): Date => {
        return new Date(date.getTime() + 1000 * 60 * 60 * 24);
    }
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoi0J3QtdC90LDRhdC-0LIg0JXQstCz0LXQvdC40Lkg0JLQsNC70LXQvdGC0LjQvdC-0LLQuNGHIiwic3ViIjoidXNlcm5hbWUiLCJpYXQiOjE3MDQyOTM5NjUsImV4cCI6MTcxMjkzMzk2NX0.cyhtonQk6F8DHiHdjTCjTnD3pQyUnvdJtHJa3TwQa3I";

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
        axios.get(`http://localhost:8080/api/bookings/group/${Number(groupForSchedule)}?startTime=${dateForSchedule.toISOString()}&endTime=${getNextDate(dateForSchedule).toISOString()
            }`,
            { headers: { Authorization: 'Bearer ' + token } })
            .then((data) => {
                setCardData(data.data);
            })

    }, [dateForSchedule, groupForSchedule]);
    useEffect(() => {
        console.log(scheduleCardData);
    }, [scheduleCardData]);



    return (
        <div className=" w-[80%] mx-auto max-md:w-[100%]">
            <SettingSchedulePanel date={dateForSchedule} setDate={setDateSchedule} setGroup={setGroupSchedule}/>
            <div className="mt-[2%]">

                {scheduleCardData.sort((a, b) => {
                    const date_a = new Date(a.startTime);
                    const date_b = new Date(b.startTime);
                    return date_a.getTime() - date_b.getTime();
                }
                ).map(
                    (data: Booking) => (
                        <BookingCard {...data} />
                    )
                )}
                {/* <BookingList bookingsGropedByRoom={scheduleCardData} /> */}
            </div>

        </div>

    );
}

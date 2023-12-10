import styles from './HomePage.module.css'
import BookingList from "@/components/BookingCard/BookingList.tsx";
import {BookingsByRoom} from "@/components/BookingCard/bookingModels.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {StarBookingWidget} from "@/components/StartBooking/StarBookingWidget.tsx";
import {NewsBlock} from "@/components/NewsBlock/NewsBlock.tsx";
import {SettingDatePanel} from "@/components/SettingDatePanel/SettingDatePanel.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {NewBookingForm} from "@/components/NewBookingForm/NewBookingForm.tsx";


const HomePage = () => {
    const getNextDate = (date: Date): Date => {
        return new Date(date.getTime() + 1000 * 60 * 60 * 24);
    }

    const [dateForAxios, setDateAxios] = useState(new Date((new Date()).setHours(3, 0, 0)))

    const [dataForCard, setDataForCard] = useState<BookingsByRoom[]>([]);
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxuYW1lIjoiSFVJMTIzIiwic3ViIjoiMTIzIiwiaWF0IjoxNzAyMTU5NzY5LCJleHAiOjE3MDI3NjQ1Njl9.vsspmEUysZQjvTvQ_v4fWEZM-xXgpjTvx9fz1iUrsy8";

    const setNewDateAxios = (newDate: Date) => {
        setDateAxios(newDate);
    }


    useEffect(() => {
        console.log('as', dateForAxios.toISOString())
        axios.get(`http://localhost:8080/api/bookings?startTime=${dateForAxios.toISOString()}&endTime=${
                getNextDate(dateForAxios).toISOString()
            }`,
            {headers: {Authorization: 'Bearer ' + token}})
            .then((data) => {
                // console.log(data.data);
                setDataForCard(data.data);
            })

    }, [dateForAxios]);


    return (
        <div className={styles['homepage-container']}>
            <div className={styles['booking-card-container']}>
                <Tabs defaultValue="account">
                    <SettingDatePanel date={dateForAxios} setDate={setNewDateAxios}></SettingDatePanel>


                    <div className='w-max ml-auto mr-0 mt-[15px]'>
                        <Sheet>
                            <SheetTrigger>
                                <Button>Забронировать</Button>
                            </SheetTrigger>
                            <SheetContent>
                                <NewBookingForm/>
                            </SheetContent>
                        </Sheet>
                    </div>


                    <TabsContent value="account"><BookingList bookingsGropedByRoom={dataForCard}/></TabsContent>
                    <TabsContent value="password">Таймлайна пока нет. Находится в разработке</TabsContent>
                </Tabs>
            </div>
            <div className={styles['homepage-right-menu']}>
                <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                    Ближайшие мероприятия
                </h2>
                <StarBookingWidget/>
                <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                    Новости
                </h2>
                <NewsBlock/>
            </div>
        </div>

    );

}

export default HomePage;

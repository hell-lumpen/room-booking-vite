import styles from './HomePage.module.css'
import BookingList from "@/components/BookingCard/BookingList.tsx";
import {BookingsByRoom} from "@/components/BookingCard/bookingModels.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {StarBookingWidget} from "@/components/StartBooking/StarBookingWidget.tsx";
import {NewsBlock} from "@/components/NewsBlock/NewsBlock.tsx";
import {SettingDatePanel} from "@/components/SettingDatePanel/SettingDatePanel.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {NewBookingForm} from "@/components/NewBookingForm/NewBookingForm.tsx";
import {HorizontalTimelineElement} from "@/components/HorizontalTimelineElement/HorizontalTimelineElement.tsx";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet.tsx";
// import {NewBookingForm} from "@/components/NewBookingForm/NewBookingForm.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import PopupSelector from "@/components/PopupSelector.tsx";
import {
    CalendarIcon,
    CheckCircledIcon,
    CircleIcon,
    CrossCircledIcon,
    QuestionMarkCircledIcon,
    StopwatchIcon
} from "@radix-ui/react-icons";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";


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

    const [adjustedSide, setAdjustedSide] = useState<"bottom" | "right" | "top" | "left" | null | undefined>(undefined);
    const [sheetSize, setSheetSize] = useState<string>('');
    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen = window.innerWidth <= 800;
            setAdjustedSide(isSmallScreen ? 'bottom' : 'right');
            setSheetSize(isSmallScreen ? 'h-[500px] overflow-y-scroll' : 'min-w-[500px] ')
        };

        // Вызовите handleResize при монтировании и при изменении размера окна
        handleResize();
        window.addEventListener('resize', handleResize);

        // Очистите слушателя событий при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const statuses = [
        {
            id: 1,
            value: "backlog",
            label: "Backlog",
            icon: QuestionMarkCircledIcon,
        },
        {
            id: 2,
            value: "todo",
            label: "Todo",
            icon: CircleIcon,
        },
        {
            id: 3,
            value: "in progress",
            label: "In Progress",
            icon: StopwatchIcon,
        },
        {
            id: 4,
            value: "done",
            label: "Done",
            icon: CheckCircledIcon,
        },
        {
            id: 5,
            value: "canceled",
            label: "Canceled",
            icon: CrossCircledIcon,
        },
    ]

    const [date, setDate] = React.useState<Date>()

    return (
        <div className={styles['homepage-container']}>
            <div className={styles['booking-card-container']}>
                <Tabs defaultValue="password">
                    <SettingDatePanel date={dateForAxios} setDate={setNewDateAxios}></SettingDatePanel>
                    <div className='w-max ml-auto mr-0 mt-[15px]'>
                        <Sheet>
                            <SheetTrigger>
                                <Button>Забронировать</Button>
                            </SheetTrigger>
                            <SheetContent side={adjustedSide} className={sheetSize}>
                                <SheetHeader>
                                    <SheetTitle>Создание бронирования</SheetTitle>
                                    <SheetDescription>
                                        {/*Make changes to your profile here. Click save when you're done.*/}
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Название
                                        </Label>
                                        <Input id="name" type='text' placeholder="Type your message here." className="col-span-3"/>
                                    </div>
                                    <div className="items-center gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="description">Описание</Label>
                                            <Textarea placeholder="Type your message here." id="description"/>
                                            <p className="text-sm text-muted-foreground">
                                                Введите подробности бронирования
                                            </p>
                                        </div>
                                    </div>
                                    <div className="items-center gap-4">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-fill justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Выбери дату</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Время начала
                                        </Label>
                                        <Input id="name" type='time' className="col-span-3"/>
                                    </div>
                                    <div className="items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Время окончания
                                        </Label>
                                        <Input id="name" type='time' className="col-span-3"/>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <PopupSelector options={statuses}/>
                                    </div>


                                </div>
                                <SheetFooter className='mb-5'>
                                    <SheetClose asChild>
                                        <Button type="submit">Создать бронирование</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <TabsContent value="account"><BookingList bookingsGropedByRoom={dataForCard}/></TabsContent>
                    <TabsContent value="password">
                        <HorizontalTimelineElement booking={dataForCard}/>
                    </TabsContent>

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

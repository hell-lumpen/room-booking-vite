import styles from './HomePage.module.css'
import BookingList from "@/components/BookingCard/BookingList.tsx";
import {BookingsByRoom, Tag} from "@/components/BookingCard/bookingModels.ts";
import React, {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {StarBookingWidget} from "@/components/StartBooking/StarBookingWidget.tsx";
import {SettingDatePanel} from "@/components/SettingDatePanel/SettingDatePanel.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
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
import 'react-day-picker/dist/style.css'
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {DayPicker} from "react-day-picker";
import {ru} from "date-fns/locale";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {cn} from "@/lib/utils.ts";
import {initialRoomBookingFormData, RoomBookingFormData} from "@/models/bookingTypes.ts";
import PopupSelector from "@/components/PopupSelector.tsx";


const HomePage = () => {
    const getNextDate = (date: Date): Date => {
        return new Date(date.getTime() + 1000 * 60 * 60 * 24);
    }

    const [dateForAxios, setDateAxios] = useState(new Date((new Date()).setHours(3, 0, 0)))

    const [dataForCard, setDataForCard] = useState<BookingsByRoom[]>([]);
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoi0J3QtdC90LDRhdC-0LIg0JXQstCz0LXQvdC40Lkg0JLQsNC70LXQvdGC0LjQvdC-0LLQuNGHIiwic3ViIjoidXNlcm5hbWUiLCJpYXQiOjE3MDQyOTM5NjUsImV4cCI6MTcxMjkzMzk2NX0.cyhtonQk6F8DHiHdjTCjTnD3pQyUnvdJtHJa3TwQa3I";

    const setNewDateAxios = (newDate: Date) => {
        setDateAxios(newDate);
    }


    useEffect(() => {
        // document.documentElement.setAttribute('data-theme', 'dark');

        console.log('as', dateForAxios.toISOString())
        axios.get(`http://localhost:8080/api/bookings?startTime=${dateForAxios.toISOString()}&endTime=${
                getNextDate(dateForAxios).toISOString()
            }`,
            {headers: {Authorization: 'Bearer ' + token}})
            .then((data) => {
                setDataForCard(data.data);
            })

    }, [dateForAxios]);

    const [adjustedSide, setAdjustedSide] = useState<"bottom" | "right" | "top" | "left" | null | undefined>(undefined);
    const [sheetSize, setSheetSize] = useState<string>('');
    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen = window.innerWidth <= 800;
            setAdjustedSide(isSmallScreen ? 'bottom' : 'right');
            setSheetSize(isSmallScreen ? 'h-[75vh] overflow-y-scroll' : 'min-w-[500px] overflow-y-scroll')
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
            value: "lk",
            label: "Лекция",
        },
        {
            id: 2,
            value: "pz",
            label: "Практическое занятие",
        },
        {
            id: 3,
            value: "sov",
            label: "Совещание",
        },
        {
            id: 4,
            value: "done",
            label: "Мероприятие",
        },
        {
            id: 5,
            value: "canceled",
            label: "Экзамен",
        },
    ]

    const statuses_ = [
        {
            id: 1,
            value: "lk",
            label: "Пантелеев Андрей Владимирович",
        },
        {
            id: 2,
            value: "pz",
            label: "Формалев Владимир Федорович",
        },
        {
            id: 3,
            value: "sov",
            label: "Танцующий Тукан (Неизвестный)",
        },
        {
            id: 4,
            value: "done",
            label: "Крылов Сергей Сергеевич",
        },
        {
            id: 5,
            value: "canceled",
            label: "Булакина Мария Борисовна",
        },
        {
            id: 6,
            value: "canceled",
            label: "М8О-410Б-20",
        },
        {
            id: 7,
            value: "canceled",
            label: "М8О-411Б-20",
        },
    ]

    // ======================

    const [formData, setFormData] = useState<RoomBookingFormData>(
        initialRoomBookingFormData
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {id, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // const handlePopupSelectorChange = (id: string, value: number[]) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [id]: value,
    //     }))
    // }

    // Обработчик сохранения изменений
    const handleSaveChanges = () => {
        toast({
            title: "Резервирование сохранено!",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
        </pre>
            ),
            duration: 5000,
        })
    };

    const onChangeHandlerTest = (selectedItems: Tag[]) => {
        console.log("Selected items:", selectedItems);
        const items = JSON.parse(JSON.stringify(selectedItems));
        console.log('form data', formData);
        setFormData(prevData => ({
            ...prevData,
            tagsId: items.map((obj: { id: number; }) => obj.id),
        }));
    }

    const onChangeHandler = React.useCallback((selectedItems: Tag[]) => {
        console.log("Selected items:", selectedItems);
        const items = JSON.parse(JSON.stringify(selectedItems));
        setFormData(prevData => ({
            ...prevData,
            tagsId: items.map((obj: { id: number; }) => obj.id),
        }));
    }, []);

    const [n, setNN] = useState(3)

    // =====================================
    return (
        <div className={styles['homepage-container']}>
            <div className={styles['booking-card-container']}>
                <Tabs defaultValue="card">
                    <SettingDatePanel date={dateForAxios} setDate={setNewDateAxios}></SettingDatePanel>
                    <div className='flex justify-around flex-row-reverse p-4'>
                        <Sheet>
                            <SheetTrigger className='p-0 border-none'>
                                <Button variant='default'>Зарезервировать</Button>
                            </SheetTrigger>
                            <SheetContent side={adjustedSide} className={sheetSize}>
                                <SheetHeader>
                                    <SheetTitle>Создание резервирования</SheetTitle>
                                    <SheetDescription>
                                        Здесь вы можете зарезервировать необходимую аудиторию. Для успешного сохранения,
                                        убедитесь, что вы заполнили все поля в форме.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="items-center gap-4">
                                        <Label htmlFor="name" className="text-right text-foreground">
                                            Название
                                        </Label>
                                        <Input id="title" type="text" placeholder="Введите название."
                                               className="col-span-3" value={formData.title}
                                               onChange={handleInputChange}/>
                                    </div>
                                    <div className="items-center gap-4">
                                        <div className="w-full">
                                            <Label id='description' className="text-right text-foreground">
                                                Описание
                                            </Label>
                                            <Textarea id="description" placeholder="Напишите описание бронирования."
                                                      className="col-span-3" value={formData.description}
                                                      onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="items-center gap-4">
                                        <div className="w-full">
                                            <Label id='description' className="text-right text-foreground">
                                                Дата бронирования
                                            </Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[100%] justify-start text-left text-foreground font-normal",
                                                            !formData.date && "text-sm"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                                        {formData.date ? format(formData.date, "PPP", {locale: ru}) :
                                                            <span className='text-muted-foreground'>Выберите дату бронирования</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <DayPicker mode="single"
                                                               locale={ru}
                                                               weekStartsOn={1}
                                                               fromDate={new Date()}
                                                               selected={formData.date}
                                                               onSelect={(value) => {
                                                                   setFormData((prevData) => ({
                                                                       ...prevData,
                                                                       date: value,
                                                                   }))
                                                               }}/>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between gap-4">
                                        <div className="flex items-center gap-1.5 md:gap-4">
                                            <Label htmlFor="startTime" className="text-right text-foreground">
                                                Начало
                                            </Label>
                                            <div className='w-[90px]'>
                                                <Input
                                                    id="startTime"
                                                    type="time"
                                                    className="block text-center before:text-muted-foreground"
                                                    value={formData.startTime}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 md:gap-4">
                                            <Label htmlFor="endTime" className="text-right text-foreground">
                                                Окончание
                                            </Label>
                                            <div className='w-[90px]'>
                                                <Input
                                                    id="endTime"
                                                    type="time"
                                                    className="block text-center"
                                                    value={formData.endTime}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="items-center gap-4">
                                        <div className="w-full">
                                            <Label id='description' className="text-right text-foreground">
                                                Метки бронирования
                                            </Label>
                                            <div className="w-full">
                                                <PopupSelector<Tag> title='Выберите метку бронирования'
                                                                    buttonTitle='Добавьте метки'
                                                                    options={statuses}
                                                                    onChange={(selectedItems: Tag[]) => {
                                                                        console.log("Selected items:", selectedItems);
                                                                        const items = JSON.parse(JSON.stringify(selectedItems));
                                                                        console.log('form data', formData);
                                                                        setFormData((prevData) => {
                                                                            prevData.tagsId = (items.map((obj: { id: number; }) => obj.id))
                                                                            return  prevData;
                                                                        });
                                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="items-center gap-4">
                                        <div className="w-full">
                                            <Label id='description' className="text-right text-foreground">
                                                Участники
                                            </Label>
                                            <PopupSelector

                                                title='Начните вводить имя или номер группы'
                                                buttonTitle='Добавьте участников'
                                                options={statuses_}
                                                onChange={(selectedItems: Tag[]) => {
                                                    console.log("Selected items:", selectedItems);
                                                    const items = JSON.parse(JSON.stringify(selectedItems));
                                                    setFormData((prevData) => {
                                                        prevData.participantsId = (items.map((obj: { id: number, type:undefined }) => obj.id))
                                                        return  prevData;
                                                    });

                                                    // setFormData(prevData => ({
                                                    //     ...prevData,
                                                    //     tagsId: items.map((obj: { id: number; }) => obj.id),
                                                    // }));
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <SheetFooter className='mb-5'>
                                    <SheetClose asChild>
                                        <Button type="submit" onClick={handleSaveChanges}>Создать бронирование</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>


                    </div>
                    <TabsContent value="card"><BookingList bookingsGropedByRoom={dataForCard}/></TabsContent>
                    <TabsContent value="timeline">
                        <HorizontalTimelineElement booking={dataForCard} rooms={dataForCard.map((e) => {
                            return e.name.value;
                        })}/>
                    </TabsContent>

                </Tabs>
            </div>
            <div className={styles['homepage-right-menu']}>
                <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                    Ближайшие мероприятия
                </h2>
                <StarBookingWidget/>
                {/*<h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">*/}
                {/*    Новости*/}
                {/*</h2>*/}
                {/*<NewsBlock/>*/}
            </div>
        </div>

    );

}

export default HomePage;

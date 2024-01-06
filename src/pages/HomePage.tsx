import styles from './HomePage.module.css'
import BookingList from "@/components/BookingCard/BookingList.tsx";
import {BookingsByRoom} from "@/components/BookingCard/bookingModels.ts";
import {ChangeEvent, useEffect, useState} from "react";
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
import {initialRoomBookingFormData, OptionParticipant, OptionTag, RoomBookingFormData} from "@/models/bookingTypes.ts";
import PopupSelector from "@/components/PopupSelector.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";


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
        console.log('form1', formData)

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

    const tags: OptionTag[] = [
        {id: 1, label: "Лекция"},
        {id: 2, label: "Семинар"},
        {id: 3, label: "Практическое занятие"},
        {id: 4, label: "Лабораторная работа"},
        {id: 5, label: "Консультация"},
        {id: 6, label: "Экзамен"}
    ];

    const participants: OptionParticipant[] = [
        // Студенты
        {id: 101, label: "Иван Иванов", type: 1},
        {id: 102, label: "Мария Петрова", type: 1},
        {id: 103, label: "Алексей Сидоров", type: 1},
        {id: 104, label: "Елена Васильева", type: 1},
        {id: 105, label: "Дмитрий Николаев", type: 1},
        {id: 106, label: "Ольга Михайлова", type: 1},
        {id: 107, label: "Никита Горбунов", type: 1},
        {id: 108, label: "Анна Кузнецова", type: 1},
        {id: 109, label: "Павел Егоров", type: 1},
        {id: 110, label: "Ирина Андреева", type: 1},

        {id: 201, label: "Сергей Павлов", type: 2},
        {id: 202, label: "Татьяна Романова", type: 2},
        {id: 203, label: "Владимир Козлов", type: 2},

        {id: 301, label: "Группа Физики-2024", type: 3},
        {id: 302, label: "Группа Истории-2023", type: 3}
    ];

    const [formData, setFormData] = useState<RoomBookingFormData>(
        initialRoomBookingFormData
    );

    useEffect(() => {
        console.log('form', formData)
    }, [setFormData]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        console.log('form data', formData);
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
                <ScrollArea className="h-max-[300px]">
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
                    </pre>
                </ScrollArea>
            ),
            duration: 5000,
        })
    };

    // const onChangeHandlerTest = (selectedItems: Tag[]) => {
    //     console.log("Selected items:", selectedItems);
    //     const items = JSON.parse(JSON.stringify(selectedItems));
    //     console.log('form data', formData);
    //     setFormData(prevData => ({
    //         ...prevData,
    //         tagsId: items.map((obj: { id: number; }) => obj.id),
    //     }));
    // }
    //
    // const onChangeHandler = React.useCallback((selectedItems: Tag[]) => {
    //     console.log("Selected items:", selectedItems);
    //     const items = JSON.parse(JSON.stringify(selectedItems));
    //     setFormData(prevData => ({
    //         ...prevData,
    //         tagsId: items.map((obj: { id: number; }) => obj.id),
    //     }));
    // }, []);

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
                                                <PopupSelector<OptionTag>
                                                    title='Выберите метку бронирования'
                                                    buttonTitle='Добавьте метки'
                                                    options={tags}
                                                    fullData={formData}
                                                    type='tag'
                                                    onChange={(selectedItems: OptionTag[]) => {
                                                        console.log('form data', formData);
                                                        setFormData((prevData) => {
                                                            prevData.tags = selectedItems;
                                                            // prevData.tagsId = (selectedItems.map((obj: {
                                                            //     id: number;
                                                            // }) => obj.id))
                                                            return prevData;
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
                                            <PopupSelector<OptionParticipant>
                                                title='Начните вводить имя или номер группы'
                                                buttonTitle='Добавьте участников'
                                                options={participants}
                                                fullData={formData}
                                                type='participant'
                                                onChange={(selectedItems: OptionParticipant[]) => {
                                                    console.log('form data', formData);
                                                    setFormData(prevData => {
                                                        prevData.participants = selectedItems;
                                                        // prevData.participantsId = selectedItems.map(obj => ({
                                                        //     id: obj.id,
                                                        //     type: obj.type
                                                        // }));
                                                        return prevData;
                                                    });
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

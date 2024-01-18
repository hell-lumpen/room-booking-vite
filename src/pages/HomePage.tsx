import styles from './HomePage.module.css'
import BookingList from "@/components/BookingCard/BookingList.tsx";
import {BookingsByRoom} from "@/components/BookingCard/bookingModels.ts";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {StarBookingWidget} from "@/components/StartBooking/StarBookingWidget.tsx";
import {SettingDatePanel} from "@/components/SettingDatePanel/SettingDatePanel.tsx";
import {Tabs, TabsContent} from "@/components/ui/tabs.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Sheet, SheetTrigger} from "@/components/ui/sheet.tsx";
import 'react-day-picker/dist/style.css'
import {toast} from "@/components/ui/use-toast.ts";
import {initialRoomBookingFormData, RoomBookingFormData} from "@/models/bookingTypes.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {HorizontalTimelineElement} from "@/components/HorizontalTimelineElement/HorizontalTimelineElement.tsx";
import {InformationBlock} from '@/components/InformationBlock/InformationBlock';


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
        axios.get(`http://localhost:8080/api/bookings?startTime=${dateForAxios.toISOString()}&endTime=${getNextDate(dateForAxios).toISOString()
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

    const [formData, setFormData] = useState<RoomBookingFormData>(
        initialRoomBookingFormData
    );
    const [formErrors, setFormErrors] = useState<ValidationErrors>({});
    const [tryValidate, setTryValidate] = useState<boolean>(false);


    const validateForm = (formData: RoomBookingFormData): ValidationErrors => {
        const errors: ValidationErrors = {};

        // Валидация названия
        if (!formData.title || formData.title.trim() === '') {
            errors.title = 'Введите название.';
        }

        // Валидация описания
        if (!formData.description || formData.description.trim() === '') {
            errors.description = 'Введите описание.';
        }

        // Валидация даты
        if (!formData.date) {
            errors.date = 'Выберите дату.';
        }

        // Валидация времени начала
        if (!formData.startTime) {
            errors.startTime = 'Укажите время начала.';
        }

        // Валидация времени окончания
        if (!formData.endTime) {
            errors.endTime = 'Укажите время окончания.';
        } else if (formData.startTime && formData.endTime <= formData.startTime) {
            errors.endTime = 'Время окончания должно быть позже времени начала.';
        }

        // Валидация участников
        if (!formData.participants || formData.participants.length === 0) {
            errors.participants = 'Добавьте участников.';
        }

        // Валидация меток
        if (!formData.tags || formData.tags.length === 0) {
            errors.tags = 'Добавьте метки бронирования.';
        }

        return errors;
    };

    useEffect(() => {
        setFormErrors(validateForm(formData));
    }, [formData, setFormData]);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {id, value} = e.target;
        setFormData((prevData) => {
            const updatedFormData = {
                ...prevData,
                [id]: value,
            };
            // setFormErrors(validateForm(updatedFormData));
            return updatedFormData;
        });
    };

    // const handlePopupSelectorChange = (id: string, value: number[]) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         [id]: value,
    //     }))
    // }

    // Обработчик сохранения изменений
    const handleSaveChanges = (event: React.MouseEvent<HTMLButtonElement>) => {

        if (hasErrors(formErrors)) {
            console.log('some tr')
            event.preventDefault();
            setTryValidate(true);
            setTimeout(() => {
                console.log('timeout')
                setTryValidate(false);
            }, 3000)
            return;
        }

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

    interface ValidationErrors {
        title?: string;
        description?: string;
        date?: string;
        startTime?: string;
        endTime?: string;
        participants?: string;
        tags?: string;
    }


    const hasErrors = (errors: ValidationErrors): boolean => {
        return Object.values(errors).some(error => error !== undefined && error !== '');
    };

    // =====================================
    return (
        <div className={styles['homepage-container']}>
            <div className={styles['booking-card-container']}>
                <h1>Резервирование аудиторий</h1>
                <div className='flex justify-around flex-row-reverse p-4'>
                    <Sheet>
                        <SheetTrigger className='p-0 border-none'>
                            <Button variant='default'>Зарезервировать</Button>
                        </SheetTrigger>
                        <InformationBlock mode='create'/>

                        {/* <SheetContent side={adjustedSide} className={sheetSize}>
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
                                        onChange={handleInputChange} />
                                    {tryValidate && formErrors.title && (
                                        <p className='text-red-600 text-base'>{formErrors.title}</p>
                                    )}
                                </div>
                                <div className="items-center gap-4">
                                    <div className="w-full">
                                        <Label id='description' className="text-right text-foreground">
                                            Описание
                                        </Label>
                                        <Textarea id="description" placeholder="Напишите описание бронирования."
                                            className="col-span-3" value={formData.description}
                                            onChange={handleInputChange} />
                                        {tryValidate && formErrors.description && (
                                            <p className='text-red-600 text-base'>{formErrors.description}</p>
                                        )}
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
                                                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    {formData.date ? format(formData.date, "PPP", { locale: ru }) :
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
                                                    }} />
                                            </PopoverContent>
                                        </Popover>
                                        {tryValidate && formErrors.date && (
                                            <p className='text-red-600 text-base'>{formErrors.date}</p>
                                        )}
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
                                {tryValidate && formErrors.startTime && (
                                    <p className='text-red-600 text-base'>{formErrors.startTime}</p>
                                )}
                                {tryValidate && formErrors.endTime && (
                                    <p className='text-red-600 text-base'>{formErrors.endTime}</p>
                                )}
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
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        tags: selectedItems
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {tryValidate && formErrors.tags && (
                                        <p className='text-red-600 text-base'>{formErrors.tags}</p>
                                    )}
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
                                                setFormData(prevData => ({
                                                    ...prevData,
                                                    participants: selectedItems
                                                }));
                                            }}
                                        />
                                    </div>
                                    {tryValidate && formErrors.participants && (
                                        <p className='text-red-600 text-base'>{formErrors.participants}</p>
                                    )}
                                </div>

                            </div>

                            <SheetFooter className='mb-5'>
                                <SheetClose asChild>
                                    <Button type="submit" onClick={handleSaveChanges}>Создать бронирование</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent> */}
                    </Sheet>
                </div>

                <Tabs defaultValue="card">
                    <SettingDatePanel date={dateForAxios} setDate={setNewDateAxios}/>
                    {dataForCard.length !== 0 ? (
                        <>
                            <TabsContent value="card">
                                <BookingList bookingsGropedByRoom={dataForCard}/>
                            </TabsContent><TabsContent value="timeline">
                            <HorizontalTimelineElement booking={dataForCard} rooms={dataForCard.map((e) => {
                                return e.name.value;
                            })}/>
                        </TabsContent>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center m-5">
                            <div className="p-4">
                                <h2 className="text-2xl font-bold text-center">
                                    📅 Ой!
                                </h2>
                                <p className="mt-2 text-lg text-center">
                                    На выбранный день бронирований нет. 😕
                                </p>
                                <p className="mt-4 text-sm text-center text-foreground">
                                    Попробуйте выбрать другую дату. 🌟
                                </p>
                            </div>
                        </div>
                    )}
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

    )
        ;

}

export default HomePage;

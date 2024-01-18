import { CalendarIcon } from "lucide-react";
import { Booking, Group, Tag, User } from "../BookingCard/bookingModels";
import { TagComponent } from "../Tag/TagComponent";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChangeEvent, useEffect, useState } from "react";
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { DayPicker } from "react-day-picker";
import { OptionParticipant, OptionTag } from "@/models/bookingTypes";
import PopupSelector from "../PopupSelector";


interface RoomBookingFormData {
    title: string | undefined,
    description: string | undefined,
    date: Date | undefined,
    startTime: string | undefined,
    endTime: string | undefined,
    roomId: number | undefined,
    ownerId: number | undefined,
    participants?: OptionParticipant[],
    tags: OptionTag[] | undefined
}


const getFormatDate = (date: Date) => {
    const line_m: string[] = 'января, февраля, марта, апреля, мая, июня, июля, августа, сентября, октября, ноября, декабря'.split(',');
    return (
        <div>
            {date.getDate()} {line_m[date.getMonth()]}
        </div>
    );
}

const getDate = (date: string) => {
    const result = new Date(date);
    result.setHours(0);
    result.setMinutes(0);
    return result;
}

const getFormatTime = (str: string | undefined) => {
    if (!str)
        return str;


    const date = new Date(str);
    return (date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0'));
}

// ?.map((e)=>{
//     const o:OptionParticipant = {
//         id:e.id,
//         label:e.value,
//         type:0
//     };
//     return o;
// })

const getFormatTag = (tag?: Tag, tags?: Tag[]): OptionTag[] => {
    const t: OptionTag[] = [];
    if (tag) {
        t.push({ id: tag.id, label: tag.fullName });
    }
    if (tags) {
        tags.map((tag) => {
            t.push({ id: tag.id, label: tag.fullName });
        })
    }

    return t;
}

const getFormatParticipant = (part?: (User | Group)[]): OptionParticipant[] => {
    const res: OptionParticipant[] = [];
    if (part)
        part.map((p) => {
            res.push({ id: p.id, label: p.value, type: 0 });
        })
    return res;
}


const getFormData = (data?: Booking): RoomBookingFormData => {
    if (data)
        return {

            title: data.title,
            description: data.descriptions,
            date: getDate(data.startTime),
            startTime: getFormatTime(data.startTime),
            endTime: getFormatTime(data.endTime),
            roomId: data.room?.id,
            ownerId: data.owner.id,
            participants: getFormatParticipant(data.participants),
            tags: getFormatTag(data.tag, data.tags),
        };
    else
        return {
            title: '',
            description: '',
            date: new Date(),
            startTime: '',
            endTime: '',
            roomId: undefined,
            ownerId: undefined,
            participants: undefined,
            tags: undefined
        }
}

const tags: OptionTag[] = [
    { id: 1, label: "Лекция" },
    { id: 0, label: "Семинар" },
    { id: 2, label: "Практическое занятие" },
    { id: 3, label: "Лабораторная работа" },
    { id: 4, label: "Консультация" },
    { id: 5, label: "Экзамен" }
];

const participants: OptionParticipant[] = [
    // Студенты
    { id: 101, label: "Иван Иванов", type: 1 },
    { id: 102, label: "Мария Петрова", type: 1 },
    { id: 103, label: "Алексей Сидоров", type: 1 },
    { id: 104, label: "Елена Васильева", type: 1 },
    { id: 105, label: "Дмитрий Николаев", type: 1 },
    { id: 106, label: "Ольга Михайлова", type: 1 },
    { id: 107, label: "Никита Горбунов", type: 1 },
    { id: 108, label: "Анна Кузнецова", type: 1 },
    { id: 109, label: "Павел Егоров", type: 1 },
    { id: 110, label: "Ирина Андреева", type: 1 },

    { id: 201, label: "Сергей Павлов", type: 2 },
    { id: 202, label: "Татьяна Романова", type: 2 },
    { id: 203, label: "Владимир Козлов", type: 2 },

    { id: 301, label: "Группа Физики-2024", type: 3 },
    { id: 302, label: "Группа Истории-2023", type: 3 }
];


const tryValidate = (
    type: string,
    value?: string | OptionTag[] | OptionParticipant[],
    value2?: string
)
    : boolean => {
    if (!value)
        return true;

    if (type == 'time') {
        if (!value2) return true;
        if (!(typeof (value) === 'string' && typeof (value2) === 'string')) return true;
        if (Number(value.substring(0, 2)) > Number(value2.substring(0, 2))) return true;
        if (Number(value.substring(0, 2)) == Number(value2.substring(0, 2))
            && Number(value.substring(3, 5)) >= Number(value2.substring(3, 5))
        ) return true;
    }

    if (type == 'tags') {
        if (value as OptionTag[] && value.length == 0) return true;
    }

    if (type == 'participants') {
        if (value as OptionParticipant[] && value.length == 0) return true;
    }

    return false;
}

const validateAnswer = {
    'title': 'Введите название.',
    'description': 'Введите описание.',
    'date': 'Выберите дату бронирования.',
    'time': 'Укажите точное время начала/конца бронирования.',
    'tags': 'Добавьте метки бронирования.',
    'participant': 'Добавьте участников.',

};

export const InformationBlock: React.FC<{ mode: 'view' | 'create', data?: Booking }> = (props) => {


    const [sheetSize, setSheetSize] = useState<string>('');
    useEffect(() => {
        const handleResize = () => {
            const isSmallScreen = window.innerWidth <= 800;
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


    const [isTrySave, setTrySave] = useState(false);

    const [isView, setIsView] = useState(props.mode == 'view');
    const [formData, setFormData] = useState<RoomBookingFormData>(getFormData(props.data));

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        if (isView) return;
        setFormData((prevData) => {
            const updatedFormData = {
                ...prevData,
                [id]: value,
            };
            return updatedFormData;
        });
    };

    return (
        <SheetContent className={sheetSize} side='right'>
            <SheetHeader>
                {
                    props.mode == 'view' ?
                        <SheetTitle>Информация о бронировании</SheetTitle> :
                        <>
                            <SheetTitle>Создание резервирования</SheetTitle>
                            <SheetDescription>
                                Здесь вы можете зарезервировать необходимую аудиторию. Для успешного сохранения,
                                убедитесь, что вы заполнили все поля в форме.
                            </SheetDescription>
                        </>
                }

            </SheetHeader>

            <div className="grid gap-4 py-4 ">
                <div className="items-center gap-4">
                    <Label htmlFor="name" className="text-right text-foreground">
                        Название
                    </Label>
                    <Input id="title" type="text" placeholder="Введите название."
                        className="col-span-3" value={formData.title}
                        onChange={handleInputChange}
                    />
                    {isTrySave && tryValidate('title', formData.title) &&
                        <p className='text-red-600 text-base'>{validateAnswer.title}</p>}
                </div>
                {(formData.description || !isView) &&
                    <div className="items-center gap-4">
                        <div className="w-full">
                            <Label id='description' className="text-right text-foreground">
                                Описание
                            </Label>
                            <Textarea id="description" placeholder="Напишите описание бронирования."
                                className="col-span-3" value={formData.description}
                                onChange={handleInputChange}
                            />

                            {isTrySave && tryValidate('description', formData.description) &&
                                <p className='text-red-600 text-base'>{validateAnswer.description}</p>}
                        </div>
                    </div>
                }
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
                                        // !props.data && "text-sm"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {formData.date ? format(formData.date, "PPP", { locale: ru }) :
                                        <span className='text-muted-foreground'>Выберите дату бронирования</span>}
                                </Button>
                            </PopoverTrigger>
                            {!isView &&
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
                                </PopoverContent>}
                        </Popover>
                        {isTrySave && tryValidate('title', formData.title) &&
                            <p className='text-red-600 text-base'>{validateAnswer.date}</p>}
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
                {isTrySave && tryValidate('time', formData.startTime, formData.endTime) &&
                    <p className='text-red-600 text-base'>{validateAnswer.time}</p>}

                <div className="items-center gap-4">
                    <div className="w-full">
                        <Label id='description' className="text-right text-foreground">
                            Метки бронирования
                        </Label>
                        {
                            isView ?
                                props.data &&
                                <div>
                                    <TagComponent tag={props.data.tag} tags={props.data.tags} />
                                </div>
                                :
                                <div className="w-full">
                                    <PopupSelector<OptionTag>
                                        title='Выберите метку бронирования'
                                        buttonTitle='Добавьте метки'
                                        options={tags}
                                        fullData={formData.tags}
                                        type='tag'
                                        onChange={(selectedItems: OptionTag[]) => {
                                            setFormData((prevData) => ({
                                                ...prevData,
                                                tags: selectedItems
                                            }));
                                        }}
                                    />
                                </div>}
                    </div>
                    {isTrySave && tryValidate('tags', formData.tags) &&
                        <p className='text-red-600 text-base'>{validateAnswer.tags}</p>}

                </div>
                <div className="items-center gap-4">
                    <div className="w-full">
                        <Label id='description' className="text-right text-foreground">
                            Участники
                        </Label>
                        {isView ?
                            <div>
                                {formData.participants ? formData.participants.map((e) => (<>{e.label}</>)) : <>Никого(</>}
                            </div>
                            :
                            <PopupSelector<OptionParticipant>
                                title='Начните вводить имя или номер группы'
                                buttonTitle='Добавьте участников'
                                options={participants}
                                fullData={formData.participants}
                                type='participant'
                                onChange={(selectedItems: OptionParticipant[]) => {
                                    setFormData(prevData => ({
                                        ...prevData,
                                        participants: selectedItems
                                    }));
                                }}
                            />
                        }
                    </div>
                    {isTrySave && tryValidate('participants', formData.participants) &&
                        <p className='text-red-600 text-base'>{validateAnswer.participant}</p>}
                </div>{
                    props.mode == 'create' ?
                        <SheetFooter className='mb-5'>
                            <SheetClose asChild>
                                <Button type="submit"
                                // onClick={handleSaveChanges}
                                >Создать бронирование</Button>
                            </SheetClose>
                        </SheetFooter>
                        :
                        <div className="w-full ">{
                            isView ?

                                <Button onClick={() => {
                                    setIsView(false)
                                }}>Редактировать</Button>
                                :
                                <div className="flex justify-between w-[80%] items-center">
                                    <Button
                                        onClick={
                                            () => {
                                                setTrySave(true);
                                            }
                                        }
                                    >Сохранить</Button>
                                    <Button onClick={() => {
                                        setFormData(getFormData(props.data))
                                        setIsView(true)
                                    }}>Отмена</Button>
                                </div>
                        }
                        </div>

                }

            </div>
        </SheetContent>


        //     <div className="items-center gap-4">
        //         <div className="w-full">
        //             <Label id='description' className="text-right text-foreground">
        //                 Владелец: <OwnerComponent owner={props.data.owner} />
        //             </Label>

    );
}
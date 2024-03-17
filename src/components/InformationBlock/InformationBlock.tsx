import { CalendarIcon } from "lucide-react";
import { Booking, Tag, User } from "../BookingCard/bookingModels";
import { TagComponent } from "../Tag/TagComponent";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import { DayPicker } from "react-day-picker";
import { Option, OptionParticipant, OptionTag } from "@/models/bookingTypes";
import PopupSelector from "../PopupSelector";
import { toast } from "../ui/use-toast";
import { Badge } from "../ui/badge";
import API from "@/http/setupAxios.ts";
import { DataForMoreInfo } from "@/App";
import { Checkbox } from "../ui/checkbox";
import { Select } from "../ui/select";
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import './InformationBlock.css';



interface RoomBookingFormData {
    title: string | undefined,
    description: string | undefined,
    date: Date | undefined,
    startTime: string | undefined,
    endTime: string | undefined,
    roomId: { id: number, label: string } | undefined,
    ownerId: number | undefined,
    participants?: OptionParticipant[],
    tags: OptionTag[] | undefined,
    recurringUnit: 'WEEK' | 'DAY' | undefined,
    recurringCount: number | undefined,
    recurringInterval: number | undefined,
    recurringEndDate: Date | undefined
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

const getFormatParticipant = (part?: (User)[]): OptionParticipant[] => {
    const res: OptionParticipant[] = [];
    if (part)
        part.map((p) => {
            res.push({ id: p.id, label: p.fullName, type: 0 });
        })
    return res;
}

const getFormData = (data?: Booking): RoomBookingFormData => {
    if (data) {
        let room = undefined;
        if (data.room) {
            room = { id: data.room.id, label: data.room.value };
        }

        return {
            title: data.title,
            description: data.description,
            date: getDate(data.startTime),
            startTime: getFormatTime(data.startTime),
            endTime: getFormatTime(data.endTime),
            roomId: room,
            ownerId: data.owner.id,
            participants: getFormatParticipant(data.staff),
            tags: getFormatTag(data.tag, data.tags),
        };
    } else
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


const checkOnError = (
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
    // console.log(props.data);


    const moreInfo = useContext(DataForMoreInfo);
    const [isRecurringShow, setRecurringShow] = useState<boolean>(false);
    const [recurringParams, setRecurringParams] = useState<{ date: boolean, replay: boolean }>({ date: true, replay: true });
    const [sheetSize, setSheetSize] = useState<string>('');
    const [adjustedSide, setAdjustedSide] = useState<"bottom" | "right" | "top" | "left" | null | undefined>(undefined);
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

    const [isTrySave, setTrySave] = useState(false);
    const [isView, setIsView] = useState(props.mode == 'view');
    const [formData, setFormData] = useState<RoomBookingFormData>(getFormData(props.data));
    useEffect(() => {
        setFormData(getFormData(props.data));
    }, [props.data]);

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

    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoi0J3QtdC90LDRhdC-0LIg0JXQstCz0LXQvdC40Lkg0JLQsNC70LXQvdGC0LjQvdC-0LLQuNGHIiwic3ViIjoidXNlcm5hbWUiLCJpYXQiOjE3MDQyOTM5NjUsImV4cCI6MTcxMjkzMzk2NX0.cyhtonQk6F8DHiHdjTCjTnD3pQyUnvdJtHJa3TwQa3I";
    //сохранение новой версии карточки
    const trySaveEditCard = (e: React.MouseEvent<HTMLElement>) => {
        //проверка на валидацию
        if (
            checkOnError('title', formData.title) ||
            // checkOnError('description', formData.description) ||
            checkOnError('time', formData.startTime, formData.endTime) ||
            !formData.date ||
            !formData.roomId ||
            checkOnError('tags', formData.tags) ||
            checkOnError('participants', formData.participants)
        ) {
            e.preventDefault();
            return;
        }


        const startTime = new Date(formData.date);
        startTime?.setHours(Number(formData.startTime?.substring(0, 2)) + 3);
        startTime?.setMinutes(Number(formData.startTime?.substring(3, 5)));
        startTime?.setSeconds(0);
        startTime?.setMilliseconds(0);

        const endTime = new Date(formData.date);
        endTime?.setHours(Number(formData.endTime?.substring(0, 2)) + 3);
        endTime?.setMinutes(Number(formData.endTime?.substring(3, 5)));
        endTime?.setSeconds(0);
        endTime?.setMilliseconds(0);


        const cardDataForAxios = {
            'id': props.data?.id,
            'roomId': formData.roomId.id,
            'title': formData.title,
            'description': formData.description,
            'startTime': startTime?.toISOString(),
            'endTime': endTime?.toISOString(),
            'tagsId': formData.tags?.map((e) => (e.id)),
            'staffId': formData.participants?.map((e) => (e.id)),
            'groupsId': [],
            'recurringInterval': formData.recurringInterval,
            'recurringUnit': formData.recurringUnit,
            'recurringCount': formData.recurringCount,
            'recurringEndDate': formData.recurringEndDate,

        }

        console.log('data', cardDataForAxios)

        if (props.mode === 'create') {
            API.post(`/bookings`, cardDataForAxios)
                .then((response) => {
                    console.log('Booking successful:', response.data);
                    toast({
                        title: "Резервирование сохранено!",
                        duration: 5000,
                    })
                })
                .catch((error) => {
                    console.error('Error during booking:', error);
                    toast({
                        title: "Ошибка резервирования!",
                        duration: 5000,
                    })
                });
        } else {
            API.put(`/bookings`, cardDataForAxios)
                .then((response) => {
                    console.log('Booking successful:', response.data);
                    toast({
                        title: "Резервирование сохранено!",
                        duration: 5000,
                    })
                })
                .catch((error) => {
                    console.error('Error during booking:', error);
                    toast({
                        title: "Ошибка резервирования!",
                        variant: 'destructive',
                        description: "Возможно проблема со временем((",
                        duration: 5000,
                    })
                });
        }
    }

    return (
        <SheetContent className={sheetSize} side={adjustedSide}>
            <SheetHeader>
                {
                    props.mode == 'view' ?
                        isView ?
                            <SheetTitle>Информация о бронировании</SheetTitle>
                            :
                            <SheetTitle>Редактирование бронирования</SheetTitle>
                        :
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
                        disabled={isView}
                        className="col-span-3" value={formData.title}
                        onChange={handleInputChange}
                    />
                    {isTrySave && checkOnError('title', formData.title) &&
                        <p className='text-red-600 text-base'>{validateAnswer.title}</p>}
                </div>
                {(formData.description || !isView) &&
                    <div className="items-center gap-4">
                        <div className="w-full">
                            <Label id='description' className="text-right text-foreground">
                                Описание
                            </Label>
                            <Textarea id="description" placeholder="Напишите описание бронирования."
                                disabled={isView}

                                className="col-span-3" value={formData.description}
                                onChange={handleInputChange}
                            />

                            {/* {isTrySave && checkOnError('description', formData.description) &&
                                <p className='text-red-600 text-base'>{validateAnswer.description}</p>} */}
                        </div>
                    </div>
                }

                <div className="items-center gap-4">
                    <div className="w-full">
                        <Label id='room' className="text-right text-foreground">
                            Комната
                        </Label>
                        {isView ?
                            <div>
                                {formData.roomId ?
                                    <TagComponent tag={
                                        {
                                            id: formData.roomId.id,
                                            fullName: formData.roomId.label,
                                            color: '#5DDCED'
                                        }
                                    } />
                                    : <>...</>}
                            </div>
                            :
                            <PopupSelector<Option>
                                title='Введите номер комнаты'
                                buttonTitle='Укажите комнату'
                                options={moreInfo.allRoom.map((e) => ({
                                    id: e.id,
                                    label: e.name
                                }))}
                                fullData={formData.roomId ? [formData.roomId] as Option[] : formData.roomId}
                                type='room'
                                onChange={(selectedItems: Option[]) => {
                                    setFormData(prevData => ({
                                        ...prevData,
                                        roomId: selectedItems[0]
                                    }));
                                }}
                            />
                        }
                    </div>
                    {/* {isTrySave && checkOnError('room', formData.roomId) &&
                        <p className='text-red-600 text-base'>{validateAnswer.roomId}</p>} */}
                </div>
                {isView &&
                    <div className="items-center gap-4">
                        <Label htmlFor="name" className="text-right text-foreground">
                            Организатор
                        </Label>
                        <Input id="owner" type="text" placeholder="Введите название."
                            disabled={true}
                            className="col-span-3" value={props.data?.owner.value}
                        // onChange={handleInputChange}
                        />
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
                        {isTrySave && checkOnError('title', formData.title) &&
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
                {isTrySave && checkOnError('time', formData.startTime, formData.endTime) &&
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
                                        options={moreInfo.allTags.map((e) => ({
                                            id: e.id,
                                            label: e.fullName
                                        }))}
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
                    {isTrySave && checkOnError('tags', formData.tags) &&
                        <p className='text-red-600 text-base'>{validateAnswer.tags}</p>}

                </div>
                <div className="items-center gap-4">
                    <div className="w-full">
                        <Label id='description' className="text-right text-foreground">
                            Участники
                        </Label>
                        {isView ?
                            <div className="flex flex-row flex-wrap">
                                {formData.participants && formData.participants?.length ?
                                    formData.participants.map((e) => (
                                        <Badge
                                            key={e.id}
                                            variant="secondary"
                                            className="rounded-sm px-1 ml-1 mb-1 font-normal max-w-xs w-max"
                                        >{e.label}</Badge>

                                    ))

                                    : <>Никого(</>}
                            </div>
                            :
                            <PopupSelector<OptionParticipant>
                                title='Начните вводить имя или номер группы'
                                buttonTitle='Добавьте участников'
                                options={moreInfo.allParticipants.map((e) => ({
                                    id: e.id,
                                    label: e.fullName,
                                    type: 0
                                }))}
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
                    {isTrySave && checkOnError('participants', formData.participants) &&
                        <p className='text-red-600 text-base'>{validateAnswer.participant}</p>}
                </div>

                {

                    props.mode == 'create'
                        ?
                        <div className=" text-foreground">
                            <div className="flex items-center">
                                <input type="checkbox" className="recurring_check"
                                    onClick={
                                        e => {
                                            setRecurringShow(e.target.checked)
                                        }
                                    }
                                />
                                <div
                                    className="recurring_check_ps"
                                />
                                <Label style={{ marginLeft: '5px' }}>Переодичность</Label>
                            </div>
                            {isRecurringShow ?
                                <>
                                    <div className="mt-[10px] flex flex-row  items-center">
                                        Повторять с интервалом
                                        <input type="number" className="ml-[10px] bg-background border border-input rounded-md w-[58px] h-[1.6rem] pl-2" 
                                        onChange={(e)=>{
                                            const num:number = Number(e.target.value);

                                            setFormData((prevData) => ({
                                                ...prevData,
                                                recurringInterval: num
                                            }));
                                        }}/>
                                        <select
                                        id='recurringUnit'
                                        onChange={(e)=>{handleInputChange(e)}}
                                        name="select" className="ml-[15px] bg- border border-input rounded-md w-[5.7rem] h-[1.6rem]">
                                            <option value="DAY">дня</option>
                                            <option value="WEEK" selected>недели</option>
                                        </select>

                                    </div>
                                    <div className="flex flex-row  items-center mt-[10px]">
                                        <input type="radio" name="contact" className="reccuring_radio rra"
                                            onClick={() => {
                                                setRecurringParams({ date: false, replay: true });
                                            }}
                                        />
                                        <div className="reccuring_radio_circle" />
                                        <div className="reccuring_radio_ps " />
                                        <Label className={
                                            recurringParams.date ? "ml-[15px] mr-[15px] opacity-50" : "ml-[15px] mr-[15px] "
                                        }>
                                            Конечная дата
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    disabled={recurringParams.date}
                                                    className={cn(
                                                        "w-[50%] text-center text-foreground font-normal",
                                                        // !props.data && "text-sm"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    {formData.recurringEndDate ? format(formData.recurringEndDate, "PPP", { locale: ru }) :
                                                        <span className='text-muted-foreground'>Выберите конечную дату</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            {!isView &&
                                                <PopoverContent className="w-auto p-0">
                                                    <DayPicker mode="single"
                                                        locale={ru}
                                                        weekStartsOn={1}
                                                        fromDate={new Date()}
                                                        selected={formData.recurringEndDate}
                                                        onSelect={(value) => {
                                                            setFormData((prevData) => ({
                                                                ...prevData,
                                                                recurringEndDate: value,
                                                            }))
                                                        }} />
                                                </PopoverContent>}
                                        </Popover>


                                    </div>
                                    <div className="flex flex-row  items-center mt-[10px]">
                                        <input type="radio" name="contact" className="reccuring_radio" id="reccuring_radio"
                                            onClick={() => {
                                                setRecurringParams({ date: true, replay: false });
                                            }}
                                        />

                                        <div className="reccuring_radio_circle" />
                                        <div className="reccuring_radio_ps" />
                                        <Label className={
                                            recurringParams.replay ? "ml-[15px] mr-[15px] opacity-50" : "ml-[15px] mr-[15px] "
                                        }>
                                            Количество повторов
                                        </Label>
                                        <input id='recurringCount' type="number" disabled={recurringParams.replay}
                                            onChange={(e)=>{
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    'recurringEndDate': undefined,
                                                }))
                                                handleInputChange(e)
                                            }}
                                            className="bg-background border border-input w-[58px] rounded-md h-[1.6rem] pl-2 disabled:opacity-50" />
                                    </div>
                                </>
                                : <></>
                            }

                        </div>
                        :
                        <></>


                }

                {
                    props.mode == 'create' ?
                        <SheetFooter className='mb-5'>
                            <SheetClose asChild>
                                <Button type="submit"
                                    onClick={
                                        (e: React.MouseEvent<HTMLElement>) => {
                                            setTrySave(true)
                                            trySaveEditCard(e)
                                        }
                                    }
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
                                <div className="flex justify-between w-[80%] items-center ml-auto mr-auto">

                                    <SheetClose asChild><Button
                                        onClick={
                                            (e: React.MouseEvent<HTMLElement>) => {
                                                setTrySave(true);
                                                trySaveEditCard(e)

                                            }
                                        }
                                    >Сохранить</Button>
                                    </SheetClose>
                                    <Button onClick={() => {
                                        setFormData(getFormData(props.data))
                                        setIsView(true)
                                        setTrySave(false);
                                    }}>Отмена</Button>
                                </div>
                        }
                        </div>

                }

            </div>
        </SheetContent >


        //     <div className="items-center gap-4">
        //         <div className="w-full">
        //             <Label id='description' className="text-right text-foreground">
        //                 Владелец: <OwnerComponent owner={props.data.owner} />
        //             </Label>

    );
}
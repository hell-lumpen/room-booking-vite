import { Booking } from "../BookingCard/bookingModels";
import { OwnerComponent } from "../OwnerComponent/OwnerComponent";
import { TagComponent } from "../Tag/TagComponent";
import { Label } from "../ui/label";


const getFormatDate = (date: Date) => {
    const line_m: string[] = 'января, февраля, марта, апреля, мая, июня, июля, августа, сентября, октября, ноября, декабря'.split(',');
    return (
        <div>
            {date.getDate()} {line_m[date.getMonth()]}
        </div>
    );
}

const getFormatTime = (str: string): string => {
    const date = new Date(str);
    return (date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0'));
}


export const InformationBlock: React.FC<{ data: Booking }> = (props) => {


    return (
        <div className="grid gap-4 py-4">
            <div className="items-center gap-4">
                <h2>
                    {props.data.title}
                </h2>
            </div>
            {props.data.descriptions &&
                <div className="items-center gap-4">
                    <div className="w-full">
                        <Label id='description' className="text-right text-foreground">
                            Описание
                        </Label>
                        <Label>
                            {props.data.descriptions}
                        </Label>
                        {/* <Textarea id="description" placeholder="Напишите описание бронирования."
                                                  className="col-span-3" value={formData.description}
                                                  onChange={handleInputChange}/> */}
                    </div>
                </div>
            }
            <div className="items-center gap-4">
                <div className="w-full">
                    <Label id='description' className="text-right text-foreground">
                        Владелец: <OwnerComponent owner={props.data.owner}/>
                    </Label>
                    {/* <PopupSelector<OptionParticipant>
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
                    /> */}
                </div>
            </div>
            <div className="items-center gap-4">
                <div className="w-full">
                    <Label id='description' className="text-foreground">
                        Дата бронирования: {
                            getFormatDate(new Date(props.data.startTime))
                        }
                    </Label>

                    {/* <Popover>
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
                    </Popover> */}
                </div>
            </div>
            <div className="flex flex-row justify-between gap-4">
                <div className="flex items-center gap-1.5 md:gap-4">
                    <Label htmlFor="startTime" className="text-right text-foreground">
                        Начало: {getFormatTime(props.data.startTime)}
                    </Label>
                    {/* <div className='w-[90px]'>
                        <Input
                            id="startTime"
                            type="time"
                            className="block text-center before:text-muted-foreground"
                            value={formData.startTime}
                            onChange={handleInputChange}
                        />
                    </div> */}
                </div>

                <div className="flex items-center gap-1.5 md:gap-4">
                    <Label htmlFor="endTime" className="text-right text-foreground">
                        Окончание: {getFormatTime(props.data.endTime)}
                    </Label>
                    {/* <div className='w-[90px]'>
                        <Input
                            id="endTime"
                            type="time"
                            className="block text-center"
                            value={formData.endTime}
                            onChange={handleInputChange}
                        />
                    </div> */}
                </div>
            </div>
            <div className="items-center gap-4">
                <div className="w-full">
                    <Label id='description' className="text-right text-foreground">
                        Метки бронирования: <TagComponent tag={props.data.tag} tags={props.data.tags}/>

                    
                    </Label>
                    {/* <div className="w-full">
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
                    </div> */}
                </div>
            </div>

            <div className="items-center gap-4">
                <div className="w-full">
                    <Label id='description' className="text-right text-foreground">
                        Участники: {props.data.participants?props.data.participants.map((e)=>(<>{e.value}</>)):<>Никого(</>}
                    </Label>
                    {/* <PopupSelector<OptionParticipant>
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
                    /> */}
                </div>
            </div>

        </div>

    );
}
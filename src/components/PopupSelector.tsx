import * as React from "react";
import {useEffect} from "react";
import {CheckIcon, PlusCircledIcon} from "@radix-ui/react-icons";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {cn} from "@/lib/utils.ts";
import {Separator} from "@radix-ui/react-separator";
import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@/components/ui/hover-card"
import {RoomBookingFormData} from "@/models/bookingTypes.ts";

interface Tag {
    label: string;
    value: string;
    id: number;
    icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableFacetedFilterProps<T> {
    title?: string;
    buttonTitle?: string;
    options: Tag[];
    onChange?: (selectedItems: T[]) => void;
}

export function PopupSelector<T>({
                                     title,
                                     buttonTitle,
                                     options,
                                     onChange
                                 }: DataTableFacetedFilterProps<T>): React.ReactElement {
    const [selectedValues, setSelectedValues] = React.useState(new Set(null));


    const toggleSelection = (option: Tag) => {
        setSelectedValues(prevSelectedValues => {
            const newSelectedValues = new Set(prevSelectedValues);
            if (newSelectedValues.has(option)) {
                newSelectedValues.delete(option);
            } else {
                newSelectedValues.add(option);
            }
            return newSelectedValues;
        });

    };

// Сравнение предыдущего и текущего состояний
    const prevSelectedValuesRef = React.useRef(selectedValues);
    React.useEffect(() => {

        if (prevSelectedValuesRef.current !== selectedValues) {
            onChange && onChange(Array.from(selectedValues) as T[]);
            prevSelectedValuesRef.current = selectedValues;
        }
    }, [selectedValues]); // Убираем onChange из зависимостей

    return (
        <HoverCard>
            <Popover>
                <HoverCardTrigger>

                    <PopoverTrigger asChild>
                        <Button variant="outline"
                                className="p-1 flex flex-wrap h-auto w-full border-solid hover:text-muted-foreground text-muted-foreground">
                            <PlusCircledIcon className="mr-2 h-4 w-4 text-muted-foreground font-normal"/>
                            {buttonTitle}
                            {selectedValues.size > 0 && (
                                <>
                                    <Separator orientation="vertical" className="mx-2 h-4"/>

                                    <div className="space-x-1 flex flex-wrap my-0 mx-1">
                                        {selectedValues.size > 4 ? (
                                            <Badge
                                                variant="secondary"
                                                className="rounded-sm px-1 m-0 font-normal"
                                            >
                                                {selectedValues.size} выбрано
                                            </Badge>
                                        ) : (
                                            <>
                                                <div className="mt-1 flex flex-wrap">
                                                    {Array.from(selectedValues).map((option) => (
                                                        <Badge
                                                            variant="secondary"
                                                            key={option.value}
                                                            className="rounded-sm px-1 ml-1 mb-1 font-normal max-w-xs"
                                                        >
                                                            {option.label}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </Button>
                    </PopoverTrigger>
                </HoverCardTrigger>

                <PopoverContent className="w-[320px] md:w-[420px] p-0" align="center">
                    <Command>
                        <CommandInput placeholder={title || 'placeholder'}/>
                        <CommandList>
                            <CommandEmpty>Ничего не найдено</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected = selectedValues.has(option);
                                    return (
                                        <CommandItem
                                            key={option.id}
                                            onSelect={() => toggleSelection(option)}
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible"
                                                )}
                                            >
                                                <CheckIcon className={cn("h-4 w-4")}/>
                                            </div>
                                            <span>{option.label}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            {selectedValues.size > 0 && (
                                <>
                                    <CommandSeparator/>
                                    <CommandGroup>
                                        <CommandItem
                                            onSelect={() => setSelectedValues(new Set())}
                                            className="h-8 justify-center text-center"
                                        >
                                            Очистить выбор
                                        </CommandItem>
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
                {selectedValues.size > 4 && (
                    <HoverCardContent>
                        <h4>Выбранные элементы</h4>
                        <div className="mt-1 flex flex-wrap">
                            {Array.from(selectedValues).map((option) => (
                                <Badge
                                    variant="secondary"
                                    key={option.value}
                                    className="rounded-sm px-1 m-1 font-normal max-w-xs"
                                >
                                    {option.label}
                                </Badge>
                            ))}
                        </div>
                    </HoverCardContent>
                )}
            </Popover>
        </HoverCard>
    );
}

export default PopupSelector;
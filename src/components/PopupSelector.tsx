import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { cn } from "@/lib/utils.ts";
import { Separator } from "@radix-ui/react-separator";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import { Option, OptionParticipant, OptionTag, RoomBookingFormData } from '@/models/bookingTypes.ts'
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

interface DataTableFacetedFilterProps<T extends Option> {
    title?: string;
    buttonTitle?: string;
    options: T[];
    fullData?: T[];
    type?: 'tag' | 'participant'
    onChange?: (selectedItems: T[]) => void;
}

export function PopupSelector<T extends Option>({
    title,
    buttonTitle,
    options,
    fullData,
    type,
    onChange
}: DataTableFacetedFilterProps<T>): React.ReactElement {
    let initialState = new Set<OptionTag | OptionParticipant>();
    if (fullData) {
        if (type === 'participant')
            initialState = new Set(fullData);
        else if (type === 'tag') {
            initialState = new Set(fullData);
        }

    }

    const [selectedValues, setSelectedValues] = React.useState(initialState);

    const toggleSelection = (option: T) => {
        setSelectedValues(prevSelectedValues => {
            const newSelectedValues = new Set(prevSelectedValues);
            let isHas = false;
            let ele;
            newSelectedValues.forEach((e) => {
                if (e.id == option.id && e.label == option.label) {
                    isHas = true
                    ele = e;
                }
            })
            if (isHas && ele) {
                newSelectedValues.delete(ele);
            } else {
                newSelectedValues.add(option);
            }
            return newSelectedValues;
        });

    };

    React.useEffect(() => {
        onChange && onChange(Array.from(selectedValues) as T[]);
    }, [selectedValues]);

    return (
        <HoverCard>
            <Popover>
                <HoverCardTrigger>

                    <PopoverTrigger asChild>
                        <Button variant="outline"
                            className="p-1 flex flex-wrap h-auto w-full border-solid hover:text-muted-foreground text-muted-foreground">
                            <PlusCircledIcon className="mr-2 h-4 w-4 text-muted-foreground font-normal" />
                            {buttonTitle}
                            {selectedValues.size > 0 && (
                                <>
                                    <Separator orientation="vertical" className="mx-2 h-4" />

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
                                                            key={option.id}
                                                            variant="secondary"
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
                    <Command className="z-51">
                        <CommandInput placeholder={title || 'placeholder'} />
                        <CommandList>
                            <CommandEmpty>
                                <div role="img" aria-label="thinking">🤔</div>
                                Ничего не найдено. Попробуйте изменить запрос!
                            </CommandEmpty>
                            <ScrollArea aria-orientation='vertical' className="h-max-[300px]">
                                <CommandGroup>
                                    {options.map((option) => {
                                        let isSelected = selectedValues.has(option);
                                        selectedValues.forEach((e) => {
                                            if (e.id === option.id && e.label === option.label) {
                                                isSelected = true;
                                            }
                                        });
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
                                                    <CheckIcon className={cn("h-4 w-4")} />
                                                </div>
                                                <span>{option.label}</span>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </ScrollArea>
                            {selectedValues.size > 0 && (
                                <>
                                    <CommandSeparator />
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
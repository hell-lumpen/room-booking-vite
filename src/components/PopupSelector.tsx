import * as React from "react"
import {CheckIcon, PlusCircledIcon} from "@radix-ui/react-icons"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Separator} from "@/components/ui/separator"
import {cn} from "@/lib/utils.ts";

interface Tag {
    label: string;
    value: string;
    id: number;
    icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableFacetedFilterProps {
    title?: string
    options: Tag[]
}

export function PopupSelector({
                                  title,
                                  options,
                              }: DataTableFacetedFilterProps) {
    const selectedValues = new Set<Tag>();

    const optionValues = options.map((option) => {
        return {isSelected: false, option: option}
    })

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="w-full h-8 border-solid">
                    <PlusCircledIcon className="mr-2 h-4 w-4 text-muted-foreground"/>
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4"/>
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} выбрано
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] md:w-[420px] p-0" align="center">
                <Command>
                    <CommandInput placeholder={title || 'placeholder'}/>
                    <CommandList>
                        <CommandEmpty>Ничего не найдено</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option)
                                console.log(isSelected)
                                return (
                                    <CommandItem
                                        key={option.id}
                                        onSelect={(e) => {
                                            console.log(e)
                                            // const isPresent = !Array.from(selectedValues).some(o => o.value === e);

                                            if (isSelected) {
                                                selectedValues.delete(option)
                                            } else {
                                                selectedValues.add(option)
                                            }

                                            const filterValues = Array.from(selectedValues);
                                            console.log(filterValues);
                                            console.log(optionValues);
                                        }}
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
                                        <span className={isSelected ? 'bg-red-700' : ''}>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator/>
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => console.log(selectedValues)}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default PopupSelector;
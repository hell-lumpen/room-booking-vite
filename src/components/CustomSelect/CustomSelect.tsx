import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select"


export const CustomSelect: React.FC<{ hint: string, values: {id:number, name:string}[], callback: (value:string)=>void }> = (props) => {


    return (
        <Select onValueChange={(e)=>{
                props.callback(e);
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={props.hint} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {props.values.map((value) => (
                        <SelectItem value={String(value.id)}>{value.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );

}
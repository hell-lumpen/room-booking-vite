import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useAuth} from "@/context/AuthContext/AuthUserContext.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {LogOut, User} from "lucide-react";

function getShortUserName(input: string | undefined): string {
    if (!input) return 'UN'
    const words = input.split(/\s+/);
    if (words.length < 3) {
        return input.substring(0, 2);
    }
    return (words[1].charAt(0) + words[2].charAt(0)).toUpperCase();
}

export function UserNav() {
    const [user, ] = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="relative h-12 w-12 rounded-full font-semibold text-lg">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn"/>
                        <AvatarFallback>{getShortUserName(user?.fullName)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto font-light" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 p-2">
                        <p className="text-lg font-normal">{user?.fullName}</p>
                        <p className="text-muted-foreground">Роль: {user?.role}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup className='font-normal'>
                    <DropdownMenuItem className='flex items-center hover:bg-secondary'>
                        <div className='mr-3 text-foreground'>
                            <User size='1.4rem'/>
                        </div>
                        <p className="p-2 text-base">Профиль</p>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className='flex items-center hover:bg-secondary'>
                    <div className='mr-3 text-foreground opacity-[50%]'>
                        <LogOut size='1.4rem'/>
                    </div>
                    <p className="p-2 text-muted-foreground text-base font-normal">Выйти</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
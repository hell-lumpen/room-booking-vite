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
import {useAuthenticatedUserState} from "@/context/AuthContext/AuthUserContext.ts";
import {Separator} from "@/components/ui/separator.tsx";

function getShortUserName(input: string | undefined): string {
    if (!input) return 'UN'
    const words = input.split(/\s+/);
    if (words.length < 3) {
        return input.substring(0, 2);
    }
    return (words[1].charAt(0) + words[2].charAt(0)).toUpperCase();
}

export function UserNav() {
    const [user, ] = useAuthenticatedUserState();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="relative h-12 w-12 rounded-full">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn"/>
                        <AvatarFallback>{getShortUserName(user?.fullName)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="pb-2 text-lg">{user?.fullName}</p>
                        <Separator orientation={"horizontal"} />
                        <p className="">Роль: {user?.role}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
import {FunctionComponent, useState} from 'react';
import BrandHeader from "@/components/BrandHeader.tsx";
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import '@/styles/global.css'
import {UserNav} from "@/components/UserProfile.tsx";

const Header: FunctionComponent = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    return (
        <div className='p-3 flex justify-between items-center flex-row'>
            {/* <Button variant='clear'>

            </Button> */}
            <BrandHeader />
            <div className='flex items-center justify-between w-auto'>
                <UserNav/>
                <Button
                    variant='clear'
                    className='rounded-full border-none hover-hover:bg-accent focus:none bg-background p-2.5 h-12 w-12'
                    onClick={
                        () => {
                            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                                document.documentElement.setAttribute('data-theme', 'light');
                                setTheme('light')
                            } else {
                                document.documentElement.setAttribute('data-theme', 'dark');
                                setTheme('dark')
                            }
                        }
                    }>
                    {theme === 'dark'
                        ? <Moon className='text-foreground bg-none'/>
                        : <Sun className='text-foreground bg-none'/>}
                </Button>
            </div>
        </div>
    );
};

export default Header;

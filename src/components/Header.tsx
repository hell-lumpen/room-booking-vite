import {FunctionComponent, useState} from 'react';
import BrandHeader from "@/components/BrandHeader.tsx";
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import '@/styles/global.css'

const Header: FunctionComponent = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    return (
        <div className='p-3 flex justify-between flex-row items-center'>
            <BrandHeader/>
            <Button className='rounded-full border-foreground hover:bg-background focus:none bg-background p-2.5 h-[40px] w-[40px]' onClick={
                () => {
                    if (document.documentElement.getAttribute('data-theme') === 'dark') {
                        // document.documentElement.removeAttribute('data-theme')
                        document.documentElement.setAttribute('data-theme', 'light');
                        setTheme('light')
                    } else {
                        document.documentElement.setAttribute('data-theme', 'dark');
                        setTheme('dark')
                    }
                }


            }>{theme === 'dark' ? <Moon className='text-foreground bg-none'/> :
                <Sun className='text-foreground bg-none'/>}</Button>
        </div>
    );
};

export default Header;

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
            <Button className='p-1 h-[30px] w-[30px]' onClick={
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


            }>{theme === 'dark' ? <Moon/> : <Sun/>}</Button>
        </div>
    );
};

export default Header;

import BrandLogo from "@/assets/images/BrandLogo.tsx";
import '@/styles/global.css'
import { useHistory } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Sidebar } from "./Sidebar/Sidebar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { SidebarNavUnits } from "@/App";

const BrandHeader = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/main");
    };

    return (
        <div
            className="flex items-center max-w-screen p-2 pb-0 md:max-w-full"
        >

            <div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline"><Menu className='text-primary' /></Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='br-1'>
                        <SheetHeader>
                            <SheetTitle>
                                <h1 className="text-4xl font-extrabold tracking-tight text-primary text-center">
                                    Smart Campus
                                </h1>

                            </SheetTitle>
                        </SheetHeader>

                        <Sidebar navUnits={SidebarNavUnits} />
                    </SheetContent>
                </Sheet>


            </div>
            <div onClick={handleClick} className="flex lg:flex-row items-center max-w-screen p-2 pb-0 md:max-w-full cursor-pointer">
                <div className="hidden lg:block w-auto h-full mr-2">
                    <BrandLogo color={"hsl(var(--primary))"} imageHeight={60} className='max-w-full h-auto' />
                </div>
                <div className="flex flex-col ml-2">
                    <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-primary">
                        Smart Campus
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default BrandHeader;
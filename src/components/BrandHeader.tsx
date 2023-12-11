import BrandLogo from "@/assets/images/BrandLogo.tsx";
import '@/styles/global.css'
import {useHistory} from "react-router-dom";

const BrandHeader = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/main");
    };

    return (
        <div
            className="flex items-center max-w-screen p-2 pb-0 md:max-w-full cursor-pointer"
            onClick={handleClick}
        >
            <div className="w-auto h-full mr-2">
                <BrandLogo color={"hsl(var(--primary))"} imageHeight={60} className={'max-w-full h-auto'}/>
            </div>
            <div className="flex flex-col ml-2">
                <h1 className="text-4xl font-extrabold tracking-tight text-primary">
                    Smart Campus
                </h1>
                {/*<p className="text-secondary-foreground text-sm">Оптимизация рабочих процессов</p>*/}
            </div>
        </div>
    );
};

export default BrandHeader;
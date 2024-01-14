import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import '@/styles/global.css'

interface SidebarProps {
    navUnits: { text: string; icon: JSX.Element, path: string }[];
}

export function Sidebar({ navUnits }: SidebarProps) {
    return (
        <div className="space-y-4 py-4">
            <div className="px-3 py-2">
                <div className="space-y-1">
                    {navUnits.map((button, index) => (
                        <Link key={index} to={button.path}>
                            <Button variant="clear" className="min-w-[150px] w-full bg-background hover:bg-secondary text-foreground justify-start mb-2
                            lg:text-lg text-base
                            ">
                                <div className='flex items-center font-light '>
                                    <div className='mr-3 text-foreground  opacity-[50%]'>
                                    {button.icon}
                                    </div>
                                    {button.text}
                                </div>
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

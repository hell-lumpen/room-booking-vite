import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SidebarProps {
    navUnits: { text: string; path: string }[];
}

export function Sidebar({ navUnits }: SidebarProps) {
    return (
        <div className="space-y-4 py-4">
            <div className="px-3 py-2">
                <div className="space-y-1">
                    {navUnits.map((button, index) => (
                        <Link key={index} to={button.path}>
                            <Button variant="default" className="w-full justify-start mb-2">
                                {button.text}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

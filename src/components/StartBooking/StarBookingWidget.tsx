import './StarBooking.css'
import '@/styles/global.css'
import {ConfigProvider, Timeline} from "antd";
import {CircleDot} from "lucide-react";

export const StarBookingWidget = () => {
    // const dot = <CircleDashed/>;
    const dot = <div className='p-0 bg-red-700'><CircleDot className={'icon'}/></div>
    // const dot = <CircleDashed  className={'icon'}/>;
    const timeline_data = [
        {
            label: <div className='time-star-booking'>09:00 - 10:00</div>,
            children: <div className='time-star-title'>Криптография</div>,
            dot: dot
        },
        {
            label: <div className='time-star-booking'>10:30 - 10:45</div>,
            children: <div className='time-star-title'>Фундаментальная информатика</div>,
            dot: dot
        },
        {
            label: <div className='time-star-booking'>12:00 - 12:15</div>,
            children: <div className='time-star-title'>Совещание</div>,
            dot: dot
        }
    ];


    return (
        <div className='time-star-major'>
            <div className='time-star-major-con '>
                <ConfigProvider
                    theme={{
                        components: {
                            Timeline: {
                                // tailColor:'white'
                                // tailWidth:3,
                                tailColor: 'grey',
                            },
                        },
                    }}
                >

                    <Timeline
                        mode={'left'}
                        items={timeline_data}
                    >


                    </Timeline>
                </ConfigProvider>
            </div>
        </div>
    );

}
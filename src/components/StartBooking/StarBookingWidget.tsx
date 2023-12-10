import './StarBooking.css'
import '@/styles/global.css'
import {ConfigProvider, Timeline} from "antd";
import {CircleDashed, CircleDot} from "lucide-react";

export const StarBookingWidget = () => {
    // const dot = <CircleDashed/>;
    const dot = <CircleDot strokeWidth={2.9} className={'icon'}/>
    // const dot = <CircleDashed  className={'icon'}/>;
    const timeline_data = [
        {
            label: <div className='time-star-booking'>09:00 - 10:00</div>,
            children: <div className='time-star-title'>Криптография</div>,
            dot:dot
        },
        {
            label: <div className='time-star-booking'>10:30 - 10:45</div>,
            children: <div className='time-star-title'>Фундоментальная информатика</div>,
            dot:dot
        },
        {
            label: <div className='time-star-booking'>12:00 - 12:15</div>,
            children: <div className='time-star-title'>Совещание</div>,
            dot:dot
        }


    ];



    return(
        <div className='time-star-major'>
            <div className='time-star-major-con '>
            <ConfigProvider
                theme={{
                    components:{
                        Timeline:{
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
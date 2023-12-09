import './StarBooking.css'
import '@/styles/global.css'
import {ConfigProvider, Timeline} from "antd";
import {CircleDashed, CircleDot} from "lucide-react";
import React from "react";

export const StarBookingWidget = () => {
    // const dot = <CircleDashed/>;
    const dot = <CircleDashed  className={'icon'}/>;
    const timeline_data = [
        {
            label: <div className='time-star-booking'>09:00 - 10:00</div>,
            children: <div className='bg-rose-500'>Криптография</div>,
            dot:dot
        },
        {
            label: <div className='time-star-booking'>10:30 - 10:45</div>,
            children: <div className='bg-rose-500'>Фундоментальная информатика</div>,

            dot:dot
        },
        {
            label: <div className='time-star-booking'>12:00 - 12:15</div>,
            children: <div className='bg-rose-500'>Совещание</div>,


            dot:dot
        }


    ];



    return(
        <>

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
        </>

    );

}
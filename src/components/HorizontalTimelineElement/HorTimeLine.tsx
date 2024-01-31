
import { BookingsByRoom } from '../BookingCard/bookingModels';
import { InformationBlock } from '../InformationBlock/InformationBlock';
import { Sheet, SheetTrigger } from '../ui/sheet';
import './HorTimeLine.css'
import '@/styles/global.css'
import style from './HorTimeLine.module.css'


const getTimes = (): { time: string, pos: number }[] => {
    const result: { time: string, pos: number }[] = [];
    let dat = new Date();
    const minute = 15;
    dat.setHours(8);
    dat.setMinutes(0);
    let i = 0;
    for (; dat.getHours() < 23;) {
        result.push({ time: dat.getHours().toString().padStart(2, '0') + ':' + dat.getMinutes().toString().padStart(2, '0'), pos: i });
        dat = new Date(dat.getTime() + 1000 * 60 * minute);
        i += minute
    }
    return result;
}

const getCells = (n: number) => {
    const cells = [];
    for (let _i = 2; _i <= n; _i += 1) {
        for (let i = 2; i <= 1800; i += 2) {
            cells.push(
                <div
                    id={'cell_' + _i + '_' + i}
                    style={{
                        gridColumnStart: i,
                        gridColumnEnd: i + 30,
                        gridRowStart: _i,
                        gridRowEnd: _i + 1,
                        zIndex: 6
                    }}
                    onClick={() => { console.log('click', _i + ' ' + i) }}
                ></div>
            );
        }
    }

    return cells;
}

export const HorTimeLine: React.FC<{ booking: BookingsByRoom[], rooms: string[] }> = (props) => {
    // auto-cols-[100px]
    // grid-rows-${rooms.length+1} grid-cols-${getTimes().length+2}
    const styleTime = {
        "gridColumnStart": 1,
        "gridColumnEnd": 1800,
        "gridRowStart": 1,
        "gridRowEnd": 2,
    } as React.CSSProperties;
    //w-[100%]  max-w-[700px] max-h-[700px] overflow-hidden
    return (
        <div className='h-[700px] lg:max-w-[45vw] max-w-[60vw] overflow-scroll mm'
            style={{
                'border': '2px solid #767877',
                'borderRadius': '10px',
                'marginLeft' : 'auto',
                'marginRight' : 'auto',
            }}
        >
            <div style={{
                //h-[700px] w-[55vw] overflow-scroll  
                gridTemplateColumns: '100px repeat(1800, minmax(1px, 5px))',
                // gridAutoColumns: 'minmax(100px, 20px)'
            }} className="grid w-[max-content]" >
                <div style={styleTime} className='tt' />

                <div style={{
                    "gridColumnStart": 1,
                    "gridColumnEnd": 2,
                    "gridRowStart": 1,
                    "gridRowEnd": 2,
                    'borderRight': '1px solid #757575',
                    'borderBottom': '1px solid #757575',
                    'zIndex':10,
                    'position':'sticky',
                    'left':0,
                    'top':0,
                    'backgroundColor': 'rgba(var(--background))',
                    // 'width': 'max-content'
                }}/>

                {false && getCells(props.rooms.length).map((e) => (e))}

                {true && getTimes().map((time, index) => {
                    const style0 = {
                        "gridColumnStart": time.pos * 2 + 2,
                        "gridColumnEnd": time.pos * 2 + 4,
                        "gridRowStart": 1,
                        "gridRowEnd": 2,
                        "textAlign": 'center'
                    } as React.CSSProperties;
                    return (<div key={'time_' + index} id={'time_' + index}
                        style={style0} className='z-[5] sticky top-0'
                    >
                        <span className="">
                            {time.time}
                        </span>
                    </div>);
                })}

                {true && props.rooms.map((room, index) => {
                    const style0 = {
                        "gridColumnStart": 1,
                        "gridColumnEnd": 2,
                        "gridRowStart": index + 2,
                        "gridRowEnd": index + 3,
                    } as React.CSSProperties;

                    const style1 = {
                        "gridColumnStart": 2,
                        "gridColumnEnd": 1800,
                        "gridRowStart": index + 2,
                        "gridRowEnd": index + 3,
                    } as React.CSSProperties;

                    return (
                        <>
                            <div key={'room_' + index} id={'room_' + index}
                                style={style0} className="asd">
                                <span>
                                    {room}
                                </span>
                            </div>

                            <div style={style1} className='border' />
                        </>
                    );
                })}

                {true && props.booking.map((element) => {
                    const index = props.rooms.indexOf(element.name.value)
                    return (
                        element.bookings.map((el) => {
                            const s_time = new Date(el.startTime);
                            const e_time = new Date(el.endTime);
                            const col_i_s = (s_time.getHours() - 8) * 60 + s_time.getMinutes()
                            const col_i_e = (e_time.getHours() - 8) * 60 + e_time.getMinutes()
                            const style1 = {
                                "gridColumnStart": col_i_s * 2 + 2 + 2,
                                "gridColumnEnd": col_i_e * 2 + 2 + 2,
                                "gridRowStart": index + 2,
                                "gridRowEnd": index + 3,
                                'backgroundColor': el?.tags && el.tags[0].color + '55',
                                'border': '1px solid #757575',
                                'borderRadius': '5px'
                                // 'width': 'max-content'
                            } as React.CSSProperties;
                            return (
                                <div key={'room_' + index} id={'room_' + index}
                                    style={style1}
                                // onClick={(e) => { e.preventDefault() }}
                                >
                                    <Sheet>
                                        <SheetTrigger className='text-left w-full h-full border-none' >
                                            <>
                                                <div className={style.titleContainer}>
                                                    <div className={style.bookingTitle}>{el.title}</div>
                                                    <div className={style.bookingTag}
                                                        style={{ backgroundColor: el.tags && el.tags[0].color }}>
                                                        {el.tags && el.tags[0].fullName}
                                                    </div>
                                                </div>
                                                <div className={style.bookingOwner}>{el.owner.value}</div>
                                            </>
                                        </SheetTrigger>

                                        <InformationBlock data={el} mode='view' />
                                    </Sheet>


                                </div>

                            );

                        })

                    );

                })}
            </div>
        </div>
    );

}
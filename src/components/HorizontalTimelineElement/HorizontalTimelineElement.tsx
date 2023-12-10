import style from './HorizontalTimelineElement.module.css'
import React, {useEffect, useState} from "react";
import {HorizontalTimelineDataElement} from "./HorizontalTimelineDataElement";
import {HorizontalTimelineTimeCont} from "./HorizontalTimelineTimeCont";
import {BookingsByRoom} from "@/components/BookingCard/bookingModels.ts";


export interface bookingData {
    startTime?: string,
    endTime?: string,
    bookingTitle?: string,
    bookingRoom?: string,
    bookingOwner?: string,
    tags?: { label: string, color: string }[],
}


const getTimeFromDate = (datestr: string): string => {
    let date = new Date(datestr);
    return (date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0'));
}

export const HorizontalTimelineElement: React.FC<{ booking: BookingsByRoom[] }> = ({booking}) => {

    const getCoords = (time_start: string, time_end: string, roomName: string) => {
        let zone_start_time = document.getElementById('timeline_' + time_start);
        // console.log('time', zone_start_time);

        let zone_end_time = document.getElementById('timeline_' + time_end);
        let zone_0 = document.getElementById('timeline_' + '08:00');
        let zone_room = document.getElementById('room_' + roomName);
        if (zone_0 === null || zone_start_time === null || zone_end_time === null || zone_room === null) {
            return {x: 0, y: 0, w: 0, h: 0};
        }


        let x, y, w, h;
        y = zone_room.offsetTop;
        h = zone_room.offsetHeight;

        x = zone_start_time.offsetLeft + zone_start_time.offsetWidth / 2;
        w = zone_end_time.offsetLeft + zone_end_time.offsetWidth / 2 - x;

        x -= zone_0.offsetLeft;
        return {x: x, y: y, w: w - 1, h: h};
    }


    const rooms: string[] = [
        'Лекторий IT-5',
        'Лаборатория IT-6',
        'Видеостудия IT-7',
        'Лаборатория IT-8',
        'Лаборатория IT-9',
        'Переговорная IT-10',
        'Шахматный клуб IT-11',
        'ИТ-центр (IT-12)',
        'ИТ-центр (IT-13)',
        'Компьютерный класс IT-15',
        'Учебная аудитория IT-16',
        'Компьютерный класс IT-17',
        'IT-18',
        'IT-19',
    ];

    // const [dataOfRoom, setDataOfRoom] = useState<{
    //     roomTitle: string,
    //     data: {
    //         x: number,
    //         w: number,
    //         data: bookingData,
    //
    //     }[]
    // }[]
    // >([]);

    const [times1, setTimes] = useState<string[]>([])
    const [additionalCount, setAdditionalCount] = useState<number>(15);
    const [bb, setBB] = useState<BookingsByRoom[]>();

    const getTimes = (): string[] => {
        let result: string[] = [];
        let dat = new Date();
        dat.setHours(8);
        dat.setMinutes(0);
        for (; dat.getHours() < 23;) {
            result.push(dat.getHours().toString().padStart(2, '0') + ':' + dat.getMinutes().toString().padStart(2, '0'));
            dat = new Date(dat.getTime() + 1000 * 60 * additionalCount);
        }
        return result;
    }


    useEffect(() => {
        // console.log('log');
        setTimes(getTimes());
    }, []);

    useEffect(() => {
        // console.log('log2');
        setTimes(getTimes());
    }, [additionalCount]);


    useEffect(() => {
        // console.log('log3', times1.length);
        if(booking.length>0){
            setBB(booking);
        }

            let time_container = document.getElementsByClassName(style.horTimelineTimeContainer) as HTMLCollectionOf<HTMLElement>;
            if (time_container[0] !== null) {
                time_container[0].style.width = `${time_container[0].scrollWidth}px`;
            }

            let elements = document.getElementsByClassName(style.horTimelineRoomRow) as HTMLCollectionOf<HTMLElement>
            let timeCont = document.getElementsByClassName(style.horTimelineTimeContainer) as HTMLCollectionOf<HTMLElement>;
            if (timeCont[0] !== null) {
                for (let i = 0; i < elements.length; i++) {

                    elements[i].style.width = `${timeCont[0].scrollWidth}px`;
                }
            }
        },[times1]);

    useEffect(() => {
        // console.log('log4',booking.length)
        if(booking.length>0){
            setBB(booking);
        }

    }, [booking]);
    const increase = () => {
        setAdditionalCount((prevState) => {
            let a = prevState;
            switch (prevState) {
                case 1:
                    a = 5;
                    break;
                case 5:
                    a = 15;
                    break;
            }
            console.log('a', a);
            return a;
        })
        // setTimes(getTimes());
    }


    const decrease = () => {
        setAdditionalCount((prevState) => {
            let a = prevState;
            switch (prevState) {
                case 5:
                    a = 1;
                    break;
                case 15:
                    a = 5;
                    break;
            }
            console.log('a', a);
            return a;
        })
        // setTimes(getTimes());
    }

    return (
        <div className={style.horTimelineMain}>
            {/*<div>*/}
            {/*    <button onClick={increase}>Больше</button>*/}
            {/*    <button onClick={decrease}>Меньше</button>*/}

            {/*</div>*/}
            <HorizontalTimelineTimeCont times={getTimes()}/>
            {rooms.map((room) => {
                return (
                    <div className={style.horTimelineRoomRow}>

                        <div id={'room_' + room} className={style.horTimelineRoomTitle}>
                            {room}
                        </div>


                        <div className={style.horTimelineRoomData}>
                            {bb && bb.length>0 && bb.map((roomD) => {
                                //                                 // return null;
                                if (roomD.room.value === room) {
                                    return (roomD.bookings.map((element) => {

                                            let coord = getCoords(getTimeFromDate(element.startTime), getTimeFromDate(element.endTime), roomD.room.value);
                                            let d:bookingData = {
                                                bookingTitle: element.title,
                                                bookingOwner: element.owner.value,
                                                tags: [{
                                                    label: element.tag.fullName,
                                                    color: element.tag.color,
                                                }],
                                            }
                                            return (
                                                <HorizontalTimelineDataElement
                                                    x={coord.x}
                                                    width={coord.w}
                                                    data={d}
                                                />
                                            );
                                        })
                                    );
                                }
                                return null;
                            })}
                            {/*<HorizontalTimelineDataElement title={'Первый'} x={0} width={80}/>*/}
                            {/*<HorizontalTimelineDataElement title={'Второй'} x={0} width={80}/>*/}
                        </div>
                    </div>
                );
            })}
        </div>
    );

}
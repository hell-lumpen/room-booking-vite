import style from './HorizontalTimelineDataElement.module.css'
import React from "react";
import {bookingData} from "./HorizontalTimelineElement";


interface HorizontalTimelineProps {
    x: number;
    width: number;
    data?: bookingData;

}

export const HorizontalTimelineDataElement: React.FC<HorizontalTimelineProps> = ({x, width, data}) => {
    return (
        <div className={style.timelineData}
             style={{
                 left: x,
                 width: width,
                 backgroundColor: data?.tags && data.tags[0].color + '55'
             }}
        >
            <div className={style.titleContainer}>
                <div className={style.bookingTitle}>{data?.bookingTitle}</div>
                <div className={style.bookingTag} style={{backgroundColor: data?.tags && data.tags[0].color}}>{data?.tags && data.tags[0].label}</div>
            </div>
            <div className={style.bookingOwner}>{data?.bookingOwner}</div>
        </div>
    );

}
import React from 'react';
import styles from './BookingCard.module.css';
import './BookingCardC.css'
import {Booking} from "./bookingModels";
import {User} from "lucide-react";
import '@/styles/global.css'

const getFormatTime=(str:string):string=>{
    const date = new Date(str);
    return(date.getHours().toString().padStart(2,'0')+':'+date.getMinutes().toString().padStart(2,'0'));
}

const BookingCard: React.FC<Booking> = (booking) => {
    return (
        <div className='booking-card-wrapper1 rounded-lg border  shadow-sm'>
            <div className={styles['time-block']}>
                <span> {getFormatTime(booking.startTime)} </span>
                <br/>
                <span>&#8640;</span>
                <br/>
                <span> {getFormatTime(booking.endTime)} </span>
            </div>
            <div className={styles['content-block']}>
                <div className={styles['booking-title']}>
                    {booking.title}
                </div>
                {booking.tags && booking.tags.length > 0 && (
                    <div className={styles['booking-tags']}>
                        {booking.tags.map((tag, index) => (

                            <div
                                key={index}
                                className={styles['booking-tag']}
                                style={{backgroundColor: tag.color}}
                            >
                                {tag.fullName}
                            </div>
                        ))}
                    </div>
                )
                }

                {
                    booking.tag&&(
                        <div
                            key={booking.tag.id}
                            className={styles['booking-tag']}
                            style={{backgroundColor: booking.tag.color}}
                        >
                            {booking.tag.fullName}
                        </div>
                    )

                }
                <div className={styles['booking-owner']}>
                    {/*<span className={`material-icons ${styles['icon']}`}>person</span>*/}
                    <User strokeWidth={2} height={20} />
                    <span >{booking.owner.value}</span>
                </div>

                {booking.participants && (
                    <div className={styles['booking-tags']}>
                        <span className={`material-icons ${styles['icon']}`}>group</span>
                        {booking.participants.map((participant, index) => {
                            let backgroundColor;

                            if ('name' in participant) {
                                backgroundColor = '#FFD9EC'; // Розовый
                            } else if ('fullName' in participant) {
                                backgroundColor = '#B4E1D2'; // Зеленый
                            } else {
                                backgroundColor = '#E0E0E0';
                            }

                            return (
                                <div key={index} className={styles['booking-tag']} style={{ backgroundColor }}>
                                    {('name' in participant) ? participant.value : participant.value}
                                </div>
                                );
                        })}
                    </div>
                    )}
            </div>
        </div>
    );
};

export default BookingCard;
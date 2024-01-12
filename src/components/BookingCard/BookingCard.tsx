import React from 'react';
import styles from './BookingCard.module.css';
import './BookingCardC.css'
import {Booking} from "./bookingModels";
import {User} from "lucide-react";
import '@/styles/global.css'
import { TagComponent } from '../Tag/TagComponent';
import { OwnerComponent } from '../OwnerComponent/OwnerComponent';

const getFormatTime = (str: string): string => {
    const date = new Date(str);
    return (date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0'));
}



const BookingCard: React.FC<Booking> = (booking) => {
    return (
        <div className='booking-card-wrapper1 rounded-lg border shadow-sm'>
            <div className={styles['time-block']}>
                <span> {getFormatTime(booking.startTime)} </span>
                <br/>
                <span>&#8640;</span>
                <br/>
                <span> {getFormatTime(booking.endTime)} </span>
            </div>
            <div className={styles['content-block']}>
                <div className={styles['booking-title']}>
                    <span>{booking.title}</span>
                    {/* <span className={styles['booking-audience']}>{booking.audience && booking.audience}</span> */}
                </div>
                {booking.room&&
                <div className={styles['booking-audience']}>
                    Аудитория: {booking.room.value}
                </div>
                }

                <TagComponent tag={booking.tag} tags={booking.tags}/>
 
                <OwnerComponent owner={booking.owner}/>

                

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
                                <div key={index} className={styles['booking-tag']} style={{backgroundColor}}>
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
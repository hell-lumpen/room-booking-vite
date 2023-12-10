import React from 'react';
import styles from './BookingDetailsCard.module.css';
// @ts-ignore
import {Booking, BookingDetail} from "./bookingModels";
import './fullCard.css'

const BookingDetailCard: React.FC<BookingDetail> = (bookingDetail) => {

    const showFullCard: React.MouseEventHandler<HTMLDivElement> = (element) => {
        console.log(element);
        // let e = element.target as HTMLDivElement
        // console.log(e.children[2])
        // console.log(e.children[2].classList)
        // e.children[2].classList.add('state1')
        let ad = document.getElementById('df');
        if (ad) {
            if (ad.classList.contains('state'))
                ad.classList.remove('state')
            else
                ad.classList.add('state')

        }
    }

    return (
        <div className={styles['booking-card-wrapper']} onClick={showFullCard}>
            <div className={styles['time-block']}>
                <span> {bookingDetail.startTime} </span>
                <br/>
                <span>&#8640;</span>
                <br/>
                <span> {bookingDetail.endTime} </span>
            </div>
            <div className={styles['content-block']}>
                <div className={styles['booking-title']}>
                    {bookingDetail.title}
                </div>
                <div className={styles['booking-room']}>
                    <span className={`material-icons ${styles['icon']}`}>location_on</span> {bookingDetail.room}
                </div>
                <div className={styles['booking-tags']}>
                    {bookingDetail.tags.map((tag, index) => (
                        <div
                            key={index}
                            className={styles['booking-tag']}
                            style={{backgroundColor: tag.color}}
                        >
                            {tag.fullName}
                        </div>
                    ))}
                </div>
                <div className={styles['booking-owner']}>
                    <span className={`material-icons ${styles['icon']}`}>person</span> {bookingDetail.owner}
                </div>
                <div id='df' className='booking-participants'>
                    <span className={`material-icons ${styles['icon']}`}>groups</span>
                    {bookingDetail.participants.map((participant, index) => (
                        <div
                            key={index}
                            className={styles['booking-owner']}
                        >
                            {participant}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default BookingDetailCard;
import React from 'react';
import {BookingsByRoom } from "./bookingModels";
import BookingCard from "./BookingCard";
import styles from "./BookingList.module.css";
import { Sheet, SheetTrigger } from '../ui/sheet';
import { InformationBlock } from '../InformationBlock/InformationBlock';


interface BookingListProps {
    bookingsGropedByRoom: BookingsByRoom[];
}

const BookingList: React.FC<BookingListProps> = ({ bookingsGropedByRoom }) => {
    return (
        <div className={styles['booking-list-container']}>
            {bookingsGropedByRoom && bookingsGropedByRoom.map((room, index) => (
                <div className={styles['booking-room-container']} key={index}>
                    <h2 className="mb-2 px-4 text-xl tracking-tight" style={{ fontWeight: 800 }}>
                        {room.name.value}
                    </h2>
                    <div className={styles['bookings-room-data']}>
                        {room.bookings.map((booking, bookingIndex) => {
                            return (
                                <Sheet>
                                    <SheetTrigger className='text-left w-full h-full border-none'>
                                        <BookingCard key={bookingIndex} booking={booking} hideRoom={true} />
                                    </SheetTrigger>
                                    
                                    <InformationBlock data={booking} mode='view' />
                                </Sheet>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookingList;

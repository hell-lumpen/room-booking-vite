import {Tag} from "@/components/BookingCard/bookingModels";
import styles from "./TagComponent.module.css"

export const TagComponent:React.FC<{tag?:Tag, tags?:Tag[]}> = (booking) => {
    return (
        <>
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
            booking.tag && (
                <div
                    key={booking.tag.id}
                    className={styles['booking-tag']}
                    style={{backgroundColor: booking.tag.color}}
                >
                    {booking.tag.fullName}
                </div>
            )

        }
</>
    );
}
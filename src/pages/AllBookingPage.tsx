// import styles from './HomePage.module.css'
// import BookingList from "@/components/BookingCard/BookingList.tsx";
// import { BookingsByRoom } from "@/components/BookingCard/bookingModels.ts";
// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { StarBookingWidget } from "@/components/StartBooking/StarBookingWidget.tsx";
// import { SettingDatePanel } from "@/components/SettingDatePanel/SettingDatePanel.tsx";
// import { Tabs, TabsContent } from "@/components/ui/tabs.tsx";
// import { Button } from "@/components/ui/button.tsx";
// import {
//     Sheet,
//     SheetTrigger
// } from "@/components/ui/sheet.tsx";
// import 'react-day-picker/dist/style.css'
// import { HorizontalTimelineElement } from "@/components/HorizontalTimelineElement/HorizontalTimelineElement.tsx";
// import { InformationBlock } from '@/components/InformationBlock/InformationBlock';
//
// export const AllBookingPage = () => {
//     const getNextDate = (date: Date): Date => {
//         return new Date(date.getTime() + 1000 * 60 * 60 * 24);
//     }
//
//     const [dateForAxios, setDateAxios] = useState(new Date((new Date()).setHours(3, 0, 0)))
//
//     const [dataForCard, setDataForCard] = useState<BookingsByRoom[]>([]);
//
//     const setNewDateAxios = (newDate: Date) => {
//         setDateAxios(newDate);
//     }
//
//
//     useEffect(() => {
//         // document.documentElement.setAttribute('data-theme', 'dark');
//         console.log('as', dateForAxios.toISOString())
//         axios.get(`http://localhost:8080/api/bookings?startTime=${dateForAxios.toISOString()}&endTime=${getNextDate(dateForAxios).toISOString()
//             }`,
//             { headers: { Authorization: 'Bearer ' + token } })
//             .then((data) => {
//                 console.log('d', data.data);
//                 setDataForCard(data.data);
//             })
//
//     }, [dateForAxios]);
//
//
//     // =====================================
//     return (
//         <div className={styles['homepage-container']}>
//             <DataForMoreInfo.Provider value={{
//                 allRoom: allRoom,
//                 allParticipants: allParticipants,
//                 allGroup: allGroup,
//                 allTags: allTags
//             }}>
//                 <div className={styles['booking-card-container']}>
//                     <h1>Резервирование аудиторий</h1>
//                     <div className='flex justify-around flex-row-reverse p-4'>
//                         <Sheet>
//                             <SheetTrigger className='p-0 border-none'>
//                                 <Button variant='default'>Зарезервировать</Button>
//                             </SheetTrigger>
//                             <InformationBlock mode='create' />
//                         </Sheet>
//                     </div>
//
//                     <Tabs defaultValue="card">
//                         <SettingDatePanel date={dateForAxios} setDate={setNewDateAxios} />
//                         {dataForCard.length !== 0 ? (
//                             <>
//                                 <TabsContent value="card">
//                                     <BookingList bookingsGropedByRoom={dataForCard} />
//                                 </TabsContent><TabsContent value="timeline">
//                                     <HorizontalTimelineElement booking={dataForCard} rooms={dataForCard.map((e) => {
//                                         return e.name.value;
//                                     })} />
//                                 </TabsContent>
//                             </>
//                         ) : (
//                             <div className="flex flex-col items-center justify-center m-5">
//                                 <div className="p-4">
//                                     <h2 className="text-2xl font-bold text-center">
//                                         📅 Ой!
//                                     </h2>
//                                     <p className="mt-2 text-lg text-center">
//                                         На выбранный день бронирований нет. 😕
//                                     </p>
//                                     <p className="mt-4 text-sm text-center text-foreground">
//                                         Попробуйте выбрать другую дату. 🌟
//                                     </p>
//                                 </div>
//                             </div>
//                         )}
//                     </Tabs>
//                 </div>
//             </DataForMoreInfo.Provider>
//             <div className={styles['homepage-right-menu']}>
//                 <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
//                     Ближайшие мероприятия
//                 </h2>
//                 <StarBookingWidget />
//                 {/*<h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">*/}
//                 {/*    Новости*/}
//                 {/*</h2>*/}
//                 {/*<NewsBlock/>*/}
//             </div>
//         </div>
//
//     )
//         ;
//
// }

export interface Booking_ {
    id: number
    bookingGroupId?: string
    startTime: string;
    endTime: string;
    title: string;
    owner: string;
    tags: Tag[];
}

export interface BookingDetail {
    startTime: string;
    endTime: string;
    title: string;
    descriptions: string;
    room: string;
    owner: string;
    participants: string[];
    tags: Tag[];
}

export interface BookingRoom {
    roomvalue: string;
    bookings: Booking_[];
}

export interface BookingsByRoom {
    name: Room;
    bookings: Booking[];
}

export interface Booking {
    id?:number;
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    room?: {id:number, value:string};
    owner: User;
    staff?:User[];
    participants?: (User | Group)[];
    tag?: Tag;
    tags?: Tag[];
}

export interface User {
    id: number;
    fullName: string;
}

export interface Room {
    id: number;
    value: string;
}

export interface Group {
    id: number;
    value: string;
}

export interface Tag {
    id: number
    fullName: string;
    color: string;
    shortName?: string
}
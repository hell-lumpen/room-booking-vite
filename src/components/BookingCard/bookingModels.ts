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
    roomName: string;
    bookings: Booking_[];
}

export interface BookingsByRoom {
    room: Room;
    bookings: Booking[];
}

export interface Booking {
    startTime: Date;
    endTime: Date;
    title: string;
    descriptions?: string;
    owner: User;
    participants?: (User | Group)[];
    tags: Tag[];
}

export interface User {
    id: number;
    fullName: string;
}

export interface Room {
    id: number;
    name: string;
}

export interface Group {
    id: number;
    name: string;
}

export interface Tag {
    id: number
    label: string;
    color: string;
    shortLabel?: string
}
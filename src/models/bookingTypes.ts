import * as React from "react";

export interface RoomBookingFormData {
    title: string | undefined,
    description: string | undefined,
    date: Date | undefined,
    startTime: string | undefined,
    endTime: string | undefined,
    roomId: number | undefined,
    ownerId: number | undefined,
    participantsId: { id: number; type: number }[] | undefined,
    tagsId: number[] | undefined,
}

export const initialRoomBookingFormData: RoomBookingFormData = {
    title: undefined,
    description: undefined,
    date: undefined,
    startTime: undefined,
    endTime: undefined,
    roomId: undefined,
    ownerId: undefined,
    participantsId: undefined,
    tagsId: undefined,
};

export interface RequestBookingData {
    title: string,
    description: string,
    startTime: Date,
    endTime: Date,
    roomId: number,
    ownerId: number,
    groupsId: number[],
    staffId: number[],
    tagsId: number[]
}

export interface Option {
    id: number;
    label: string;
}

export interface OptionTag extends Option {
    icon?: React.ComponentType<{ className?: string }>;
}

export interface OptionParticipant extends Option {
    type: number;
}
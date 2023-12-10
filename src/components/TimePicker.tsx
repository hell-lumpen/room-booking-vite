import React, { useState, ChangeEvent } from 'react';

interface TimePickerProps {
    label: string;
}

const TimePicker: React.FC<TimePickerProps> = ({ label }) => {
    const [selectedTime, setSelectedTime] = useState<string>('');

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(e.target.value);
    };

    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="time" className="text-border">
                {label}
            </label>
            <input
                type="time"
                id="time"
                name="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className="p-2 border border-border rounded"
            />
        </div>
    );
};

export default TimePicker;
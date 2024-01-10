import { CustomSelect } from "../CustomSelect/CustomSelect";
import { SettingDate } from "../SettingDate/SettingDate";
import styles from "./SettingSchedulePanel.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

export const SettingSchedulePanel: React.FC<{ date: Date, setDate: (date: Date) => void, setGroup: (group: string) => void }> = (props) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImZ1bGxOYW1lIjoi0J3QtdC90LDRhdC-0LIg0JXQstCz0LXQvdC40Lkg0JLQsNC70LXQvdGC0LjQvdC-0LLQuNGHIiwic3ViIjoidXNlcm5hbWUiLCJpYXQiOjE3MDQyOTM5NjUsImV4cCI6MTcxMjkzMzk2NX0.cyhtonQk6F8DHiHdjTCjTnD3pQyUnvdJtHJa3TwQa3I";
    const [groups, setGroups] = useState<{ id: number, name: string }[]>([]);

    useEffect(() => {
        axios.get(`http://10.10.49.69:8080/api/group/all`,
            { headers: { Authorization: 'Bearer ' + token } })
            .then(
                (data) => {
                    setGroups(data.data);
                }
            )

    }, []);

    return (
        <div className={styles['settingSchedule']}>
            <SettingDate date={props.date} setDate={props.setDate} />
            <div className="ml-[5%] max-sm:ml-0 max-sm:mt-[15px]">
                <CustomSelect hint='Выберете группу' values={groups} callback={(value) => { props.setGroup(value) }} />
            </div>
        </div>

    );


}
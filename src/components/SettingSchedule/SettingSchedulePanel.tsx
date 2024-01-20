import {CustomSelect} from "../CustomSelect/CustomSelect";
import {SettingDate} from "../SettingDate/SettingDate";
import styles from "./SettingSchedulePanel.module.css";
import {FC, useContext, useState} from 'react';
import {DataForMoreInfo} from "@/pages/HomePage.tsx";

export const SettingSchedulePanel: FC<{
    date: Date,
    setDate: (date: Date) => void,
    setGroup: (group: string) => void
}> = (props) => {
    const [groups, setGroups] = useState<{ id: number, name: string }[]>([]);

    setGroups(useContext(DataForMoreInfo).allGroup)

    return (
        <div className={styles['settingSchedule']}>
            <SettingDate date={props.date} setDate={props.setDate}/>
            <div className="ml-[5%] max-sm:ml-0 max-sm:mt-[15px]">
                <CustomSelect hint='Выберете группу' values={groups} callback={(value) => {
                    props.setGroup(value)
                }}/>
            </div>
        </div>
    );
}
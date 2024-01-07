import { SettingDate } from "../SettingDate/SettingDate";



export const SettingSchedulePanel:React.FC<{date:Date, setDate:(date: Date)=>void}> = (props) => {
    console.log('date1', props.date);

    return (
        <div>
            Панель управления
            <SettingDate date={props.date} setDate={props.setDate}/>
        </div>

    );


}
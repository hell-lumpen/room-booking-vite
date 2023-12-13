import style from "./HorizontalTimelineElement.module.css";
import React from "react";

const getTimes = (): string[] => {
    let result: string[] = [];
    let dat = new Date();
    dat.setHours(8);
    dat.setMinutes(0);
    for (let i = 0; i < 16 * 4; i++) {
        result.push(dat.getHours().toString().padStart(2, '0') + ':' + dat.getMinutes().toString().padStart(2, '0'));
        dat = new Date(dat.getTime() + 1000 * 60 * 15);
    }
    return result;
}

export const HorizontalTimelineTimeCont: React.FC<{ times: string[] }> = ({times}) => {

    // const times = getTimes();
    // const [times1, setTimes] = useState<string[]>([]);
    //
    // useEffect(() => {
    //     setTimes(getTimes());
    // }, []);


    return (
        <div className={style.horTimelineTimeContainer}>
            <div className={style.horTimelineTimeEmptyDiv}></div>
            {times.map((time, index) => {
                let font_size;
                switch (index % 4) {
                    case 0:
                        font_size = '16px';
                        break;
                    case 1:
                        font_size = '10px';
                        break;
                    case 2:
                        font_size = '12px';
                        break;
                    case 3:
                        font_size = '10px';
                        break;
                }
                return (<div id={'timeline_' + time} className={style.horTimelineTimeElement}
                             style={{
                                 fontSize: font_size

                             }}


                >{time}</div>);
            })}
        </div>

    );
}
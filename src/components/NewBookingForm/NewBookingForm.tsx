export const NewBookingForm = () => {

    const datas: string[] = ['Название',
        'Начало',
        'Конец',
        'Аудитория',
        'Участники'
    ]
    return (
        <div>
            {datas.map((e) => (
                <div>
              <span>
                Название
              </span>
                    <input/>
                </div>
            ))
            }


        </div>
    );
}
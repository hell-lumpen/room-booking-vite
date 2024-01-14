import { User } from 'lucide-react';
import styles from './OwnerComponent.module.css'



function getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Пример использования:
const смешныеЖивотные: string[] = [
    'Непознанный Суслик',
    'Шутливый Шимпанзе-Чехол',
    'Ржавый Ракетный Ракун',
    'Смеющийся Слон в Шляпе',
    'Комедийный Крокодил-Шутник',
    'Веселый Вампирский Варан',
    'Гигантский Гусь-Гипнотизер',
    'Клоунский Кенгуру-Колобок',
    'Улыбающийся Утконос в Ушанке',
    'Фантастический Фламинго-Фокусник',
    'Зажигательная Зебра-Закуска',
    'Летучий Лама',
    'Смешной Сом',
    'Чудной Чихуахуа',
    'Грозный Гепард',
    'Танцующий Тукан',
    'Веселый Вепрь',
    'Спящий Скунс',
    'Прыгающий Пингвин',
    'Уютный Уж',
    'Колючий Коала',
    'Коварный Котенок',
    'Лукавый Лев',
    'Задорный Змей',
    'Чарующий Черепаха',
    'Храбрый Хомячок',
    'Свирепый Сорока',
    'Быстрый Бобр',
    'Танцующий Тигр',
    'Замшелый Зебу',
    'Летающий Лось',
];

export const OwnerComponent: React.FC<{
    owner: {
        id: number;
        value: string;
    }
}> = (booking) => {

    return (
        <div className={styles['booking-owner']}>
            {/*<span className={`material-icons ${styles['icon']}`}>person</span>*/}
            <span className='w-[20px] mr-2'><User strokeWidth={2} width={20} /></span>
            <span>{booking.owner.value || getRandomElement(смешныеЖивотные) + ' (Неизвестный)'}</span>
        </div>
    );
}
import styles from './HomePage.module.css'

const HomePage = () => (
    <div className={styles['homepage-container']}>
        <div className={styles['booking-card-container']}>
            <div className="h-full px-4 py-6 lg:px-8 flex flex-col">
                <p className="mb-4">vwerbiwnevinwiebnins wei iwineivb</p>
                <div className="mb-4"><a href="#">vbneibieribei</a></div>
                {/*<button className="bg-blue-500 text-white px-4 py-2">Моя Кнопка</button>*/}
            </div>
        </div>
        <div className={styles['homepage-right-menu']}>
            <div className="h-full px-4 py-6 lg:px-8 flex flex-col">
                <p className="mb-4">vwerbiwnevinwiebnins wei iwineivb</p>
                <div className="mb-4"><a href="#">vbneibieribei</a></div>
                <button className="bg-blue-500 text-white px-4 py-2">Моя Кнопка</button>
            </div>
        </div>
    </div>

);

export default HomePage;

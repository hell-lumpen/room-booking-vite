const HomePage = () => (
    <div className="lg:flex flex-row bg-red-700 justify-between">
        {/* Первая колонка */}
        <div className="h-full w-[70%] lg:border-l bg-red-300">
            <div className="h-full px-4 py-6 lg:px-8 flex flex-col">
                <p className="mb-4">vwerbiwnevinwiebnins wei iwineivb</p>
                <div className="mb-4"><a href="#">vbneibieribei</a></div>
                <button className="bg-blue-500 text-white px-4 py-2">Моя Кнопка</button>
            </div>
        </div>
        {/* Вторая колонка */}
        <div className="w-[30%] lg:border-l bg-red-400">
            <div className="h-full px-4 py-6 lg:px-8 flex flex-col">
                <p className="mb-4">vwerbiwnevinwiebnins wei iwineivb</p>
                <div className="mb-4"><a href="#">vbneibieribei</a></div>
                <button className="bg-blue-500 text-white px-4 py-2">Моя Кнопка</button>
            </div>
        </div>
    </div>

);

export default HomePage;

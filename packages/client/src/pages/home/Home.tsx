import TeamBuilder from './TeamBuilder';

const Home = () => {
    return (
        <div className="mt-10 md:mt-15 w-full text-center">
            <h1 className="mb-2 md:mb-6 text-2xl md:text-5xl font-extrabold">
                POKEMON BATTLE
            </h1>
            <h1 className="mt-2 md:mt-6 text-2xl md:text-5xl font-extrabold">
                SIMULATOR
            </h1>
            <TeamBuilder />
        </div>
    );
};

export default Home;

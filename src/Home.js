import { useGlobalContext } from "./context";

const Home = () => {
    const { setPlayerMode } = useGlobalContext();
    return (
        <div className="flex flex-col gap-4 m-auto">
            <h1 className="text-6xl font-bold mb-20">Play Ludo</h1>
            <button onClick={() => setPlayerMode(true)} className="w-fit bg-slate-500 text-white text-2xl font-semibold rounded px-20 py-3">2vs2</button>
            <button onClick={() => setPlayerMode(false)} className="w-fit bg-slate-500 text-white text-2xl font-semibold rounded px-20 py-3">4vs4</button>
        </div>
    )
}

export default Home;
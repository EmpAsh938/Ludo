import LudoBoard from "./LudoBoard";
import { cellSize } from "./constants";
import { useGlobalContext } from "./context";
import Home from "./Home";

function App() {
    const { isStarted, rollDice, rollActive, roll } = useGlobalContext();
    return (
        <main className="h-screen w-screen bg-gray-100 flex flex-col items-center">
            {!isStarted ? <Home /> :
                <div>

                    <LudoBoard />
                    <div className="flex gap-4 justify-center items-center mt-4 " style={{ width: cellSize * 15 }}>

                        <button
                            disabled={!rollActive}
                            onClick={rollDice}
                            className="bg-blue-600 text-white py-2 px-8 rounded uppercase font-semibold disabled:bg-blue-400">roll</button>
                        <span className="text-3xl font-semibold">{roll}</span>
                    </div>
                </div>}
        </main>
    );
}

export default App;

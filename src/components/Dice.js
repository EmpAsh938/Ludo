import { useState } from "react";

const Dice = () => {
    const [num, setNum] = useState(1);

    const roll = () => {
        setNum(Math.floor(Math.random() * 6) + 1);
    }

    const dotStyle = () => {
        if (num === 1) {
            return 'flex justify-center items-center';
        }
        if (num === 2) {
            return 'flex justify-between items-center';
        }
        if (num === 3) {

        }
        if (num === 4) {
            return 'grid grid-cols-2 items-center';
        }
        if (num === 5) {

        }
        if (num === 6) {
            return 'grid grid-cols-2 items-center'
        }
        return ''
    }

    return (
        <div onClick={roll} className={`p-2 rounded w-14 h-14 bg-red-500 ${dotStyle()}`}>
            {Array.from({ length: num }, (_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-white"></div>
            ))}
        </div>
    )
}

export default Dice;
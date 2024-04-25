import { MdOutlineStar } from 'react-icons/md';
import TokenSeat from './components/TokenSeat';
import HomeToken from './components/HomeToken';
import { checkStarCell } from './utils/checkStarCell';
import { useGlobalContext } from './context';


import { numRows, numCols, cellSize } from './constants';

const LudoBoard = () => {
    const { blueBox, redBox, yellowBox, greenBox, color, turn } = useGlobalContext();


    return (
        <div className="relative flex justify-center flex-wrap" style={{ width: cellSize * 15, height: cellSize * 15 }}>
            {/* Generate grid cells */}
            {Array.from({ length: numRows }, (_, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {Array.from({ length: numCols }, (_, colIndex) => (
                        <div
                            key={rowIndex * numCols + colIndex}
                            className={`border border-gray-600 ${setTokenHomeBg(rowIndex, colIndex)} grid place-items-center`}
                            style={{ width: cellSize, height: cellSize }}
                        >
                            {/* {rowIndex + "" + colIndex} */}
                            {checkStarCell(rowIndex, colIndex) && <MdOutlineStar className='text-gray-600 text-xl md:text-2xl' />}
                        </div>
                    ))}
                </div>
            ))}

            {/* token box home  */}

            <div className={`absolute bg-white top-0 left-0 grid place-items-center grid-cols-2 border-[25px] ${color[turn] === 'blue' ? 'animation-border-pulse-blue' : 'border-blue-500'}`} style={{ borderWidth: cellSize / 2, width: cellSize * 6, height: cellSize * 6 }}>
                {Array.from({ length: blueBox.length }, (_, index) => (
                    <HomeToken key={index} bgColor='bg-blue-500' boxToken={blueBox[index]} />
                ))}
            </div>
            <div className={`absolute bg-white top-0 right-0 grid place-items-center grid-cols-2 border-[25px] border-red-500 ${color[turn] === 'red' ? 'animation-border-pulse-red' : 'border-red-500'}`} style={{ borderWidth: cellSize / 2, width: cellSize * 6, height: cellSize * 6 }}>

                {Array.from({ length: redBox.length }, (_, index) => (
                    <HomeToken key={index} bgColor='bg-red-500' boxToken={redBox[index]} />
                ))}
            </div>
            <div className={`absolute bg-white bottom-0 left-0 grid place-items-center grid-cols-2 border-[25px] ${color[turn] === 'yellow' ? 'animation-border-pulse-yellow' : 'border-yellow-500'}`} style={{ borderWidth: cellSize / 2, width: cellSize * 6, height: cellSize * 6 }}>
                {Array.from({ length: yellowBox.length }, (_, index) => (
                    <HomeToken key={index} bgColor='bg-yellow-500' boxToken={yellowBox[index]} />
                ))}
            </div>
            <div className={`absolute bg-white bottom-0 right-0 grid place-items-center grid-cols-2 border-[25px] ${color[turn] === 'green' ? 'animation-border-pulse-green' : 'border-green-500'}`} style={{ borderWidth: cellSize / 2, width: cellSize * 6, height: cellSize * 6 }}>
                {Array.from({ length: greenBox.length }, (_, index) => (
                    <HomeToken key={index} bgColor='bg-green-500' boxToken={greenBox[index]} />
                ))}

            </div>
            {/* tokens  */}
            {Array.from({ length: blueBox.length }, (_, index) => {
                if (blueBox[index].currentRow === 0 && blueBox[index].currentCol === 0) { return null; }
                return <TokenSeat key={index} boxToken={blueBox[index]} bgColor='bg-transparent' isStatic={false} borderColor={'border-blue-600'} />
            })}
            {Array.from({ length: redBox.length }, (_, index) => {
                if (redBox[index].currentRow === 0 && redBox[index].currentCol === 0) { return null; }

                return <TokenSeat key={index} boxToken={redBox[index]} bgColor='bg-transparent' isStatic={false} borderColor='border-red-600' />
            })}
            {Array.from({ length: greenBox.length }, (_, index) => {
                if (greenBox[index].currentRow === 0 && greenBox[index].currentCol === 0) { return null; }

                return <TokenSeat key={index} boxToken={greenBox[index]} bgColor='bg-transparent' isStatic={false} borderColor='border-green-600' />
            })}
            {Array.from({ length: yellowBox.length }, (_, index) => {
                if (yellowBox[index].currentRow === 0 && yellowBox[index].currentCol === 0) {
                    return null;
                }
                return <TokenSeat key={index} boxToken={yellowBox[index]} bgColor='bg-transparent' isStatic={false} borderColor='border-yellow-600' />
            })}
        </div>
    );
}

export default LudoBoard;


// function checkWorkingCell(rowIndex, colIndex) {
//     if (rowIndex > 5 && rowIndex < 9) {
//         if (colIndex > 5 && colIndex < 9) return false;
//         return true;
//     }
//     if (colIndex > 5 && colIndex < 9) {
//         return true;
//     }
//     return false;
// }



function setTokenHomeBg(rowIndex, colIndex) {
    if (rowIndex === 6 && colIndex === 1) {
        return 'bg-blue-500';
    }
    if (rowIndex === 1 && colIndex === 8) {
        return 'bg-red-500';
    }
    if (rowIndex === 8 && colIndex === 13) {
        return 'bg-green-500';
    }
    if (rowIndex === 13 && colIndex === 6) {
        return 'bg-yellow-500';
    }
    if (colIndex === 7 && rowIndex === 7) {
        return 'bg-gray-500';
    }
    if (rowIndex === 6 && colIndex === 6) {
        return 'bg-gradient-to-tr from-blue-500 to-red-500';
    }
    if (rowIndex === 6 && colIndex === 8) {
        return 'bg-gradient-to-tl from-green-500 to-red-500';
    }
    if (rowIndex === 8 && colIndex === 6) {
        return 'bg-gradient-to-tl from-yellow-500 to-blue-500';
    }
    if (rowIndex === 8 && colIndex === 8) {
        return 'bg-gradient-to-tr from-yellow-500 to-green-500';
    }
    if (colIndex === 7) {
        if (rowIndex < 8 && rowIndex > 0) {
            return 'bg-red-500';
        }
        if (rowIndex < 14 && rowIndex > 7) {
            return 'bg-yellow-500';
        }

    }
    if (rowIndex === 7) {

        if (colIndex > 0 && colIndex < 7) {
            return 'bg-blue-500';
        }
        if (colIndex > 7 && colIndex < 14) {
            return 'bg-green-500';
        }
    }

    return 'bg-slate-100';
}
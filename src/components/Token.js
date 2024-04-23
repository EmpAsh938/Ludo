import { cellSize } from '../constants';
import { useGlobalContext } from '../context';

const Token = ({ boxToken, bgColor, borderColor = 'border-white' }) => {
    const { turn, color, moveActive } = useGlobalContext();

    const turnColor = color[turn];

    let tokenColor = borderColor.split('-')[1];



    return (
        <div className={`flex items-center justify-center bg-white border ${borderColor} rounded-full ${(moveActive && boxToken.type.includes(turnColor)) ? 'animation-jump' : 'animation-none'}`} style={{ width: cellSize / 2, height: cellSize / 2 }}>
            <div className={`border-4 ${borderColor} rounded-full`} style={{ width: (cellSize / 3), height: (cellSize / 3) }} ></div>
        </div >
    )
}

export default Token;
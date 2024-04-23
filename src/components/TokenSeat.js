import Token from "./Token";
import { cellSize } from '../constants';
import { useGlobalContext } from "../context";

const TokenSeat = ({ bgColor, borderColor = 'border-white', boxToken }) => {

    const { moveActive, moveToken, color, turn } = useGlobalContext();

    const handleClick = () => {
        const colorTurn = color[turn];
        const isRightColor = moveActive && (boxToken.type.includes(colorTurn));
        if (isRightColor) {
            moveToken(boxToken);
        }
    }

    return (
        <div onClick={handleClick} className={`absolute inset-0 grid place-items-center ${bgColor} rounded-full ${(moveActive && boxToken.type.includes(color[turn])) ? 'z-50' : 'z-0'}`} style={{ width: cellSize, height: cellSize, top: cellSize * boxToken.currentRow, left: cellSize * boxToken.currentCol }}>
            <Token boxToken={boxToken} bgColor={bgColor} borderColor={borderColor} />
        </div>
    )
}

export default TokenSeat;
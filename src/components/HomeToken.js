import Token from "./Token";
import { cellSize } from '../constants';
import { useGlobalContext } from "../context";


const HomeToken = ({ bgColor, isStatic = true, borderColor, boxToken }) => {
    const { moveActive, moveToken, color, turn } = useGlobalContext();

    const handleClick = () => {
        const colorTurn = color[turn];
        const isRightColor = moveActive && (bgColor.includes(colorTurn));
        if (isRightColor) {
            moveToken(boxToken);
        }
    }
    return (
        <div onClick={handleClick} className={`${isStatic ? 'relative' : 'absolute inset-0'} grid place-items-center ${bgColor} rounded-full`} style={{ width: cellSize, height: cellSize, top: cellSize * (isStatic ? 0 : boxToken.currentRow), left: cellSize * (isStatic ? 0 : boxToken.currentCol) }}>
            {((boxToken.currentCol === 0 && boxToken.currentRow === 0)) ? <Token boxToken={boxToken} bgColor={bgColor} borderColor={borderColor} /> : null}
        </div>
    );
}

export default HomeToken;
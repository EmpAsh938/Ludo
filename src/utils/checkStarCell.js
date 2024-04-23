export function checkStarCell(rowIndex, colIndex) {
    if ((rowIndex === 6 && colIndex === 1) ||
        (rowIndex === 2 && colIndex === 6) ||
        (rowIndex === 1 && colIndex === 8) ||
        (rowIndex === 6 && colIndex === 12) ||
        (rowIndex === 8 && colIndex === 13) ||
        (rowIndex === 12 && colIndex === 8) ||
        (rowIndex === 13 && colIndex === 6) ||
        (rowIndex === 8 && colIndex === 2)) return true;
    return false;
}
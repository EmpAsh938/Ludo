import { createContext, useState, useContext, useEffect } from 'react';
import { greenToken, blueToken, redToken, yellowToken } from './token';
import { board } from './board';


const AppContext = createContext(null);
const color = ['blue', 'red', 'green', 'yellow'];

const AppProvider = ({ children }) => {
    const [roll, setRoll] = useState(0);
    const [rollTimes, setRollTimes] = useState(0);
    const [moveActive, setMoveActive] = useState(false);
    const [rollActive, setRollActive] = useState(true);
    const [blueBox, setBlueBox] = useState([]);
    const [redBox, setRedBox] = useState([]);
    const [greenBox, setGreenBox] = useState([]);
    const [yellowBox, setYellowBox] = useState([]);
    const [gameBoard, setGameBoard] = useState([...board]);
    const [turn, setTurn] = useState(1);
    const [isHalfed, setIsHalfed] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [rank, setRank] = useState([]);

    const rollDice = () => {
        // player hasnt move his token
        if (!rollActive) return;

        // setRollTimes(prev => prev + 1);
        setRoll(prev => {
            // return 6;
            return Math.floor(Math.random() * 6) + 1;
        });

        setRollTimes(prev => prev + 1);


    }


    const moveToken = (token) => {

        const { type, id, currentRow, currentCol } = token;

        let isEnemy = false;
        let isHome = false;
        let boardPosition;
        let index = 0;
        let rollRem = roll;



        // dont move just return
        if (currentRow === 7 && currentCol === 7) return;

        // const tokens = checkIfBorned();

        if (currentRow === 0 && currentCol === 0) {
            // not borned
            if (roll !== 6) return;
            if (type === 'red') {
                index = 18;
            }
            if (type === 'blue') {
                index = 0;
            }
            if (type === 'yellow') {
                index = 54;
            }
            if (type === 'green') {
                index = 36;
            }
            rollRem = 0;
        } else {
            // borned
            // find position in board 
            for (let i = 0; i < gameBoard.length; i++) {
                if (gameBoard[i].row === currentRow && gameBoard[i].column === currentCol) {
                    index = i;
                    break;
                }
            }
        }






        // take care of old position after/before moving the token 
        setGameBoard(prevBoard => {
            return prevBoard.map((item) => {
                const updatedTokens = item.tokens.filter(t => !(t.id === id && t.type === type));
                return { ...item, tokens: updatedTokens };
            });
        });


        // move to calculated position
        while (rollRem > 0) {
            // game over
            if (type === gameBoard[index].turn) {
                // if (gameBoard[index])
                let newIndex = index + rollRem;
                newIndex = newIndex % gameBoard.length;
                if (gameBoard[newIndex].turn) {
                    // movable
                    index = newIndex;
                    rollRem = 0;
                    break;
                } else {
                    if (newIndex === 17 || newIndex === 35 || newIndex === 53 || newIndex === 71) {
                        // home
                        isHome = true;
                        // console.log('inside')
                    } else {
                        index = newIndex - rollRem;
                        if (index < 10) {
                            index += gameBoard.length;
                        }
                        // if (turn)
                        if (roll === 6) {
                            let playerModeTurn = isHalfed ? 2 : 1;
                            setTurn(prev => {
                                return (prev + playerModeTurn) % color.length;
                            })
                        }
                        rollRem = 0;
                        break;
                    }
                }

            }
            // turn into home
            if (index === 11 || index === 29 || index === 47 || index === 65) {
                // console.log(gameBoard[index]);
                if (type === gameBoard[index].turn) index += 1;
                else index += 6;

            } else {
                index += 1;
            }
            index = index % gameBoard.length;
            rollRem -= 1;
        }

        // 11
        //


        boardPosition = gameBoard[index];

        // update into colors array

        token.currentRow = isHome ? 7 : boardPosition.row;
        token.currentCol = isHome ? 7 : boardPosition.column;



        if (type === 'red') {
            setRedBox(prev => {
                return prev.map(item => {
                    if (item.id === id) {
                        return token;
                    }
                    return item;
                })
            })
        }
        if (type === 'blue') {
            setBlueBox(prev => {
                return prev.map(item => {
                    if (item.id === id) {
                        return token;
                    }
                    return item;
                })
            })
        }
        if (type === 'green') {
            setGreenBox(prev => {
                return prev.map(item => {
                    if (item.id === id) {
                        return token;
                    }
                    return item;
                })
            })
        }
        if (type === 'yellow') {
            setYellowBox(prev => {
                return prev.map(item => {
                    if (item.id === id) {
                        return token;
                    }
                    return item;
                })
            })
        }


        if (!(gameBoard[index].isStar) && gameBoard[index].tokens.length > 0) {
            // check if enemy
            for (let item of gameBoard[index].tokens) {
                if (item.type !== type) {
                    isEnemy = true;
                    // remove position of old token
                    item.currentRow = 0;
                    item.currentCol = 0;

                    // reseting into color array
                    if (item.type === 'red') {
                        setRedBox(prev => prev.map(subitem => {
                            if (subitem.id === item.id) {
                                return { ...item }; // Create a new object with updated properties
                            }
                            return subitem;
                        }));
                    }
                    if (item.type === 'blue') {
                        setBlueBox(prev => prev.map(subitem => {
                            if (subitem.id === item.id) {
                                return { ...item }; // Create a new object with updated properties
                            }
                            return subitem;
                        }));
                    }
                    if (item.type === 'green') {
                        setGreenBox(prev => prev.map(subitem => {
                            if (subitem.id === item.id) {
                                return { ...item }; // Create a new object with updated properties
                            }
                            return subitem;
                        }));
                    }
                    if (item.type === 'yellow') {
                        setYellowBox(prev => prev.map(subitem => {
                            if (subitem.id === item.id) {
                                return { ...item }; // Create a new object with updated properties
                            }
                            return subitem;
                        }));
                    }
                }
            }
            if (isEnemy) {
                setGameBoard(prev => {
                    prev[index].tokens = [];
                    return [...prev];
                });
            }

            // after enemy deleting regain turn

        }



        // Update the game board with the new token position
        setGameBoard(prevBoard => {
            return prevBoard.map((prevItem, prevId) => {
                if (prevId === index) {
                    const updatedTokens = [...prevItem.tokens, token]; // Add the new token to the tokens array
                    return { ...prevItem, tokens: updatedTokens };
                }
                return prevItem;
            });
        });


        // if (token.currentRow === 0 && token.currentCol === 0 && roll !== 6 && checkIfBorned()) return;

        if (isHome) {
            if (type === 'red') {
                let allHome = redBox.filter(item => (item.currentRow === 7 && item.currentCol === 7));
                if (allHome.length === 4 && rank.length !== 4 && !rank.includes(type)) {
                    setRank(prev => [
                        ...prev,
                        type,
                    ])
                }
            }
            if (type === 'blue') {
                let allHome = blueBox.filter(item => (item.currentRow === 7 && item.currentCol === 7));
                if (allHome.length === 4 && rank.length !== 4 && !rank.includes(type)) {
                    setRank(prev => [
                        ...prev,
                        type,
                    ])
                }

            }
            if (type === 'yellow') {
                let allHome = yellowBox.filter(item => (item.currentRow === 7 && item.currentCol === 7));
                if (allHome.length === 4 && rank.length !== 4 && !rank.includes(type)) {
                    setRank(prev => [
                        ...prev,
                        type,
                    ])
                }

            }
            if (type === 'green') {
                let allHome = greenBox.filter(item => (item.currentRow === 7 && item.currentCol === 7));
                if (allHome.length === 4 && rank.length !== 4 && !rank.includes(type)) {
                    setRank(prev => [
                        ...prev,
                        type,
                    ])
                }

            }
            setGameBoard(prevBoard => {
                return prevBoard.map((prevItem, prevId) => {
                    if (prevId === index) {
                        const updatedTokens = prevItem.tokens.filter(prevToken => prevToken.id !== id);
                        return { ...prevItem, tokens: updatedTokens };
                    }
                    return prevItem;
                })
            })
        }

        // change turn if roll is not 6 and enemy is not deleted and home is not achieved
        if (roll !== 6 && !isEnemy && !isHome) {
            let playerModeTurn = isHalfed ? 2 : 1;
            setTurn(prev => {
                return (prev + playerModeTurn) % color.length;
            })
        }
        setRollActive(true)
        setMoveActive(false)
    }


    const checkIfBorned = () => {
        let blueTokens = blueBox.filter(item => !(item.currentRow === 0 && item.currentCol === 0) && !(item.currentRow === 7 && item.currentCol === 7));
        let redTokens = redBox.filter(item => !(item.currentRow === 0 && item.currentCol === 0) && !(item.currentRow === 7 && item.currentCol === 7));
        let greenTokens = greenBox.filter(item => !(item.currentRow === 0 && item.currentCol === 0) && !(item.currentRow === 7 && item.currentCol === 7));
        let yellowTokens = yellowBox.filter(item => !(item.currentRow === 0 && item.currentCol === 0) && !(item.currentRow === 7 && item.currentCol === 7));

        if (color[turn] === 'blue') {
            return blueTokens;
        }
        if (color[turn] === 'red') {
            return redTokens;

        }
        if (color[turn] === 'yellow') {
            return yellowTokens;

        }
        if (color[turn] === 'green') {
            return greenTokens;

        }

        return [];
    }


    const rotateIfNotBorned = () => {


        let playerModeTurn = isHalfed ? 2 : 1;
        setTurn(prev => {
            return (prev + playerModeTurn) % 4;
        })
        setRollActive(true);
        setMoveActive(false);

    }

    const setPlayerMode = (value) => {
        setIsHalfed(value);
        setIsStarted(true);
    }

    const initializeTokens = () => {

        setBlueBox(prevBlueBox => {
            let updatedBox = [];
            for (let i = 0; i < 4; i++) {
                updatedBox.push({ ...blueToken, id: i });
            }
            return updatedBox;
        });

        setRedBox(prevRedBox => {
            let updatedBox = [];
            for (let i = 0; i < 4; i++) {
                updatedBox.push({ ...redToken, id: i });
            }
            return updatedBox;
        });

        setGreenBox(prevGreenBox => {
            let updatedBox = [];
            for (let i = 0; i < 4; i++) {
                updatedBox.push({ ...greenToken, id: i });
            }
            return updatedBox;
        });

        setYellowBox(prevYellowBox => {
            let updatedBox = [];
            for (let i = 0; i < 4; i++) {
                updatedBox.push({ ...yellowToken, id: i });
            }
            return updatedBox;
        });
    }



    useEffect(() => {
        if (rollTimes === 0) return;
        const tokens = checkIfBorned();

        if (roll === 6 || tokens.length > 1) {
            setRollActive(false);
            setMoveActive(true);
            return;
        }

        // rotate turn if no active tokens
        if (roll !== 6 && tokens.length === 0) {
            rotateIfNotBorned();
        }
        // single active token
        if (tokens.length === 1) {
            moveToken(tokens[0]);
        }

        // eslint-disable-next-line
    }, [rollTimes])

    useEffect(() => {
        if (rank.includes(color[turn])) {
            setTurn(prev => (prev + 1) % color.length);
        }

        // eslint-disable-next-line
    }, [turn])


    useEffect(() => {
        initializeTokens();
    }, [])



    return (
        <AppContext.Provider value={{
            blueBox,
            redBox,
            greenBox,
            yellowBox,
            roll,
            color,
            turn,
            rollActive,
            moveActive,
            isHalfed,
            isStarted,
            rollDice,
            moveToken,
            setPlayerMode,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
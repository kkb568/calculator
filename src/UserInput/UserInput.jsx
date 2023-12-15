import { createContext, useState } from "react";
import KeyPadButtons from '../KeyPad/KeyPad';
import { calculate, checkDot, checkSymbol } from '../utils'
import './UserInput.scss'

export const context = createContext();

export default function UserInput(props) {
    const [currentInput, setCurrentInput] = useState(null);
    const [prevInput, setPrevInput] = useState(null)
    
    // Function for inputting the current and previous input.
    function changeCurInput(value) {
        // If the value is a dot and currentInput has a dot sign in it,
        // let the currentInput remain 
        // (so as to prevent double dot sign inputted).
        if (value === '.' && checkDot(currentInput)) {
            return
        }
        // If currentInput is null, 
        // set the current input to the inserted value.
        if (currentInput == null) {
            if (value == 'x' || value == '/') {
                setCurrentInput(null)
            } else {
                setCurrentInput(value)
            }
        } 
        // If the current value is not null.
        else {
        // Check if an arthmetic symbol is used.
            if (checkSymbol(value)) {
                // If prevInput is null 
                // and currentInput is not a symbol, 
                // or the specified infinityString
                // set the previous input to current input and value.
                const infinityString = 'Cannot divide by 0'
                if (prevInput == null 
                && !checkSymbol(currentInput)
                && currentInput != infinityString) {
                    setPrevInput(currentInput + ' ' + value)
                    setCurrentInput(null)
                } 
                // If prevInput is not null, set the previous input 
                // to the result and value.
                else {
                    const result = calculate(prevInput, Number(currentInput))
                    // Check if the result is a string or not.
                    if (typeof result === "string") {
                        setCurrentInput(result)
                        setPrevInput(null)
                    } else {
                        setPrevInput(result.toString() + ' ' + value)
                        setCurrentInput(null)
                    }
                }
            } 
            // If no symbol, set the current value to current
            // input and value.
            else {
                setCurrentInput(currentInput + value)
            }
        }
    }

    // Function to remove one number from the current input.
    function removeNum() {
        if (currentInput != null) {
        // Split the current input value.
        const curInputArr = currentInput.split('')
        // Create a new array.
        let newInputArr = []
        // Push all items from the curInputArr, except 
        // for the last item to the new array.
        for (let i = 0; i < curInputArr.length - 1; i++) {
            newInputArr.push(curInputArr[i])
        }
        // Join all elements of the new array 
        // and set the current input to the result of the join method.
        setCurrentInput(newInputArr.join(''))
        }
    }

    // Function for showing the result after pressing the '=' button. 
    function getAnswer() {
        if (currentInput != null && prevInput != null) {
        const result = calculate(prevInput, Number(currentInput))
        setCurrentInput(result.toString())
        setPrevInput(null)
        }
    }

    // Function for resetting the user input.
    function resetInput() {
        setCurrentInput(null)
        setPrevInput(null)
    }

    return (
        <>
            <div className='user-input' data-theme={props.theme}>
                <div className='prev-input'>
                    {prevInput}
                </div>
                <div className='current-input'>
                    {currentInput}
                </div>
            </div>
            <div className='keypad' data-theme={props.theme}>
                <context.Provider value={changeCurInput}>
                    <KeyPadButtons theme={props.theme}
                    removeNum={removeNum}
                    getAnsw={getAnswer}
                    reset={resetInput}/>
                </context.Provider>
            </div>
        </>
    )
}
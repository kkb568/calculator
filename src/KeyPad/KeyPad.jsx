import { useContext, useRef } from 'react';
import './KeyPad.scss'
import { context } from '../UserInput/UserInput'

export default function KeyPadButtons(props) {
    const topFunctionalNum = ['7', '8', '9']
    const bottomFunctionalNum = 
    ['4', '5', '6', '+', '1', '2', '3', '-', '.', 
    '0', '/', 'x']

    const topButtonList = 
    topFunctionalNum.map((topNum) => {
      return (
        <FunctionalButtons 
          key={topNum} 
          num={topNum}/>
      )
    })
    const bottomButtonList = 
    bottomFunctionalNum.map((bottomNum) => {
      return (
        <FunctionalButtons
          key={bottomNum}
          num={bottomNum}/>
      )
    })

    return (
      <>
        <div className='topButtons' data-theme={props.theme}>
          {topButtonList}
          <button className='del_button'
            onClick={props.removeNum}>del</button>
          {bottomButtonList}
        </div>
        <div className='bottomButtons' data-theme={props.theme}>
          <button onClick={props.reset}>Reset</button>
          <button onClick={props.getAnsw}>=</button>
        </div>
      </>
    )
}
  
function FunctionalButtons(props) {
  const inputElement = useRef();
  const changeFunction = useContext(context);

  function getInputs() {
      changeFunction(inputElement.current.innerText)
  }
  
  return (
    <button 
      className='functional_buttons'
      ref={inputElement}
      onClick={getInputs}>{props.num}</button>
  )
}
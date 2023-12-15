import { useState } from 'react'
import './App.scss'
import UserInput from './UserInput/UserInput';

function App() {
  const [theme, setTheme] = useState('theme_1');
  
  const themeNames = [
    { key: '1',
     value:'theme_1'}, 
    {key: '2',
     value: 'theme_2'}, 
    {key: '3', 
     value: 'theme_3'}
  ]
  const labels = themeNames.map((name) => {
    return (
      <ToggleLabels
        key={name.key} 
        theme={name.value} 
        num={name.key}/>
    )
  })

  // Function for handling theme change.
  function handleThemeChange(event) {
    setTheme(event.target.value)
  }

  return (
    <div className='container' data-theme={theme}>
      <div className='outer-container'>
        <div className='inner-container'>
          <div className='heading' data-theme={theme}>
            <h1>calc</h1>
            <div className='theme-box' data-theme={theme}>
              <p>Theme</p>
              <div className='toggler'>
                <div className='toggler-labels'>
                  {labels}
                </div>
                <ToggleButtons themeChange={handleThemeChange}/>
              </div>
            </div>
          </div>
          <UserInput theme={theme}/>
        </div>
      </div>
    </div>
  )
}

function ToggleLabels(props) {
  return (
    <>
      <label htmlFor={props.theme}>{props.num}</label>
    </>
  )
}

function ToggleButtons(props) {
  return (
    <div className='toggler-buttons'>
      <input id='theme_1'
        name='chooseTheme'
        value='theme_1'
        type='radio'
        onClick={props.themeChange}
        defaultChecked/>
      <input id='theme_2'
        name='chooseTheme'
        value='theme_2'
        type='radio'
        onClick={props.themeChange}/>
      <input id='theme_3'
        name='chooseTheme'
        value='theme_3'
        type='radio'
        onClick={props.themeChange}/>
    </div>
  )
}

export default App
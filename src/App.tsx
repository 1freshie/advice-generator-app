import { useState } from 'react';

import './App.css';
import dividerSVG from './images/pattern-divider-desktop.svg';
import diceSVG from './images/icon-dice.svg';

const App: React.FunctionComponent = () => {
  const [advice, setAdvice] = useState({
    id: 0,
    text: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const generateAdviceHandler = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');

      if (!response.ok) {
        throw new Error("Couldn't load advice");
      }

      const responseData = await response.json();
      const loadedAdvice = {
        id: responseData.slip.id,
        text: responseData.slip.advice,
      };

      console.log(responseData);

      setAdvice(loadedAdvice);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="card">
        {!isLoading ? (
          <p className="advice__id">ADVICE #{advice.id}</p>
        ) : (
          <p className="advice__id">...</p>
        )}
        {!isLoading ? (
          <p className="advice__text">"{advice.text}"</p>
        ) : (
          <p className="advice__text">Loading...</p>
        )}
        <div className='advice__divider'>
          <img src={dividerSVG} alt="divider-icon" />
        </div>
      </div>
        {/* <button className="advice__button" onClick={generateAdviceHandler}>
        NEW ADVICE
      </button> */}
      <div className="advice__button" onClick={generateAdviceHandler}>
        <img src={diceSVG} alt="dice-icon" />
      </div>
    </div>
  );
};

export default App;

import { useContext } from 'react';
import { Context } from '../stateManagement/Provider';
import { effectText } from '../constants/effects';
import React from 'react';
import { ms, minute } from '../constants/convertTime';

export const ControlBreak = () => {
  const { timeBreak, setTimeBreak, play, setTime, timeChange } =
    useContext(Context);
  const increment = () => {
    if (timeBreak < 60) {
      setTimeBreak(timeBreak + 1);
      if (!timeChange) setTime(ms(timeBreak) + minute);
      effectText('break-length');
    }
  };
  const decrement = () => {
    if (timeBreak > 1) {
      setTimeBreak(timeBreak - 1);
      if (!timeChange) setTime(ms(timeBreak) - minute);
      effectText('break-length');
    }
  };
  return (
    <section className='break-control'>
      <div id='break-label'>Break Length</div>
      <div className='controls'>
        <i
          className='fas fa-arrow-alt-circle-left'
          id='break-decrement'
          onClick={e => (!play ? decrement() : e.preventDefault())}
        />
        <div id='break-length' className='break-length'>
          {timeBreak}
        </div>
        <i
          className='fas fa-arrow-alt-circle-right'
          id='break-increment'
          onClick={e => (!play ? increment() : e.preventDefault())}
        />
      </div>
    </section>
  );
};

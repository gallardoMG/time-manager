import { useContext } from 'react';
import { Context } from '../stateManagement/Provider';
import { effectText } from '../constants/effects';
import React from 'react';
import { ms, minute } from '../constants/convertTime';

export const ControlSession = () => {
  const { timeSession, setTimeSession, play, setTime, timeChange } =
    useContext(Context);

  const increment = () => {
    if (timeSession < 60) {
      setTimeSession(timeSession + 1);
      if (timeChange) setTime(ms(timeSession) + minute);
      effectText('session-length');
    }
  };
  const decrement = () => {
    if (timeSession > 1) {
      setTimeSession(timeSession - 1);
      if (timeChange) setTime(ms(timeSession) - minute);
      effectText('session-length');
    }
  };
  return (
    <section className='session-control'>
      <div id='session-label'>Session Length</div>
      <div className='controls'>
        <i
          className='fas fa-arrow-alt-circle-left'
          id='session-decrement'
          onClick={e => (!play ? decrement() : e.preventDefault())}
        />
        <div id='session-length' className='session-length'>
          {timeSession}
        </div>
        <i
          className='fas fa-arrow-alt-circle-right'
          id='session-increment'
          onClick={e => (!play ? increment() : e.preventDefault())}
        />
      </div>
    </section>
  );
};

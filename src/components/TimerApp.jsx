import { ControlsLength } from './ControlsLength';
import { Footer } from './Footer';
import { Timer } from './Timer';
import { Provider } from '../stateManagement/Provider';
import React from 'react';

export const TimerApp = () => {
  return (
    <main className='wrapper-content'>
      <Provider>
        <ControlsLength />
        <Timer />
      </Provider>
      <Footer />
    </main>
  );
};

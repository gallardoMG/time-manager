import { createContext, useState } from 'react';
import { initialState } from '../constants/initialStates';
import React from 'react';

export const Provider = ({ children }) => {
  const [timeBreak, setTimeBreak] = useState(initialState.timeBreak);
  const [timeSession, setTimeSession] = useState(initialState.timeSession);
  const [play, setPlay] = useState(initialState.play);
  const [time, setTime] = useState(initialState.time);
  const [timeChange, setTimeChange] = useState(initialState.timeChange);
  const values = {
    timeBreak: timeBreak,
    setTimeBreak: setTimeBreak,
    timeSession: timeSession,
    setTimeSession: setTimeSession,
    play: play,
    setPlay: setPlay,
    time: time,
    setTime: setTime,
    timeChange: timeChange,
    setTimeChange: setTimeChange,
  };
  return <Context.Provider value={{ ...values }}>{children}</Context.Provider>;
};
export const Context = createContext();

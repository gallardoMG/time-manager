import { useCallback, useContext, useRef, useEffect } from 'react';
import { Context } from '../stateManagement/Provider';
import { initialState } from '../constants/initialStates';
import React from 'react';
import { ms, second_ms } from '../constants/convertTime';

export const Timer = () => {
  const {
    timeBreak,
    setTimeBreak,
    timeSession,
    setTimeSession,
    play,
    setPlay,
    time,
    setTime,
    timeChange,
    setTimeChange,
  } = useContext(Context);

  const dt = useCallback(() => {
    const date = new Date(time);
    return {
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      time: date.getTime(),
    };
  }, [time]);

  const changeSession = useCallback(() => {
    const changeBackground = document.querySelector('.wrapper-time');
    const beep = document.getElementById('beep');
    beep.play();
    if (timeChange) {
      changeBackground.classList.add('changeBackground');
      setTime(ms(timeBreak));
    } else {
      changeBackground.classList.remove('changeBackground');
      setTime(ms(timeSession));
    }
    setTimeChange(!timeChange);
  }, [timeChange, setTimeChange, timeSession, timeBreak, setTime]);

  const idTimeout = useRef(null);

  const handleTime = useCallback(
    () =>
      (idTimeout.current = setTimeout(() => {
        if (time !== 0) setTime(time - second_ms);
        else {
          changeSession();
        }
      }, 1000)),
    [time, setTime, changeSession]
  );

  const redNumber = useCallback(() => {
    const currentTime = document.querySelector('.current-time');
    if (dt().time < 60000) currentTime.classList.add('redTextTime');
    else currentTime.classList.remove('redTextTime');
  }, [dt]);

  useEffect(() => {
    if (play) {
      handleTime();
    }
    redNumber();
  }, [play, handleTime, redNumber]);

  const pause = () => {
    if (play) {
      clearTimeout(idTimeout.current);
      setPlay(!play);
    } else setPlay(!play);
  };
  const reset = () => {
    console.log(timeChange);
    setTimeBreak(initialState.timeBreak);
    setTimeSession(initialState.timeSession);
    setPlay(initialState.play);
    setTime(initialState.time);
    setTimeChange(initialState.timeChange);
    const beep = document.getElementById('beep');
    if (!beep.paused) beep.pause();
    const changeBackground = document.querySelector('.wrapper-time');
    changeBackground.classList.remove('changeBackground');
    clearTimeout(idTimeout.current);
  };
  return (
    <>
      <section className='wrapper-time'>
        <h1 id='title'>TIME MANAGER</h1>
        <div id='timer-label'>{!timeChange ? 'Break' : 'Session'}</div>
        <div id='time-left' className='current-time'>
          {`${
            dt().minutes < 10 && dt().minutes > 0
              ? '0' + dt().minutes
              : timeSession === 60 && dt().seconds === 0
              ? '60'
              : dt().minutes === 0
              ? '0' + dt().minutes
              : dt().minutes
          }
          : ${
            dt().seconds === 0
              ? '00'
              : dt().seconds < 10
              ? '0' + dt().seconds
              : dt().seconds
          }`}
        </div>
        <i
          className={play ? 'fas fa-pause-circle' : 'fas fa-play-circle'}
          id='start_stop'
          onClick={() => pause()}
        />
      </section>
      <i className='fas fa-sync-alt' id='reset' onClick={() => reset()} />
      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </>
  );
};

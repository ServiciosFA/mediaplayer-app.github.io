import { timerSliceActions } from "../store/timerSilce";

export const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const updateTime = (dispatch, duration) => {
  dispatch(
    timerSliceActions.SET_TIMER({
      timer: { seconds: 0, minutes: 0 },
      //Pasar a segundos la duracion
      totalTime: duration / 1000,
      trackPercentage: 0,
    })
  );
};

export const updateTimexPercentage = (
  value,
  setPercentage,
  audioRef,
  dispatch,
  percentage
) => {
  setPercentage(value);
  const audioElement = audioRef.current;
  const totalTime = audioElement.duration;
  if (!isNaN(totalTime) && totalTime !== 0) {
    const currentTime = (value / 100) * totalTime;
    audioElement.currentTime = currentTime;

    dispatch(
      timerSliceActions.SET_TIMER({
        timer: {
          minutes: Math.floor(currentTime / 60),
          seconds: Math.floor(currentTime % 60),
        },
        totalTime,
        trackPercentage: percentage,
      })
    );
  }
};

export const updatePercentagexTime = (
  audioRef,
  setPercentage,
  dispatch,
  percentage
) => {
  const audioElement = audioRef.current;
  // Actualizar el estado de tiempo basado en el audio
  const currentTime = audioElement.currentTime;
  const totalTime = audioElement.duration;
  if (!isNaN(totalTime) && totalTime !== 0) {
    const percetaje = Math.floor((currentTime / totalTime) * 100);
    setPercentage(percetaje);
    dispatch(
      timerSliceActions.SET_TIMER({
        timer: {
          minutes: Math.floor(currentTime / 60),
          seconds: Math.floor(currentTime % 60),
        },
        totalTime,
        trackPercentage: percentage,
      })
    );
  }
};

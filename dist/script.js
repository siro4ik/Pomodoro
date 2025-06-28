"use strict";
const timer = document.querySelector('.timer-display');
if (!timer)
    throw new Error("Таймер не найден");
const startBtn = document.querySelector('.start-btn');
if (!startBtn)
    throw new Error("Кнопка старта не обнаружена");
const pauseBtn = document.querySelector('.pause-btn');
if (!pauseBtn)
    throw new Error("Кнопка паузы не обнаружена");
const skipBtn = document.querySelector('.skip-btn');
if (!skipBtn)
    throw new Error("Кнопка пропуска не обнаружена");
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;
const state = {
    timeLeft: 25 * 60,
    phase: 'work',
    intervalId: null,
    isPaused: false
};
// проверка состояния старта/обнуление и обновление таймера
function handleStart() {
    if (state.intervalId || state.timeLeft <= 0)
        return;
    state.intervalId = setInterval(() => {
        state.timeLeft--;
        updateDisplay();
        if (state.timeLeft <= 0) {
            clearInterval(state.intervalId);
            state.intervalId = null;
        }
    }, 1000);
}
// кнопка паузы, проверка состояния
function handlePause() {
    if (!state.intervalId)
        return;
    clearInterval(state.intervalId);
    state.intervalId = null;
}
// кнопка пропуска фазы
function handleSkip() {
    if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null;
    }
    if (state.phase == 'break') {
        state.phase = 'work';
        state.timeLeft = WORK_TIME;
    }
    else {
        state.phase = 'break';
        state.timeLeft = BREAK_TIME;
    }
    state.isPaused = false;
    updateDisplay();
}
// высчитывание секунд и минут с послед. преобразованием
function updateDisplay() {
    const minutes = Math.floor(state.timeLeft / 60).toString().padStart(2, '0');
    const seconds = Math.floor(state.timeLeft % 60).toString().padStart(2, '0');
    timer.textContent = `${minutes}:${seconds}`;
}
;
// обработчики событий для кнопок 
startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
skipBtn.addEventListener('click', handleSkip);

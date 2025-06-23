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
const stopBtn = document.querySelector('.stop-btn');
if (!stopBtn)
    throw new Error("Кнопка стоп не обнаружена");
const state = {
    timeLeft: 25 * 60,
    phase: 'work',
    intervalId: null
};

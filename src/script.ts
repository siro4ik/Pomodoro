const timer = document.querySelector('.timer-display') as HTMLElement;
if (!timer) throw new Error ("Таймер не найден")
const startBtn = document.querySelector('.start-btn') as HTMLElement;
if (!startBtn) throw new Error ("Кнопка старта не обнаружена")
const pauseBtn = document.querySelector('.pause-btn') as HTMLElement;
if (!pauseBtn) throw new Error ("Кнопка паузы не обнаружена")
const stopBtn = document.querySelector('.stop-btn') as HTMLElement;
if (!stopBtn) throw new Error ("Кнопка стоп не обнаружена");

type TimerState ={
    timeLeft: number;
    phase: 'work' | 'break';
    intervalId: number | null;
};

const state: TimerState = {
    timeLeft: 25 * 60,
    phase: 'work',
    intervalId: null
};


// проверка состояния старта/обнуление и обновление таймера
function handleStart(){

    if(state.intervalId || state.timeLeft <= 0) return;  

    state.intervalId = setInterval(()=>{
    state.timeLeft--;
    updateDisplay();

        if(state.timeLeft <= 0){
            clearInterval(state.intervalId!);
            state.intervalId = null;
        }
    }, 1000);
}

// высчитывание секунд и минут с послед. преобразованием
function updateDisplay(){
    const minutes = Math.floor(state.timeLeft/60).toString().padStart(2, '0');
    const seconds = Math.floor(state.timeLeft%60).toString().padStart(2, '0');
    timer.textContent = `${minutes}:${seconds}`;
};


// обработчики событий для кнопок 

startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
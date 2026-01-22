document.addEventListener('DOMContentLoaded', () => {

  const startBtn = document.getElementById('startBtn');
  const startPage = document.getElementById('startPage');
  const gamePage = document.getElementById('gamePage');
  const timeRange = document.getElementById('timeRange');
  const timeDisplay = document.getElementById('timeDisplay');
  let selectedTime = Number(timeRange.value); // default 60s

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  // Update display initially
  timeDisplay.textContent = formatTime(selectedTime);

  // Update display whenever range changes
  timeRange.addEventListener('input', () => {
    selectedTime = Number(timeRange.value);
    timeDisplay.textContent = formatTime(selectedTime);
  });

  startBtn.addEventListener('click', () => {
    startPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    startGame();
  });

  function Bubbles() {
    let element = '';
    for (let i = 0; i < 126; i++) {
      element += `<button class="w-[50px] hover:bg-blue-500 cursor-pointer h-[50px] bg-blue-400 rounded-full text-2xl">
        ${Math.floor(Math.random() * 10 + 1)}
      </button>`;
    }
    document.querySelector("#Glass").innerHTML = element;
  }
  let Timer = selectedTime; 
  let interval;

  function TimerFnc() {
    Timer = selectedTime; // reset timer every start
    document.getElementById('Time').textContent = Timer + 's';

    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      if (Timer > 0) {
        Timer--;
        document.getElementById('Time').textContent = Timer + 's';
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }


  let Hitrn = Math.floor(Math.random() * 10 + 1);

  function RandomHits() {
    Hitrn = Math.floor(Math.random() * 10 + 1);
    document.getElementById('Hit').textContent = Hitrn;
  }

  let score = 0;

  function GameScore() {
    document.getElementById('Glass').addEventListener('click', (dets) => {
      let ClickItem = Number(dets.target.textContent);
      if (Timer > 0) {
        if (ClickItem === Hitrn) {
          score++;
          RandomHits();
          Bubbles();
        }
      } else {
        Timer = 0;
        Hitrn = 0;
        let Glass = document.querySelector('#Glass');
        let NewDiv = document.createElement('div');
        NewDiv.id = 'New';
        NewDiv.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'gap-4', 'h-full', 'w-full');

        let message = document.createElement('p');
        message.textContent = 'Game Over';
        message.classList.add('text-4xl', 'font-bold', 'text-white');

        let ScoreP = document.createElement('p');
        ScoreP.textContent = `Score: ${score}`;
        ScoreP.classList.add('text-2xl', 'text-white/80');

        let btn = document.createElement('button');
        btn.innerHTML = 'Restart';
        btn.id = 'button';
        btn.classList.add('px-6', 'py-3', 'rounded-xl', 'bg-indigo-500', 'hover:bg-indigo-600', 'font-bold', 'text-lg');

        NewDiv.appendChild(message);
        NewDiv.appendChild(ScoreP);
        NewDiv.appendChild(btn);

        Glass.innerHTML = '';
        Glass.appendChild(NewDiv);

        btn.addEventListener('click', () => {
          location.reload();
        });
      }

      document.querySelector('#Score').textContent = score;
    });
  }

  function startGame() {
    Bubbles();
    RandomHits();
    TimerFnc();
    GameScore();
  }

});

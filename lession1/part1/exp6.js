class Timer {
  constructor() {
    this.time = 0;
  }

  tick = () => {
    this.time++;
    console.log(`Thời gian hiện tại là ${this.time}`);
  };

  start() {
    setInterval(this.tick, 1000);
  }
}

const timer = new Timer();
timer.start();

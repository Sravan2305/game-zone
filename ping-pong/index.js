let playSound = (src) => {
  new Audio(src).play();
};

/* INIT */
(function () {
  const top = document.getElementById("top");
  const bottom = document.getElementById("bottom");
  const container = document.getElementById("container");
  const ball = document.getElementById("ball");

  //////////////////////////////////////////////////////////////////////////////
  //                               BALL HANDLER                              ///
  //////////////////////////////////////////////////////////////////////////////
  let ballTimer = setInterval(ballMovement, 60);
  function ballMovement() {
    let ballX = ball.offsetLeft;
    let ballY = ball.offsetTop;
    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;
    let topX = top.offsetLeft;
    let topY = top.offsetTop;
    let topWidth = top.offsetWidth;
    let bottomX = bottom.offsetLeft;
    let bottomY = bottom.offsetTop;
    let bottomWidth = bottom.offsetWidth;

    /// get random number between 1 and 4
    let randomY = (min, max) => getRandomArbitrary(min, max);

    ball.style.left = ballX + ballSpeedX + "px";
    ball.style.top = ballY + ballSpeedY + "px";

    if (
      ballX + ball.offsetWidth >= containerWidth - ball.offsetHeight / 2 ||
      ballX < ball.offsetWidth / 2
    ) {
      ballSpeedX = -ballSpeedX;
      ball.style.left = ballX + ballSpeedX + "px";
      ball.style.top = ballY + ballSpeedY + "px";
      playSound("audio/side1.wav");
    }
    /// ROD LOGIC
    if (
      ballY + ball.offsetHeight > containerHeight - ball.offsetHeight / 2 ||
      ballY <= ball.offsetHeight
    ) {
      if (
        ballX > topX - Math.floor(topWidth / 2) &&
        ballX < topX + Math.floor(topWidth / 2)
      ) {
        ballSpeedY = -ballSpeedY;
        ball.style.left = ballX + ballSpeedX + "px";
        ball.style.top = ballY + ballSpeedY + "px";
        playSound("audio/rod1.wav");
        topScore++;
        console.log(topScore);
      } else {
        console.log("Game Over");
        window.localStorage.setItem("topScore", topScore);
        topScore = 0;
        playSound("audio/gameOver.wav");
        clearInterval(ballTimer);
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //                               KEY BOARD HANDLER                         ///
  //////////////////////////////////////////////////////////////////////////////
  document.addEventListener("keydown", function (event) {
    let leftComputedStyle = +getComputedStyle(top, "left").left.split("px")[0];

    if (
      event.key === "ArrowRight" &&
      leftComputedStyle < container.clientWidth - top.clientWidth / 2
    ) {
      top.style.left = parseInt(leftComputedStyle) + rodSpeed + "px";
      bottom.style.left = parseInt(leftComputedStyle) + rodSpeed + "px";
    } else if (
      event.key === "ArrowLeft" &&
      leftComputedStyle > top.clientWidth / 2
    ) {
      top.style.left = parseInt(leftComputedStyle) - rodSpeed + "px";
      bottom.style.left = parseInt(leftComputedStyle) - rodSpeed + "px";
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  //                               TOUCH HANDLER                             ///
  //////////////////////////////////////////////////////////////////////////////
  let touchStart = 0;
  document.addEventListener("touchstart", function (event) {
    touchStart = event.changedTouches[0].clientX;
  });
  document.addEventListener("touchmove", function (event) {
    let lefftComputedStyle = +getComputedStyle(top, "left").left.split("px")[0];
    const touchMove = event.changedTouches[0].clientX - touchStart;
    if (
      touchMove > 0 &&
      lefftComputedStyle < container.clientWidth - top.clientWidth / 2
    ) {
      top.style.left = parseInt(lefftComputedStyle) + touchMove + "px";
      bottom.style.left = parseInt(lefftComputedStyle) + touchMove + "px";
    } else if (touchMove < 0 && lefftComputedStyle > top.clientWidth / 2) {
      top.style.left = parseInt(lefftComputedStyle) + touchMove + "px";
      bottom.style.left = parseInt(lefftComputedStyle) + touchMove + "px";
    }
    if (
      lefftComputedStyle + touchMove >
      container.clientWidth - top.clientWidth / 2
    ) {
      top.style.left = container.clientWidth - top.clientWidth / 2 + "px";
      bottom.style.left = container.clientWidth - top.clientWidth / 2 + "px";
    }
    if (lefftComputedStyle + touchMove < top.clientWidth / 2) {
      top.style.left = top.clientWidth / 2 + "px";
      bottom.style.left = top.clientWidth / 2 + "px";
    }
    touchStart = event.changedTouches[0].clientX;
  });

  //////////////////////////////////////////////////////////////////////////////
  //                               MOUSE HANDLER                             ///
  //////////////////////////////////////////////////////////////////////////////
  let mouseStart = 0,
    mouseActive = false;
  document.addEventListener("mousedown", function (event) {
    mouseStart = event.clientX;
    mouseActive = true;
  });
  document.addEventListener("mousemove", function (event) {
    if (!mouseActive) return;
    let lefftComputedStyle = +getComputedStyle(top, "left").left.split("px")[0];
    const mouseMove = event.clientX - mouseStart;
    if (
      mouseMove > 0 &&
      lefftComputedStyle < container.clientWidth - top.clientWidth / 2
    ) {
      top.style.left = parseInt(lefftComputedStyle) + mouseMove + "px";
      bottom.style.left = parseInt(lefftComputedStyle) + mouseMove + "px";
    } else if (mouseMove < 0 && lefftComputedStyle > top.clientWidth / 2) {
      top.style.left = parseInt(lefftComputedStyle) + mouseMove + "px";
      bottom.style.left = parseInt(lefftComputedStyle) + mouseMove + "px";
    }
    if (
      lefftComputedStyle + mouseMove >
      container.clientWidth - top.clientWidth / 2
    ) {
      top.style.left = container.clientWidth - top.clientWidth / 2 + "px";
      bottom.style.left = container.clientWidth - top.clientWidth / 2 + "px";
    }
    if (lefftComputedStyle + mouseMove < top.clientWidth / 2) {
      top.style.left = top.clientWidth / 2 + "px";
      bottom.style.left = top.clientWidth / 2 + "px";
    }
    mouseStart = event.clientX;
  });
  document.addEventListener("mouseup", () => {
    mouseActive = false;
  });
})();

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

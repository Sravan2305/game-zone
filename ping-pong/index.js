const top2 = document.getElementById("top");
const bottom = document.getElementById("bottom");
const container = document.getElementById("container");
const ball = document.getElementById("ball");

(function () {
  const top = document.getElementById("top");
  const bottom = document.getElementById("bottom");
  const container = document.getElementById("container");
  const ball = document.getElementById("ball");

  //////////////////////////////////////////////////////////////////////////////
  //                               BALL HANDLER                              ///
  //////////////////////////////////////////////////////////////////////////////

  var m = getRandomInt(2) * Math.random();
  var s = 1;

  let ballTimer = setInterval(ballMovement, 10);
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
    if (
      ballY == container.offsetWidth - ball.offsetHeight / 2 - 6 ||
      ballY == ball.offsetHeight / 2
    ) {
      clearInterval(ballTimer);
      console.log("game over");
    }

    // left wall
    if (
      ballX + m * 1 < ball.offsetHeight / 2 &&
      ballX != ball.offsetHeight / 2
    ) {
      ball.style.left = ball.offsetHeight / 2 + "px";
      m = m * -1;
    }
    // Right wall
    else if (
      ballX + m * 1 > container.offsetWidth - ball.offsetHeight / 2 - 6 &&
      ballX != container.offsetWidth - ball.offsetHeight / 2 - 6
    ) {
      ball.style.left =
        container.offsetWidth - ball.offsetHeight / 2 - 6 + "px";
      m = m * -1;
    }

    // Rod Hit Down
    else if (
      ballY + s > bottom.offsetTop &&
      ballX < bottom.offsetLeft + 104 &&
      ballX > bottom.offsetLeft - 104
    ) {
      ball.style.top =
        container.offsetWidth -
        ball.offsetHeight / 2 -
        (5 + bottom.offsetHeight) +
        "px";
      s = s * -1;
      m = Math.random() * -1;
    }

    // Rod Hit Up
    else if (
      ballY + s < top.offsetTop + top.offsetHeight &&
      ballX < bottom.offsetLeft + 104 &&
      ballX > bottom.offsetLeft - 104
    ) {
      ball.style.top = top2.offsetHeight + ball.offsetHeight / 2 - 3 + "px";
      s = s * -1;
      m = Math.random() * -1;
    }

    // down wall
    else if (
      ballY + s > container.offsetWidth - ball.offsetHeight / 2 - 6 &&
      ballY != container.offsetWidth - ball.offsetHeight / 2 - 6
    ) {
      ball.style.top = container.offsetWidth - ball.offsetHeight / 2 - 6 + "px";
      s = s * -1;
    }
    // upwall
    else if (
      ballY + s < ball.offsetHeight / 2 &&
      ballY != ball.offsetHeight / 2
    ) {
      ball.style.top = ball.offsetHeight / 2 + "px";
      s = s * -1;
    } else {
      ball.style.left = ballX + m * 1 + "px";
      ball.style.top = ballY + s + "px";
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

function getRandomIntR(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function getRandomInt(max) {
  k = Math.floor(Math.random() * max);
  if (k == 0) {
    return -1;
  }
  return 1;
}

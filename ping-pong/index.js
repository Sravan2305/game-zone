(function () {
  const top = document.getElementById("top");
  const bottom = document.getElementById("bottom");
  const container = document.getElementById("container");
  const ball = document.getElementById("ball");

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
})();

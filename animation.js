onload = function startAnimation() {
    let frameHeight = 237.5;
    let frames = 2;
    let frame = 0;
    let div = document.getElementById("char-animation");
    setInterval(function () {
        let frameOffset = (++frame % frames) * -frameHeight;
        div.style.backgroundPosition = "0px " + frameOffset + "px";
    }, 500);
}

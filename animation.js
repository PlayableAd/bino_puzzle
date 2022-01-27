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
// onload = function startAnimation() {
//     let frameHeight = 519;
//     let frames = 7;
//     let frame = 0;
//     let div = document.querySelector(".hand-animation");
//     setInterval(function () {
//         let frameOffset = (++frame % frames) * -frameHeight;
//         div.style.backgroundPosition = "0px " + frameOffset + "px";
//     }, 100);
// }

// move a candy on the board
$(board).on('scoreUpdate', function (e, info) {
    // Your code here. To be implemented in pset 2.
    // $("#score").html(board.getScore());
    let score = board.getScore();
    const pullUpLocation = (score / 30 || 0) * 100 * 2.5;
    document.querySelector(".cage-door").style.bottom = `${pullUpLocation - 30}px`;
    console.log(pullUpLocation - 30);
    if ((pullUpLocation - 30) >= 245) {
        document.querySelector("#char-animation").style.backgroundImage = `url(${charHappyB64})`
        document.querySelector("#char-animation").style.width = `170px`
    }
});

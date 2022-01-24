onload = function startAnimation() { 
    var frameHeight = 237.5; 
    var frames = 2; 
    var frame = 0; 
    var div = document.getElementById("animation"); 
    setInterval(function () { 
        var frameOffset = (++frame % frames) * -frameHeight; 
        div.style.backgroundPosition = "0px " + frameOffset + "px"; 
    }, 500); 
} 

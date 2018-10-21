//shortening addEventListener because I hate typing it over and over
Object.prototype.ev = function (evtName, cbk) {
    return this.addEventListener(evtName, cbk);
}


var conv = new Tone.Convolver("sounds/singlefootstep.wav").toMaster();
conv.wet.value = 1;
var filter = new Tone.Filter(4830, "lowpass", -12, 0, 0).toMaster();

var player = new Tone.Player("sounds/singlefootstep.wav").connect(filter).connect(conv);


var btn = document.getElementById("trigger");

btn.ev("click", function (evt) {
    if (!document.body.classList.contains("added")) {
        document.body.classList.add("added");
        setInterval(function () {
            player.start();
        }, 200);
    } else {
        console.log("sound is already playing");

    }

});
function increaseWet() {
    if (conv.wet.value <= 1) {
        conv.wet.value += 0.1;
        console.log("convolver wet value " + conv.wet.value);
    }
}

function decreaseWet() {
    if (conv.wet.value >= 0) {
        conv.wet.value -= 0.1;
        console.log("convolver wet value " + conv.wet.value);

    }
}

function increaseFreq() {
    if (filter.frequency.value < 5000) {
        filter.frequency.value += 100;
        console.log("filter frequency: " + filter.frequency.value);
    }
}

function decreaseFreq() {
    if (filter.frequency.value > 100) {

        filter.frequency.value -= 100;
        console.log("filter frequency " + filter.frequency.value);
    }
}

btn.ev("keydown", function (evt) {
    switch (evt.key) {
        case "ArrowUp":
            evt.preventDefault();
            increaseWet();
            break;
        case "ArrowDown":
            evt.preventDefault();
            decreaseWet();
            break;
        case "ArrowLeft":
            evt.preventDefault();
            decreaseFreq();
            break;
        case "ArrowRight":
            evt.preventDefault();
            increaseFreq();
            break;
        default:
            console.log("not an arrow key");

    }
})
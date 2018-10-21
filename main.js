Object.prototype.ev = function (evtName, cbk) {
    return this.addEventListener(evtName, cbk);
}

var synth = new Tone.AMSynth().toMaster();


let btn = document.getElementById("trigger");

btn.ev("mousedown", function (evt) {
    synth.triggerAttack(evt.target.textContent);
});

btn.ev("mouseup", function (evt) {
    synth.triggerRelease();
});
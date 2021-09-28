var canvas = document.getElementById("canvas");
// Set canvas and app full screen
canvas.width = window.innerWidth
canvas.height = window.innerHeight
app.width = window.innerWidth
app.height = window.innerHeight

document.body.scrollTop = 0; // <-- pull the page back up to the top
document.body.style.overflow = 'hidden'; // <-- relevant addition


app.onInit = function(){};

app.onUpdate = function(time){
    let deltatime = time / (1000/60) //Run 60 frames per second (1000ms)
};
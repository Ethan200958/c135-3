status = "";
objects = [];
object_name = "";

function preload() {

}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);

    if(status != "") {
        objectDetector.detect(video, gotResult);
        for(i=0;i<objects.length;i++) {

            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label +" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name) {
                video.stop();
                document.getElementById("status").innerHTML = object_name+ " found!";
                objectDetector.detect(gotResult);
            } else {
                document.getElementById("status").innerHTML = object_name+" not found :(";
            }
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    object_name = document.getElementById("input").value;
    utterThis = new SpeechSynthesisUtterance(text);
}

function modelLoaded() {
    console.log("COCOSSD Initalized!");
    status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}
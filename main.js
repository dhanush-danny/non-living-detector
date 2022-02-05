img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("la.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    model = ml5.objectDetector("cocossd", model_loaded);
}

function model_loaded() {
    document.getElementById("status").innerHTML = "Detecting Object";
    console.log("model is loaded");
    status = true;
    model.detect(img, getresult);
}

function getresult(error_message, object_result) {
    if (error_message) {
        console.error(error_message);
    } else {
        console.log(object_result);
        objects = object_result;
    }

}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Object Detected";

            object_name = objects[i].label;
            object_percentage = ((objects[i].confidence)*100).toFixed(0);
            object_x = objects[i].x;
            object_y = objects[i].y;
            object_height = objects[i].height;
            object_width = objects[i].width;
            fill('rgba(255,204,0,0.5)');
            rect(object_x - 5, object_y - 40, object_name.length * 35, 40);
            fill("black");
            textSize(25);
            text(object_name + " " + object_percentage + "%", object_x, object_y-15);
            noFill();
            stroke("blue");
            rect(object_x,object_y,object_width,object_height);
        }
    }
}
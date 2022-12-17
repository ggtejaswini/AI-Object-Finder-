status = "";
function Start(){
    objectdetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
    input_text = document.getElementById("obname");
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
    
}



function modelloaded(){
    console.log("Model is Loaded!");
    status = true;
}

function draw(){
    image(video,0,0,480,380)

    if(status != ""){
        objectdetector.detect(video,gotResults)

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            
            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
            if(objects[i].label == input_text){
                video.stop();
                object.Detector.detect(gotResults);
                document.getElementById("result").innerHTML = input_text+"Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("result").innerHTML = input_text + "Not Found";
            }

        }
    }
}


    

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
}
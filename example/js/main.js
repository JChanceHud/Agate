// main.js
//first thing executed on the client side
//

gamvas.event.addOnLoad(function() {
	//the first function called when the html page loads
	//it initialezes the sockets, the states and the canvas itself
    gamvas.socket = io.connect(ip);
    gamvas.socket.updateInterval = 0.1;
	//states are like different screens in a program, they each have their
	//own data, as well as click handlers, drawing functions, logic, etc.
    gamvas.state.addState(new gameState("gameState"));
    gamvas.start("gameCanvas");
	//ensure that gamvas is fullscreen
    gamvas.getCanvas().width = window.innerWidth;
    gamvas.getCanvas().height = window.innerHeight;
    window.onresize = function(){
        gamvas.getCanvas().width = window.innerWidth;
        gamvas.getCanvas().height = window.innerHeight;
    };
});

function loadFile(file){
    var fileRef = document.createElement('script');
    fileRef.src = file;
    document.getElementsByTagName('head')[0].appendChild(fileRef);
}


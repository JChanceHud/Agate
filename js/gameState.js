//gameState.js

gameState = gamvas.State.extend({
    init: function(){
        this.size = {w:screen.width,h:screen.height};
		//the camera is repositioned to make the coordinates easier to deal with
		//the gamvas coord system is kinda weird, you can view the documentation 
		//here https://doc.93i.de/gamvas/files/gamvas-camera-js.html
        this.camera.position.x = this.size.w/2.0;
        this.camera.position.y = this.size.h/2.0;
		//instance variable to track the total click count
		this.clickCount = 0;
		//function that is called when connected to server
		gamvas.socket.on('connected', function(data){
			//keep track of our client id, this is given by the server
			//it's not used for anything right now, but is generally useful
			gamvas.socket.id = data.id;
			console.log('connected');
		}.bind(this));

		//function that is called when receiving the update message
        gamvas.socket.on('update', function(data){
			//the data object is the same object that is passed in the server
			//update function, this data object has two variable, clickCount
			//and clientCount, although we only use clickCount right now
			this.clickCount = data.clickCount;
        }.bind(this));
    },
    enter: function(){
		//called when this state is entered, refer to the documentation to learn
		//about states
        console.log("entered state");
    },
	//called when the mouse button is released
    onMouseUp: function(button, x, y, ev){
		//sends a click message to the server with no data
        gamvas.socket.emit('click', {});
		//we manually increment the clickCount right now so that the
		//gui is updated immediately because it could take a while for
		//the server to send out an update (if there is lag)
		this.clickCount++; //update immediately
    },
    draw: function(t){
		//draws using html canvas commands, lots of documentation online
        this.c.fillStyle="#000000";
        this.c.fillRect(0,0,this.size.w, this.size.h);
		this.c.font = "30px Arial";
		this.c.fillStyle = "#00FF00";
		drawCenteredText(this.c, "Click count: "+this.clickCount, this.size.w/2.0, this.size.h/2.0);
		this.c.fillStyle = "#FFFFFF";
    },
});

//just a utility method that easily draws text centered at a given point
function drawCenteredText(context, text, x, y){
	var size = context.measureText(text);
	var cx = x-(size.width/2.0);
	context.fillText(text, cx, y);
}

//gameState.js

gameState = gamvas.State.extend({
    init: function(){
        this.size = {w:screen.width,h:screen.height};
        this.camera.position.x = this.size.w/2.0;
        this.camera.position.y = this.size.h/2.0;
		this.clickCount = 0;
		gamvas.socket.on('connected', function(data){
			gamvas.socket.id = data.id;
			console.log('connected');
		}.bind(this));
        gamvas.socket.on('update', function(data){
			this.clickCount = data.clickCount;
        }.bind(this));
    },
    enter: function(){
        console.log("entered state");
    },
    onMouseUp: function(button, x, y, ev){
        gamvas.socket.emit('click', {});
		this.clickCount++; //update immediately
    },
    draw: function(t){
        this.c.fillStyle="#000000";
        this.c.fillRect(0,0,this.size.w, this.size.h);
		this.c.font = "30px Arial";
		this.c.fillStyle = "#00FF00";
		drawCenteredText(this.c, "Click count: "+this.clickCount, this.size.w/2.0, this.size.h/2.0);
		this.c.fillStyle = "#FFFFFF";
    },
});

function drawCenteredText(context, text, x, y){
	var size = context.measureText(text);
	var cx = x-(size.width/2.0);
	context.fillText(text, cx, y);
}

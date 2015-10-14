function Circle(canvasID, pos, maxSize) {

    //draws circles on the canvas with selectable size

    this.canvas = document.getElementById(canvasID);
    this.context = this.canvas.getContext('2d');
    this.currentRad = 0;
    this.pos = pos;
    this.ga = 1;
    this.toEnlarge = true;
    this.maxSize = maxSize;
}

Circle.prototype.draw = function(){
    var mainContext = this.context;
    mainContext.save();
    mainContext.beginPath();
    var radius = this.currentRad;
    mainContext.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2, false);
    mainContext.closePath();
    mainContext.strokeStyle = "red";
    mainContext.lineWidth = 3;
    mainContext.globalAlpha = this.ga;
    mainContext.stroke();
    mainContext.restore();
}

Circle.prototype.render = function(){
    this.draw(this.currentRad);
    this.currentRad += 0.5;
    this.ga -= 0.025;
    if(this.currentRad >= this.maxSize){
        this.toEnlarge = false;
        this.currentRad = 0;
    }
}




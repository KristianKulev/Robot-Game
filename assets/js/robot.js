function Robot(){
    TravelingObject.call(this);
    this.imgSrc = "assets/images/robot.png";
    this.numberOfFrames = 8;
    this.width = 424;
    this.height = 100;
    this.position = {
        x: 200,
        y: 200
    };
    this.spriteOffsetX = -15;
    this.sprite = new Sprite(this);
}

Robot.prototype = Object.create(TravelingObject.prototype);
Robot.prototype.constructor = Robot;

Robot.prototype.render = function(){
    TravelingObject.prototype.render.call(this);

    //extends the TravelingObject's render method, adding
    //the laser aim

    this.context.save();
    this.context.translate(this.position.x - 1, this.position.y);
    this.context.rotate(this.rotation);
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(0, -600);
    var grd = this.context.createLinearGradient(0,0,0,-400);
    grd.addColorStop(0,"rgb(176, 31, 31)");
    grd.addColorStop(1, 'rgba(176, 31, 31, 0.1)');
    this.context.strokeStyle = grd;
    this.context.stroke();
    this.context.restore();
}

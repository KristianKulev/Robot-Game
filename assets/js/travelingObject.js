function TravelingObject(){
    if(this.constructor.name === 'TravelingObject'){
        throw new Error('This class is abstract');
    }

    //inherits AnimationObject, but pre-defines render method
    //sets own properties, needed for traveling across the context

    AnimationObject.call(this);
    this.isTraveling = false;
    this.newPosition = {};
    this.speed = 4;
    this.rotation = 0;

}

TravelingObject.prototype = Object.create(AnimationObject.prototype);
TravelingObject.prototype.constructor = TravelingObject;

TravelingObject.prototype.render = function(){
    if(this.isTraveling) {
        this.sprite.update();
        this.travelTo();
    }
    this.sprite.render(this.rotation);
};

TravelingObject.prototype.travel = function (position) {

    //sets object to traveling mode, with every game loop,
    //the object will render closer to the newPosition

    this.isTraveling = true;
    this.newPosition = {
        x: position.x,
        y: position.y
    }
};

TravelingObject.prototype.travelTo = function(){
    var x = this.newPosition.x;
    var y = this.newPosition.y;

    //get the distance between the old and new points

    var distanceX = Math.abs(x - this.position.x);
    var distanceY = Math.abs(y - this.position.y);
    var radians = Math.atan(distanceY/distanceX);

    //determines the amount position.x and position.y should be
    //altered with every game loop

    var vX = this.speed * (Math.cos(radians));
    var vY = this.speed * (Math.sin(radians));

    //checks if the object has arrived to the newPos

    if(((this.position.x <= x + this.speed && x < this.position.x) || (x >= this.position.x && this.position.x + this.speed > x))
        && ((y < this.position.y + this.speed && y >= this.position.y) || (y > this.position.y - this.speed && y <= this.position.y))){

        this.isTraveling = false;
        this.sprite.frameIndex = 0;
        this.sprite.render(this.rotation);

        //stops the traveling, renders the sprite with the animation frame for still position

        return;
    }

    if(this.position.x < x){
        this.position.x += vX;
    } else {
        this.position.x -= vX;
    }

    if(this.position.y < y){
        this.position.y += vY;
    } else {
        this.position.y -= vY;
    }
};


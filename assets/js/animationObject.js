function AnimationObject(){
    if(this.constructor.name === 'AnimationObject'){
        throw new Error('This class is abstract');
    }
    this.position = {};
    this.imgSrc = '';
    this.width = 0;
    this.height = 0;
    this.numberOfFrames = 0;
    this.context = document.getElementById('playingField').getContext('2d');
    this.ticksPerFrame = 1;

    //the sprite takes the loop prop to determine if the animation should be looped

    this.loop = true;
    this.sprite = new Sprite(this);
}

AnimationObject.prototype.render = function(posX, posY){

    //update the sprite animation frame,
    // render the sprite with the current frame drawing

    this.sprite.update();
    this.sprite.render();
};

AnimationObject.prototype.rotate = function (toPoint) {

    //set the angle at which the parent sprite will render

    function radians(cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx);
        return theta + 1.5707963267948966;  // theta + 90 degrees
    }

    //set the rotation prop to the current mouse position

    this.rotation = radians(this.position.x, this.position.y, toPoint.x, toPoint.y);
};


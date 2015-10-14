function Missile(position){
    TravelingObject.call(this);

    //instantiates missile object with the correct position

    this.imgSrc ="assets/images/missile.png";
    this.numberOfFrames = 4;
    this.width = 104;
    this.height = 50;
    this.position = {
        x: position.x,
        y: position.y
    };
    this.isExploaded = false;
    this.isExploading = false;
    this.speed = 15;
    this.sprite = new Sprite(this);
};

Missile.prototype = Object.create(TravelingObject.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.explode = function() {

    /*
        if the missile has arrived to the explosion point,
        a new explosion is instantiated and the missile render method is
        bind to the explosion's one. This way the missile render can render
        the explosion, after the missile has arrived
    */

    this.isExploading = true;
    var explosion = new Explosion(this);
    this.render = Explosion.prototype.render.bind(explosion);
};
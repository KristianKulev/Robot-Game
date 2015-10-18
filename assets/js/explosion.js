function Explosion(missile){
    AnimationObject.call(this);
    this.imgSrc ="assets/images/explosion.png";
    this.numberOfFrames = 34;
    this.width = 4350;
    this.height = 126;
    this.position = {
        x: missile.position.x - 50,
        y: missile.position.y - 55
    };

    this.missile = missile;
    this.loop = false; // the explosion should animate only once
    this.sprite = new Sprite(this);
}

Explosion.prototype = Object.create(AnimationObject.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.render = function () {
    AnimationObject.prototype.render.call(this);

    //extend the method to add check if the explosion,
    //created for the missile has finished, in order to delete it

    if(!this.sprite.isAnimating) {
        this.missile.isExploaded = true;
    }
};

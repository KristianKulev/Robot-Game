function Sprite(parent) {

    //get all needed properties from the parent

    this.context = parent.context;
    this.width = parent.width
    this.height = parent.height;
    this.image = new Image();
    this.image.src = parent.imgSrc;
    this.loop = parent.loop;
    this.spriteOffsetX = parent.spriteOffsetX || 0;
    this.tickCount = 0;
    this.frameIndex = 0;
    this.ticksPerFrame = parent.ticksPerFrame || 0;
    this.numberOfFrames = parent.numberOfFrames || 1;
    this.position = parent.position;
    this.rotation = 0;
    this.isAnimating = false;
    this.finished = false;
}

Sprite.prototype.render = function(rotation){
    this.context.save();

    //translate to the current position of the parent

    this.context.translate(this.position.x, this.position.y);
    this.context.rotate(rotation);

    this.context.drawImage(
        this.image,
        this.frameIndex * this.width / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        this.spriteOffsetX,
        0,
        this.width / this.numberOfFrames,
        this.height
    );

    this.context.restore();
};

Sprite.prototype.update = function(){
    if (this.finished && this.loop === false) return;  //if the sprite should stop animating - return

    this.isAnimating = true;
    this.tickCount += 1;
    if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.frameIndex < this.numberOfFrames - 1) {

            //ready the next sprite drawing for rendering

            this.frameIndex += 1;
        } else if (this.loop) {
            this.frameIndex = 0;
        } else {
            this.isAnimating = false;
            this.finished = true;
        }
    }
};




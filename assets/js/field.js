function Field(canvasId){
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
}

Field.prototype.clear = function(){

    //method to be called at each game loop

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Field.prototype.getCursorPosition = function(event) {
    var rect = this.canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    //return the coordinates of the event in the context

    return {
        x: x,
        y: y};

}

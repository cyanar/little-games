(function(){
     var land = window.Land = function(){
          this.x = 0;
         this.width = 336;
         this.height = 112;
     }
     Land.prototype.render = function(){
         game.ctx.drawImage(game.R["land"],this.x,game.canvas.height - this.height);
         game.ctx.drawImage(game.R["land"],this.x+this.width,game.canvas.height - this.height);
         game.ctx.drawImage(game.R["land"],this.x+this.width*2,game.canvas.height - this.height);
     }
     Land.prototype.update = function(){
         this.x -=2;
         if(this.x<-this.width){
              this.x = 0;
         }
     }

})()
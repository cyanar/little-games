(function(){
     var Background = window.Background = function(){
         this.x = 0;
         this.width = 288;
         this.height = 512;
     }
     Background.prototype.render = function(){
          game.ctx.fillStyle = "#4ec0ca";
          game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height - this.height);
          game.ctx.drawImage(game.R["bg_day"],this.x,game.canvas.height - this.height);
          game.ctx.drawImage(game.R["bg_day"],this.x+this.width,game.canvas.height - this.height);
          game.ctx.drawImage(game.R["bg_day"],this.x+this.width*2,game.canvas.height - this.height);
     }
     Background.prototype.update = function(){
          this.x--;
          if(this.x<-this.width){
              this.x = 0
          }
     }
})()
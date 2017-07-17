(function(){
     var Pipe = window.Pipe = function(){
        this.x = game.canvas.width;
        this.h = parseInt(Math.random()*220)+100;
        this.space  = 140;
        this.h2 = game.canvas.height - 112 - this.space - this.h;
        this.width = 52;
        this.height = 320;
        game.pipeArr.push(this);
     }
     Pipe.prototype.render = function(){
         game.ctx.drawImage(game.R["pipe_down"],0,320-this.h,52,this.h,this.x,0,52,this.h);
         game.ctx.drawImage(game.R["pipe_up"],0,0,52,this.h2,this.x,this.h+this.space,52,this.h2);
        game.ctx.fillStyle = "red";
        // game.ctx.fillText(this.x1 , this.x-30 , this.h+100);
        // game.ctx.fillText(this.x2 , this.x + 52 , this.h+100);
        // game.ctx.fillText(this.y1 , this.x , this.h);
        // game.ctx.fillText(this.y2 , this.x , this.h+ 140);
     }
     Pipe.prototype.update = function(){
          this.x--;
          if(this.x<-52){
             for(var i=0;i<game.pipeArr.length;i++){
                 if(game.pipeArr[i]== this){
                     game.pipeArr.splice(i,1);
                 }
             }
          }
          this.x1 = this.x;
          this.x2 = this.x+52;
          this.y1 = this.h;
          this.y2 = this.h +this.space;
       if(game.bird.x2>this.x1&&game.bird.y1<this.y1&&game.bird.x1<this.x2
        ||game.bird.x2>this.x1&&game.bird.y2>this.y2&&game.bird.x1<this.x2
        ){
          // clearInterval(game.timer);
          game.sm.enter(3);
       }

       if(!this.done&&game.bird.x1>this.x2){
           game.score++;
           this.done = true;
           document.getElementById("point").load();
            document.getElementById("point").play();
       }
     }
})()
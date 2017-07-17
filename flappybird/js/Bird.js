(function(){
     var Bird = window.Bird = function(){
         this.x = game.canvas.width *(1-0.618);
         this.y = 100;
         this.rad = 0;
         this.dy = 0;
         this.ddy = 0.6;
         this.fsm = "下落";
         this.images = [game.R["bird0_0"] , game.R["bird0_1"] , game.R["bird0_2"]];
         this.wing = 0;
     }
     Bird.prototype.render = function(){
        game.ctx.save();
        game.ctx.translate(this.x,this.y);
        game.ctx.rotate(this.rad);
        game.ctx.drawImage(this.images[this.wing],-24,-24);
        game.ctx.restore();

        // game.ctx.fillStyle = "red";
        // game.ctx.fillText(this.x1 , this.x - 80 , this.y);
        // game.ctx.fillText(this.x2 , this.x + 50 , this.y);
        // game.ctx.fillText(this.y1 , this.x , this.y - 50);
        // game.ctx.fillText(this.y2 , this.x , this.y + 50);
     }
     Bird.prototype.fly = function(){
          this.fsm = "上升"
          this.dy = 8;
          this.rad = -1.4;
          document.getElementById("wing").load();
        document.getElementById("wing").play();
     }
     Bird.prototype.update = function(){
        if(this.fsm == "下落"){
             this.dy += this.ddy;
             this.y += this.dy;

        }else if(this.fsm == "上升"){
             this.dy -= this.ddy;
             if(this.dy<0){
                this.fsm ="下落";
             }
             this.y -= this.dy;
             if(this.y<0){
                 this.y = 0;
             }
        }
        this.rad += 0.06;
        game.frame%2==0&&this.wing++;
        if(this.wing>2){
             this.wing =0;
        }
            //决定AABB盒
        this.x1 = this.x - 17;
        this.x2 = this.x + 17;
        this.y1 = this.y - 12;
        this.y2 = this.y - 12;

       if(this.y2 > game.canvas.height - 112){
            game.sm.enter(3);
        }
     }
})()
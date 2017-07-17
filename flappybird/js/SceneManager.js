(function(){
     var SceneManager= window.SceneManager = function(){
           this.bindEvent();
     }
     SceneManager.prototype.enter = function(number){
           game.scene = number;
           switch(game.scene){
               case 0:
                 this.titleY = 0;
                 this.buttonX = (game.canvas.width - 116) / 2;
                 this.buttonY = game.canvas.height;
                 this.birdY = 270;
                 this.direction = 1;
                 this.images = [game.R["bird0_0"] , game.R["bird0_1"] , game.R["bird0_2"]];
                 this.wing = 0;
                 break;
               case 1:
                  this.tutorialAlphaDir =1;
                  this.globalAlpha = 1;
                 break;
               case 2:
                  game.background = new Background();
                  game.land = new Land();
                  game.bird = new Bird();
                  game.pipeArr = [];
                  game.score = 0;
                 break;
               case 3:
                  this.showbomb = false;
                  this.baozha = 1;
                  document.getElementById("hit").load();
                document.getElementById("hit").play();
                document.getElementById("die").load();
                document.getElementById("die").play();
                 break;
               case 4:
                  this.gameoverY = -54;
                  this.scorepanelY = game.canvas.height;
                  this.showMedal = false;

                  var arr = JSON.parse(localStorage.getItem("flappybird"));
                  arr.push(game.score);
                  arr = _.uniq(arr);
                  arr = _.sortBy(arr,function(item){
                      return item;
                  });
                  this.best = arr[arr.length-1];
                  if(game.score>=this.best){
                      this.medal = "medals_1";
                      this.best = game.score;
                  }else if(game.score>=arr[arr.length-2]){
                      this.medal = "medals_2";
                  }else if(game.score>=arr[arr.length-3]){
                      this.medal = "medals_3";
                  }else{
                      this.medal = "medals_0";
                  }
                  localStorage.setItem("flappybird",JSON.stringify(arr));
                  // console.log(this.best);
                 break;
           }
     }
     SceneManager.prototype.updateAndRender = function(){
           switch(game.scene){
               case 0:
                 game.ctx.fillStyle = "#4ec0ca";
                 game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
                 game.ctx.drawImage(game.R["bg_day"],0,game.canvas.height - 512);
                 game.ctx.drawImage(game.R["bg_day"],288,game.canvas.height - 512);
                 game.ctx.drawImage(game.R["land"],0,game.canvas.height - 112);
                 game.ctx.drawImage(game.R["land"],336,game.canvas.height - 112);

                 this.titleY += 160/20
                 if(this.titleY>160) this.titleY = 160;
                 game.ctx.drawImage(game.R["title"],(game.canvas.width-178)/2,this.titleY);

                 this.buttonY -= (game.canvas.height-400)/20;
                 if(this.buttonY<400) this.buttonY = 400;
                 game.ctx.drawImage(game.R["play"],this.buttonX,this.buttonY);

                 if(this.direction==1){
                    this.birdY++;
                    if(this.birdY>300){this.direction = -1;}
                 }else if(this.direction ==-1){
                    this.birdY--;
                    if(this.birdY<270){this.direction = 1;}
                 }
                 game.frame%6==0&&this.wing++;
                 if(this.wing>2)this.wing =0;
                 game.ctx.drawImage(this.images[this.wing],(game.canvas.width-48)/2,this.birdY);
                 break;
               case 1:
                 game.ctx.fillStyle = "#4ec0ca";
                 game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
                 game.ctx.drawImage(game.R["bg_day"],0,game.canvas.height - 512);
                 game.ctx.drawImage(game.R["bg_day"],288,game.canvas.height - 512);
                 game.ctx.drawImage(game.R["land"],0,game.canvas.height - 112);
                 game.ctx.drawImage(game.R["land"],336,game.canvas.height - 112);
                 game.ctx.drawImage(game.R["bird0_0"],game.canvas.width*(1-0.618),100);

                 game.ctx.save();
                 if(this.tutorialAlphaDir==1){
                     this.globalAlpha -=0.1;
                     if(this.globalAlpha<0.1){this.tutorialAlphaDir =-1}
                 }else{
                     this.globalAlpha +=0.1;
                     if(this.globalAlpha>1){this.tutorialAlphaDir = 1}
                 }
                 game.ctx.globalAlpha = this.globalAlpha;
                 game.ctx.drawImage(game.R["tutorial"],(game.canvas.width-114)/2,300);
                 game.ctx.restore();

                 break;
               case 2:
                   game.background.update();
                   game.background.render();
                   game.land.update();
                   game.land.render();
                   game.bird.update();
                   game.bird.render();

                   if(game.frame%180==0){
                       new Pipe();
                   }
                   for(var i=0;i<game.pipeArr.length;i++){
                      game.pipeArr[i].update();
                      game.pipeArr[i]&&game.pipeArr[i].render();
                   }

                   scoreRender();
                 break;
               case 3:
                   game.background.render();
                   game.land.render();
                   for(var i=0;i<game.pipeArr.length;i++){
                        game.pipeArr[i].render();
                   }

                   if(!this.showbomb){
                      game.bird.render();
                      game.bird.y+=16;
                      if(game.bird.y>game.canvas.height-112){
                          this.showbomb = true;
                      }
                   }else{
                      game.ctx.drawImage(game.R["baozha"+this.baozha],game.bird.x-50,game.bird.y-100,100,100);
                      game.frame%3==0&&this.baozha++;
                      if(this.baozha>9){this.enter(4);}
                   }
                   scoreRender();
                 break;
               case 4:
                   game.background.render();
                   game.land.render();
                   for(var i=0;i<game.pipeArr.length;i++){
                        game.pipeArr[i].render();
                   }
                   this.gameoverY+=10;
                   if(this.gameoverY>120){this.gameoverY = 120}
                   game.ctx.drawImage(game.R["text_game_over"],(game.canvas.width-204)/2,this.gameoverY);
                   this.scorepanelY -=10;
                   if(this.scorepanelY<270){
                    this.scorepanelY = 270;
                    this.showMedal= true;
                }
                   game.ctx.drawImage(game.R["score_panel"],(game.canvas.width-238)/2,this.scorepanelY);

                  if(this.showMedal){

                   game.ctx.drawImage(game.R[this.medal],game.canvas.width/2-88,this.scorepanelY+42);
                   game.ctx.textAlign = "right";
                   game.ctx.font = "20px consolas";
                   game.ctx.fillStyle = "#333";
                   game.ctx.fillText(game.score, (game.canvas.width / 2) + 93 , this.scorepanelY + 50);
                   game.ctx.fillText(this.best, (game.canvas.width / 2) + 93 , this.scorepanelY + 96);
                  }
                 break;
           }
     }
      SceneManager.prototype.bindEvent = function(){
            var self = this;
            game.canvas.onclick = function(e){
                 var x = e.offsetX;
                 var y = e.offsetY;
              switch(game.scene){
                 case 0:
                   if(x>self.buttonX&&y>self.buttonY&&x<self.buttonX+116&&y<self.buttonY+70){
                        self.enter(1);
                   }
                 break;
                 case 1:
                    self.enter(2);
                 break;
                 case 2:
                   game.bird.fly();
                 break;
                 case 3:
                 break;
                 case 4:
                 self.enter(0);
                 break;
              }
            }

           document.onkeydown = function(e){
             switch(game.scene){
                case 2:
                if(e.keyCode ==32){
                     game.bird.fly();
                }
                break;
             }
           }
      }

    function scoreRender(){
        var score = game.score.toString();
        var baseX = (game.canvas.width-24)/2 - (score.length/2)*30;
        for(var i=0;i<score.length;i++){
             var char = score[i];
        game.ctx.drawImage(game.R["shuzi"+char],baseX+i*30,100);
        }
    }
})()
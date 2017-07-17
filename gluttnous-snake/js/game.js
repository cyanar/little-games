(function(){
    var Game = window.Game = function(){
         this.table = null;
         this.snake = new Snake();
         this.food = null;
         this.init();
         this.timer = null;
         this.start();
         this.bindEvent();
    }

    Game.prototype.init = function(){
        this.table = document.createElement("table");
        document.body.appendChild(this.table);
         for(var row=0;row<15;row++){
             var tr = document.createElement("tr");
            for(var col = 0;col<15;col++){
                 var td = document.createElement("td");
                 tr.appendChild(td);
            }
            this.table.appendChild(tr);
         }
    }
    Game.prototype.changeColor = function(row,col,color){
          this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.background = color;
    }

    Game.prototype.clear = function(){
         for(var row = 0;row<15;row++){
            for(var col =0;col<15;col++){
                 this.changeColor(row,col,"");
            }
         }
    }
   Game.prototype.bindEvent = function(){
      var self = this;
       document.onkeydown = function(event){
           switch(event.keyCode){
              case 37:
                  self.snake.changeDirection("L");
                break;
              case 38:
                  self.snake.changeDirection("U");
                break;
              case 39:
                  self.snake.changeDirection("R");
                break;
              case 40:
                  self.snake.changeDirection("D");
                break;
           }
       }
   }
   Game.prototype.inner = function(row,col,html){
          this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].innerHTML = html;
   }
   Game.prototype.createFood = function(){
        this.inner(game.food.row,game.food.col,"");
        this.food = new Food();
   }
    Game.prototype.start = function(){
        var self = this;
        // 异步语句:先执行后面语句
        self.timer = setInterval(function(){
            if(self.food == null){
                 self.food = new Food();
            }
           self.clear();
           self.snake.update();
           if(!self.snake.checkDie()){
              self.snake.render();
           }else{
             clearInterval(self.timer);
             alert("game over!!");
           }
        },300);
    }
})()
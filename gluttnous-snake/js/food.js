(function(){
     var Food = window.Food = function(){
        while(true){
          this.row = _.random(0,14);
          this.col = _.random(0,14);
          for(var i=0;i<game.snake.body.length;i++){
             if(this.row == game.snake.body[i].row&&this.col == game.snake.body[i].col){
                 break;
             }
          }
            if(i == game.snake.body.length){
                 break;
            }
        }
        game.inner(this.row,this.col,"❤");
     }
     Food.prototype.eat = function(){
         if(game.snake.body[0].row == this.row&&game.snake.body[0].col == this.col){
              return true;
         }
         return false;
     }
})()
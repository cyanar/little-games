(function () {
	var Game = window.Game = function () {
		this.table = null;
		this.timer = null;
		//游戏的初始化
		this.init();
		this.block = new Block();
		this.map = new Map();
		//游戏开启
		this.start();
		//监听事件
		this.bindEvent();
	}
	//初始化函数
	Game.prototype.init = function () {
		this.table = document.createElement("table");
		document.body.appendChild(this.table);
		for (var row  = 0; row  < 20; row++) {
			var tr = document.createElement("tr");
			for (var col  = 0; col < 12; col++) {
			 var td = document.createElement("td");
			  tr.appendChild(td);
			}
			this.table.appendChild(tr);
		}
	}
	//渲染小格子
   Game.prototype.changeColor = function (row,col,className) {
   	this.table.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className=className;
   }
   //清屏
   Game.prototype.clear = function () {
   	 for (var row = 0; row < 20; row++) {
   	 	 for (var col  = 0; col  < 12; col++) {
   	 	 	this.changeColor(row,col,"");
   	 	 }
   	 }

   }
   Game.prototype.bindEvent = function () {
     	var self = this;
   	  document.onkeydown = function (event) {
   	         switch(event.keyCode){
                case 37:
                if (!self.block.compare(self.map.cut(self.block.row,self.block.col-1))) {
                 self.block.left();
                }

                 break;
                case 38:
                if (!self.block.compare(self.map.cut(self.block.row,self.block.col),self.block.nextDirection())) {
                       self.block.changeDirection();
                }

                 break;
                 case 39:
                if (!self.block.compare(self.map.cut(self.block.row,self.block.col+1))) {
                     self.block.right();
                 }

                break;
                case 40:
              if (!self.block.compare(self.map.cut(self.block.row+1,self.block.col))) {
                    self.block.down();
       	        }
                break;
                case 32:
              while(!self.block.compare(self.map.cut(self.block.row+1,self.block.col))){
                   self.block.down();
                }
                break;
   	        }
   	  }
   }
   Game.prototype.start = function () {
       var self = this;
       var frame = 0;
       self.timer = setInterval(function () {
       	   frame++;
       	   //清屏
       	   self.clear();
       	   self.block.render();
       	    self.map.render();
       	    if (frame%10==0) {
       	     if (!self.block.compare(self.map.cut(self.block.row+1,self.block.col))) {
                  self.block.down();
       	      }else{
                self.map.into(self.block.row,self.block.col,self.block.direction,self.block.type);
                 self.block = new Block();
                  self.map.check();
              }
       	    }
           for(var i=3;i<14;i++){
             if(self.map.map[0].substr(i,1)!=0){
                alert("game over");
                clearInterval(self.timer);
             }
           }
       },50);
   }
})()
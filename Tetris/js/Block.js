(function () {
	 //iife向当与一堵墙
	 //Block相当于window的属性进行爬墙
	var Block = window.Block = function () {
		//#它是数组 --数组里面装的是字符串
		this.allType =["L","J","Z","S","T","I","O"];
		//#它是字符串
        this.type = this.allType[_.random(0,this.allType.length-1)];
        //#它是数组
        this.allDirection = AllMatric()[this.type];
         //#它是一个随机数
        this.singl = _.random(0,this.allDirection.length-1);
        //#它4*4的一个矩阵
        this.direction = this.allDirection[this.singl];

        this.row = 0;
        this.col = 4;

	}
	//要全部的俄罗斯方块
    function AllMatric() {
     	return {
     		 "L":[0x4460,0x0170,0x6220,0x0740],
     		 "J":[0x2260,0x0710,0x6440,0x0470],
     		 "Z":[0x0630,0x2640],
     		 "S":[0x0360,0x4620],
     		 "T":[0x0720,0x2320,0x2700,0x2620],
     		 "I":[0x2222,0x00f0],
     		 "O":[0x0660]
         	}
     }
  //判断的是某一个方块第几行第几列是0还是1
  function MouYiGe(row,col,matrix) {

     	var hang = matrix>>(3-row)*4&0xf;

     	var ge = hang>>(3-col)&0x1;
     	return ge;
     }
     //小方块的渲染
    Block.prototype.render = function () {
    	for (var row  = 0; row  < 4; row ++) {
    		for (var col  = 0; col  <4; col++) {
  MouYiGe(row,col,this.direction)==1&&game.changeColor(row+this.row,col+this.col,this.type);
    		}
    	}
    }
   //小方块向下的方法
  Block.prototype.down = function () {
    	this.row++;
   }
   Block.prototype.left = function () {
       this.col--;
   }
   Block.prototype.right = function () {
       this.col++;
   }
   //小方块提供对比的方法
  Block.prototype.compare = function (array,matrix) {
         if (matrix == undefined) {
           matrix = this.direction;
         }
        for (var i = 0; i < 4; i++) {
             var str = array[i];
            for (var j = 0; j < 4; j++) {
                var char = str.charAt(j);
                var ge = MouYiGe(i,j,matrix);
                if (char!=0&&ge!=0) {
                    return true;
                }
            }
        }
      return false;
  }
  Block.prototype.changeDirection = function () {
       this.singl++;
       if (this.singl>this.allDirection.length-1) {
             this.singl = 0;
       }
       this.direction = this.allDirection[this.singl];
  }
  Block.prototype.nextDirection = function () {
      var next = this.singl+1;
      if (next>this.allDirection.length-1) {
        next = 0;
      }
      return this.allDirection[next];
  }
})()
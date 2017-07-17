(function () {
   var Map = window.Map = function () {
   	//地图类主要渲染的是死去的方块
   	   this.map = [
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPP000000000000PP",
          "PPPPPPPPPPPPPPPPP",
          "PPPPPPPPPPPPPPPPP",
          "PPPPPPPPPPPPPPPPP"
   	   ];
   }
   Map.prototype.render = function () {
   	   for (var row  = 0; row < 20; row ++) {
             var  str = this.map[row];
   	   	    for (var col  = 0; col <12; col ++) {
   	   	          var char = str.charAt(col+3);
   	   	          if (char!="0") {
   	   	   	game.changeColor(row,col,char);
   	   	        }
   	   	    }
   	   }
   }
   //地图切割的方法4*4的矩阵
   Map.prototype.cut = function (row,col) {
      var array = [];
      for (var i = 0; i < 4; i++) {
        var str = this.map[row+i];
        var str1 = str.substr(col+3,4);
        array.push(str1);
    }
    return array;
   }
   Map.prototype.into = function (row,col,matrix,className) {

        for (var i = 0; i <4; i++) {

          for (var j = 0; j < 4; j ++) {
             //4*4的十六个小格子为1的情况下才融入进去
             if (MouYiGe(i,j,matrix)==1) {
              //改变地图的数据
             this.map[row+i] = this.changeString(this.map[i+row],col+j+3,className);
           }
          }
        }
   }
   //改变一个字符串的方法  1：改变的字符串是谁 2，从哪里开始换字符串 3 换成谁
   Map.prototype.changeString = function (str,start,char) {
    var str1 = str.substr(0,start);
    var str2 = str.substr(start+1);
    var str3 = str1+char+str2;
    return str3;
   }
  function MouYiGe(row,col,matrix) {

      var hang = matrix>>(3-row)*4&0xf;

      var ge = hang>>(3-col)&0x1;
      return ge;
     }
   Map.prototype.check= function () {
      for (var i = 19; i>=0; i--) {
         if (this.map[i].indexOf("0")==-1) {
            this.map.splice(i,1);
            this.map.unshift("PPP000000000000PP");
            i++;
         }
      }
   }
})()





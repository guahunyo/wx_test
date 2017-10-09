var startX = 0;
var startY = 0;
var moveX = 0;
var moveY = 0;
var X = 0;
var Y = 0;
var direction = null;
var snakeBodys = [];
var snakeHead = {
  x:0,
  y:0,
  w:20,
  h:20,
  color:"#cc3333"
};
var snakeDirection = "right";
Page({
  touchstartFn:function(e){
    startX = e.touches[0].x;
    startY = e.touches[0].y;
  },
  touchmoveFn:function(e){
    moveX = e.touches[0].x;
    moveY = e.touches[0].y;

    X = moveX - startX;
    Y = moveY - startY;

    if(Math.abs(X) > Math.abs(Y) && X > 0){
      direction = "right";
    }else if(Math.abs(X) > Math.abs(Y) && X < 0){
      direction = "left";
    }else if(Math.abs(X) < Math.abs(Y) && Y > 0){
      direction = "down";
    }else if(Math.abs(X) < Math.abs(Y) && Y < 0){
      direction = "up";
    }

  },
  touchendFn:function(){
    snakeDirection = direction;
  },
  onReady:function(){
    var context = wx.createContext();
    var frameNum = 0; 

    function draw(obj){
      context.setFillStyle(obj.color);
      context.beginPath();
      context.rect(obj.x,obj.y,obj.w,obj.h);
      context.closePath();
      context.fill();
    }

    function animate(){
      frameNum++;
      if(frameNum % 20 == 0){
        snakeBodys.push({
          x:snakeHead.x,
          y:snakeHead.y,
          w:20,
          h:20,
          color:"#00ff00"
        });

        if(snakeBodys.length > 4){
          snakeBodys.shift();
        }
        switch(snakeDirection){
          case "left":
            snakeHead.x-=snakeHead.w;
            break;
          case "right":
            snakeHead.x+=snakeHead.w;
            break;
          case "up":
            snakeHead.y-=snakeHead.h;
            break;
          case "down":
            snakeHead.y+=snakeHead.h;
            break;
        }
        
      }
      
      draw(snakeHead);

      for(var i = 0;i < snakeBodys.length;i++){
        var snakeBody = snakeBodys[i];
        draw(snakeBody);
      }

      wx.drawCanvas({
        canvasId:"firstCanvas",
        actions:context.getActions()
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
})

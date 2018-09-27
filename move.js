//Edit by HZ

function getStyle (obj,attr)  //兼容写法，获取css中的样式
{
  if(obj.currentStyle)
  {
    return obj.currentStyle[attr];
  }
  else {
    return getComputedStyle(obj,false)[attr];
  }
}

//完美运动框架
/*
param1: dom对象
param2: Json对象   如{'width':500 ,'opacity':50}  宽度变成500并且透明度变成0.5
param3: fn回调函数(optional)  可以链式调用自身
*/
function startMove(obj,json,fn){
      clearInterval(obj.timer);
      obj.timer = setInterval(function(){
        var bStop = true;
        for(var attr in json)
        {
          var currentStyle = 0;
          if(attr == "opacity")
          {
            currentStyle = Math.round(parseFloat(getStyle(obj,attr)*100));
          }
          else
          {
            currentStyle = parseInt(getStyle(obj,attr));
          }
          var speed = (json[attr] - currentStyle)/6;
          speed = speed > 0?Math.ceil(speed):Math.floor(speed);
          if(currentStyle != json[attr])
          {
            bStop = false;
          }
          if(attr == "opacity")
          {
            obj.style.filter =  'alpha(opacity:'+(currentStyle+speed)+')';
            obj.style.opacity = (currentStyle+speed) / 100;
          }
          else
          {
            obj.style[attr] = currentStyle + speed +'px';
          }
        }

        if(bStop)
        {
          clearInterval(obj.timer);
          if(fn) fn();    //链式调用
        }
      },30);
}

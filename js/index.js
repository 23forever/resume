/**
 * Created by lzy23 on 2017/11/6.
 */
$.extend($.scrollTo.defaults, {
  axis: 'y',
  duration: 500
});
$(document).ready(function () {
  $('.scroll').click(function(e){
    e.preventDefault();
    var href=$(this).attr('href');
    if(href==='#'){
      $.scrollTo(0)
    }else{
      var offsetTop=$(href).offset().top-50;
      $.scrollTo(offsetTop);
      if($(this).parent().parent().parent().attr('id')==='topMenu'){
        $('#topMenu').collapse('hide')
      }

    }
  });
  var canvasCount={
    htmlCanvas:0,
    cssCanvas:0,
    jsCanvas:0,
    javaCanvas:0
  };
  function canvasAnimate(id,count,step){
    var canvas=document.getElementById(id);
    var context=canvas.getContext('2d');
    var centerX=canvas.width/2;
    var centerY=canvas.height/2;
    var rad=Math.PI*2/100;
    var speed=.1;
    if(!step){
      step=.3;
    }
    context.clearRect(0,0,canvas.width,canvas.height);
    // 绘制外圈
    function drawOuter(n) {
      context.save();
      context.strokeStyle='#fff';
      context.lineWidth=5;
      context.beginPath();
      context.arc(centerX,centerY,100,-Math.PI/2,-Math.PI/2+n*rad,false);
      context.stroke();
      context.closePath();
      context.restore();
    }

    // 绘制内圈
    function drawInner() {
      context.save();
      context.strokeStyle='#fff';
      context.lineWidth=1;
      context.beginPath();
      context.arc(centerX,centerY,100,0,Math.PI*2,false);
      context.stroke();
      context.closePath();
      context.restore();
    }

    //百分比文字绘制
    function text(n) {
      context.save();
      context.strokeStyle = "#fff";
      context.font = "40px Arial";
      //绘制字体，并且指定位置
      context.strokeText(n.toFixed(0) + "%", centerX - 25, centerY + 10);
      context.stroke(); //执行绘制
      context.restore();
    }

    //动画循环
    (function drawFrame(){
      var id=window.requestAnimationFrame(drawFrame, canvas);
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawInner();
      text(speed);
      drawOuter(speed);
      if(speed > count) {
        canvasCount[id]=0;
        window.cancelAnimationFrame(id);
        return;
      }
      speed += step;
    }());
  }
  var scrollTop;
  var canStartCanvas=false;
  function startCanvas(scrollTop,id,count,step) {
    var offsetTop=$('#'+id).offset().top;
    if((scrollTop>offsetTop-800)&&(scrollTop<offsetTop+800)){
      canvasCount[id]=canvasCount[id]+1;
    }else{
      canvasCount[id]=0;
    }
    if(canvasCount[id]===1){
      canvasAnimate(id,count,step);
    }
  }
  $(window).scroll(function() {
    scrollTop=$(window).scrollTop();
    startCanvas(scrollTop,'htmlCanvas',80);
    startCanvas(scrollTop,'cssCanvas',70);
    startCanvas(scrollTop,'jsCanvas',85);
    startCanvas(scrollTop,'javaCanvas',20,.2);
  });
});

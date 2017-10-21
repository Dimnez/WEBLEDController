  var v = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  //Video 50x50 (Skalierung HTML5 matcht die Farben direkt zusammen)
  var cw = Math.floor(50);
  var ch = Math.floor(50);
  canvas.width = cw;
  canvas.height = ch;

  //Event-Listener für jeden Video-Frame
  v.addEventListener('play', function(){
      draw(this,context,cw,ch);
  },false);



function draw(v,c,w,h) {
    if(v.paused || v.ended) return false;
    context.drawImage(v,0,0,w,h);

    var num =0;

    hardwarecomponent.forEach(function (item)
    {
      var data = context.getImageData(25, num*10, 1, 1).data;
      var color = data[1];

      //LED-Anpassen
      changeLed(num,rgbToHex(data[0],data[1],data[2]),1)
      num++;
    });

    setTimeout(draw,20,v,c,w,h);
}

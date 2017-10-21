var Visualizer = new AudioVisuals();

Visualizer.init("audio",hardwarecomponent.length*5,
function(data)
{

	var index = 0;

	hardwarecomponent.forEach(function(item)
	{
  //Change the LED
	item.change(
		rgbToHex(data[index],data[index+1],data[index+2]),(255/data[index+3])*100);index++;});
});

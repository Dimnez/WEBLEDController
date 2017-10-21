var number_of_leds = 10;

class led
{
  constructor(element,ip)
  {
    this.IP = ip;
    this.element = element;
    this.currentColor = "#000000";
    this.brightness = 0;
  }

  //Funktion um die LED anzupassen
  //Wird später durch Post auf die IP des Geräts angepasst
  change(hex,brightness)
  {
    this.hex = hex;
    this.brightness = brightness;

    //Hardware-simulation
    this.element.css("background-color",hex);
    this.element.css("opacity",brightness);
    this.element.css("box-shadow","0px 0px 90px 10px"+hex);
  }
}




//led-Objekte
//Können später mit IP-Adresse versehen werden
var hardwarecomponent = [];


for(var n = 0;n<number_of_leds;n++)
{
    $(".hardware").append("<div class = 'led' id = 'led-"+n+"'></div>");
    hardwarecomponent.push(new led($("#led-"+n),"0.0.0.0"));
}

class led
{
  constructor(element,ip)
  {
    this.IP = ip;
    this.element = element;
    this.currentColor = "#000000";
    this.brightness = 0;
  }
}


//led-Objekte
//Können später mit IP-Adresse versehen werden
var hardwarecomponent = [
  new led($("#led-1"),"0.0.0.0"),
  new led($("#led-2"),"0.0.0.0"),
  new led($("#led-3"),"0.0.0.0"),
  new led($("#led-4"),"0.0.0.0"),
  new led($("#led-5"),"0.0.0.0")];

//Funktion um die LED anzupassen
//Wird später durch Post auf die IP des Geräts angepasst
//TODO: Funktion direkt in die LED-Klasse packen
function changeLed(num,hex,brightness)
{
hardwarecomponent[num].hex = hex;
hardwarecomponent[num].brightness = brightness;

//Hardware-simulation
hardwarecomponent[num].element.css("background-color",hex);
hardwarecomponent[num].element.css("opacity",brightness);
hardwarecomponent[num].element.css("box-shadow","0px 0px 90px 10px"+hex);
}

var context;
var analyser;
var source;
var binTable = [];

window.addEventListener('load', init, false);


//Durchschnit aus mehreren Werten
//In diesem Fall Audio-Daten
function average(data, s, e) {
	if (e <= s)
		return data[start];

	let sum = 0;
	for (let i = s; i < e; i++) {
		sum += data[i];
	}
	return sum / (e - s);
}


//Erzeugt einen Durchschnitt an allen Werten, da die Leds begrenzt sind
//Werde werden in binTable hinterlegt
function updatebinTable(data)
{
	let step = data.length / (hardwarecomponent.length*6); //*4 /*6 weil sonst vieles leer bleibt => r,g,b,a-werte (3 Werte pro Gerät)
	for (let i = 0; i < (hardwarecomponent.length*6); i++) {
		let lower = i * step;
		let upper = (i + 1) * step - 1;
		let binValue = average(data, Math.round(lower),Math.round(upper));
		binTable[i] = Math.round(binValue);
	}
}


//Audio-Kontext intiialisieren
function init() {
   context = new AudioContext();
   analyser = context.createAnalyser();
   source = context.createMediaElementSource(document.getElementById('audio'));
   source.connect(analyser);
   source.fftSize = hardwarecomponent.length*8;
   analyser.connect(context.destination);
   requestAnimationFrame(audiochange);
}


//Wird bei jedem Frame ausgeführt
//Später macht es Sinn heir auf das Gerät zu warten bevor neue Werte gesendet werden
function audiochange()
{
  let bins = analyser.frequencyBinCount;
	let data = new Uint8Array(bins);
	analyser.getByteFrequencyData(data);
  updatebinTable(data);

	var index = 0;

  hardwarecomponent.forEach(function (item)
  {
  item.change(rgbToHex(binTable[index],binTable[index+1],binTable[index+2]),(255/binTable[index+3])*100);
	index++;
	});

  requestAnimationFrame(audiochange);
}

class AudioVisuals
{
	constructor()
	{
		this.context = undefined;
		this.analyser = undefined;
		this.source = undefined;
		this.data_needed = undefined;
		this.audiodata_average = [];
	}

  init(audio_object,how_much_data)
	{
		this.data_needed = how_much_data;
		this.context = new AudioContext();
		this.analyser = this.context.createAnalyser();
		this.source =  this.context.createMediaElementSource(document.getElementById(audio_object));
		this.source.connect(this.analyser);
		this.source.fftSize = this.data_needed;
		this.analyser.connect(this.context.destination);
		requestAnimationFrame(this.visualize);
	}

   averageTable(data,data_needed)
	{
		var step = data.length / data_needed;
		for (let i = 0; i < data_needed; i++) {
			var first = i * step;
			var last = (i + 1) * step - 1;
			let currentValue = average(data, Math.round(first),Math.round(last));
			this.audiodata_average[i] = Math.round(currentValue);
		}
	}

  visualize()
	{
		var binCount = Visualizer.analyser.frequencyBinCount;
		var data = new Uint8Array(binCount);
		Visualizer.analyser.getByteFrequencyData(data);
		Visualizer.averageTable(data,Visualizer.data_needed);


		if(Visualizer.audiodata_average.length > 0)
		{
		var index = 0;

		hardwarecomponent.forEach(function (item)
		{
		item.change(
			rgbToHex(
				Visualizer.audiodata_average[index],
				Visualizer.audiodata_average[index+1],
				Visualizer.audiodata_average[index+2]),
				(255/Visualizer.audiodata_average[index+3])*100);
		index++;
		});
		}
		requestAnimationFrame(Visualizer.visualize);
	}
}

var Visualizer = new AudioVisuals();
Visualizer.init("audio",hardwarecomponent.length*5);

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function average(data, s, e) {
	if (e <= s)
		return data[start];

	let sum = 0;
	for (let i = s; i < e; i++) {
		sum += data[i];
	}
	return sum / (e - s);
}

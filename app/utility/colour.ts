export class Colour {
	public static HextoHSL(hex: string): number[] {
		var rgb: number[] = this.HextoRGB(hex);
		return !rgb || rgb.length != 3 ? [] : this.RGBtoHSL(rgb[0], rgb[1], rgb[2]);
	}

	public static HextoRGB(hex: string): number[] {
		if (!hex)
			return [];

		var matches: string[] = hex.match(/#?([\da-f]{6})/i);
		if (matches.length != 2)
			return [];
		else {
			var r: number = parseInt(matches[1][0] + matches[1][1], 16);
			var g: number = parseInt(matches[1][2] + matches[1][3], 16);
			var b: number = parseInt(matches[1][4] + matches[1][5], 16);

			if (isNaN(r) || isNaN(g) || isNaN(b))
				return [];
			else
				return [r / 255, g / 255, b / 255];
		}
	}

	public static RGBtoHSL(r: number, g: number, b: number): number[] {
		var max: number = Math.max(r, g, b);
		var min: number = Math.min(r, g, b);
		var h: number = (max + min) / 2;
		var s: number = h;
		var l: number = h;

		if (max == min) {
			h = 0;
			s = 0;
		} else {
			var d: number = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}

			h /= 6;
		}

		return [h, s, l];
	}

	public static HSLtoHex(h: number, s: number, l: number, includeHash: boolean = false): string {
		var rgb: number[] = this.HSLtoRGB(h, s, l);
		return !rgb || rgb.length != 3 ? "" : this.RGBtoHex(rgb[0], rgb[1], rgb[2], includeHash);
	}

	public static RGBtoHex(r: number, g: number, b: number, includeHash: boolean = false): string {
		var rHex: number = Math.round(r * 255);
		var gHex: number = Math.round(g * 255);
		var bHex: number = Math.round(b * 255);

		return (includeHash ? "#" : "") + (rHex < 16 ? "0" : "") + rHex.toString(16) + (gHex < 16 ? "0" : "") + gHex.toString(16) + (bHex < 16 ? "0" : "") + bHex.toString(16);
	}

	private static HuetoRGB(p: number, q: number, t: number): number {
		if (t < 0)
			t += 1;
		if (t > 1)
			t -= 1;
		if (t < 1 / 6)
			return p + (q - p) * 6 * t;
		if (t < 1 / 2)
			return q;
		if (t < 2 / 3)
			return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}

	public static HSLtoRGB(h: number, s: number, l: number): number[] {
		var r: number;
		var g: number;
		var b: number;

		if (s == 0) {
			r = l;
			g = l;
			b = l;
		} else {
			var q: number = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p: number = 2 * l - q;
			r = this.HuetoRGB(p, q, h + 1 / 3);
			g = this.HuetoRGB(p, q, h);
			b = this.HuetoRGB(p, q, h - 1 / 3);
		}

		return [r, g, b];
	}

	public static DarkenHex(hex: string, amount: number, includeHash: boolean = false): string {
		var hsl: number[] = this.HextoHSL(hex);
		return !hsl || hsl.length != 3 ? "" : this.HSLtoHex(hsl[0], hsl[1], hsl[2] - amount, includeHash);
	}

	public static LightenHex(hex: string, amount: number, includeHash: boolean = false): string {
		var hsl: number[] = this.HextoHSL(hex);
		return !hsl || hsl.length != 3 ? "" : this.HSLtoHex(hsl[0], hsl[1], hsl[2] + amount, includeHash);
	}
}

export class Color {
  r: number;
  g: number;
  b: number;
  a: number;
  hue: number;
  saturation: number;
  value: any;
  lightness: number;
  format: string;

  constructor(color?: any) {
    if (color instanceof Color === true) {
      this.copy(color);
      return;
    }

    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 1;
    this.hue = 0;
    this.saturation = 0;
    this.value = 0;
    this.lightness = 0;
    this.format = 'HSV';
  }

  copy(obj) {
    if (obj instanceof Color !== true) {
      console.log('Typeof parameter not Color');
      return;
    }

    this.r = obj.r;
    this.g = obj.g;
    this.b = obj.b;
    this.a = obj.a;
    this.hue = obj.hue;
    this.saturation = obj.saturation;
    this.value = obj.value;
    this.format = '' + obj.format;
    this.lightness = obj.lightness;
  };

  setFormat(format) {
    if (format === 'HSV') {
      this.format = 'HSV';
    }
    if (format === 'HSL') {
      this.format = 'HSL';
    }
  };

  isValidRGBValue(value) {
    return (typeof(value) === 'number' && isNaN(value) === false &&
    value >= 0 && value <= 255);
  };

  setRGBA(red, green, blue, alpha?) {
    if (this.isValidRGBValue(red) === false ||
      this.isValidRGBValue(green) === false ||
      this.isValidRGBValue(blue) === false) {
      return;
    }

    this.r = red | 0;
    this.g = green | 0;
    this.b = blue | 0;

    if (this.isValidRGBValue(alpha) === true) {
      this.a = alpha | 0;
    }
  };

  setByName(name, value) {
    if (name === 'r' || name === 'g' || name === 'b') {
      if (this.isValidRGBValue(value) === false) {
        return;
      }

      this[name] = value;
      this.updateHSX();
    }
  };

  setHSV(hue, saturation, value) {
    this.hue = hue;
    this.saturation = saturation;
    this.value = value;
    this.HSVtoRGB();
  };

  setHSL(hue, saturation, lightness) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
    this.HSLtoRGB();
  };

  setHue(value) {
    if (typeof(value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 359) {
      return;
    }
    this.hue = value;
    this.updateRGB();
  };

  setSaturation(value) {
    if (typeof(value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100) {
      return;
    }
    this.saturation = value;
    this.updateRGB();
  };

  setValue(value) {
    if (typeof(value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100) {
      return;
    }
    this.value = value;
    this.HSVtoRGB();
  };

  setLightness(value) {
    if (typeof(value) !== 'number' || isNaN(value) === true ||
      value < 0 || value > 100) {
      return;
    }
    this.lightness = value;
    this.HSLtoRGB();
  };

  setHexa(value) {
    const valid = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)/i.test(value);

    if (valid !== true) {
      return;
    }

    if (value[0] === '#') {
      value = value.slice(1, value.length);
    }

    if (value.length === 3) {
      value = value.replace(/([0-9A-F])([0-9A-F])([0-9A-F])/i, '$1$1$2$2$3$3');
    }

    this.r = parseInt(value.substr(0, 2), 16);
    this.g = parseInt(value.substr(2, 2), 16);
    this.b = parseInt(value.substr(4, 2), 16);

    this.a = 1;
    this.RGBtoHSV();
  };

  convertToHSL() {
    if (this.format === 'HSL') {
      return;
    }

    this.setFormat('HSL');
    this.RGBtoHSL();
  };

  convertToHSV() {
    if (this.format === 'HSV') {
      return;
    }

    this.setFormat('HSV');
    this.RGBtoHSV();
  };

  updateRGB() {
    if (this.format === 'HSV') {
      this.HSVtoRGB();
      return;
    }

    if (this.format === 'HSL') {
      this.HSLtoRGB();
      return;
    }
  };

  updateHSX() {
    if (this.format === 'HSV') {
      this.RGBtoHSV();
      return;
    }

    if (this.format === 'HSL') {
      this.RGBtoHSL();
      return;
    }
  };

  HSVtoRGB() {
    const sat = this.saturation / 100;
    const value = this.value / 100;
    let C = sat * value;
    const H = this.hue / 60;
    let X = C * (1 - Math.abs(H % 2 - 1));
    let m = value - C;
    const precision = 255;

    C = (C + m) * precision | 0;
    X = (X + m) * precision | 0;
    m = m * precision | 0;

    if (H >= 0 && H < 1) {
      this.setRGBA(C, X, m);
      return;
    }
    if (H >= 1 && H < 2) {
      this.setRGBA(X, C, m);
      return;
    }
    if (H >= 2 && H < 3) {
      this.setRGBA(m, C, X);
      return;
    }
    if (H >= 3 && H < 4) {
      this.setRGBA(m, X, C);
      return;
    }
    if (H >= 4 && H < 5) {
      this.setRGBA(X, m, C);
      return;
    }
    if (H >= 5 && H < 6) {
      this.setRGBA(C, m, X);
      return;
    }
  };

  HSLtoRGB() {
    const sat = this.saturation / 100;
    const light = this.lightness / 100;
    let C = sat * (1 - Math.abs(2 * light - 1));
    const H = this.hue / 60;
    let X = C * (1 - Math.abs(H % 2 - 1));
    let m = light - C / 2;
    const precision = 255;

    C = (C + m) * precision | 0;
    X = (X + m) * precision | 0;
    m = m * precision | 0;

    if (H >= 0 && H < 1) {
      this.setRGBA(C, X, m);
      return;
    }
    if (H >= 1 && H < 2) {
      this.setRGBA(X, C, m);
      return;
    }
    if (H >= 2 && H < 3) {
      this.setRGBA(m, C, X);
      return;
    }
    if (H >= 3 && H < 4) {
      this.setRGBA(m, X, C);
      return;
    }
    if (H >= 4 && H < 5) {
      this.setRGBA(X, m, C);
      return;
    }
    if (H >= 5 && H < 6) {
      this.setRGBA(C, m, X);
      return;
    }
  };

  RGBtoHSV() {
    const red = this.r / 255;
    const green = this.g / 255;
    const blue = this.b / 255;

    const cmax = Math.max(red, green, blue);
    const cmin = Math.min(red, green, blue);
    const delta = cmax - cmin;
    let hue = 0;
    let saturation = 0;

    if (delta) {
      if (cmax === red) {
        hue = ((green - blue) / delta);
      }
      if (cmax === green) {
        hue = 2 + (blue - red) / delta;
      }
      if (cmax === blue) {
        hue = 4 + (red - green) / delta;
      }
      if (cmax) {
        saturation = delta / cmax;
      }
    }

    this.hue = 60 * hue | 0;
    if (this.hue < 0) {
      this.hue += 360;
    }
    this.saturation = (saturation * 100) | 0;
    this.value = (cmax * 100) | 0;
  };

  RGBtoHSL() {
    const red = this.r / 255;
    const green = this.g / 255;
    const blue = this.b / 255;

    const cmax = Math.max(red, green, blue);
    const cmin = Math.min(red, green, blue);
    const delta = cmax - cmin;
    let hue = 0;
    let saturation = 0;
    const lightness = (cmax + cmin) / 2;
    const X = (1 - Math.abs(2 * lightness - 1));

    if (delta) {
      if (cmax === red) {
        hue = ((green - blue) / delta);
      }
      if (cmax === green) {
        hue = 2 + (blue - red) / delta;
      }
      if (cmax === blue) {
        hue = 4 + (red - green) / delta;
      }
      if (cmax) {
        saturation = delta / X;
      }
    }

    this.hue = 60 * hue | 0;
    if (this.hue < 0) {
      this.hue += 360;
    }
    this.saturation = (saturation * 100) | 0;
    this.lightness = (lightness * 100) | 0;
  };

  getHexa() {
    let r = this.r.toString(16);
    let g = this.g.toString(16);
    let b = this.b.toString(16);
    if (this.r < 16) {
      r = '0' + r;
    }
    if (this.g < 16) {
      g = '0' + g;
    }
    if (this.b < 16) {
      b = '0' + b;
    }
    const value = '#' + r + g + b;
    return value.toUpperCase();
  };

  getRGBA() {

    const rgb = '(' + this.r + ', ' + this.g + ', ' + this.b;
    let a = '';
    let v = '';
    const x = parseFloat(this.a + '');
    if (x !== 1) {
      a = 'a';
      v = ', ' + x;
    }

    const value = 'rgb' + a + rgb + v + ')';
    return value;
  };

  getHSLA() {
    if (this.format === 'HSV') {
      const color = new Color(this);
      color.setFormat('HSL');
      color.updateHSX();
      return color.getHSLA();
    }

    let a = '';
    let v = '';
    const hsl = '(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%';
    const x = parseFloat(this.a + '');
    if (x !== 1) {
      a = 'a';
      v = ', ' + x;
    }

    const value = 'hsl' + a + hsl + v + ')';
    return value;
  };

  getColor() {
    if ((this.a | 0) === 1) {
      return this.getHexa();
    }
    return this.getRGBA();
  };
}

export class RGBColor extends Color {
  constructor(r, g, b) {
    super();
    this.setRGBA(r, g, b, 1);
}
}

export class RGBAColor extends Color {
  constructor(r, g, b, a) {
    super();
    this.setRGBA(r, g, b, a);
  }
}

export class HSVColor extends Color {
  constructor(h, s, v) {
    super();
    this.setHSV(h, s, v);
  }
}

export class HSVAColor extends Color {
  constructor(h, s, v, a) {
    super();
    this.setHSV(h, s, v);
  }
}

export class HSLColor extends Color {
  constructor(h, s, l) {
    super();
   this.setHSL(h, s, l);
  }
}

export class HSLAColor extends Color {
  constructor(h, s, l, a) {
    super();
    this.setHSL(h, s, l);
  }
}

export declare class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    hue: number;
    saturation: number;
    value: any;
    lightness: number;
    format: string;
    constructor(color?: any);
    copy(obj: any): void;
    setFormat(format: any): void;
    isValidRGBValue(value: any): boolean;
    setRGBA(red: any, green: any, blue: any, alpha?: any): void;
    setByName(name: any, value: any): void;
    setHSV(hue: any, saturation: any, value: any): void;
    setHSL(hue: any, saturation: any, lightness: any): void;
    setHue(value: any): void;
    setSaturation(value: any): void;
    setValue(value: any): void;
    setLightness(value: any): void;
    setHexa(value: any): void;
    convertToHSL(): void;
    convertToHSV(): void;
    updateRGB(): void;
    updateHSX(): void;
    HSVtoRGB(): void;
    HSLtoRGB(): void;
    RGBtoHSV(): void;
    RGBtoHSL(): void;
    getHexa(): string;
    getRGBA(): string;
    getHSLA(): any;
    getColor(): string;
}
export declare class RGBColor extends Color {
    constructor(r: any, g: any, b: any);
}
export declare class RGBAColor extends Color {
    constructor(r: any, g: any, b: any, a: any);
}
export declare class HSVColor extends Color {
    constructor(h: any, s: any, v: any);
}
export declare class HSVAColor extends Color {
    constructor(h: any, s: any, v: any, a: any);
}
export declare class HSLColor extends Color {
    constructor(h: any, s: any, l: any);
}
export declare class HSLAColor extends Color {
    constructor(h: any, s: any, l: any, a: any);
}

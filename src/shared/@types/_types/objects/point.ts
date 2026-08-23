import { TStroke } from "./object";

/** Point type */
export type TPoint = {
	/** point coords [lon, lat] */
	coords: [number, number];

	/** point view type. By default "point" */
	type?: TPointTypes;

	/** Mapped type that dynamically builds the style object */
	style?: { [K in TPointTypes]?: TPointStyleMap[K] };
};

export type TPointTypes = keyof TPointStyleMap;

/**
 * Dictionary that links each point type string to its respective style shape
 */
type TPointStyleMap = {
	point: TPointStyle;
	star: TStarStyle;
	square: TSquareStyle;
	triangle: TTriangleStyle;
	cross: TCrossStyle;
	icon: TIconStyle;
};

/**
 * Common styles for all display types
 */
export type TMainPointStyle = {
	/** Point offset relative to real coordinates (in pixels). */
	displacement?: number[] | undefined;

	/** Declutter mode (avoid overlapping). */
	declutterMode?: boolean | undefined;

	/** Fill color. */
	fill?: string | undefined;

	/** Fill opacity (0-100). */
	fillOpacity?: number | undefined;

	/** Shape size (in pixels). */
	size?: number;

	/** Whether to rotate the shape with the map. */
	rotateWithView?: boolean | undefined;

	/** Shape rotation angle (in degrees). */
	rotation?: number | undefined;

	/** Stroke style. */
	stroke?: TStroke | undefined;

	/** Shape scale (multiplier). */
	scale?: number | undefined;

	/** Angle (for an arrow, triangle, etc.). */
	angle?: number | undefined;

	/** Overall opacity of the shape. */
	opacity?: number | undefined;
};

/**
 * Define individual style shapes for each specific point view type
 */
export type TPointStyle = TMainPointStyle;
export type TSquareStyle = TMainPointStyle;
export type TTriangleStyle = TMainPointStyle;
export type TCrossStyle = TMainPointStyle;
export type TStarStyle = TMainPointStyle & {
	innerSize?: number;
};
export type TIconStyle = {
	/** Icon size(px) */
	size?: number;

	/** External URL (full). */
	outsideUrl?: string;

	/** Fill transparency. */
	fillOpacity?: number | undefined;
};

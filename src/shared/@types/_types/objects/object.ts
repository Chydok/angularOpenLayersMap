import { TLine } from "./line";
import { TPoint } from "./point";
import { TPolygon } from "./polygon";
import { TTextStyle } from "./textStyle";

/**
 * Main object type
 */
export type TObject = {
	/** Unique identifier of the object. */
	id: string;

	/** Object name. */
	name: string;

	/** The ID of the layer the object belongs to. */
	layerId: string;

	/** Geometry object type */
	type: keyof TGeometry;

	/** Geometry and style object parameters */
	geometry: TGeometry;

	/** Object Label. By default, the object name is used. */
	label?: string;

	/** Show or hide object label. */
	showLabel?: boolean;

	/** Text label style for the object. */
	textStyle?: TTextStyle;

	/** Visibility of the object on the map. */
	visible?: boolean;
};

export type TStroke = {
	/** Stroke color (HEX, RGB, name). */
	color?: string | undefined;

	/** Transparency (0-100). */
	opacity?: number | undefined;

	/** Line cap type. */
	lineCap?: TLineCap | undefined;

	/** Line join type. */
	lineJoin?: TLineJoin | undefined;

	/** Array specifying the dashed line: [dash length, gap length, ...]. */
	lineDash?: number[] | undefined;

	/** Dash start offset. */
	lineDashOffset?: number | undefined;

	/** Line thickness in pixels. */
	width?: number | undefined;
};

/**
 * Polygon or area fill style.
 */
export type TFillStyle = {
	/** Fill color. */
	color?: string;

	/** Transparency (0-100). */
	opacity?: number;

	type?: "horizontal" | "vertical" | "angle" | "angle315" | "net" | "gradient" | "none";
	distance?: number;
	lineWidth?: number;
	lineColor?: string;
	lineOpacity?: number;
	fillColor?: string;
	gradientColors?: string[];
};

/**
 * Line cap type (lineCap) for Canvas.
 */
export type TLineCap = "butt" | "round" | "square";

/**
 * Line join type (lineJoin).
 */
export type TLineJoin = "bevel" | "miter" | "round";

/**
 * Geometry map
 */
export type TGeometry =
	| { point: TPoint; line?: never; polygon?: never }
	| { point?: never; line: TLine; polygon?: never }
	| { point?: never; line?: never; polygon: TPolygon };

import { TStroke } from "./object";

/**
 *  Text style for objects
 */
export type TTextStyle = {
	/** Horizontal alignment. */
	align?: TAlignText | undefined;

	/** Vertical baseline. */
	baseline?: TBaseLineText | undefined;

	/** Bold font. */
	bold?: boolean | undefined;

	/** Background color under text. */
	backgroundFill?: string | undefined;

	/** Background stroke. */
	backgroundStroke?: TStroke | undefined;

	/** Italic. */
	italic?: boolean | undefined;

	/** Text color. */
	fill?: string | undefined;

	/** Minimum zoom level to display text. */
	minZoomLevel?: number | undefined;

	/** Maximum zoom level to display text. */
	maxZoomLevel?: number | undefined;

	/** X offset. */
	offsetX?: number | undefined;

	/** Y offset. */
	offsetY?: number | undefined;

	/** Font size. */
	size?: number | undefined;

	/** Size units. */
	sizeUnit?: "pt" | "px" | "em" | "ex" | "%" | undefined;

	/** Text stroke. */
	stroke?: TStroke | undefined;

	/** Text placement: "point" — at a point, "line" — along a line/contour. Defaults to "point" */
	placement?: "point" | "line";

	/** Text repeat interval in pixels for "line" placement. If not specified, the text is not repeated */
	repeat?: number;
};

/**
 * Horizontal text alignment.
 */
export type TAlignText = "center" | "end" | "left" | "right" | "start";

/**
 * Vertical text baseline.
 */
export type TBaseLineText = "bottom" | "middle" | "top";

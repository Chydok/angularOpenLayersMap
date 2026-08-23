import { TPeak } from "./peak";

/** 
 * Line object peaks and styles.
 */
export type TLine = {
	/** line coords [lon, lat][] */
	coords: TPeak[][];

	/** Use orthodromy. */
	greatCircle?: boolean;

	/** Line style */
	lineStyle?: TLineStyle;
};

/**
 * Line style.
 */
export type TLineStyle = {
	/** Line color. */
	color?: string;

	/** Line thickness. */
	width?: number;

	/** Preset dash type (if using a pattern list) */
	dashType?: keyof typeof lineDashList;

	/** Length of the first dash of the dashed line in pixels */
	dash?: number;

	/** Length of the space after the first dash in pixels; if not specified, equals dash */
	dashSpace?: number;

	/** Length of the second dash of the dashed line in pixels */
	dashNext?: number;

	/** Length of the space after the second dash in pixels */
	dashNextSpace?: number;

	/** Line opacity. */
	opacity?: number;

	/** Stroke (alternative way to set style). */
	border?: {
		color?: string;
		opacity?: number;
		width?: number;
	};
};

/** List of dashed line options */
const lineDashList = {
	none: [],
	another: [],
	dottedLine: [10, 10],
	dottedLineDot: [10, 10],
	dottedLineSpace: [10, 10],
	emDashEnDash: [10, 10, 5, 10],
};

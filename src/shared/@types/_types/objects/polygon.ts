import { TLineStyle } from "./line";
import { TFillStyle } from "./object";
import { TPeak } from "./peak";

/** 
 * Polygon object peaks and styles.
 */
export type TPolygon = {
	/** polygon coords [lon, lat][] */
	coords: TPeak[][];

	/** Line (outline) style. */
	fsLineStyle?: TLineStyle;

	/** Fill style. */
	fsFillStyle?: TFillStyle;
};

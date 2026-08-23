import { TPoint } from "./point";
import { TTextStyle } from "./textStyle";

/** 
 * Peak type
 */
export type TPeak = TPoint & {
	/** Peak Label. */
	label?: string;

	/** Show or hide peak label. */
	showLabel?: boolean;

	/** Text label style for the peak. */
	textStyle?: TTextStyle;
};

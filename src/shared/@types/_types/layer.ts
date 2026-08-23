/**
 * Layer type
 */
export type TLayer = {
	/** Unique identifier for the layer. */
	id: string;

	/** Display name of the layer. */
	name: string;

	/** Format or data type of the layer content. By default "objects" */
	type: "objects" | "geojson" | "topojson" | "kml";

	/** Optional group name for layer organization. */
	group?: string;

	/** Optional creation timestamp (Created Date). */
	cDt?: number;

	/** Optional modification timestamp (Modified Date). */
	mDt?: number;

	/** Optional username ID of the user who created it. */
	creator?: string;
};

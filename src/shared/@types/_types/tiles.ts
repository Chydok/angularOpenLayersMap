/**
 * Tile type
 */
export type TTile = {
	/** Unique identifier for the tile. */
	id: "sting";

	/** Display name of the tile. */
	name: string;

	/** Source url for the tile. */
	url: "string";

	showZMin?: number;
	showZMax?: number;

	zMin?: number;
	zMax?: number;
};

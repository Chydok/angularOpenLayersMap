import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import { TTile } from "shared/@types/_types/tiles";

export const addTile = (tile: TTile) => {
	if (!tile.url) return undefined;
	const minMaxZoomShow = {
		minZoom: tile.showZMin ?? 0,
		maxZoom: tile.showZMax ?? 20,
	};
	const minMaxZoom = {
		minZoom: tile.zMin ?? 0,
		maxZoom: tile.zMax ?? 20,
	};
	return new TileLayer({
		preload: Infinity,
		...minMaxZoomShow,
		source: new XYZ({
			...minMaxZoom,
			url: tile.url + "/{z}/{x}/{y}.png",
		}),
	});
};

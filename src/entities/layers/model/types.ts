import { TLayer } from "shared/@types/_types/layer";

export interface TStoreLayers {
	maps: Record<string, Record<string, TLayer>>;

	/**
	 * Bulk add layers
	 * @param mapId - map ID
	 * @param layers - objects to add
	 * @returns
	 */
	stAddLayers: (mapId: string, layers: TLayer[]) => void;

	/**
	 * Bulk set layers
	 * @param mapId - map ID
	 * @param layers - layers to set
	 * @returns
	 */
	stSetLayers: (mapId: string, layers: TLayer[]) => void;

	/**
	 * Bulk update layers
	 * @param mapId - map ID
	 * @param changeableLayers - layers to update
	 * @returns
	 */
	stChangeLayers: (mapId: string, changeableLayers: TLayer[]) => void;

	/**
	 * Bulk remove layers
	 * @param mapId - map ID
	 * @param removeLayersIds - layer IDs to remove
	 * @returns
	 */
	stRemoveLayers: (mapId: string, removeLayersIds: string[]) => void;
}

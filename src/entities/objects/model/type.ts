import { TObject } from "shared/@types/_types/objects/object";

export interface TStoreObjects {
	maps: Record<string, Record<string, TObject>>;

	/**
	 * Bulk add objects
	 * @param mapId - map id
	 * @param objects - objects to add
	 * @returns
	 */
	stAddObjects: (mapId: string, objects: TObject[]) => void;

	/**
	 * Bulk set objects
	 * @param mapId - map id
	 * @param objects - objects to set
	 * @returns
	 */
	stSetObjects: (mapId: string, objects: TObject[]) => void;

	/**
	 * Bulk update objects
	 * @param mapId - map id
	 * @param changeableObjects - objects to update
	 * @returns
	 */
	stChangeObjects: (mapId: string, changeableObjects: TObject[]) => void;

	/**
	 * Bulk object deletion
	 * @param mapId - map ID
	 * @param removeObjectsIds - object IDs to delete
	 * @returns
	 */
	stRemoveObjects: (mapId: string, removeObjectsIds: string[]) => void;
}

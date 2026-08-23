import { create } from "zustand";

import { TStoreObjects } from "./type";
import { mergeDeepOutObject } from "shared/utils/objects";
import { TObject } from "shared/@types/_types/objects/object";

export const ObjectsStore = create<TStoreObjects>((set) => ({
	maps: {},

	stAddObjects: (mapId, objects) =>
		set((state) => {
			const additions = objects.reduce(
				(acc, obj) => {
					acc[obj.id!] = obj;
					return acc;
				},
				{} as Record<string, TObject>,
			);
			return {
				maps: {
					...state.maps,
					[mapId]: {
						...(state.maps[mapId] || {}),
						...additions,
					},
				},
			};
		}),

	stSetObjects: (mapId, objects) =>
		set((state) => {
			const newEntities = objects.reduce(
				(acc, obj) => {
					acc[obj.id!] = obj;
					return acc;
				},
				{} as Record<string, TObject>,
			);

			return {
				maps: {
					...state.maps,
					[mapId]: {
						...(state.maps[mapId] || {}),
						...newEntities,
					},
				},
			};
		}),

	stChangeObjects: (mapId, changeableObjects) =>
		set((state) => {
			const currentMap = state.maps[mapId];
			if (!currentMap) return state;

			const newMap = { ...currentMap };

			changeableObjects.forEach((update) => {
				const existing = newMap[update.id!];
				if (existing) {
					newMap[update.id!] = mergeDeepOutObject(existing, update);
				}
			});

			return {
				maps: { ...state.maps, [mapId]: newMap },
			};
		}),

	stRemoveObjects: (mapId, idsToRemove) =>
		set((state) => {
			const currentMap = state.maps[mapId];
			if (!currentMap) return state;

			const newMap = { ...currentMap };

			idsToRemove.forEach((id) => {
				delete newMap[id];
			});

			return {
				maps: {
					...state.maps,
					[mapId]: newMap,
				},
			};
		}),
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TStoreLayers } from "./types";
import { TLayer } from "shared/@types/_types/layer";
import { mergeDeepOutObject } from "shared/utils/objects";

export const LayersStore = create(
	persist<TStoreLayers>(
		(set) => ({
			maps: {},

			stAddLayers: (mapId, layers) =>
				set((state) => {
					const additions = layers.reduce(
						(acc, obj) => {
							acc[obj.id!] = obj;
							return acc;
						},
						{} as Record<string, TLayer>,
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

			stSetLayers: (mapId, layers) =>
				set((state) => {
					const newEntities = layers.reduce(
						(acc, obj) => {
							acc[obj.id!] = obj;
							return acc;
						},
						{} as Record<string, TLayer>,
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

			stChangeLayers: (mapId, changeableLayers) =>
				set((state) => {
					const currentMap = state.maps[mapId];
					if (!currentMap) return state;

					const newMap = { ...currentMap };

					changeableLayers.forEach((update) => {
						const existing = newMap[update.id!];
						if (existing) {
							newMap[update.id!] = mergeDeepOutObject(existing, update);
						}
					});

					return {
						maps: { ...state.maps, [mapId]: newMap },
					};
				}),

			stRemoveLayers: (mapId, idsToRemove) =>
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
		}),
		{
			name: "_AngularMapLayersStore_",
		},
	),
);

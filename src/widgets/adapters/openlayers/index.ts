import { Component, ElementRef, ViewChild } from "@angular/core";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { OSM } from "ol/source";

@Component({
	selector: "OlMap",
	templateUrl: "./index.html",
	styleUrl: "./index.css",
})
export class OlMap {
	@ViewChild("mapContainer", { static: false }) mapContainer!: ElementRef;

	public map!: Map;

	ngAfterViewInit(): void {
		this.initMap();
	}

	private initMap(): void {
		this.map = new Map({
			target: this.mapContainer.nativeElement,
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: fromLonLat([38, 55.5]),
				zoom: 8,
			}),
			controls: [],
		});
	}
}

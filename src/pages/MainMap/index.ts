import { Component } from "@angular/core";
import { OlMap } from "widgets/adapters/openlayers";

@Component({
	selector: "MainMap",
	imports: [OlMap],
	templateUrl: "./index.html",
})
export class MainMap {}

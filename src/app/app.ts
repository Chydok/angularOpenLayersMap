import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MainMap } from "pages/MainMap";
import { TreeList } from "features/TreeList";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, MainMap, TreeList],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {}

import { Component, model } from "@angular/core";

@Component({
	selector: "TreeElement",
	template: `
		<span>{{name()}}</span>
	`
})
export class TreeElement {
	name = model("")
}
import { Component, model } from "@angular/core";

@Component({
	selector: "TreeElement",
	template: `
		<div style="display: flex; align-items: center; height: 100%; gap: 0.25rem;">
			@if (isExpanded()) {<img src="assets/icons/folderOpen.svg" alt="Иконка" [width]="16" [height]="16" />}
			@else {<img src="assets/icons/folder.svg" alt="Иконка" [width]="16" [height]="16" />}
			<span>{{name()}}</span>
		</div>
	`
})
export class TreeElement {
	name = model<string>("")
	isExpanded = model<boolean>(false)
}
import { Component } from "@angular/core";
import { VirtualTree } from "shared/ui/VirtualTree";
import { TreeNode } from "shared/ui/VirtualTree/types";
import { TreeElement } from "./ui/treeElement";

@Component({
	selector: "TreeList",
	templateUrl: "./index.html",
	styleUrl: "./index.css",
	imports: [VirtualTree, TreeElement],
})
export class TreeList {
	public allNodes: TreeNode[] = [];

	constructor () {
		this.generateMockData();
	}
 
	private generateMockData() {
		const nodes: TreeNode[] = [];
		let counter = 0;
		for (let c = 1; c <= 20; c++) {
			const catalogId = `c-${c}`;
			nodes.push({
				id: catalogId,
				name: `Каталог ${c}`,
				type: "catalog",
				level: 1,
				expandable: true,
				isExpanded: false,
			});
			for (let l = 1; l <= 10; l++) {
				const layerId = `l-${c}-${l}`;
				nodes.push({
					id: layerId,
					name: `Слой ${c}-${l} (Кат ${c})`,
					type: "layer",
					level: 1,
					expandable: true,
					isExpanded: false,
					parentId: catalogId,
				});
				for (let o = 1; o <= 100; o++) {
					counter++;
					nodes.push({
						id: `o-${counter}`,
						name: `Объект ${counter} [Узел ${l}]`,
						type: "object",
						level: 2,
						expandable: false,
						parentId: layerId,
					});
				}
			}
		}
		this.allNodes = nodes;
	}
}
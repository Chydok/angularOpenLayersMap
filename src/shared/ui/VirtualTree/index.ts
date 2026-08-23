import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, signal } from "@angular/core";
import { CdkVirtualScrollViewport, ScrollingModule } from "@angular/cdk/scrolling";
import { TreeNode } from "./types";

@Component({
	selector: "VirtualTree",
	standalone: true,
	imports: [ScrollingModule],
	templateUrl: "./index.html",
	styleUrls: ["./index.css"],
})
export class VirtualTree implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

	private resizeObserver!: ResizeObserver;
	private allNodes: TreeNode[] = [];
	public visibleNodes = signal<TreeNode[]>([]);

	ngAfterViewInit() {
		this.resizeObserver = new ResizeObserver(() => {
			if (this.viewport) {
				this.viewport.checkViewportSize();
			}
		});

		this.resizeObserver.observe(this.viewport.elementRef.nativeElement);
	}

	ngOnInit(): void {
		this.generateMockData();
		this.updateVisibleNodes();
	}

	ngOnDestroy() {
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
	}

	private updateVisibleNodes() {
		this.buildTree();
	}

	toggleNode(node: TreeNode) {
		if (!node.expandable) return;
		node.isExpanded = !node.isExpanded;
		this.updateVisibleNodes();
	}

	private buildTree() {
		const visible: TreeNode[] = [];
		const hiddenParentsIds = new Set<string>();

		for (const node of this.allNodes) {
			if (node.parentId && hiddenParentsIds.has(node.parentId)) {
				if (node.expandable) hiddenParentsIds.add(node.id);
				continue;
			}
			visible.push(node);
			if (node.expandable && !node.isExpanded) {
				hiddenParentsIds.add(node.id);
			}
		}
		this.visibleNodes.set(visible);
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

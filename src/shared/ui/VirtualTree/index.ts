import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, signal, model, contentChild, TemplateRef } from "@angular/core";
import { CdkVirtualScrollViewport, ScrollingModule } from "@angular/cdk/scrolling";
import { TreeNode } from "./types";
import { NgTemplateOutlet } from "@angular/common";

@Component({
	selector: "VirtualTree",
	standalone: true,
	imports: [ScrollingModule, NgTemplateOutlet],
	templateUrl: "./index.html",
	styleUrls: ["./index.css"],
})
export class VirtualTree implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

	private resizeObserver!: ResizeObserver;
	allNodes = model<TreeNode[]>([]);
	public visibleNodes = signal<TreeNode[]>([]);

	treeElementTemplate = contentChild(TemplateRef);

	ngAfterViewInit() {
		this.resizeObserver = new ResizeObserver(() => {
			if (this.viewport) {
				this.viewport.checkViewportSize();
			}
		});

		this.resizeObserver.observe(this.viewport.elementRef.nativeElement);
	}

	ngOnInit(): void {
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

		for (const node of this.allNodes()) {
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
}

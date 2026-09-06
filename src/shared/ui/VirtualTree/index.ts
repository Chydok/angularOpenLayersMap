import {
	Component,
	OnDestroy,
	afterNextRender,
	computed,
	contentChild,
	effect,
	ElementRef,
	model,
	signal,
	TemplateRef,
	untracked,
	viewChild,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { TreeNode, VisibleRow } from "./types";

@Component({
	selector: "VirtualTree",
	standalone: true,
	imports: [NgTemplateOutlet],
	templateUrl: "./index.html",
	styleUrls: ["./index.css"],
})
export class VirtualTree implements OnDestroy {
	private viewport = viewChild<ElementRef<HTMLElement>>("viewport");
	private resizeObserver?: ResizeObserver;

	readonly itemSize = 40;
	readonly buffer = 8;
	readonly indent = 24;
	readonly arrowCenter = 8;

	allNodes = model<TreeNode[]>([]);
	visibleRows = signal<VisibleRow[]>([]);
	selectedNodes = signal<Map<string, boolean>>(new Map());
	scrollTop = signal(0);
	viewportHeight = signal(500);

	treeElementTemplate = contentChild(TemplateRef);

	windowStart = computed(() => {
		return Math.max(0, Math.floor(this.scrollTop() / this.itemSize) - this.buffer);
	});

	windowedNodes = computed(() => {
		const start = this.windowStart();
		const count = Math.ceil(this.viewportHeight() / this.itemSize) + this.buffer * 2;
		return this.visibleRows().slice(start, start + count);
	});

	padTop = computed(() => this.windowStart() * this.itemSize);

	padBottom = computed(() => {
		const total = this.visibleRows().length;
		const start = this.windowStart();
		const count = Math.ceil(this.viewportHeight() / this.itemSize) + this.buffer * 2;
		const end = Math.min(total, start + count);
		return Math.max(0, (total - end) * this.itemSize);
	});

	constructor() {
		effect(() => {
			this.allNodes();
			untracked(() => this.buildTree());
		});

		afterNextRender(() => {
			const el = this.viewport()?.nativeElement;
			if (!el) return;

			this.viewportHeight.set(el.clientHeight);
			this.scrollTop.set(el.scrollTop);

			this.resizeObserver = new ResizeObserver(() => {
				this.viewportHeight.set(el.clientHeight);
			});
			this.resizeObserver.observe(el);
		});
	}

	ngOnDestroy() {
		this.resizeObserver?.disconnect();
	}

	onScroll(event: Event) {
		const el = event.target as HTMLElement;
		this.scrollTop.set(el.scrollTop);
		this.viewportHeight.set(el.clientHeight);
	}

	toggleNode(node: TreeNode) {
		if (!node.expandable) return;
		node.isExpanded = !node.isExpanded;
		this.buildTree();
	}

	selectNode(nodeId: string) {
		const next = new Map(this.selectedNodes());
		if (next.has(nodeId)) {
			next.delete(nodeId);
		} else {
			next.set(nodeId, true);
		}
		this.selectedNodes.set(next);
	}

	private buildTree() {
		const hiddenParentsIds = new Set<string>();
		const visible: TreeNode[] = [];

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

		const byId = new Map(visible.map((node) => [node.id, node]));
		const lastChildByParent = new Map<string | undefined, string>();
		for (const node of visible) {
			lastChildByParent.set(node.parentId, node.id);
		}

		this.visibleRows.set(
			visible.map((node) => {
				const chain: TreeNode[] = [];
				let parentId = node.parentId;
				while (parentId) {
					const parent = byId.get(parentId);
					if (!parent) break;
					chain.unshift(parent);
					parentId = parent.parentId;
				}

				const depth = chain.length;
				const ancestorGuideDepths: number[] = [];
				for (let i = 0; i < chain.length - 1; i++) {
					const next = chain[i + 1];
					if (lastChildByParent.get(next.parentId) !== next.id) {
						ancestorGuideDepths.push(i);
					}
				}

				return {
					node,
					depth,
					parentDepth: Math.max(0, depth - 1),
					isLastChild: lastChildByParent.get(node.parentId) === node.id,
					ancestorGuideDepths,
					showStem: !!(node.expandable && node.isExpanded),
				};
			}),
		);
	}
}

export type TreeNode = {
	id: string;
	name: string;
	type: "catalog" | "layer" | "object";
	level: number;
	expandable: boolean;
	isExpanded?: boolean;
	parentId?: string;
};

export type VisibleRow = {
	node: TreeNode;
	depth: number;
	parentDepth: number;
	isLastChild: boolean;
	ancestorGuideDepths: number[];
	showStem: boolean;
};

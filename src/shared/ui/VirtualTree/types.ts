export interface TreeNode {
	id: string;
	name: string;
	type: "catalog" | "layer" | "object";
	level: number;
	expandable: boolean;
	isExpanded?: boolean;
	parentId?: string;
}

export interface Node {
    id: string;
    [key: string]: any;
}
export declare function getNodeById(node: Node | null | undefined, id: string, childrenKey?: string): Node | null;
export declare function updateNode(node: Node, id: string, newData: Node, childrenKey?: string): Node | null;
export declare function deleteNode(node: Node | null | undefined, id: string, childrenKey?: string): Node | null;
export declare function addNode(tree: Node | null | undefined, parentId: string, newNode: Node, position: number, childrenKey?: string): Node;
export declare function moveNode(node: Node | null | undefined, nodeId: string, newParentId: string, childrenKey?: string): Node | null;

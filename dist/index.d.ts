interface Node {
    id: string;
    children: Node[];
}
export declare function getNodeById(node: Node | null | undefined, id: string): Node | null;
export declare function updateNode(node: Node, id: string, newData: Node): Node | null;
export declare function deleteNode(node: Node | null | undefined, id: string): Node | null;
export declare function addNode(tree: Node | null | undefined, parentId: string, newNode: Node, position: number): Node;
export declare function moveNode(node: Node | null | undefined, nodeId: string, newParentId: string): Node | null;
export {};

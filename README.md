# Arborist 🌲

This library provides a set of functions to manipulate a tree data structure where each node has an `id` and a list of `children`. The tree is represented by a Node interface:

```ts
interface Node {
  id: string;
  children: Node[];
}
```

### Functions

**getNodeById(node: Node | null | undefined, id: string): Node | null**

This function performs a depth-first search (DFS) to find a node with a specific `id` in the tree. It returns the node if found, otherwise it returns null.

**updateNode(node: Node, id: string, newData: Node): Node | null**

This function updates a node with a specific `id` in the tree with `newData`. It performs a DFS to find the node, updates it, and returns a new tree with the updated node. If the node is not found, it returns `null`.

**deleteNode(node: Node | null | undefined, id: string): Node | null**

This function deletes a node with a specific `id` from the tree. It performs a DFS to find the node, removes it, and returns a new tree without the deleted node. If the node is not found, it returns `null`.

**addNode(tree: Node | null | undefined, parentId: string, newNode: Node, position: number): Node**

This function adds a new node to a specific parent node in the tree. The new node is inserted at a specific position in the parent's children array. If the parent node is not found, it throws an error.

**moveNode(node: Node | null | undefined, nodeId: string, newParentId: string): Node | null**

This function moves a node with a specific `id` to a new parent in the tree. It performs a DFS to find both the node and the new parent, moves the node, and returns a new tree with the moved node. If the node or the new parent is not found, it throws an error.

### Error Handling

All functions throw an error if any of the input parameters are null or undefined. The `moveNode` and `addNode` functions also throw an error if the target parent node is not found in the tree.

### Performance

All functions use an iterative DFS approach with a stack for tree traversal, which is efficient in terms of memory usage. They also create a deep copy of the tree before making modifications, ensuring that the original tree is not mutated.

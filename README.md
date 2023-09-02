# Dendrologist 🌲

This library provides a set of functions to manipulate a tree data structure where each node has an `id` and a list of `children`. The tree is represented by a Node interface:

```ts
interface Node {
  id: string;
  [key: string]: any;
}
```

### Installation

```shell
npm install dendrologist
yarn install dendrologist
pnpm install dendrologist
```

### Functions

```ts
export function getNodeById(
  node: Node | null | undefined,
  id: string,
  childrenKey: string = "children"
): Node | null {
  // Implementation details...
}
```

This function takes a `node` (the root of the tree), an `id` to search for, and an optional `childrenKey` that specifies the property name for the children array in each node. It performs a depth-first search (DFS) to find the node with the matching id and returns it. If the node is not found, it returns `null`.

```ts
export function updateNode(
  node: Node,
  id: string,
  newData: Node,
  childrenKey: string = "children"
): Node | null {
  // Implementation details...
}
```

This function takes a `node`, an `id` to identify the node to update, `newData` containing the updated properties, and an optional `childrenKey` to specify the property name for the children array. It performs a DFS to find the node with the matching id, updates its properties with newData, and returns the updated node. If the node is not found, it returns `null`.

```ts
export function deleteNode(
  node: Node | null | undefined,
  id: string,
  childrenKey: string = "children"
): Node | null {
  // Implementation details...
}
```

This function takes a `node`, an `id` to identify the node to delete, and an optional `childrenKey` to specify the property name for the children array. It performs a DFS to find the node with the matching id, removes it from its parent's children array, and returns the modified tree. If the node is not found, it returns `null`.

```ts
export function addNode(
  tree: Node | null | undefined,
  parentId: string,
  newNode: Node,
  position: number,
  childrenKey: string = "children"
): Node {
  // Implementation details...
}
```

This function takes a `tree` (the root of the tree), a `parentId` to identify the parent node where the new node will be added, `newNode` containing the properties of the new node, `position` specifying the index at which the new node should be inserted, and an optional `childrenKey` to specify the property name for the children array. It performs a DFS to find the parent node with the matching parentId, inserts the newNode at the specified position in the parent's children array, and returns the modified tree.

```ts
export function moveNode(
  node: Node | null | undefined,
  nodeId: string,
  newParentId: string,
  childrenKey: string = "children"
): Node | null {
  // Implementation details...
}
```

This function takes a `node` (the root of the tree), a `nodeId` to identify the node to move, a `newParentId` to identify the new parent node, and an optional `childrenKey` to specify the property name for the children array. It performs a DFS to find the node with the matching `nodeId`, removes it from its current parent's children array, and adds it to the children array of the node with the matching `newParentId`. It returns the modified tree. If either the node or the new parent is not found, it throws an error.

### Error Handling

All functions throw an error if any of the input parameters are null or undefined. The `moveNode` and `addNode` functions also throw an error if the target parent node is not found in the tree.

### Performance

All functions use an iterative DFS approach with a stack for tree traversal, which is efficient in terms of memory usage. They also create a deep copy of the tree before making modifications, ensuring that the original tree is not mutated.

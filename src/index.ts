export interface Node {
  id: string;
  [key: string]: any;
}

export function getNodeById(
  node: Node | null | undefined,
  id: string,
  childrenKey: string = "children"
): Node | null {
  // Check if node or id is null or undefined
  if (!node || !id || typeof id !== "string") {
    return null;
  }

  // Create a stack for DFS
  let stack: Node[] = [];
  stack.push(node);

  // Iterate while stack is not empty
  while (stack.length) {
    let currentNode = stack.pop();

    // Check if current node's id matches the target id
    if (currentNode && currentNode.id === id) {
      return currentNode;
    }

    // Add children to the stack
    if (currentNode && currentNode[childrenKey]) {
      stack.push(...currentNode[childrenKey]);
    }
  }

  // The node was not found in the tree
  return null;
}

export function updateNode(
  node: Node,
  id: string,
  newData: Node,
  childrenKey: string = "children"
): Node | null {
  // Create a deep copy of the node
  const copiedNode: Node = {
    id: node.id,
    [childrenKey]: node[childrenKey]
      ? node[childrenKey].map((child: Node) => ({ ...child }))
      : [],
  };

  // Create a stack for DFS
  let stack: Node[] = [];
  stack.push(copiedNode);

  // Iterate while stack is not empty
  while (stack.length) {
    let currentNode = stack.pop();

    // Check if current node's id matches the target id
    if (currentNode && currentNode.id === id) {
      // Update the node with new data
      Object.assign(currentNode, newData);
      return copiedNode;
    }

    // Add children to the stack
    if (currentNode && currentNode[childrenKey]) {
      stack.push(...currentNode[childrenKey]);
    }
  }

  // The node was not found in the tree
  return null;
}

export function deleteNode(
  node: Node | null | undefined,
  id: string,
  childrenKey: string = "children"
): Node | null {
  // Check if node or id is null or undefined
  if (!node || !id) {
    return null;
  }

  // Create a deep copy of the node
  const copiedNode: Node = {
    id: node.id,
    [childrenKey]: node[childrenKey]
      ? node[childrenKey].map((child: Node) => ({ ...child }))
      : [],
  };

  // Create a stack for DFS
  let stack: Node[] = [];
  stack.push(copiedNode);

  // Iterate while stack is not empty
  while (stack.length) {
    let currentNode = stack.pop();

    // Check if current node's children contain the target id
    if (
      currentNode &&
      currentNode[childrenKey].some((child: Node) => child.id === id)
    ) {
      // Remove the node with the matching id from the parent's children array
      currentNode[childrenKey] = currentNode[childrenKey].filter(
        (child: Node) => child.id !== id
      );
      return copiedNode;
    }

    // Add children to the stack
    if (currentNode && currentNode[childrenKey]) {
      stack.push(...currentNode[childrenKey]);
    }
  }

  // The node was not found in the tree
  return null;
}

export function addNode(
  tree: Node | null | undefined,
  parentId: string,
  newNode: Node,
  position: number,
  childrenKey: string = "children"
): Node {
  // Check if tree, parentId, or newNode is null or undefined
  if (!tree || !parentId || !newNode) {
    throw new Error("Invalid input parameters");
  }

  // Create a deep copy of the tree
  const copiedTree: Node = {
    id: tree.id,
    [childrenKey]: tree[childrenKey]
      ? tree[childrenKey].map((child: Node) => ({ ...child }))
      : [],
  };

  // Create a stack for DFS
  let stack: Node[] = [];
  stack.push(copiedTree);

  // Iterate while stack is not empty
  while (stack.length) {
    let currentNode = stack.pop();

    // Check if current node's id matches the target id
    if (currentNode && currentNode.id === parentId) {
      // Add the new node at the specified position
      currentNode[childrenKey].splice(position, 0, newNode);
      return copiedTree;
    }

    // Add children to the stack
    if (currentNode && currentNode[childrenKey]) {
      stack.push(...currentNode[childrenKey]);
    }
  }

  // If the parentId was not found in the tree, throw an error
  throw new Error("Parent id not found in tree");
}

export function moveNode(
  node: Node | null | undefined,
  nodeId: string,
  newParentId: string,
  childrenKey: string = "children"
): Node | null {
  // Check if node, nodeId, or newParentId is null or undefined
  if (!node || !nodeId || !newParentId) {
    throw new Error("Invalid input parameters");
  }

  // Create a deep copy of the node
  const copiedNode: Node = {
    id: node.id,
    [childrenKey]: node[childrenKey]
      ? node[childrenKey].map((child: Node) => ({ ...child }))
      : [],
  };

  let nodeToMove = null;
  let parentNode = null;

  // Create a stack for DFS
  let stack: Node[] = [];
  stack.push(copiedNode);

  // Iterate while stack is not empty
  while (stack.length) {
    let currentNode = stack.pop();

    // Check if current node's id matches the target id
    if (currentNode && currentNode.id === nodeId) {
      // Remove the node with the matching id from the copied children array
      if (parentNode) {
        parentNode[childrenKey] = parentNode[childrenKey].filter(
          (child: Node) => child.id !== nodeId
        );
      }
      nodeToMove = currentNode;
    }

    // Add children to the stack
    if (currentNode && currentNode[childrenKey]) {
      parentNode = currentNode;
      stack.push(...currentNode[childrenKey]);
    }
  }

  // If the node to move was not found in the tree, throw an error
  if (!nodeToMove) {
    throw new Error("Node id not found in tree");
  }

  stack = [];
  stack.push(copiedNode);

  // Iterate while stack is not empty
  while (stack.length) {
    let currentNode = stack.pop();

    // Check if current node's id matches the new parent id
    if (currentNode && currentNode.id === newParentId) {
      // Add the node to move to the new parent's children
      currentNode[childrenKey].push(nodeToMove);
      return copiedNode;
    }

    // Add children to the stack
    if (currentNode && currentNode[childrenKey]) {
      stack.push(...currentNode[childrenKey]);
    }
  }

  // If the new parent id was not found in the tree, throw an error
  throw new Error("New parent id not found in tree");
}

interface Node {
  id: string;
  children: Node[];
}

export function getNodeById(
  node: Node | null | undefined,
  id: string
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
    if (currentNode && currentNode.children) {
      stack.push(...currentNode.children);
    }
  }

  // The node was not found in the tree
  return null;
}

export function updateNode(node: Node, id: string, newData: Node): Node | null {
  // Create a deep copy of the node
  const copiedNode: Node = {
    id: node.id,
    children: node.children ? node.children.map((child) => ({ ...child })) : [],
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
    if (currentNode && currentNode.children) {
      stack.push(...currentNode.children);
    }
  }

  // The node was not found in the tree
  return null;
}

export function deleteNode(
  node: Node | null | undefined,
  id: string
): Node | null {
  // Check if node or id is null or undefined
  if (!node || !id) {
    return null;
  }

  // Create a deep copy of the node
  const copiedNode: Node = {
    id: node.id,
    children: node.children ? node.children.map((child) => ({ ...child })) : [],
  };

  // Create a stack for DFS
  let stack: Node[] = [];
  stack.push(copiedNode);

  // Iterate while stack is not empty
  while (stack.length) {
    let currentNode = stack.pop();

    // Check if current node's children contain the target id
    if (currentNode && currentNode.children.some((child) => child.id === id)) {
      // Remove the node with the matching id from the parent's children array
      currentNode.children = currentNode.children.filter(
        (child) => child.id !== id
      );
      return copiedNode;
    }

    // Add children to the stack
    if (currentNode && currentNode.children) {
      stack.push(...currentNode.children);
    }
  }

  // The node was not found in the tree
  return null;
}

export function addNode(
  tree: Node | null | undefined,
  parentId: string,
  newNode: Node,
  position: number
): Node {
  // Check if tree, parentId, or newNode is null or undefined
  if (!tree || !parentId || !newNode) {
    throw new Error("Invalid input parameters");
  }

  // Create a deep copy of the tree
  const copiedTree: Node = {
    id: tree.id,
    children: tree.children ? tree.children.map((child) => ({ ...child })) : [],
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
      currentNode.children.splice(position, 0, newNode);
      return copiedTree;
    }

    // Add children to the stack
    if (currentNode && currentNode.children) {
      stack.push(...currentNode.children);
    }
  }

  // If the parentId was not found in the tree, throw an error
  throw new Error("Parent id not found in tree");
}

export function moveNode(
  node: Node | null | undefined,
  nodeId: string,
  newParentId: string
): Node | null {
  // Check if node, nodeId, or newParentId is null or undefined
  if (!node || !nodeId || !newParentId) {
    throw new Error("Invalid input parameters");
  }

  // Create a deep copy of the node
  const copiedNode: Node = {
    id: node.id,
    children: node.children ? node.children.map((child) => ({ ...child })) : [],
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
        parentNode.children = parentNode.children.filter(
          (child) => child.id !== nodeId
        );
      }
      nodeToMove = currentNode;
    }

    // Add children to the stack
    if (currentNode && currentNode.children) {
      parentNode = currentNode;
      stack.push(...currentNode.children);
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
      currentNode.children.push(nodeToMove);
      return copiedNode;
    }

    // Add children to the stack
    if (currentNode && currentNode.children) {
      stack.push(...currentNode.children);
    }
  }

  // If the new parent id was not found in the tree, throw an error
  throw new Error("New parent id not found in tree");
}

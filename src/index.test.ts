import {
  Node,
  addNode,
  deleteNode,
  getNodeById,
  moveNode,
  updateNode,
} from "./index.ts";
import { expect, test } from "vitest";

test("getNodeById - should return the correct node", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
      {
        id: "3",
        children: [
          {
            id: "4",
            children: [],
          },
        ],
      },
    ],
  };

  const result = getNodeById(tree, "3");

  if (!result) {
    throw new Error("Node not found");
  }

  expect(result.id).toBe("3");
  expect(result.children.length).toBe(1);
  expect(result.children[0].id).toBe("4");
});

test("getNodeById - should return null if node is not found", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
    ],
  };

  const result = getNodeById(tree, "3");

  expect(result).toBeNull();
});

test("updateNode - should update the correct node", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
      {
        id: "3",
        children: [
          {
            id: "4",
            children: [],
          },
        ],
      },
    ],
  };

  const newData = {
    id: "3",
    children: [
      {
        id: "5",
        children: [],
      },
    ],
  };

  const result = updateNode(tree, "3", newData);

  if (!result) {
    throw new Error("Node not updated");
  }

  const updatedNode = result.children?.find((child: Node) => child.id === "3");

  if (!updatedNode) {
    throw new Error("Updated node not found");
  }

  expect(updatedNode.children.length).toBe(1);
  expect(updatedNode.children[0].id).toBe("5");
});

test("updateNode - should return null if node is not found", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
    ],
  };

  const newData = {
    id: "3",
    children: [
      {
        id: "5",
        children: [],
      },
    ],
  };

  const result = updateNode(tree, "3", newData);

  expect(result).toBeNull();
});

test("deleteNode - should delete the correct node", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
      {
        id: "3",
        children: [
          {
            id: "4",
            children: [],
          },
        ],
      },
    ],
  };

  const result = deleteNode(tree, "3");

  if (!result) {
    throw new Error("Node not deleted");
  }

  const deletedNode = result.children.find((child: Node) => child.id === "3");
  console.log(deletedNode);

  expect(deletedNode).toBeUndefined();
});

test("deleteNode - should return null if node is not found", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
    ],
  };

  const result = deleteNode(tree, "3");

  expect(result).toBeNull();
});

test("addNode - should add a new node at the correct position", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
      {
        id: "3",
        children: [
          {
            id: "4",
            children: [],
          },
        ],
      },
    ],
  };

  const newNode = {
    id: "5",
    children: [],
  };

  const result = addNode(tree, "3", newNode, 1);

  if (!result) {
    throw new Error("Node not added");
  }

  const parentNode = result.children.find((child: Node) => child.id === "3");

  if (!parentNode) {
    throw new Error("Parent node not found");
  }

  expect(parentNode.children[1].id).toBe("5");
});

test("addNode - should throw an error if parent node is not found", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
    ],
  };

  const newNode = {
    id: "5",
    children: [],
  };

  expect(() => addNode(tree, "3", newNode, 1)).toThrow(
    "Parent id not found in tree"
  );
});

test("moveNode - should move the node to a new parent", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
      {
        id: "3",
        children: [
          {
            id: "4",
            children: [],
          },
        ],
      },
    ],
  };

  const result = moveNode(tree, "4", "2");

  if (!result) {
    throw new Error("Node not moved");
  }

  const oldParentNode = result.children.find((child: Node) => child.id === "3");
  const newParentNode = result.children.find((child: Node) => child.id === "2");

  if (!oldParentNode || !newParentNode) {
    throw new Error("Parent node not found");
  }

  expect(oldParentNode.children.length).toBe(0);
  expect(newParentNode.children[0].id).toBe("4");
});

test("moveNode - should throw an error if node or parent node is not found", () => {
  const tree = {
    id: "1",
    children: [
      {
        id: "2",
        children: [],
      },
    ],
  };

  expect(() => moveNode(tree, "3", "2")).toThrow("Node id not found in tree");
  expect(() => moveNode(tree, "2", "3")).toThrow(
    "New parent id not found in tree"
  );
});

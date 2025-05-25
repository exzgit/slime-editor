import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFile } from "react-icons/fa";

export type TreeNodeData = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: TreeNodeData[];
};

type TreeNodeProps = {
  node: TreeNodeData;
  depth?: number;
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => {
    if (node.type === "folder") {
      setExpanded((prev) => !prev);
    }
  };

  return (
    <div style={{ marginLeft: depth * 16 }} className="select-none">
      <div
        className="flex p-2 items-center gap-2 cursor-pointer hover:bg-zinc-800 px-2 py-1 rounded"
        onClick={handleToggle}
      >
        {node.type === "folder" ? (
          expanded ? <FaFolderOpen color="white" /> : <FaFolder color="white" />
        ) : (
          <FaFile color="white" />
        )}
        <span className="text-sm text-white">{node.name}</span>
      </div>

      {expanded &&
        node.children?.map((child) => (
          <TreeNode key={child.id} node={child} depth={depth + 1} />
        ))}
    </div>
  );
};

export default TreeNode;

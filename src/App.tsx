import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import MenuBar from "./theme/MenuBar";
import { Sidebar } from "./theme/sidebar";
import { BottomPanel } from "./theme/bottom_panel";
import TreeNode, { TreeNodeData } from "./component/tree_node_data";

const mockTree: TreeNodeData = {
  id: "root",
  name: "project",
  type: "folder",
  children: [
    {
      id: "1",
      name: "src",
      type: "folder",
      children: [
        { id: "2", name: "App.tsx", type: "file" },
        { id: "3", name: "index.tsx", type: "file" },
      ],
    },
    {
      id: "4",
      name: "package.json",
      type: "file",
    },
  ],
};


function App() {
  const [leftPanelVisible, setLeftPanelVisible] = useState(true);

  return (
    <main className="bg-zinc-800 h-screen w-full fixed">
      <div className="h-screen flex flex-col">
        {/* HEADER */}
        <MenuBar isLeftPanelVisible={true} toggleLeftPanel={() => setLeftPanelVisible(prev => !prev)} />

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">
          {leftPanelVisible && (
            <Sidebar position="left" className="p-[16px]">
             <TreeNode node={mockTree} />
            </Sidebar>
          )}

          <div className="relative flex-1 p-6 overflow-auto text-white">
            <main className="">
              {/* Konten utama */}
            </main>
            <BottomPanel />
          </div>

          <Sidebar position="right" className="p-[16px]">
            {/* Konten kanan */}
          </Sidebar>
        </div>
      </div>
    </main>
  );
}

export default App;

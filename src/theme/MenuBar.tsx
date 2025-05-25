import React, { useState } from "react";
import "./MenuBar.css";
import { IconButton, IconButtonCheckbox } from "../component/button";
import SidebarIcon from "../component/icons/sidebar-icon";
import SettingIcon from "../component/icons/settings-icon";

type MenuBarProps = {
  isLeftPanelVisible: boolean;
  toggleLeftPanel: () => void;
};

const menuItems = [
  { title: "File", submenu: ["New File", "Open", "Save", "Exit"] },
  { title: "Edit", submenu: ["Undo", "Redo", "Cut", "Copy", "Paste"] },
  { title: "View", submenu: ["Toggle Sidebar", "Zoom In", "Zoom Out"] },
  { title: "Tools", submenu: ["Command Palette", "Extensions"] },
  { title: "Help", submenu: ["About", "Documentation"] },
];

export default function MenuBar({ isLeftPanelVisible, toggleLeftPanel }: MenuBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="menu-bar z-[1000] bg-zinc-900 flex justify-between items-center px-2 py-1">
      <div className="flex items-center gap-2">
        <IconButtonCheckbox 
          checked={isLeftPanelVisible}
          onClick={toggleLeftPanel}
          className="w-8 h-8 bg-[#191919] rounded-full justify-center flex items-center text-white"
          icon={<SidebarIcon width={16} height={16} color="white" />} 
        />

        <div className="menu-strip flex gap-4 text-white text-sm">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="menu-item relative"
              onMouseEnter={() => setOpenMenu(item.title)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="menu-title cursor-pointer">{item.title}</span>
              {openMenu === item.title && (
                <div className="submenu absolute bg-zinc-800 mt-1 p-2 rounded shadow-md border border-zinc-700">
                  <div className="submenu-container flex flex-col">
                    {item.submenu.map((sub, idx) => (
                      <div key={idx} className="submenu-item px-2 py-1 hover:bg-zinc-700 rounded cursor-pointer">
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <IconButton 
        className="w-8 h-8 bg-[#191919] rounded-full justify-center flex items-center text-white"
        icon={<SettingIcon width={16} height={16} color="#ffffff" />} 
      />
    </div>
  );
}

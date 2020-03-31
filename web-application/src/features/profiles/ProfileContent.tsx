import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhoto from "./ProfilePhoto";
import ProfileDescription from "./ProfileDescription";
import ProfileFollowings from "./ProfileFollowings";

const panes = [
  { menuItem: "About", render: () => <ProfileDescription /> },
  { menuItem: "Photos", render: () => <ProfilePhoto /> },
  {
    menuItem: "Activities",
    render: () => <Tab.Pane>Activities content</Tab.Pane>
  },
  {
    menuItem: "Followers",
    render: () => <ProfileFollowings />
  },
  {
    menuItem: "Following",
    render: () => <ProfileFollowings />
  }
];

interface IProps {
  setActiveTab: (activeTab: any) => void;
}
export const ProfileContent: React.FC<IProps> = ({setActiveTab}) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e,data)=> setActiveTab(data.activeIndex)}
    ></Tab>
  );
};

import React, { useContext } from "react";
import { TabsWrapper, TabsList, Tab } from "@livechat/design-system";
import styled from "@emotion/styled";
import { NavigationContext } from "../context/navigation";
import { navigationItem } from "../constants";

const TabItem = styled(Tab)`
  margin-top: 0.5rem;
  padding: 0.5rem 1.5rem;
`;

const navigationItems = Object.values(navigationItem)

const Navigation = () => {
  const { activeTab, setActiveTab } = useContext(NavigationContext)

  return (
    <TabsWrapper>
      <TabsList style={{ paddingLeft: "1rem" }}>
        {navigationItems.map(item => (
          <TabItem
            key={item}
            onClick={() => setActiveTab(item)}
            isSelected={item === activeTab}
          >
            {item}
          </TabItem>
        ))}
      </TabsList>
    </TabsWrapper>
  )
};

export default Navigation;

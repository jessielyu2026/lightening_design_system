import React, { createContext, useContext, useState, useId } from 'react';
import './tab.css';

type TabVariant = 'primary' | 'secondary' | 'tertiary';

type TabOption = {
  id: string;
  label: string;
  disabled?: boolean;
};

type TabContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: TabVariant;
  baseId: string;
};

const TabContext = createContext<TabContextType | null>(null);

type TabsProps = {
  children: React.ReactNode;
  variant?: TabVariant;
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  variant = 'primary',
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  className = '',
}) => {
  const baseId = useId();
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || '');

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const setActiveTab = (id: string) => {
    if (!isControlled) {
      setInternalActiveTab(id);
    }
    onChange?.(id);
  };

  const containerClasses = [
    'ds-tabs',
    `ds-tabs--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, variant, baseId }}>
      <div className={containerClasses}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

type TabListProps = {
  tabs: TabOption[];
  className?: string;
};

export const TabList: React.FC<TabListProps> = ({
  tabs,
  className = '',
}) => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('TabList must be used within a Tabs component');
  }

  const { activeTab, setActiveTab, baseId } = context;

  const handleKeyDown = (e: React.KeyboardEvent, tabs: TabOption[], currentIndex: number) => {
    const enabledTabs = tabs.filter(t => !t.disabled);
    const currentEnabledIndex = enabledTabs.findIndex(t => t.id === tabs[currentIndex].id);

    let nextIndex: number;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        setActiveTab(enabledTabs[nextIndex].id);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
        setActiveTab(enabledTabs[nextIndex].id);
        break;
      case 'Home':
        e.preventDefault();
        setActiveTab(enabledTabs[0].id);
        break;
      case 'End':
        e.preventDefault();
        setActiveTab(enabledTabs[enabledTabs.length - 1].id);
        break;
    }
  };

  const listClasses = [
    'ds-tabs__list',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={listClasses} role="tablist">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        const tabClasses = [
          'ds-tabs__tab',
          isActive ? 'ds-tabs__tab--active' : '',
        ].filter(Boolean).join(' ');

        return (
          <button
            key={tab.id}
            id={`${baseId}-tab-${tab.id}`}
            className={tabClasses}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tabs, index)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

type TabPanelProps = {
  tabId: string;
  children: React.ReactNode;
  className?: string;
};

export const TabPanel: React.FC<TabPanelProps> = ({
  tabId,
  children,
  className = '',
}) => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('TabPanel must be used within a Tabs component');
  }

  const { activeTab, baseId } = context;
  const isActive = activeTab === tabId;

  const panelClasses = [
    'ds-tabs__panel',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      id={`${baseId}-panel-${tabId}`}
      className={panelClasses}
      role="tabpanel"
      aria-labelledby={`${baseId}-tab-${tabId}`}
      hidden={!isActive}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export type { TabsProps, TabListProps, TabPanelProps, TabOption, TabVariant };

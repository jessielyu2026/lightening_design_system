"use client";

import React, { useState } from "react";
import {
  Header,
  SideNav,
  SideNavSection,
  SideNavItem,
  SideNavSubItem,
  SideNavDivider,
  WidgetContainer,
} from "@/design-system";

// Icons
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 8L8 3L13.5 8M4 6.75V13C4 13.2761 4.22386 13.5 4.5 13.5H6.5V10.5C6.5 10.2239 6.72386 10 7 10H9C9.27614 10 9.5 10.2239 9.5 10.5V13.5H11.5C11.7761 13.5 12 13.2761 12 13V6.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2H6V6H2V2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 2H14V6H10V2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 10H6V14H2V10Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10H14V14H10V10Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ServerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
    <rect x="2" y="9" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/>
    <circle cx="4.5" cy="4.5" r="0.75" fill="currentColor"/>
    <circle cx="4.5" cy="11.5" r="0.75" fill="currentColor"/>
  </svg>
);

const CloudIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 11.5C2.84315 11.5 1.5 10.1569 1.5 8.5C1.5 7.01697 2.57925 5.78376 4.00255 5.54607C4.35089 3.52906 6.1003 2 8.22222 2C10.5913 2 12.5 3.90868 12.5 6.27778V6.5H12.6111C13.9305 6.5 15 7.56954 15 8.88889C15 10.2082 13.9305 11.2778 12.6111 11.2778" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InsightsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L8 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    <path d="M4 6L4 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    <path d="M12 4L12 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
);

const ExploreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SegmentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M8 2V8L13 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 2H4C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V6L9 2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 2V6H13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L3 4V7.5C3 10.5 5 13 8 14C11 13 13 10.5 13 7.5V4L8 2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="url(#logo-gradient)"/>
    <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0052D4"/>
        <stop offset="0.5" stopColor="#4364F7"/>
        <stop offset="1" stopColor="#6FB1FC"/>
      </linearGradient>
    </defs>
  </svg>
);

type DashboardFloorplanProps = {
  pageTitle?: string;
  breadcrumbs?: { label: string; href?: string; icon?: React.ReactNode }[];
};

export const DashboardFloorplan: React.FC<DashboardFloorplanProps> = ({
  pageTitle = "[Insights Name]",
  breadcrumbs = [
    { label: "Home", href: "#", icon: <HomeIcon /> },
    { label: "Insights", icon: <InsightsIcon /> },
  ],
}) => {
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);

  return (
    <div className="dashboard-floorplan">
      {/* SideNav */}
      <SideNav
        collapsed={sideNavCollapsed}
        onToggleCollapse={() => setSideNavCollapsed(!sideNavCollapsed)}
        logo={<LogoIcon />}
      >
        <SideNavSection>
          <SideNavItem icon={<DashboardIcon />} level={1} href="#">
            Dashboard
          </SideNavItem>
          <SideNavItem icon={<ServerIcon />} level={1} expandable defaultExpanded>
            Servers & Endpoints
            <SideNavSubItem href="#">Overview</SideNavSubItem>
            <SideNavSubItem href="#">Inventory</SideNavSubItem>
          </SideNavItem>
          <SideNavItem icon={<CloudIcon />} level={1} href="#">
            Cloud
          </SideNavItem>
          <SideNavItem icon={<ShieldIcon />} level={1} href="#">
            Ransomware Protection
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Insights" collapsible defaultExpanded>
          <SideNavItem icon={<InsightsIcon />} level={1} active expandable defaultExpanded>
            Insights Agent
            <SideNavSubItem active>Agent Summaries</SideNavSubItem>
            <SideNavSubItem>Resource Traffic</SideNavSubItem>
            <SideNavSubItem>Insights Hub</SideNavSubItem>
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} href="#">
            Risky Traffic
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} href="#">
            Malicious IP Threats
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} href="#">
            Shadow LLMs
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Explore" collapsible defaultExpanded>
          <SideNavItem icon={<ExploreIcon />} level={1} href="#">
            Map
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} href="#">
            Traffic
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} href="#">
            Mesh
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} href="#">
            Reports
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Segmentation" collapsible defaultExpanded>
          <SideNavItem icon={<SegmentIcon />} level={1} href="#">
            Policies
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} href="#">
            Deny Rules
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} expandable>
            Policy Objects
            <SideNavSubItem>Services</SideNavSubItem>
            <SideNavSubItem>IP Lists</SideNavSubItem>
            <SideNavSubItem>Labels</SideNavSubItem>
            <SideNavSubItem>User Groups</SideNavSubItem>
          </SideNavItem>
        </SideNavSection>
      </SideNav>

      {/* Main Content Area */}
      <div className="dashboard-floorplan__main">
        {/* Header */}
        <Header
          breadcrumbs={breadcrumbs}
          title={pageTitle}
          avatar={{ src: "https://i.pravatar.cc/40", alt: "User" }}
        />

        {/* Content */}
        <main className="dashboard-floorplan__content">
          <div className="dashboard-floorplan__widget-grid">
            {/* Row 1 */}
            <WidgetContainer title="Widget 1" size="1x1">
              <div className="widget-placeholder">Content Area</div>
            </WidgetContainer>
            <WidgetContainer title="Widget 2" size="1x1">
              <div className="widget-placeholder">Content Area</div>
            </WidgetContainer>

            {/* Row 2 */}
            <WidgetContainer title="Widget 3" size="1x1">
              <div className="widget-placeholder">Content Area</div>
            </WidgetContainer>
            <WidgetContainer title="Widget 4" size="1x1">
              <div className="widget-placeholder">Content Area</div>
            </WidgetContainer>

            {/* Row 3 */}
            <WidgetContainer title="Widget 5" size="1x1">
              <div className="widget-placeholder">Content Area</div>
            </WidgetContainer>
            <WidgetContainer title="Widget 6" size="1x1">
              <div className="widget-placeholder">Content Area</div>
            </WidgetContainer>
          </div>
        </main>
      </div>

      <style jsx>{`
        .dashboard-floorplan {
          min-height: 100vh;
          background: var(--bg-page, #f6f8f9);
        }

        .dashboard-floorplan__main {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          margin-left: ${sideNavCollapsed ? '64px' : '220px'};
          transition: margin-left 0.2s ease;
        }

        .dashboard-floorplan__content {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
        }

        .dashboard-floorplan__widget-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 1200px;
        }

        .widget-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 180px;
          color: var(--text-tertiary, #9ba3ab);
          font-size: 14px;
        }

        @media (max-width: 900px) {
          .dashboard-floorplan__widget-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardFloorplan;

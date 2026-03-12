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

// Chart Components using Lightning Design System colors
const PieChart = () => {
  // Pie segments: blue-500, green-500, purple-500, orange-500
  return (
    <div className="chart-container">
      <svg viewBox="0 0 100 100" className="pie-chart">
        {/* Blue segment - 35% */}
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--lightning-blue-500, #3a88fc)" strokeWidth="20"
          strokeDasharray="87.96 251.33" strokeDashoffset="0" transform="rotate(-90 50 50)" />
        {/* Green segment - 25% */}
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--lightning-green-500, #12a732)" strokeWidth="20"
          strokeDasharray="62.83 251.33" strokeDashoffset="-87.96" transform="rotate(-90 50 50)" />
        {/* Purple segment - 22% */}
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--lightning-purple-500, #8B5CF6)" strokeWidth="20"
          strokeDasharray="55.29 251.33" strokeDashoffset="-150.79" transform="rotate(-90 50 50)" />
        {/* Orange segment - 18% */}
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--lightning-orange-500, #F59E0B)" strokeWidth="20"
          strokeDasharray="45.24 251.33" strokeDashoffset="-206.08" transform="rotate(-90 50 50)" />
      </svg>
      <div className="chart-legend">
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--lightning-blue-500, #3a88fc)' }} />Servers (35%)</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--lightning-green-500, #12a732)' }} />Endpoints (25%)</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--lightning-purple-500, #8B5CF6)' }} />Cloud (22%)</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--lightning-orange-500, #F59E0B)' }} />Other (18%)</div>
      </div>
    </div>
  );
};

const BarChart = () => {
  const data = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 85 },
    { label: 'Wed', value: 45 },
    { label: 'Thu', value: 90 },
    { label: 'Fri', value: 70 },
    { label: 'Sat', value: 40 },
    { label: 'Sun', value: 55 },
  ];
  const maxValue = 100;

  return (
    <div className="chart-container">
      <div className="bar-chart">
        {data.map((item, i) => (
          <div key={i} className="bar-group">
            <div className="bar-wrapper">
              <div
                className="bar"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  background: `var(--lightning-blue-${400 + (i % 3) * 100}, #3a88fc)`,
                }}
              />
            </div>
            <span className="bar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart = () => {
  // Line chart data points
  const points = "10,80 30,45 50,60 70,25 90,40 110,15 130,35 150,20";
  const areaPoints = "10,80 30,45 50,60 70,25 90,40 110,15 130,35 150,20 150,90 10,90";

  return (
    <div className="chart-container">
      <svg viewBox="0 0 160 100" className="line-chart">
        {/* Grid lines */}
        <line x1="10" y1="90" x2="150" y2="90" stroke="var(--lightning-gray-200, #e6e8eb)" strokeWidth="1" />
        <line x1="10" y1="60" x2="150" y2="60" stroke="var(--lightning-gray-200, #e6e8eb)" strokeWidth="1" strokeDasharray="4" />
        <line x1="10" y1="30" x2="150" y2="30" stroke="var(--lightning-gray-200, #e6e8eb)" strokeWidth="1" strokeDasharray="4" />

        {/* Area fill */}
        <polygon points={areaPoints} fill="var(--lightning-blue-100, #dbebfe)" opacity="0.5" />

        {/* Line */}
        <polyline points={points} fill="none" stroke="var(--lightning-blue-500, #3a88fc)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        <circle cx="10" cy="80" r="3" fill="var(--lightning-blue-500, #3a88fc)" />
        <circle cx="30" cy="45" r="3" fill="var(--lightning-blue-500, #3a88fc)" />
        <circle cx="50" cy="60" r="3" fill="var(--lightning-blue-500, #3a88fc)" />
        <circle cx="70" cy="25" r="3" fill="var(--lightning-blue-500, #3a88fc)" />
        <circle cx="90" cy="40" r="3" fill="var(--lightning-blue-500, #3a88fc)" />
        <circle cx="110" cy="15" r="3" fill="var(--lightning-blue-500, #3a88fc)" />
        <circle cx="130" cy="35" r="3" fill="var(--lightning-blue-500, #3a88fc)" />
        <circle cx="150" cy="20" r="3" fill="var(--lightning-blue-500, #3a88fc)" />
      </svg>
      <div className="chart-x-labels">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change, changeType }: { label: string; value: string; change: string; changeType: 'positive' | 'negative' }) => (
  <div className="stat-card">
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className={`stat-change stat-change--${changeType}`}>
      {changeType === 'positive' ? '↑' : '↓'} {change}
    </div>
  </div>
);

const DonutChart = ({ percentage, color }: { percentage: number; color: string }) => {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="donut-container">
      <svg viewBox="0 0 100 100" className="donut-chart">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--lightning-gray-200, #e6e8eb)" strokeWidth="12" />
        <circle
          cx="50" cy="50" r="40" fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="50" textAnchor="middle" dy="0.35em" className="donut-text">{percentage}%</text>
      </svg>
    </div>
  );
};

const HorizontalBarChart = () => {
  const data = [
    { label: 'Critical', value: 12, color: 'var(--lightning-magenta-600, #DB2777)' },
    { label: 'High', value: 28, color: 'var(--lightning-red-500, #E53935)' },
    { label: 'Medium', value: 45, color: 'var(--lightning-orange-500, #F59E0B)' },
    { label: 'Low', value: 89, color: 'var(--lightning-yellow-500, #EAB308)' },
  ];
  const maxValue = 100;

  return (
    <div className="h-bar-chart">
      {data.map((item, i) => (
        <div key={i} className="h-bar-row">
          <span className="h-bar-label">{item.label}</span>
          <div className="h-bar-track">
            <div className="h-bar-fill" style={{ width: `${(item.value / maxValue) * 100}%`, background: item.color }} />
          </div>
          <span className="h-bar-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

// Navigation items configuration
const NAV_ITEMS = {
  dashboard: { label: "Dashboard", icon: <DashboardIcon /> },
  "servers-overview": { label: "Overview", parent: "servers" },
  "servers-inventory": { label: "Inventory", parent: "servers" },
  cloud: { label: "Cloud", icon: <CloudIcon /> },
  ransomware: { label: "Ransomware Protection", icon: <ShieldIcon /> },
  "insights-summaries": { label: "Agent Summaries", parent: "insights" },
  "insights-traffic": { label: "Resource Traffic", parent: "insights" },
  "insights-hub": { label: "Insights Hub", parent: "insights" },
  "risky-traffic": { label: "Risky Traffic", icon: <FileIcon /> },
  "malicious-ip": { label: "Malicious IP Threats", icon: <FileIcon /> },
  "shadow-llms": { label: "Shadow LLMs", icon: <FileIcon /> },
  map: { label: "Map", icon: <ExploreIcon /> },
  traffic: { label: "Traffic", icon: <FileIcon /> },
  mesh: { label: "Mesh", icon: <FileIcon /> },
  reports: { label: "Reports", icon: <FileIcon /> },
  policies: { label: "Policies", icon: <SegmentIcon /> },
  "deny-rules": { label: "Deny Rules", icon: <FileIcon /> },
  "policy-services": { label: "Services", parent: "policy-objects" },
  "policy-ip-lists": { label: "IP Lists", parent: "policy-objects" },
  "policy-labels": { label: "Labels", parent: "policy-objects" },
  "policy-user-groups": { label: "User Groups", parent: "policy-objects" },
} as const;

type NavItemId = keyof typeof NAV_ITEMS;

type DashboardFloorplanProps = {
  pageTitle?: string;
  breadcrumbs?: { label: string; href?: string; icon?: React.ReactNode }[];
};

export const DashboardFloorplan: React.FC<DashboardFloorplanProps> = ({
  pageTitle: initialPageTitle,
  breadcrumbs: initialBreadcrumbs,
}) => {
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NavItemId>("insights-summaries");

  const handleNavSelect = (itemId: NavItemId) => {
    setSelectedItem(itemId);
  };

  // Get current page title based on selection
  const currentItem = NAV_ITEMS[selectedItem];
  const pageTitle = initialPageTitle || currentItem.label;
  const breadcrumbs = initialBreadcrumbs || [
    { label: "Home", href: "#", icon: <HomeIcon /> },
    { label: pageTitle },
  ];

  return (
    <div className="dashboard-floorplan">
      {/* SideNav */}
      <SideNav
        collapsed={sideNavCollapsed}
        onToggleCollapse={() => setSideNavCollapsed(!sideNavCollapsed)}
        logo={<LogoIcon />}
      >
        <SideNavSection>
          <SideNavItem
            icon={<DashboardIcon />}
            level={1}
            active={selectedItem === "dashboard"}
            onClick={() => handleNavSelect("dashboard")}
          >
            Dashboard
          </SideNavItem>
          <SideNavItem icon={<ServerIcon />} level={1} expandable defaultExpanded={selectedItem.startsWith("servers-")}>
            Servers & Endpoints
            <SideNavSubItem active={selectedItem === "servers-overview"} onClick={() => handleNavSelect("servers-overview")}>Overview</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "servers-inventory"} onClick={() => handleNavSelect("servers-inventory")}>Inventory</SideNavSubItem>
          </SideNavItem>
          <SideNavItem
            icon={<CloudIcon />}
            level={1}
            active={selectedItem === "cloud"}
            onClick={() => handleNavSelect("cloud")}
          >
            Cloud
          </SideNavItem>
          <SideNavItem
            icon={<ShieldIcon />}
            level={1}
            active={selectedItem === "ransomware"}
            onClick={() => handleNavSelect("ransomware")}
          >
            Ransomware Protection
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Insights" collapsible defaultExpanded>
          <SideNavItem icon={<InsightsIcon />} level={1} expandable defaultExpanded={selectedItem.startsWith("insights-")}>
            Insights Agent
            <SideNavSubItem active={selectedItem === "insights-summaries"} onClick={() => handleNavSelect("insights-summaries")}>Agent Summaries</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "insights-traffic"} onClick={() => handleNavSelect("insights-traffic")}>Resource Traffic</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "insights-hub"} onClick={() => handleNavSelect("insights-hub")}>Insights Hub</SideNavSubItem>
          </SideNavItem>
          <SideNavItem
            icon={<FileIcon />}
            level={1}
            active={selectedItem === "risky-traffic"}
            onClick={() => handleNavSelect("risky-traffic")}
          >
            Risky Traffic
          </SideNavItem>
          <SideNavItem
            icon={<FileIcon />}
            level={1}
            active={selectedItem === "malicious-ip"}
            onClick={() => handleNavSelect("malicious-ip")}
          >
            Malicious IP Threats
          </SideNavItem>
          <SideNavItem
            icon={<FileIcon />}
            level={1}
            active={selectedItem === "shadow-llms"}
            onClick={() => handleNavSelect("shadow-llms")}
          >
            Shadow LLMs
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Explore" collapsible defaultExpanded>
          <SideNavItem
            icon={<ExploreIcon />}
            level={1}
            active={selectedItem === "map"}
            onClick={() => handleNavSelect("map")}
          >
            Map
          </SideNavItem>
          <SideNavItem
            icon={<FileIcon />}
            level={1}
            active={selectedItem === "traffic"}
            onClick={() => handleNavSelect("traffic")}
          >
            Traffic
          </SideNavItem>
          <SideNavItem
            icon={<FileIcon />}
            level={1}
            active={selectedItem === "mesh"}
            onClick={() => handleNavSelect("mesh")}
          >
            Mesh
          </SideNavItem>
          <SideNavItem
            icon={<FileIcon />}
            level={1}
            active={selectedItem === "reports"}
            onClick={() => handleNavSelect("reports")}
          >
            Reports
          </SideNavItem>
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Segmentation" collapsible defaultExpanded>
          <SideNavItem
            icon={<SegmentIcon />}
            level={1}
            active={selectedItem === "policies"}
            onClick={() => handleNavSelect("policies")}
          >
            Policies
          </SideNavItem>
          <SideNavItem
            icon={<FileIcon />}
            level={1}
            active={selectedItem === "deny-rules"}
            onClick={() => handleNavSelect("deny-rules")}
          >
            Deny Rules
          </SideNavItem>
          <SideNavItem icon={<FileIcon />} level={1} expandable defaultExpanded={selectedItem.startsWith("policy-")}>
            Policy Objects
            <SideNavSubItem active={selectedItem === "policy-services"} onClick={() => handleNavSelect("policy-services")}>Services</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "policy-ip-lists"} onClick={() => handleNavSelect("policy-ip-lists")}>IP Lists</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "policy-labels"} onClick={() => handleNavSelect("policy-labels")}>Labels</SideNavSubItem>
            <SideNavSubItem active={selectedItem === "policy-user-groups"} onClick={() => handleNavSelect("policy-user-groups")}>User Groups</SideNavSubItem>
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
          sticky
        />

        {/* Content */}
        <main className="dashboard-floorplan__content">
          <div className="dashboard-floorplan__widget-grid">
            {/* Row 1 */}
            <WidgetContainer title="Asset Distribution">
              <PieChart />
            </WidgetContainer>
            <WidgetContainer title="Weekly Traffic">
              <BarChart />
            </WidgetContainer>

            {/* Row 2 */}
            <WidgetContainer title="Traffic Trend">
              <LineChart />
            </WidgetContainer>
            <WidgetContainer title="System Health">
              <div className="stats-grid">
                <StatCard label="Uptime" value="99.9%" change="0.2%" changeType="positive" />
                <StatCard label="Latency" value="42ms" change="5ms" changeType="negative" />
                <DonutChart percentage={87} color="var(--lightning-green-500, #12a732)" />
              </div>
            </WidgetContainer>

            {/* Row 3 */}
            <WidgetContainer title="Risk Summary">
              <HorizontalBarChart />
            </WidgetContainer>
            <WidgetContainer title="Coverage Score">
              <div className="coverage-widget">
                <DonutChart percentage={73} color="var(--lightning-blue-500, #3a88fc)" />
                <div className="coverage-details">
                  <div className="coverage-item">
                    <span className="coverage-label">Monitored</span>
                    <span className="coverage-value">1,847</span>
                  </div>
                  <div className="coverage-item">
                    <span className="coverage-label">Unmonitored</span>
                    <span className="coverage-value">682</span>
                  </div>
                  <div className="coverage-item">
                    <span className="coverage-label">Total Assets</span>
                    <span className="coverage-value">2,529</span>
                  </div>
                </div>
              </div>
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
          height: 100vh;
          margin-left: ${sideNavCollapsed ? '64px' : '220px'};
          transition: margin-left 0.2s ease;
          overflow-y: auto;
        }

        .dashboard-floorplan__content {
          flex: 1;
          padding: 24px;
        }

        .dashboard-floorplan__widget-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        /* Make widgets fill their grid cell */
        .dashboard-floorplan__widget-grid > :global(*) {
          width: 100%;
        }

        /* Chart Containers */
        .chart-container {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px;
          height: 160px;
        }

        /* Pie Chart */
        .pie-chart {
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }

        .chart-legend {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12px;
          color: var(--lightning-bluegray-700, #455465);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Bar Chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 140px;
          width: 100%;
          padding-bottom: 24px;
        }

        .bar-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          height: 100%;
        }

        .bar-wrapper {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .bar {
          width: 70%;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }

        .bar-label {
          font-size: 11px;
          color: var(--lightning-bluegray-500, #64748B);
          margin-top: 8px;
        }

        /* Line Chart */
        .line-chart {
          width: 100%;
          height: 120px;
        }

        .chart-x-labels {
          display: flex;
          justify-content: space-between;
          padding: 4px 8px;
          font-size: 10px;
          color: var(--lightning-bluegray-500, #64748B);
        }

        /* Stat Card */
        .stat-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: var(--lightning-bluegray-500, #64748B);
        }

        .stat-value {
          font-size: 20px;
          font-weight: 600;
          color: var(--lightning-bluegray-900, #1F272F);
        }

        .stat-change {
          font-size: 12px;
          font-weight: 500;
        }

        .stat-change--positive {
          color: var(--lightning-green-600, #0C8727);
        }

        .stat-change--negative {
          color: var(--lightning-red-600, #DC2626);
        }

        /* Stats Grid */
        .stats-grid {
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 160px;
          padding: 8px;
        }

        /* Donut Chart */
        .donut-container {
          width: 100px;
          height: 100px;
        }

        .donut-chart {
          width: 100%;
          height: 100%;
        }

        .donut-text {
          font-size: 16px;
          font-weight: 600;
          fill: var(--lightning-bluegray-900, #1F272F);
        }

        /* Horizontal Bar Chart */
        .h-bar-chart {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 12px 8px;
          height: 160px;
          justify-content: center;
        }

        .h-bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .h-bar-label {
          width: 60px;
          font-size: 12px;
          color: var(--lightning-bluegray-600, #475569);
        }

        .h-bar-track {
          flex: 1;
          height: 16px;
          background: var(--lightning-gray-100, #f1f5f9);
          border-radius: 8px;
          overflow: hidden;
        }

        .h-bar-fill {
          height: 100%;
          border-radius: 8px;
          transition: width 0.3s ease;
        }

        .h-bar-value {
          width: 30px;
          text-align: right;
          font-size: 12px;
          font-weight: 500;
          color: var(--lightning-bluegray-700, #334155);
        }

        /* Coverage Widget */
        .coverage-widget {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 12px;
          height: 160px;
        }

        .coverage-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .coverage-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .coverage-label {
          font-size: 12px;
          color: var(--lightning-bluegray-500, #64748B);
        }

        .coverage-value {
          font-size: 16px;
          font-weight: 600;
          color: var(--lightning-bluegray-900, #1F272F);
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

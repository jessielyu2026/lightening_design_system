"use client";

import React, { useState, useMemo } from "react";
import { AgCharts } from "ag-charts-react";
import {
  ModuleRegistry as ChartsModuleRegistry,
  AllCommunityModule as AllChartsModule,
} from "ag-charts-community";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Register AG Charts modules
ChartsModuleRegistry.registerModules([AllChartsModule]);
import { Header } from "../components/Header";
import {
  SideNav,
  SideNavSection,
  SideNavItem,
  SideNavSubItem,
  SideNavDivider,
} from "../components/SideNav";
import { WidgetContainer, WidgetStat, WidgetGrid } from "../components/WidgetContainer";

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

// Lightning Design System color tokens
const CHART_COLORS = {
  blue500: '#3a88fc',
  blue400: '#4B97FA',
  blue600: '#2366ed',
  green500: '#12A732',
  purple500: '#5E46DD',
  orange500: '#EE6F11',
  critical: '#86198F',
  high: '#C93734',
  medium: '#CF630E',
  low: '#C79401',
  gray200: '#E6E8EB',
};

// AG Charts - Donut Chart for Asset Distribution
const DonutChartWidget = () => {
  const options = useMemo(() => ({
    data: [
      { asset: 'Servers', count: 35 },
      { asset: 'Endpoints', count: 25 },
      { asset: 'Cloud', count: 22 },
      { asset: 'Other', count: 18 },
    ],
    series: [{
      type: 'donut' as const,
      angleKey: 'count',
      legendItemKey: 'asset',
      innerRadiusRatio: 0.6,
      fills: [CHART_COLORS.blue500, CHART_COLORS.green500, CHART_COLORS.purple500, CHART_COLORS.orange500],
      strokeWidth: 0,
    }],
    legend: {
      position: 'right' as const,
      item: {
        label: { fontSize: 12, color: '#475569' },
        marker: { size: 10 },
      },
    },
    background: { visible: false },
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  } as const), []);

  return <div className="chart-fill"><AgCharts options={options as never} /></div>;
};

// AG Charts - Bar Chart for Weekly Traffic
const BarChartWidget = () => {
  const options = useMemo(() => ({
    data: [
      { day: 'Mon', traffic: 65 },
      { day: 'Tue', traffic: 85 },
      { day: 'Wed', traffic: 45 },
      { day: 'Thu', traffic: 90 },
      { day: 'Fri', traffic: 70 },
      { day: 'Sat', traffic: 40 },
      { day: 'Sun', traffic: 55 },
    ],
    series: [{
      type: 'bar' as const,
      xKey: 'day',
      yKey: 'traffic',
      fill: CHART_COLORS.blue500,
      strokeWidth: 0,
      cornerRadius: 4,
    }],
    axes: [
      { type: 'category' as const, position: 'bottom' as const, label: { fontSize: 11, color: '#64748B' } },
      { type: 'number' as const, position: 'left' as const, label: { fontSize: 11, color: '#64748B' } },
    ],
    background: { visible: false },
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  } as const), []);

  return <div className="chart-fill"><AgCharts options={options as never} /></div>;
};

// AG Charts - Line Chart for Traffic Trend
const LineChartWidget = () => {
  const options = useMemo(() => ({
    data: [
      { month: 'Jan', value: 20 },
      { month: 'Feb', value: 55 },
      { month: 'Mar', value: 40 },
      { month: 'Apr', value: 75 },
      { month: 'May', value: 60 },
      { month: 'Jun', value: 85 },
      { month: 'Jul', value: 65 },
      { month: 'Aug', value: 80 },
    ],
    series: [{
      type: 'area' as const,
      xKey: 'month',
      yKey: 'value',
      fill: CHART_COLORS.blue500,
      fillOpacity: 0.2,
      stroke: CHART_COLORS.blue500,
      strokeWidth: 2,
      marker: { fill: CHART_COLORS.blue500, stroke: CHART_COLORS.blue500, size: 6 },
    }],
    axes: [
      { type: 'category' as const, position: 'bottom' as const, label: { fontSize: 10, color: '#64748B' } },
      { type: 'number' as const, position: 'left' as const, label: { fontSize: 10, color: '#64748B' } },
    ],
    background: { visible: false },
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  } as const), []);

  return <div className="chart-fill"><AgCharts options={options as never} /></div>;
};

// AG Charts - Horizontal Bar Chart for Risk Summary
const RiskBarChartWidget = () => {
  const options = useMemo(() => ({
    data: [
      { severity: 'Critical', count: 12 },
      { severity: 'High', count: 28 },
      { severity: 'Medium', count: 45 },
      { severity: 'Low', count: 89 },
    ],
    series: [{
      type: 'bar' as const,
      direction: 'horizontal' as const,
      xKey: 'severity',
      yKey: 'count',
      formatter: (params: { datum: { severity: string } }) => {
        const colors: Record<string, string> = {
          Critical: CHART_COLORS.critical,
          High: CHART_COLORS.high,
          Medium: CHART_COLORS.medium,
          Low: CHART_COLORS.low,
        };
        return { fill: colors[params.datum.severity] || CHART_COLORS.blue500 };
      },
      strokeWidth: 0,
      cornerRadius: 4,
    }],
    axes: [
      { type: 'category' as const, position: 'left' as const, label: { fontSize: 12, color: '#475569' } },
      { type: 'number' as const, position: 'bottom' as const, label: { fontSize: 11, color: '#64748B' } },
    ],
    background: { visible: false },
    padding: { top: 10, right: 10, bottom: 10, left: 10 },
  } as const), []);

  return <div className="chart-fill"><AgCharts options={options as never} /></div>;
};

// AG Charts - Gauge/Radial for Coverage Score
const GaugeChartWidget = ({ percentage }: { percentage: number }) => {
  const options = useMemo(() => ({
    data: [
      { label: 'Coverage', value: percentage },
      { label: 'Remaining', value: 100 - percentage },
    ],
    series: [{
      type: 'donut' as const,
      angleKey: 'value',
      legendItemKey: 'label',
      innerRadiusRatio: 0.75,
      fills: [CHART_COLORS.blue500, CHART_COLORS.gray200],
      strokeWidth: 0,
    }],
    legend: { enabled: false },
    background: { visible: false },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  } as const), [percentage]);

  return (
    <div className="gauge-container">
      <div className="gauge-chart"><AgCharts options={options as never} /></div>
      <div className="gauge-label">{percentage}%</div>
    </div>
  );
};

// AG Grid - Assets Table
const AssetsTableWidget = () => {
  const columnDefs: ColDef[] = useMemo(() => [
    { field: 'name', headerName: 'Asset Name', flex: 2, minWidth: 120 },
    { field: 'type', headerName: 'Type', flex: 1, minWidth: 80 },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 80 },
    { field: 'risk', headerName: 'Risk', flex: 1, minWidth: 60 },
    { field: 'lastSeen', headerName: 'Last Seen', flex: 1, minWidth: 100 },
  ], []);

  const rowData = useMemo(() => [
    { name: 'prod-server-01', type: 'Server', status: 'Online', risk: 'Low', lastSeen: '2 min ago' },
    { name: 'db-primary', type: 'Database', status: 'Online', risk: 'Medium', lastSeen: '5 min ago' },
    { name: 'api-gateway', type: 'Service', status: 'Online', risk: 'Low', lastSeen: '1 min ago' },
    { name: 'worker-node-03', type: 'Server', status: 'Warning', risk: 'High', lastSeen: '15 min ago' },
    { name: 'cache-redis', type: 'Cache', status: 'Online', risk: 'Low', lastSeen: '3 min ago' },
    { name: 'lb-frontend', type: 'Load Balancer', status: 'Online', risk: 'Low', lastSeen: '1 min ago' },
  ], []);

  const defaultColDef: ColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
  }), []);

  return (
    <div className="grid-fill ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        domLayout="autoHeight"
        headerHeight={36}
        rowHeight={36}
      />
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
          <WidgetGrid columns={4} gap="sm">
            {/* Row 1: 4 stat widgets (1x1 each) */}
            <WidgetContainer span={1} title="Total Assets">
              <WidgetStat label="Assets" value="2,529" change="↑ 12%" changeType="positive" />
            </WidgetContainer>
            <WidgetContainer span={1} title="Active Threats">
              <WidgetStat label="Threats" value="47" change="↓ 8%" changeType="positive" />
            </WidgetContainer>
            <WidgetContainer span={1} title="Coverage">
              <WidgetStat label="Monitored" value="73%" change="↑ 5%" changeType="positive" />
            </WidgetContainer>
            <WidgetContainer span={1} title="Uptime">
              <WidgetStat label="System" value="99.9%" change="↑ 0.1%" changeType="positive" />
            </WidgetContainer>

            {/* Row 2: 2 chart widgets (2x1 each) */}
            <WidgetContainer span={2} title="Asset Distribution">
              <DonutChartWidget />
            </WidgetContainer>
            <WidgetContainer span={2} title="Weekly Traffic">
              <BarChartWidget />
            </WidgetContainer>

            {/* Row 3: Line chart (2x1) + Risk summary (2x1) */}
            <WidgetContainer span={2} title="Traffic Trend">
              <LineChartWidget />
            </WidgetContainer>
            <WidgetContainer span={2} title="Risk Summary">
              <RiskBarChartWidget />
            </WidgetContainer>

            {/* Row 4: Coverage gauge (1x1) + Stats (1x1) + Assets table (2x1) */}
            <WidgetContainer span={1} title="Coverage Score">
              <GaugeChartWidget percentage={73} />
            </WidgetContainer>
            <WidgetContainer span={1} title="System Health">
              <div className="health-stats">
                <WidgetStat label="Latency" value="42ms" change="↓ 5ms" changeType="negative" />
                <WidgetStat label="Errors" value="0.02%" change="↓ 0.01%" changeType="positive" />
              </div>
            </WidgetContainer>
            <WidgetContainer span={2} title="Recent Assets">
              <AssetsTableWidget />
            </WidgetContainer>

            {/* Row 5: Full-width table (4x1) */}
            <WidgetContainer span={4} title="Asset Inventory">
              <AssetsTableWidget />
            </WidgetContainer>
          </WidgetGrid>
        </main>
      </div>

      <style jsx>{`
        .dashboard-floorplan {
          min-height: 100vh;
          background: var(--bg-page);
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
          padding: var(--offset-xx-large);
        }

        /* Chart container fills widget */
        .chart-fill {
          width: 100%;
          height: 180px;
        }

        /* Grid container fills widget */
        .grid-fill {
          width: 100%;
          height: 100%;
          min-height: 180px;
        }

        /* Gauge chart with centered label */
        .gauge-container {
          position: relative;
          width: 100%;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gauge-chart {
          width: 140px;
          height: 140px;
        }

        .gauge-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--font-size-display-s);
          font-weight: var(--weight-bold);
          color: var(--text-heading);
        }

        /* Health stats vertical stack */
        .health-stats {
          display: flex;
          flex-direction: column;
          gap: var(--offset-large);
          padding: var(--offset-small) 0;
        }

        /* AG Grid theme overrides */
        :global(.ag-theme-alpine) {
          --ag-font-family: var(--family-font-family-default);
          --ag-font-size: 13px;
          --ag-header-background-color: var(--bg-table-header);
          --ag-odd-row-background-color: transparent;
          --ag-row-hover-color: var(--bg-card-hover);
          --ag-border-color: var(--border-card);
        }
      `}</style>
    </div>
  );
};

export default DashboardFloorplan;

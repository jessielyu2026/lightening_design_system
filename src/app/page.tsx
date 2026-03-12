"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionGroup,
  AccordionPanel,
  Badge,
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DatePicker,
  Header,
  OptionCard,
  OptionCardGroup,
  SearchInput,
  SideNav,
  SideNavDivider,
  SideNavFooter,
  SideNavItem,
  SideNavSection,
  SideNavSubItem,
  Status,
  TextField,
  VideoBanner,
  WidgetContainer,
  WidgetStat,
} from "@/design-system";
// Navigation item types
type NavItem = {
  id: string;
  label: string;
  type: "component" | "floorplan" | "foundation";
  href?: string;
};

const FOUNDATIONS: NavItem[] = [
  { id: "colors", label: "Colors", type: "foundation" },
];

const COMPONENTS: NavItem[] = [
  { id: "accordion", label: "Accordion", type: "component" },
  { id: "badge", label: "Badge", type: "component" },
  { id: "breadcrumb", label: "Breadcrumb", type: "component" },
  { id: "button", label: "Button", type: "component" },
  { id: "card", label: "Card", type: "component" },
  { id: "datepicker", label: "DatePicker", type: "component" },
  { id: "header", label: "Header", type: "component" },
  { id: "optioncard", label: "OptionCard", type: "component" },
  { id: "searchinput", label: "SearchInput", type: "component" },
  { id: "sidenav", label: "SideNav", type: "component" },
  { id: "status", label: "Status", type: "component" },
  { id: "textfield", label: "TextField", type: "component" },
  { id: "videobanner", label: "VideoBanner", type: "component" },
  { id: "widget", label: "WidgetContainer", type: "component" },
];

const FLOORPLANS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", type: "floorplan", href: "/dashboard" },
];

// Icons
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 8L8 3L13.5 8M4 6.75V13C4 13.2761 4.22386 13.5 4.5 13.5H6.5V10.5C6.5 10.2239 6.72386 10 7 10H9C9.27614 10 9.5 10.2239 9.5 10.5V13.5H11.5C11.7761 13.5 12 13.2761 12 13V6.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ComponentsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2H6V6H2V2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 2H14V6H10V2Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 10H6V14H2V10Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10H14V14H10V10Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LayoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M6 2V14" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M6 5H14" stroke="currentColor" strokeWidth="1.25"/>
  </svg>
);

const PaletteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 9.5 2.5 10.5 3.5 11C4.5 11.5 5 12 5 13C5 13.5523 5.44772 14 6 14H8Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="5.5" cy="6.5" r="1" fill="currentColor"/>
    <circle cx="8" cy="5" r="1" fill="currentColor"/>
    <circle cx="10.5" cy="6.5" r="1" fill="currentColor"/>
    <circle cx="11" cy="9" r="1" fill="currentColor"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

// Demo row for showing variants
function DemoRow({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="demo-row">
      {label && <span className="demo-row__label">{label}</span>}
      <div className="demo-row__content">{children}</div>
    </div>
  );
}

// Component demos
function ButtonDemo() {
  return (
    <>
      <DemoRow label="Primary">
        <Button variant="primary">Solid</Button>
        <Button variant="primary-outlined">Outlined</Button>
        <Button variant="primary-ghost">Ghost</Button>
      </DemoRow>
      <DemoRow label="Secondary">
        <Button variant="secondary">Solid</Button>
        <Button variant="secondary-outlined">Outlined</Button>
        <Button variant="secondary-ghost">Ghost</Button>
      </DemoRow>
      <DemoRow label="Sizes">
        <Button size="xxs">XXS</Button>
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">XL</Button>
      </DemoRow>
      <DemoRow label="With Icons">
        <Button leftIcon={<PlusIcon />}>Left Icon</Button>
        <Button rightIcon={<ArrowRightIcon />}>Right Icon</Button>
        <Button leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>Both Icons</Button>
      </DemoRow>
      <DemoRow label="Icon Only">
        <Button size="xxs" iconOnly leftIcon={<PlusIcon />} />
        <Button size="xs" iconOnly leftIcon={<PlusIcon />} />
        <Button size="sm" iconOnly leftIcon={<PlusIcon />} />
        <Button size="md" iconOnly leftIcon={<PlusIcon />} />
        <Button size="lg" iconOnly leftIcon={<PlusIcon />} />
        <Button size="xl" iconOnly leftIcon={<PlusIcon />} />
      </DemoRow>
      <DemoRow label="States">
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </DemoRow>
      <DemoRow label="Secondary States">
        <Button variant="secondary">Default</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="secondary" loading>Loading</Button>
      </DemoRow>
    </>
  );
}

function TextFieldDemo() {
  const [value, setValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");

  return (
    <>
      <DemoRow label="Default">
        <div style={{ width: '300px' }}>
          <TextField
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChange={setValue}
          />
        </div>
      </DemoRow>
      <DemoRow label="With Helper Text">
        <div style={{ width: '300px' }}>
          <TextField
            label="Username"
            placeholder="Choose a username"
            helperText="This will be your public display name"
          />
        </div>
      </DemoRow>
      <DemoRow label="Validation States">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '220px' }}>
            <TextField
              label="Error"
              placeholder="Enter value"
              type="error"
              helperText="This field has an error"
              defaultValue="Invalid"
            />
          </div>
          <div style={{ width: '220px' }}>
            <TextField
              label="Validated"
              placeholder="Enter value"
              type="validated"
              helperText="This field is valid"
              defaultValue="Correct"
            />
          </div>
          <div style={{ width: '220px' }}>
            <TextField
              label="Warning"
              placeholder="Enter value"
              type="warning"
              helperText="Check this field"
              defaultValue="Review"
            />
          </div>
        </div>
      </DemoRow>
      <DemoRow label="Textarea (Long)">
        <div style={{ width: '400px' }}>
          <TextField
            label="Description"
            placeholder="Enter a detailed description..."
            size="long"
            value={textareaValue}
            onChange={setTextareaValue}
            maxLength={200}
            showCharCount
            helperText="Describe your project in detail"
          />
        </div>
      </DemoRow>
      <DemoRow label="Horizontal">
        <div style={{ width: '450px' }}>
          <TextField
            label="Full Name"
            placeholder="Enter your full name"
            orientation="horizontal"
          />
        </div>
      </DemoRow>
      <DemoRow label="Required + Disabled">
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '220px' }}>
            <TextField
              label="Required Field"
              placeholder="This is required"
              required
            />
          </div>
          <div style={{ width: '220px' }}>
            <TextField
              label="Disabled Field"
              placeholder="Cannot edit"
              disabled
              defaultValue="Read only value"
            />
          </div>
        </div>
      </DemoRow>
    </>
  );
}

function BadgeDemo() {
  return (
    <>
      <DemoRow label="Status">
        <Badge variant="new">New</Badge>
        <Badge variant="created">Created</Badge>
        <Badge variant="updated">Updated</Badge>
        <Badge variant="deleted">Deleted</Badge>
        <Badge variant="disabled">Disabled</Badge>
      </DemoRow>
      <DemoRow label="Severity">
        <Badge variant="low">Low</Badge>
        <Badge variant="medium">Medium</Badge>
        <Badge variant="high">High</Badge>
        <Badge variant="critical">Critical</Badge>
      </DemoRow>
      <DemoRow label="Info">
        <Badge variant="info">Info</Badge>
        <Badge variant="info-light">Info</Badge>
        <Badge variant="preview">Preview</Badge>
      </DemoRow>
      <DemoRow label="Other">
        <Badge variant="beta">Beta</Badge>
        <Badge variant="recommended">Recommended</Badge>
        <Badge variant="draft">Draft</Badge>
        <Badge variant="extrascope">Extrascope</Badge>
        <Badge variant="gray">Any</Badge>
      </DemoRow>
    </>
  );
}

function StatusDemo() {
  return (
    <>
      <DemoRow label="All Variants">
        <Status status="enabled" />
        <Status status="disabled" />
        <Status status="success" />
        <Status status="fail" />
        <Status status="error" />
        <Status status="warning" />
      </DemoRow>
      <DemoRow label="Positive">
        <Status status="enabled" />
        <Status status="success" />
      </DemoRow>
      <DemoRow label="Negative">
        <Status status="disabled" />
        <Status status="fail" />
        <Status status="error" />
      </DemoRow>
      <DemoRow label="Caution">
        <Status status="warning" />
      </DemoRow>
    </>
  );
}

function CardDemo() {
  return (
    <div className="demo-cards">
      <Card>
        <CardHeader><h3>Card Title</h3></CardHeader>
        <CardBody><p>This is the card body content. Cards are useful for grouping related information.</p></CardBody>
        <CardFooter>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardBody>
          <h3 style={{ margin: "0 0 8px 0" }}>Simple Card</h3>
          <p style={{ margin: 0, color: "var(--text-secondary)" }}>A card with just a body section.</p>
        </CardBody>
      </Card>
    </div>
  );
}

function BreadcrumbDemo() {
  return (
    <>
      <DemoRow label="With Icons">
        <Breadcrumb items={[
          { label: "Home", href: "#", icon: <HomeIcon /> },
          { label: "Products", href: "#" },
          { label: "Category" },
        ]} />
      </DemoRow>
      <DemoRow label="Text Only">
        <Breadcrumb items={[
          { label: "Dashboard", href: "#" },
          { label: "Settings", href: "#" },
          { label: "Profile" },
        ]} />
      </DemoRow>
    </>
  );
}

function SearchInputDemo() {
  return (
    <>
      <DemoRow label="Default">
        <SearchInput placeholder="Search components..." />
      </DemoRow>
      <DemoRow label="With Callback">
        <SearchInput placeholder="Press Enter to search" onSearch={(v) => alert(`Searching: ${v}`)} />
      </DemoRow>
    </>
  );
}

function HeaderDemo() {
  return (
    <div className="demo-header-preview">
      <Header
        breadcrumbs={[
          { label: "Home", href: "#", icon: <HomeIcon /> },
          { label: "Components" },
        ]}
        title="Page Title"
        avatar={{ src: "https://i.pravatar.cc/40", alt: "User" }}
        actionButton={{ icon: <PlusIcon />, ariaLabel: "Add new" }}
      />
    </div>
  );
}

function SideNavDemo() {
  return (
    <>
      <DemoRow label="Item Levels">
        <div className="demo-sidenav-items">
          <div className="demo-sidenav-item-group">
            <span className="demo-sidenav-item-label">1st Level</span>
            <SideNav>
              <SideNavSection>
                <SideNavItem icon={<HomeIcon />} level={1}>Default</SideNavItem>
                <SideNavItem icon={<HomeIcon />} level={1} active>Selected</SideNavItem>
              </SideNavSection>
            </SideNav>
          </div>
          <div className="demo-sidenav-item-group">
            <span className="demo-sidenav-item-label">2nd Level</span>
            <SideNav>
              <SideNavSection>
                <SideNavItem icon={<ComponentsIcon />} level={2}>Default</SideNavItem>
                <SideNavItem icon={<ComponentsIcon />} level={2} active>Selected</SideNavItem>
              </SideNavSection>
            </SideNav>
          </div>
          <div className="demo-sidenav-item-group">
            <span className="demo-sidenav-item-label">3rd Level</span>
            <SideNav>
              <SideNavSection>
                <SideNavSubItem>Default</SideNavSubItem>
                <SideNavSubItem active>Selected</SideNavSubItem>
              </SideNavSection>
            </SideNav>
          </div>
        </div>
      </DemoRow>
      <DemoRow label="3rd Level Expandable">
        <div className="demo-sidenav">
          <SideNav logo={<span style={{ fontWeight: 600, fontSize: '16px' }}>Logo</span>}>
            <SideNavSection title="Nested Navigation">
              <SideNavItem icon={<ComponentsIcon />} level={1} expandable defaultExpanded>
                Settings
                <SideNavSubItem expandable defaultExpanded>
                  Account
                  <SideNavSubItem active>Profile</SideNavSubItem>
                  <SideNavSubItem>Preferences</SideNavSubItem>
                </SideNavSubItem>
                <SideNavSubItem>Security</SideNavSubItem>
              </SideNavItem>
            </SideNavSection>
          </SideNav>
        </div>
      </DemoRow>
      <DemoRow label="Full Example">
        <div className="demo-sidenav">
          <SideNav logo={<span style={{ fontWeight: 600, fontSize: '16px' }}>Logo</span>}>
            <SideNavSection title="Main">
              <SideNavItem icon={<HomeIcon />} level={1} active>Dashboard</SideNavItem>
              <SideNavItem icon={<ComponentsIcon />} level={1}>Components</SideNavItem>
            </SideNavSection>
            <SideNavDivider />
            <SideNavSection title="Settings" collapsible defaultExpanded>
              <SideNavItem icon={<ComponentsIcon />} level={1} expandable defaultExpanded>
                Account
                <SideNavSubItem active>Profile</SideNavSubItem>
                <SideNavSubItem>Security</SideNavSubItem>
              </SideNavItem>
            </SideNavSection>
            <SideNavFooter>
              <SideNavItem icon={<ComponentsIcon />} level={1}>Help</SideNavItem>
            </SideNavFooter>
          </SideNav>
        </div>
      </DemoRow>
    </>
  );
}

function WidgetDemo() {
  return (
    <>
      <DemoRow label="Grid Sizes">
        <div className="demo-widgets">
          <WidgetContainer title="1x1 Widget" size="1x1">
            <WidgetStat label="Active Users" value="1,234" change="+12%" changeType="positive" />
          </WidgetContainer>
          <WidgetContainer title="2x1 Widget" size="2x1">
            <div style={{ display: 'flex', gap: '24px' }}>
              <WidgetStat label="Revenue" value="$45.2K" change="+8.5%" changeType="positive" />
              <WidgetStat label="Orders" value="892" change="-2.3%" changeType="negative" />
            </div>
          </WidgetContainer>
        </div>
      </DemoRow>
      <DemoRow label="Loading State">
        <WidgetContainer title="Loading Widget" size="1x1" loading />
      </DemoRow>
    </>
  );
}

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5C2.5 4.17157 3.17157 3.5 4 3.5H7.17157C7.43679 3.5 7.69114 3.60536 7.87868 3.79289L9.5 5.41421H16C16.8284 5.41421 17.5 6.08579 17.5 6.91421V15C17.5 15.8284 16.8284 16.5 16 16.5H4C3.17157 16.5 2.5 15.8284 2.5 15V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16.0833 10C16.0833 9.58333 16.0417 9.16667 15.9583 8.79167L17.5 7.58333L16.25 5.41667L14.375 5.95833C13.875 5.5 13.2917 5.125 12.625 4.875L12.2917 2.91667H9.70833L9.375 4.875C8.70833 5.125 8.125 5.5 7.625 5.95833L5.75 5.41667L4.5 7.58333L6.04167 8.79167C5.95833 9.16667 5.91667 9.58333 5.91667 10C5.91667 10.4167 5.95833 10.8333 6.04167 11.2083L4.5 12.4167L5.75 14.5833L7.625 14.0417C8.125 14.5 8.70833 14.875 9.375 15.125L9.70833 17.0833H12.2917L12.625 15.125C13.2917 14.875 13.875 14.5 14.375 14.0417L16.25 14.5833L17.5 12.4167L15.9583 11.2083C16.0417 10.8333 16.0833 10.4167 16.0833 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function AccordionDemo() {
  const accordionItems = [
    {
      id: 'item-1',
      title: 'Getting Started',
      content: 'Learn how to set up and configure your development environment. This section covers installation, basic configuration, and your first steps.',
      counter: 3,
      icon: <FolderIcon />,
    },
    {
      id: 'item-2',
      title: 'Configuration',
      content: 'Explore advanced configuration options to customize the behavior of your application. Includes settings for themes, localization, and more.',
      counter: 5,
      icon: <SettingsIcon />,
    },
    {
      id: 'item-3',
      title: 'API Reference',
      content: 'Comprehensive API documentation with examples, type definitions, and best practices for integrating with external services.',
      defaultExpanded: true,
    },
  ];

  return (
    <>
      <DemoRow label="With Items Array">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Accordion items={accordionItems} />
        </div>
      </DemoRow>
      <DemoRow label="Allow Multiple">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Accordion items={accordionItems} allowMultiple />
        </div>
      </DemoRow>
      <DemoRow label="Using AccordionGroup">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <AccordionGroup>
            <AccordionPanel title="Panel 1" counter={2}>
              This is the content for panel 1. It can contain any React content.
            </AccordionPanel>
            <AccordionPanel title="Panel 2" icon={<FolderIcon />} defaultExpanded>
              This panel is expanded by default and has an icon.
            </AccordionPanel>
            <AccordionPanel title="Panel 3">
              Simple panel without icon or counter.
            </AccordionPanel>
          </AccordionGroup>
        </div>
      </DemoRow>
    </>
  );
}

function VideoBannerDemo() {
  return (
    <>
      <DemoRow label="Default">
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <VideoBanner
            header="Learn More about Insights"
            description="Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            buttonText="Learn More"
            videoDuration="0:52"
            onButtonClick={() => alert('Learn More clicked')}
            onVideoClick={() => alert('Video clicked')}
          />
        </div>
      </DemoRow>
      <DemoRow label="Custom Content">
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <VideoBanner
            header="Getting Started with Components"
            description="Watch this quick tutorial to learn how to use our design system components effectively in your projects."
            buttonText="View Tutorial"
            videoDuration="3:24"
          />
        </div>
      </DemoRow>
    </>
  );
}

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 14C8 14 13 11.5 13 7.5V3.5L8 2L3 3.5V7.5C3 11.5 8 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloudIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 12.5H11C12.6569 12.5 14 11.1569 14 9.5C14 7.84315 12.6569 6.5 11 6.5C11 4.29086 9.20914 2.5 7 2.5C4.79086 2.5 3 4.29086 3 6.5C3 6.5 2 6.5 2 8.5C2 10.5 3.5 12.5 4.5 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 10.5L5.5 6.5M5 11L3 13M11 5L13 3M6.5 12.5C5.67157 12.5 5 11.8284 5 11V10.5L3 12L4 14L5.5 12H6C6.82843 12 7.5 12.6716 7.5 13.5M9.5 3.5C9.5 4.32843 10.1716 5 11 5H11.5L10 7L8 6L10 4.5V4C10 3.17157 9.32843 2.5 8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function OptionCardDemo() {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [selectedRadio, setSelectedRadio] = useState<string | null>('option1');

  return (
    <>
      <DemoRow label="Checkbox Style">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <OptionCardGroup>
            <OptionCard
              title="Basic Plan"
              description="Perfect for individuals and small projects"
              icon={<ShieldIcon />}
              selected={selectedCheckbox === 'basic'}
              selectionType="checkbox"
              onChange={() => setSelectedCheckbox(selectedCheckbox === 'basic' ? null : 'basic')}
            />
            <OptionCard
              title="Pro Plan"
              description="Advanced features for growing teams"
              icon={<CloudIcon />}
              selected={selectedCheckbox === 'pro'}
              selectionType="checkbox"
              onChange={() => setSelectedCheckbox(selectedCheckbox === 'pro' ? null : 'pro')}
            />
            <OptionCard
              title="Enterprise Plan"
              description="Custom solutions for large organizations"
              icon={<RocketIcon />}
              selected={selectedCheckbox === 'enterprise'}
              selectionType="checkbox"
              onChange={() => setSelectedCheckbox(selectedCheckbox === 'enterprise' ? null : 'enterprise')}
            />
          </OptionCardGroup>
        </div>
      </DemoRow>
      <DemoRow label="Radio Style">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <OptionCardGroup>
            <OptionCard
              title="Option One"
              description="This is the first option you can select"
              selectionType="radio"
              selected={selectedRadio === 'option1'}
              onChange={() => setSelectedRadio('option1')}
            />
            <OptionCard
              title="Option Two"
              description="This is the second option available"
              selectionType="radio"
              selected={selectedRadio === 'option2'}
              onChange={() => setSelectedRadio('option2')}
            />
          </OptionCardGroup>
        </div>
      </DemoRow>
      <DemoRow label="States">
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <OptionCardGroup>
            <OptionCard
              title="Default State"
              description="This card is in its default state"
            />
            <OptionCard
              title="Selected State"
              description="This card is selected"
              selected
            />
            <OptionCard
              title="Disabled State"
              description="This card is disabled"
              disabled
            />
            <OptionCard
              title="Disabled + Selected"
              description="This card is both disabled and selected"
              selected
              disabled
            />
          </OptionCardGroup>
        </div>
      </DemoRow>
    </>
  );
}

function DatePickerDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(new Date());

  return (
    <>
      <DemoRow label="Default">
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </DemoRow>
      <DemoRow label="With Time Picker">
        <DatePicker
          value={selectedDateTime}
          onChange={setSelectedDateTime}
          showTimePicker
        />
      </DemoRow>
      <DemoRow label="Selected Date">
        <div style={{ fontSize: '14px', color: 'var(--lightning-bluegray-700)' }}>
          {selectedDate ? selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'No date selected'}
        </div>
      </DemoRow>
    </>
  );
}

// Color palette data
const COLOR_PALETTES = [
  { name: "Gray", prefix: "gray", shades: ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Blue", prefix: "blue", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] },
  { name: "Sky", prefix: "sky", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Cyan", prefix: "cyan", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Teal", prefix: "teal", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Green", prefix: "green", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Olive", prefix: "olive", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Yellow", prefix: "yellow", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Orange", prefix: "orange", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Red", prefix: "red", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Rose", prefix: "rose", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Magenta", prefix: "magenta", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Purple", prefix: "purple", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Violet", prefix: "violet", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Wisteria", prefix: "wisteria", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Indigo", prefix: "indigo", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "BlueGray", prefix: "bluegray", shades: ["25", "50", "75", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
];

function ColorSwatch({ colorVar, shade }: { colorVar: string; shade: string }) {
  const isDark = parseInt(shade) >= 500;
  return (
    <div className="color-swatch" style={{ backgroundColor: `var(${colorVar})` }}>
      <span className="color-swatch__label" style={{ color: isDark ? "#fff" : "#1d2024" }}>
        {shade}
      </span>
    </div>
  );
}

function ColorPaletteDemo() {
  return (
    <div className="color-palettes">
      {COLOR_PALETTES.map((palette) => (
        <div key={palette.prefix} className="color-palette">
          <h3 className="color-palette__name">{palette.name}</h3>
          <div className="color-palette__swatches">
            {palette.shades.map((shade) => (
              <ColorSwatch
                key={shade}
                colorVar={`--lightning-${palette.prefix}-${shade}`}
                shade={shade}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="color-palette">
        <h3 className="color-palette__name">Contrast</h3>
        <div className="color-palette__swatches">
          <div className="color-swatch color-swatch--bordered" style={{ backgroundColor: "var(--lightning-contrast-white)" }}>
            <span className="color-swatch__label" style={{ color: "#1d2024" }}>White</span>
          </div>
          <div className="color-swatch" style={{ backgroundColor: "var(--lightning-contrast-black)" }}>
            <span className="color-swatch__label" style={{ color: "#fff" }}>Black</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Render content based on selected item
function renderContent(selectedId: string) {
  switch (selectedId) {
    case "colors": return <ColorPaletteDemo />;
    case "button": return <ButtonDemo />;
    case "textfield": return <TextFieldDemo />;
    case "badge": return <BadgeDemo />;
    case "status": return <StatusDemo />;
    case "card": return <CardDemo />;
    case "optioncard": return <OptionCardDemo />;
    case "datepicker": return <DatePickerDemo />;
    case "accordion": return <AccordionDemo />;
    case "videobanner": return <VideoBannerDemo />;
    case "breadcrumb": return <BreadcrumbDemo />;
    case "searchinput": return <SearchInputDemo />;
    case "header": return <HeaderDemo />;
    case "sidenav": return <SideNavDemo />;
    case "widget": return <WidgetDemo />;
    default: return <ButtonDemo />;
  }
}

function getItemLabel(id: string): string {
  const item = [...FOUNDATIONS, ...COMPONENTS, ...FLOORPLANS].find(i => i.id === id);
  return item?.label || "Button";
}

function getItemType(id: string): "component" | "floorplan" | "foundation" {
  const item = [...FOUNDATIONS, ...COMPONENTS, ...FLOORPLANS].find(i => i.id === id);
  return item?.type || "component";
}

export default function ComponentLibrary() {
  const [selectedId, setSelectedId] = useState("button");
  const [sideNavCollapsed, setSideNavCollapsed] = useState(false);

  const selectedLabel = getItemLabel(selectedId);
  const selectedType = getItemType(selectedId);

  return (
    <div className="library-layout">
      {/* SideNav */}
      <SideNav
        collapsed={sideNavCollapsed}
        onToggleCollapse={() => setSideNavCollapsed(!sideNavCollapsed)}
        logo={<LogoIcon />}
      >
        <SideNavSection title="Foundation" collapsible defaultExpanded>
          {FOUNDATIONS.map((item) => (
            <SideNavItem
              key={item.id}
              icon={<PaletteIcon />}
              level={1}
              active={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
            >
              {item.label}
            </SideNavItem>
          ))}
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Components" collapsible defaultExpanded>
          {COMPONENTS.map((item) => (
            <SideNavItem
              key={item.id}
              icon={<ComponentsIcon />}
              level={1}
              active={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
            >
              {item.label}
            </SideNavItem>
          ))}
        </SideNavSection>

        <SideNavDivider />

        <SideNavSection title="Floorplans" collapsible defaultExpanded>
          {FLOORPLANS.map((item) => (
            <SideNavItem
              key={item.id}
              icon={<LayoutIcon />}
              level={1}
              onClick={() => item.href && window.open(item.href, '_blank')}
            >
              {item.label}
            </SideNavItem>
          ))}
        </SideNavSection>
      </SideNav>

      {/* Main Content Area */}
      <div className="library-main">
        {/* Header */}
        <Header
          breadcrumbs={[
            { label: "Design System", href: "#", icon: <HomeIcon /> },
            { label: selectedType === "floorplan" ? "Floorplans" : selectedType === "foundation" ? "Foundation" : "Components" },
            { label: selectedLabel },
          ]}
          title={selectedLabel}
          avatar={{ src: "https://i.pravatar.cc/40", alt: "User" }}
          sticky
        />

        {/* Content */}
        <main className="library-content">
          <div className="component-demo">
            {renderContent(selectedId)}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .library-layout {
          min-height: 100vh;
          background: var(--bg-page, #f6f8f9);
        }

        .library-main {
          display: flex;
          flex-direction: column;
          height: 100vh;
          margin-left: ${sideNavCollapsed ? '64px' : '220px'};
          transition: margin-left 0.2s ease;
          overflow-y: auto;
        }

        .library-content {
          flex: 1;
          padding: 32px;
        }

        .component-demo {
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1000px;
        }

        .demo-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .demo-row__label {
          min-width: 120px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary, #63788f);
          padding-top: 10px;
        }

        .demo-row__content {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .demo-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .demo-widgets {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .demo-header-preview {
          border: 1px solid var(--border-divider, #e6e8eb);
          border-radius: 8px;
          overflow: hidden;
        }

        .demo-sidenav {
          height: 350px;
          width: 220px;
          border: 1px solid var(--border-divider, #e6e8eb);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        /* Override fixed positioning for demo SideNavs */
        .demo-sidenav .ds-sidenav {
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 1;
        }

        .demo-sidenav-items {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .demo-sidenav-item-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .demo-sidenav-item-label {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .demo-sidenav-item-group .ds-sidenav {
          position: relative;
          width: 200px;
          height: auto;
          border: 1px solid var(--border-divider);
          border-radius: 8px;
          z-index: 1;
        }

        /* Color Palette Styles */
        .color-palettes {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .color-palette {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .color-palette__name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .color-palette__swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .color-swatch {
          width: 64px;
          height: 48px;
          border-radius: 6px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 6px;
        }

        .color-swatch--bordered {
          border: 1px solid var(--border-divider);
        }

        .color-swatch__label {
          font-size: 11px;
          font-weight: 500;
          font-family: var(--family-font-family-number, monospace);
        }

        @media (max-width: 768px) {
          .demo-row {
            flex-direction: column;
            gap: 8px;
          }

          .demo-row__label {
            min-width: auto;
            padding-top: 0;
          }

          .library-content {
            padding: 16px;
          }

          .color-swatch {
            width: 48px;
            height: 40px;
          }

          .color-swatch__label {
            font-size: 9px;
          }
        }
      `}</style>
    </div>
  );
}

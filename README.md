# Design System

A modern React component library built with Lightning design tokens.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the component preview.

## Components

| Component | Description |
|-----------|-------------|
| Button | Primary, outline, ghost variants with 5 sizes and icon support |
| TextField | Text input with label, description, and error states |
| Card | Composable card with header, body, and footer |
| Tag | Status indicators in neutral, success, warning, error |
| Header | Page header with breadcrumbs, search, avatar, and actions |
| Breadcrumb | Navigation breadcrumb trail |
| SearchInput | Search field with keyboard shortcut indicator |
| SideNav | Collapsible sidebar navigation with 3-level items |
| WidgetContainer | Dashboard widget wrapper with grid layout |

## Floorplans

| Floorplan | Description |
|-----------|-------------|
| DashboardFloorplan | Standard dashboard layout with SideNav, Header, and widget grid |

## Usage

```tsx
import { Button, Card, CardBody, Tag } from "@/design-system";

export default function Example() {
  return (
    <Card>
      <CardBody>
        <Tag variant="success">Active</Tag>
        <Button variant="primary">Get Started</Button>
      </CardBody>
    </Card>
  );
}
```

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Design tokens & global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Component library viewer
├── design-system/
│   ├── components/       # React components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Header/
│   │   ├── SideNav/
│   │   ├── Tag/
│   │   ├── TextField/
│   │   └── WidgetContainer/
│   ├── component-map.md  # Component reference
│   └── index.ts          # Barrel exports
└── floorplans/
    ├── DashboardFloorplan.tsx  # Dashboard page skeleton
    └── index.ts
```

## Design Tokens

All design tokens are defined in `src/app/globals.css` as CSS custom properties:

- **Spacing**: `--offset-*` (xx-small to xxxx-large)
- **Typography**: `--font-size-*`, `--weight-*`, `--family-*`
- **Colors**: `--lightning-*` (blue, gray, green, red, etc.)
- **Border Radius**: `--radius-*` (sm, md, lg, round)

## License

MIT

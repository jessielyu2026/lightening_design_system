# Component Reference

**Import path:** `@/design-system`

## Button
```tsx
import { Button } from "@/design-system"
```
| Prop | Type | Default |
|------|------|---------|
| variant | `'primary' \| 'outline' \| 'ghost'` | `'primary'` |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| as | `'button' \| 'a'` | `'button'` |
| href | `string` | - |
| leftIcon | `ReactNode` | - |
| rightIcon | `ReactNode` | - |
| iconOnly | `boolean` | `false` |
| disabled | `boolean` | `false` |
| loading | `boolean` | `false` |

### Size Reference
| Size | Height |
|------|--------|
| xs | 28px |
| sm | 32px |
| md | 36px |
| lg | 40px |
| xl | 44px |

## TextField
```tsx
import { TextField } from "@/design-system"
```
| Prop | Type | Default |
|------|------|---------|
| label | `string` | - |
| description | `string` | - |
| error | `string` | - |
| value | `string` | - |
| placeholder | `string` | - |
| onChange | `(value: string) => void` | - |

## Card
```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/design-system"
```
Composable card with optional header, body, and footer sections.

## Tag
```tsx
import { Tag } from "@/design-system"
```
| Prop | Type | Default |
|------|------|---------|
| variant | `'neutral' \| 'success' \| 'warning' \| 'error'` | `'neutral'` |
| size | `'sm' \| 'md'` | `'md'` |

## Header
```tsx
import { Header, Breadcrumb, SearchInput } from "@/design-system"
```
### Header
| Prop | Type | Default |
|------|------|---------|
| breadcrumbs | `BreadcrumbItem[]` | - |
| title | `string` | - |
| searchPlaceholder | `string` | `'Search'` |
| onSearch | `(value: string) => void` | - |
| avatar | `{ src: string; alt?: string }` | - |
| actionButton | `{ icon: ReactNode; onClick?: () => void; ariaLabel?: string }` | - |
| sticky | `boolean` | `false` |

### Breadcrumb
| Prop | Type | Default |
|------|------|---------|
| items | `{ label: string; href?: string; icon?: ReactNode }[]` | required |

### SearchInput
| Prop | Type | Default |
|------|------|---------|
| placeholder | `string` | `'Search'` |
| onSearch | `(value: string) => void` | - |

## SideNav
```tsx
import { SideNav, SideNavSection, SideNavItem, SideNavSubItem, SideNavDivider, SideNavFooter } from "@/design-system"
```
| Component | Key Props |
|-----------|-----------|
| SideNav | `collapsed?`, `logo?`, `onToggleCollapse?`, `className?` |
| SideNavSection | `title?`, `collapsible?`, `defaultExpanded?` |
| SideNavItem | `href?`, `icon?`, `badge?`, `active?`, `disabled?`, `expandable?`, `expanded?`, `defaultExpanded?`, `level?`, `onClick?` |
| SideNavSubItem | `href?`, `active?`, `badge?`, `onClick?` |
| SideNavDivider | - |
| SideNavFooter | - |

### Item Levels
SideNavItem supports 3 levels with different visual styles:
- **Level 1** (default): padding 8px, for top-level navigation items
- **Level 2**: padding-left 20px, for nested items with icons
- **Level 3**: padding-left 28px, rarely used directly (prefer SideNavSubItem)

SideNavSubItem renders as 3rd-level items with tree branch connectors.

## WidgetContainer
```tsx
import { WidgetContainer, WidgetStat, WidgetGrid } from "@/design-system"
```
### WidgetContainer
| Prop | Type | Default |
|------|------|---------|
| title | `string` | - |
| size | `'1x1' \| '2x1' \| '3x1' \| '4x1' \| '2x2'` | `'1x1'` |
| loading | `boolean` | `false` |

Grid sizes: 1x1 (286×280), 2x1 (584×280), 3x1 (752×280), 4x1 (1180×280), 2x2 (584×572)

### WidgetStat
| Prop | Type | Default |
|------|------|---------|
| label | `string` | required |
| value | `string \| number` | required |
| change | `string` | - |
| changeType | `'positive' \| 'negative' \| 'neutral'` | `'neutral'` |
| icon | `ReactNode` | - |

### WidgetGrid
| Prop | Type | Default |
|------|------|---------|
| columns | `1 \| 2 \| 3 \| 4` | `2` |
| gap | `'sm' \| 'md' \| 'lg'` | `'md'` |

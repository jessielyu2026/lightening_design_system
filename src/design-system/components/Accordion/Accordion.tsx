import React, { useState, createContext, useContext } from 'react';
import './accordion.css';

// Chevron Icon
const ChevronIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Single Accordion Component (controlled/uncontrolled)
type AccordionProps = React.PropsWithChildren<{
  title: string;
  counter?: number;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  disabled?: boolean;
  className?: string;
}>;

export const Accordion: React.FC<AccordionProps> = ({
  title,
  counter,
  icon,
  badge,
  actions,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  disabled = false,
  className = '',
  children,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (disabled) return;

    const newExpanded = !expanded;
    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }
    onToggle?.(newExpanded);
  };

  const itemClasses = [
    'ds-accordion__item',
    expanded ? 'ds-accordion__item--expanded' : '',
    disabled ? 'ds-accordion__item--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClasses}>
      <button
        className="ds-accordion__header"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-disabled={disabled}
        disabled={disabled}
        type="button"
      >
        <span className={`ds-accordion__chevron ${expanded ? 'ds-accordion__chevron--expanded' : ''}`}>
          <ChevronIcon />
        </span>
        <div className="ds-accordion__title-group">
          {icon && <span className="ds-accordion__icon">{icon}</span>}
          <span className="ds-accordion__title">{title}</span>
          {counter !== undefined && (
            <span className="ds-accordion__counter">{counter}</span>
          )}
          {badge && <span className="ds-accordion__badge">{badge}</span>}
        </div>
        {actions && (
          <div className="ds-accordion__actions" onClick={(e) => e.stopPropagation()}>
            {actions}
          </div>
        )}
      </button>
      <div
        className="ds-accordion__content"
        style={{ display: expanded ? 'block' : 'none' }}
        aria-hidden={!expanded}
      >
        {children}
      </div>
    </div>
  );
};

// AccordionGroup Context for managing multiple accordions
type AccordionGroupContextType = {
  expandedIds: Set<string>;
  toggleId: (id: string) => void;
  registerAccordion: (id: string, defaultExpanded: boolean) => void;
};

const AccordionGroupContext = createContext<AccordionGroupContextType | null>(null);

// AccordionGroup Component - manages multiple Accordions
type AccordionGroupProps = React.PropsWithChildren<{
  allowMultiple?: boolean;
  defaultExpandedIds?: string[];
  className?: string;
}>;

export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  allowMultiple = false,
  defaultExpandedIds = [],
  className = '',
  children,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  );

  const toggleId = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  const registerAccordion = (id: string, defaultExpanded: boolean) => {
    if (defaultExpanded && !expandedIds.has(id)) {
      setExpandedIds(prev => {
        const next = new Set(prev);
        if (!allowMultiple) {
          next.clear();
        }
        next.add(id);
        return next;
      });
    }
  };

  const classes = ['ds-accordion', className].filter(Boolean).join(' ');

  return (
    <AccordionGroupContext.Provider value={{ expandedIds, toggleId, registerAccordion }}>
      <div className={classes}>{children}</div>
    </AccordionGroupContext.Provider>
  );
};

// AccordionGroupItem - Accordion that participates in AccordionGroup
type AccordionGroupItemProps = React.PropsWithChildren<{
  id: string;
  title: string;
  counter?: number;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
  className?: string;
}>;

export const AccordionGroupItem: React.FC<AccordionGroupItemProps> = ({
  id,
  title,
  counter,
  icon,
  badge,
  actions,
  defaultExpanded = false,
  disabled = false,
  className = '',
  children,
}) => {
  const context = useContext(AccordionGroupContext);

  if (!context) {
    // If used outside AccordionGroup, behave as standalone Accordion
    return (
      <Accordion
        title={title}
        counter={counter}
        icon={icon}
        badge={badge}
        actions={actions}
        defaultExpanded={defaultExpanded}
        disabled={disabled}
        className={className}
      >
        {children}
      </Accordion>
    );
  }

  const { expandedIds, toggleId } = context;
  const expanded = expandedIds.has(id);

  return (
    <Accordion
      title={title}
      counter={counter}
      icon={icon}
      badge={badge}
      actions={actions}
      expanded={expanded}
      onToggle={() => toggleId(id)}
      disabled={disabled}
      className={className}
    >
      {children}
    </Accordion>
  );
};

// Backward compatibility: AccordionPanel as alias for Accordion
export const AccordionPanel = Accordion;

// Backward compatibility: AccordionItem for controlled usage
type AccordionItemProps = {
  id: string;
  title: string;
  content: React.ReactNode;
  counter?: number;
  icon?: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  counter,
  icon,
  expanded,
  onToggle,
}) => {
  return (
    <Accordion
      title={title}
      counter={counter}
      icon={icon}
      expanded={expanded}
      onToggle={() => onToggle()}
    >
      {content}
    </Accordion>
  );
};

// Data-driven Accordion (for backward compatibility)
type AccordionItemData = {
  id: string;
  title: string;
  content: React.ReactNode;
  counter?: number;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
};

type DataAccordionProps = {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
};

export const DataAccordion: React.FC<DataAccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const defaultExpandedIds = items
    .filter(item => item.defaultExpanded)
    .map(item => item.id);

  return (
    <AccordionGroup
      allowMultiple={allowMultiple}
      defaultExpandedIds={defaultExpandedIds}
      className={className}
    >
      {items.map((item) => (
        <AccordionGroupItem
          key={item.id}
          id={item.id}
          title={item.title}
          counter={item.counter}
          icon={item.icon}
        >
          {item.content}
        </AccordionGroupItem>
      ))}
    </AccordionGroup>
  );
};

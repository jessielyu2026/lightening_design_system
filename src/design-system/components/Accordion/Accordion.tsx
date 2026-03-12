import React, { useState } from 'react';
import './accordion.css';

type AccordionItemData = {
  id: string;
  title: string;
  content: React.ReactNode;
  counter?: number;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
};

type AccordionProps = {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    items.forEach(item => {
      if (item.defaultExpanded) {
        initial.add(item.id);
      }
    });
    return initial;
  });

  const toggleItem = (id: string) => {
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

  const classes = ['ds-accordion', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          counter={item.counter}
          icon={item.icon}
          expanded={expandedIds.has(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};

type AccordionItemProps = {
  id: string;
  title: string;
  content: React.ReactNode;
  counter?: number;
  icon?: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
};

const ChevronIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  counter,
  icon,
  expanded,
  onToggle,
}) => {
  const itemClasses = [
    'ds-accordion__item',
    expanded ? 'ds-accordion__item--expanded' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClasses}>
      <button
        className="ds-accordion__header"
        onClick={onToggle}
        aria-expanded={expanded}
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
        </div>
      </button>
      {expanded && (
        <div className="ds-accordion__content">
          {content}
        </div>
      )}
    </div>
  );
};

// Standalone AccordionGroup for simpler use cases
type AccordionGroupProps = React.PropsWithChildren<{
  className?: string;
}>;

export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  children,
  className = '',
}) => {
  const classes = ['ds-accordion', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
};

// Controlled AccordionPanel for use within AccordionGroup
type AccordionPanelProps = React.PropsWithChildren<{
  title: string;
  counter?: number;
  icon?: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: () => void;
  className?: string;
}>;

export const AccordionPanel: React.FC<AccordionPanelProps> = ({
  title,
  counter,
  icon,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  className = '',
  children,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const expanded = controlledExpanded ?? internalExpanded;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!expanded);
    }
  };

  const itemClasses = [
    'ds-accordion__item',
    expanded ? 'ds-accordion__item--expanded' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClasses}>
      <button
        className="ds-accordion__header"
        onClick={handleToggle}
        aria-expanded={expanded}
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
        </div>
      </button>
      {expanded && (
        <div className="ds-accordion__content">
          {children}
        </div>
      )}
    </div>
  );
};

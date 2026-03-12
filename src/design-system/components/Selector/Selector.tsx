import React, { useState, useMemo } from 'react';
import './selector.css';

type SelectorOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  category?: string;
  disabled?: boolean;
  children?: SelectorOption[];
};

type SelectorAction = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
};

type SelectorProps = {
  options: SelectorOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiSelect?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: SelectorAction[];
  showSelectedPills?: boolean;
  showFooter?: boolean;
  onApply?: () => void;
  onClear?: () => void;
  emptyMessage?: string;
  fullWidth?: boolean;
  className?: string;
};

// Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 14L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 2.5L3.75 7.5L1.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const Selector: React.FC<SelectorProps> = ({
  options,
  value = [],
  onChange,
  multiSelect = false,
  searchable = true,
  searchPlaceholder = 'Search',
  actions = [],
  showSelectedPills = true,
  showFooter = false,
  onApply,
  onClear,
  emptyMessage = 'No options found',
  fullWidth = false,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Normalize value to array
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;

    const filterOption = (opt: SelectorOption): SelectorOption | null => {
      const matchesSearch = opt.label.toLowerCase().includes(searchQuery.toLowerCase());
      const filteredChildren = opt.children?.map(filterOption).filter(Boolean) as SelectorOption[] | undefined;

      if (matchesSearch || (filteredChildren && filteredChildren.length > 0)) {
        return { ...opt, children: filteredChildren };
      }
      return null;
    };

    return options.map(filterOption).filter(Boolean) as SelectorOption[];
  }, [options, searchQuery]);

  // Get selected options for pills
  const selectedOptions = useMemo(() => {
    const findOptions = (opts: SelectorOption[]): SelectorOption[] => {
      const result: SelectorOption[] = [];
      for (const opt of opts) {
        if (selectedValues.includes(opt.id)) {
          result.push(opt);
        }
        if (opt.children) {
          result.push(...findOptions(opt.children));
        }
      }
      return result;
    };
    return findOptions(options);
  }, [options, selectedValues]);

  const handleSelect = (optionId: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(optionId)
        ? selectedValues.filter(v => v !== optionId)
        : [...selectedValues, optionId];
      onChange?.(newValues);
    } else {
      onChange?.(optionId);
    }
  };

  const handleToggleExpand = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(optionId)) {
        newSet.delete(optionId);
      } else {
        newSet.add(optionId);
      }
      return newSet;
    });
  };

  const handleRemoveSelected = (optionId: string) => {
    if (multiSelect) {
      onChange?.(selectedValues.filter(v => v !== optionId));
    }
  };

  const handleSelectAll = () => {
    if (multiSelect) {
      const getAllIds = (opts: SelectorOption[]): string[] => {
        const ids: string[] = [];
        for (const opt of opts) {
          if (!opt.disabled) {
            ids.push(opt.id);
          }
          if (opt.children) {
            ids.push(...getAllIds(opt.children));
          }
        }
        return ids;
      };
      const allIds = getAllIds(options);
      const allSelected = allIds.every(id => selectedValues.includes(id));
      onChange?.(allSelected ? [] : allIds);
    }
  };

  const renderOption = (option: SelectorOption, level = 0) => {
    const isSelected = selectedValues.includes(option.id);
    const isExpanded = expandedItems.has(option.id);
    const hasChildren = option.children && option.children.length > 0;

    return (
      <React.Fragment key={option.id}>
        <div
          className={[
            'ds-selector__option',
            level > 0 ? 'ds-selector__option--nested' : '',
            isSelected ? 'ds-selector__option--selected' : '',
            option.disabled ? 'ds-selector__option--disabled' : '',
          ].filter(Boolean).join(' ')}
          style={level > 1 ? { paddingLeft: `${24 + (level - 1) * 16}px` } : undefined}
          onClick={() => !option.disabled && handleSelect(option.id)}
          role="option"
          aria-selected={isSelected}
          aria-disabled={option.disabled}
        >
          {multiSelect && (
            <div className={`ds-selector__checkbox ${isSelected ? 'ds-selector__checkbox--checked' : ''}`}>
              {isSelected && <CheckIcon />}
            </div>
          )}
          {!multiSelect && isSelected && (
            <span className="ds-selector__check">
              <CheckIcon />
            </span>
          )}
          <div className="ds-selector__option-content">
            {option.icon && (
              <span className="ds-selector__option-icon">{option.icon}</span>
            )}
            <span className="ds-selector__option-label">{option.label}</span>
          </div>
          {option.category && (
            <span className="ds-selector__option-meta">{option.category}</span>
          )}
          {hasChildren && (
            <button
              type="button"
              className={`ds-selector__option-expand ${isExpanded ? 'ds-selector__option-expand--expanded' : ''}`}
              onClick={(e) => handleToggleExpand(option.id, e)}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <ChevronIcon />
            </button>
          )}
        </div>
        {hasChildren && isExpanded && option.children!.map(child => renderOption(child, level + 1))}
      </React.Fragment>
    );
  };

  const containerClasses = [
    'ds-selector',
    fullWidth ? 'ds-selector--full-width' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} role="listbox" aria-multiselectable={multiSelect}>
      {/* Search */}
      {searchable && (
        <div className="ds-selector__search">
          {multiSelect && (
            <div
              className={`ds-selector__checkbox ds-selector__search-checkbox ${
                selectedValues.length > 0 && selectedValues.length === options.length
                  ? 'ds-selector__checkbox--checked'
                  : ''
              }`}
              onClick={handleSelectAll}
              role="checkbox"
              aria-checked={selectedValues.length > 0 && selectedValues.length === options.length}
            >
              {selectedValues.length > 0 && selectedValues.length === options.length && <CheckIcon />}
            </div>
          )}
          <div className="ds-selector__search-input">
            <span className="ds-selector__search-icon">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          </div>
        </div>
      )}

      {/* Options */}
      <div className="ds-selector__options">
        <div className="ds-selector__options-inner">
          {/* Actions */}
          {actions.length > 0 && (
            <>
              <div className="ds-selector__actions">
                {actions.map(action => (
                  <div
                    key={action.id}
                    className="ds-selector__action"
                    onClick={action.onClick}
                    role="button"
                  >
                    <span className="ds-selector__action-icon">
                      {action.icon || <PlusIcon />}
                    </span>
                    <span className="ds-selector__action-text">{action.label}</span>
                  </div>
                ))}
              </div>
              <div className="ds-selector__divider" />
            </>
          )}

          {/* Options list */}
          {filteredOptions.length > 0 ? (
            <div className="ds-selector__group">
              {filteredOptions.map(option => renderOption(option))}
            </div>
          ) : (
            <div className="ds-selector__empty">{emptyMessage}</div>
          )}
        </div>
      </div>

      {/* Selected pills (multi-select) */}
      {multiSelect && showSelectedPills && selectedOptions.length > 0 && (
        <div className="ds-selector__selected">
          {selectedOptions.map(option => (
            <div key={option.id} className="ds-selector__selected-pill">
              {option.category && (
                <>
                  <span className="ds-selector__selected-pill-category">{option.category}</span>
                  <span className="ds-selector__selected-pill-separator">:</span>
                </>
              )}
              <span className="ds-selector__selected-pill-value">
                {option.icon && (
                  <span className="ds-selector__selected-pill-icon">{option.icon}</span>
                )}
                <span className="ds-selector__selected-pill-label">{option.label}</span>
              </span>
              <button
                type="button"
                className="ds-selector__selected-pill-close"
                onClick={() => handleRemoveSelected(option.id)}
                aria-label={`Remove ${option.label}`}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {showFooter && (
        <div className="ds-selector__footer">
          <span className="ds-selector__footer-count">
            {selectedValues.length} selected
          </span>
          <div className="ds-selector__footer-actions">
            {onClear && (
              <button
                type="button"
                className="ds-btn ds-btn--primary-ghost ds-btn--xxs"
                onClick={onClear}
              >
                Clear
              </button>
            )}
            {onApply && (
              <button
                type="button"
                className="ds-btn ds-btn--primary ds-btn--xxs"
                onClick={onApply}
              >
                Apply
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export type { SelectorProps, SelectorOption, SelectorAction };

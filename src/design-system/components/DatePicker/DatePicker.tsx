import React, { useState, useMemo } from 'react';
import './datepicker.css';

type DatePickerProps = {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  showTimePicker?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Icons
const ChevronDownIcon = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 8L3.5 5L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Helper functions
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const isSameDay = (date1: Date | null, date2: Date): boolean => {
  if (!date1) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(today, date);
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  showTimePicker = false,
  minDate,
  maxDate,
  disabled = false,
  className = '',
}) => {
  const [viewDate, setViewDate] = useState(() => value || new Date());
  const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days');
  const [time, setTime] = useState(() => {
    if (value) {
      const hours = value.getHours();
      const minutes = value.getMinutes();
      const h = hours % 12 || 12;
      return {
        hours: h.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        period: hours >= 12 ? 'PM' : 'AM' as 'AM' | 'PM',
      };
    }
    return { hours: '12', minutes: '00', period: 'AM' as 'AM' | 'PM' };
  });

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);

    const days: { date: Date; isOutside: boolean; isDisabled: boolean }[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1, daysInPrevMonth - i);
      days.push({
        date,
        isOutside: true,
        isDisabled: isDateDisabled(date, minDate, maxDate),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push({
        date,
        isOutside: false,
        isDisabled: isDateDisabled(date, minDate, maxDate),
      });
    }

    // Next month days (fill to 42 days = 6 weeks)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(currentYear, currentMonth + 1, i);
      days.push({
        date,
        isOutside: true,
        isDisabled: isDateDisabled(date, minDate, maxDate),
      });
    }

    return days;
  }, [currentYear, currentMonth, minDate, maxDate]);

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDayClick = (date: Date, isDisabled: boolean) => {
    if (disabled || isDisabled) return;

    if (showTimePicker) {
      // Combine date with current time
      const hours = time.period === 'PM'
        ? (parseInt(time.hours) % 12) + 12
        : parseInt(time.hours) % 12;
      const newDate = new Date(date);
      newDate.setHours(hours, parseInt(time.minutes));
      onChange?.(newDate);
    } else {
      onChange?.(date);
    }
  };

  const handleTimeChange = (field: 'hours' | 'minutes', value: string) => {
    const numValue = value.replace(/\D/g, '');
    let newValue = numValue;

    if (field === 'hours') {
      const num = parseInt(numValue) || 0;
      newValue = Math.min(Math.max(num, 1), 12).toString().padStart(2, '0');
    } else {
      const num = parseInt(numValue) || 0;
      newValue = Math.min(num, 59).toString().padStart(2, '0');
    }

    setTime(prev => ({ ...prev, [field]: newValue }));
  };

  const togglePeriod = () => {
    setTime(prev => ({
      ...prev,
      period: prev.period === 'AM' ? 'PM' : 'AM',
    }));
  };

  const handleMonthSelect = (month: number) => {
    setViewDate(new Date(currentYear, month, 1));
    setViewMode('days');
  };

  const classes = [
    'ds-datepicker',
    disabled ? 'ds-datepicker--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  // Render weeks as rows
  const weeks: typeof calendarDays[] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className={classes}>
      {/* Header */}
      <div className="ds-datepicker__header">
        <div
          className="ds-datepicker__month-year"
          onClick={() => setViewMode(viewMode === 'days' ? 'months' : 'days')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setViewMode(viewMode === 'days' ? 'months' : 'days');
            }
          }}
        >
          <span className="ds-datepicker__month">{MONTH_NAMES[currentMonth]}</span>
          <span className="ds-datepicker__year">{currentYear}</span>
          <span className="ds-datepicker__dropdown-icon">
            <ChevronDownIcon />
          </span>
        </div>
        <div className="ds-datepicker__controls">
          <button
            type="button"
            className="ds-datepicker__nav-btn"
            onClick={handlePrevMonth}
            aria-label="Previous month"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className="ds-datepicker__nav-btn"
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Calendar */}
      {viewMode === 'days' && (
        <div className="ds-datepicker__calendar">
          {/* Weekday headers */}
          <div className="ds-datepicker__weekdays">
            {WEEKDAY_NAMES.map((day, index) => (
              <div key={index} className="ds-datepicker__weekday">
                {day}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="ds-datepicker__dates">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="ds-datepicker__week">
                {week.map(({ date, isOutside, isDisabled }, dayIndex) => {
                  const isSelected = isSameDay(value || null, date);
                  const isTodayDate = isToday(date);

                  const dayClasses = [
                    'ds-datepicker__day',
                    isOutside ? 'ds-datepicker__day--outside' : '',
                    isSelected ? 'ds-datepicker__day--selected' : '',
                    isTodayDate ? 'ds-datepicker__day--today' : '',
                    isDisabled ? 'ds-datepicker__day--disabled' : '',
                  ].filter(Boolean).join(' ');

                  return (
                    <button
                      key={dayIndex}
                      type="button"
                      className={dayClasses}
                      onClick={() => handleDayClick(date, isDisabled)}
                      disabled={isDisabled}
                      aria-label={date.toLocaleDateString()}
                      aria-selected={isSelected}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Month selector */}
      {viewMode === 'months' && (
        <div className="ds-datepicker__selector">
          {MONTH_NAMES.map((month, index) => (
            <button
              key={month}
              type="button"
              className={`ds-datepicker__selector-item ${
                index === currentMonth ? 'ds-datepicker__selector-item--selected' : ''
              }`}
              onClick={() => handleMonthSelect(index)}
            >
              {month.slice(0, 3)}
            </button>
          ))}
        </div>
      )}

      {/* Time Picker */}
      {showTimePicker && viewMode === 'days' && (
        <>
          <div className="ds-datepicker__divider" />
          <div className="ds-datepicker__time">
            <div className="ds-datepicker__time-input">
              <input
                type="text"
                value={`${time.hours}:${time.minutes}`}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(':');
                  if (h) handleTimeChange('hours', h);
                  if (m) handleTimeChange('minutes', m);
                }}
                placeholder="12:00"
                aria-label="Time"
              />
            </div>
            <button
              type="button"
              className="ds-datepicker__period-toggle"
              onClick={togglePeriod}
              aria-label={`Switch to ${time.period === 'AM' ? 'PM' : 'AM'}`}
            >
              <span className="ds-datepicker__period-text">{time.period}</span>
              <span className="ds-datepicker__period-icon">
                <ChevronDownIcon />
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to check if date is disabled
const isDateDisabled = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (minDate && date < minDate) return true;
  if (maxDate && date > maxDate) return true;
  return false;
};

export type { DatePickerProps };

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Button } from '../Button';
import './wizard.css';

type WizardStep = {
  id: string;
  label: string;
  content?: React.ReactNode;
};

type WizardContextType = {
  steps: WizardStep[];
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
};

const WizardContext = createContext<WizardContextType | null>(null);

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a Wizard component');
  }
  return context;
};

// Checkmark icon for completed steps
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type WizardProps = {
  children: React.ReactNode;
  steps: WizardStep[];
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
  className?: string;
};

export const Wizard: React.FC<WizardProps> = ({
  children,
  steps,
  initialStep = 0,
  onStepChange,
  onComplete,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
      onStepChange?.(step);
    }
  }, [totalSteps, onStepChange]);

  const nextStep = useCallback(() => {
    if (isLastStep) {
      onComplete?.();
    } else {
      goToStep(currentStep + 1);
    }
  }, [currentStep, isLastStep, goToStep, onComplete]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, isFirstStep, goToStep]);

  const wizardClasses = ['ds-wizard', className].filter(Boolean).join(' ');

  return (
    <WizardContext.Provider
      value={{
        steps,
        currentStep,
        totalSteps,
        goToStep,
        nextStep,
        prevStep,
        isFirstStep,
        isLastStep,
        progress,
      }}
    >
      <div className={wizardClasses}>
        {children}
      </div>
    </WizardContext.Provider>
  );
};

type WizardHeaderProps = {
  logo?: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
  className?: string;
};

export const WizardHeader: React.FC<WizardHeaderProps> = ({
  logo,
  title,
  actions,
  className = '',
}) => {
  const headerClasses = ['ds-wizard__header', className].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="ds-wizard__header-content">
        {logo && <div className="ds-wizard__header-logo">{logo}</div>}
        <h1 className="ds-wizard__header-title">{title}</h1>
      </div>
      {actions && <div className="ds-wizard__header-actions">{actions}</div>}
    </header>
  );
};

type WizardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export const WizardBody: React.FC<WizardBodyProps> = ({
  children,
  className = '',
}) => {
  const bodyClasses = ['ds-wizard__body', className].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses}>
      {children}
    </div>
  );
};

type WizardStepperProps = {
  showProgress?: boolean;
  className?: string;
};

export const WizardStepper: React.FC<WizardStepperProps> = ({
  showProgress = true,
  className = '',
}) => {
  const { steps, currentStep, totalSteps, progress } = useWizard();

  const stepperClasses = ['ds-wizard__stepper', className].filter(Boolean).join(' ');

  return (
    <aside className={stepperClasses}>
      <div className="ds-wizard__stepper-content">
        <p className="ds-wizard__step-indicator">
          Step {currentStep + 1} of {totalSteps}
        </p>
        <div className="ds-wizard__steps">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isPending = index > currentStep;

            const stepClasses = [
              'ds-wizard__step',
              isActive ? 'ds-wizard__step--active' : '',
              isCompleted ? 'ds-wizard__step--completed' : '',
              isPending ? 'ds-wizard__step--pending' : '',
            ].filter(Boolean).join(' ');

            const numberClasses = [
              'ds-wizard__step-number',
              isActive ? 'ds-wizard__step-number--active' : '',
              isCompleted ? 'ds-wizard__step-number--completed' : '',
              isPending ? 'ds-wizard__step-number--pending' : '',
            ].filter(Boolean).join(' ');

            return (
              <div key={step.id} className={stepClasses}>
                <div className={numberClasses}>
                  {isCompleted ? (
                    <span className="ds-wizard__step-check">
                      <CheckIcon />
                    </span>
                  ) : (
                    index + 1
                  )}
                </div>
                <p className="ds-wizard__step-label">{step.label}</p>
              </div>
            );
          })}
        </div>
      </div>
      {showProgress && (
        <div className="ds-wizard__progress">
          <div className="ds-wizard__progress-header">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="ds-wizard__progress-bar">
            <div
              className="ds-wizard__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </aside>
  );
};

type WizardContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const WizardContent: React.FC<WizardContentProps> = ({
  children,
  className = '',
}) => {
  const contentClasses = ['ds-wizard__content', className].filter(Boolean).join(' ');

  return (
    <div className={contentClasses}>
      {children}
    </div>
  );
};

type WizardContentBodyProps = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export const WizardContentBody: React.FC<WizardContentBodyProps> = ({
  icon,
  title,
  description,
  children,
  className = '',
}) => {
  const bodyClasses = ['ds-wizard__content-body', className].filter(Boolean).join(' ');

  return (
    <div className={bodyClasses}>
      {(title || description) && (
        <div className="ds-wizard__content-header">
          {title && (
            <div className="ds-wizard__content-title-row">
              {icon && <div className="ds-wizard__content-icon">{icon}</div>}
              <h2 className="ds-wizard__content-title">{title}</h2>
            </div>
          )}
          {description && (
            <p className="ds-wizard__content-description">{description}</p>
          )}
        </div>
      )}
      <div className="ds-wizard__content-main">
        {children}
      </div>
    </div>
  );
};

type WizardFooterProps = {
  previousLabel?: string;
  nextLabel?: string;
  completeLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onComplete?: () => void;
  showPrevious?: boolean;
  disablePrevious?: boolean;
  disableNext?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
};

export const WizardFooter: React.FC<WizardFooterProps> = ({
  previousLabel = 'Previous',
  nextLabel = 'Save & Continue',
  completeLabel = 'Complete',
  onPrevious,
  onNext,
  onComplete,
  showPrevious = true,
  disablePrevious = false,
  disableNext = false,
  leftContent,
  rightContent,
  className = '',
}) => {
  const { isFirstStep, isLastStep, nextStep, prevStep } = useWizard();

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      prevStep();
    }
  };

  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete();
    } else if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const footerClasses = ['ds-wizard__footer', className].filter(Boolean).join(' ');

  return (
    <footer className={footerClasses}>
      <div className="ds-wizard__footer-left">
        {leftContent || (
          showPrevious && (
            <Button
              variant="secondary-outlined"
              onClick={handlePrevious}
              disabled={isFirstStep || disablePrevious}
            >
              {previousLabel}
            </Button>
          )
        )}
      </div>
      <div className="ds-wizard__footer-right">
        {rightContent || (
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={disableNext}
          >
            {isLastStep ? completeLabel : nextLabel}
          </Button>
        )}
      </div>
    </footer>
  );
};

type WizardFormSectionProps = {
  children: React.ReactNode;
  highlighted?: boolean;
  className?: string;
};

export const WizardFormSection: React.FC<WizardFormSectionProps> = ({
  children,
  highlighted = true,
  className = '',
}) => {
  const sectionClasses = [
    'ds-wizard__form-section',
    highlighted ? '' : 'ds-wizard__form-section--default',
    className,
  ].filter(Boolean).join(' ');

  return <div className={sectionClasses}>{children}</div>;
};

export type {
  WizardStep,
  WizardProps,
  WizardHeaderProps,
  WizardBodyProps,
  WizardStepperProps,
  WizardContentProps,
  WizardContentBodyProps,
  WizardFooterProps,
  WizardFormSectionProps,
};

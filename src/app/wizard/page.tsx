"use client";

import React, { useState } from "react";
import {
  Wizard,
  WizardHeader,
  WizardBody,
  WizardStepper,
  WizardContent,
  WizardContentBody,
  WizardFooter,
  WizardFormSection,
  TextField,
  useWizard,
} from "@/design-system";

// Logo component
const Logo = () => (
  <svg width="112" height="28" viewBox="0 0 112 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="4" fill="url(#wizard-logo-gradient)"/>
    <path d="M8 14L12 18L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="36" y="19" fill="#1F272F" fontFamily="Geist, sans-serif" fontSize="14" fontWeight="600">Acme Inc</text>
    <defs>
      <linearGradient id="wizard-logo-gradient" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0052D4"/>
        <stop offset="0.5" stopColor="#4364F7"/>
        <stop offset="1" stopColor="#6FB1FC"/>
      </linearGradient>
    </defs>
  </svg>
);

// Cloud icon for step content
const CloudIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 21H19.25C22.1495 21 24.5 18.6495 24.5 15.75C24.5 12.8505 22.1495 10.5 19.25 10.5C19.25 6.63401 16.116 3.5 12.25 3.5C8.38401 3.5 5.25 6.63401 5.25 10.5C5.25 10.5 3.5 10.5 3.5 14C3.5 17.5 5.625 21 7 21Z" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Step 1 Content
function Step1Content() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <TextField
        label="Organization Name"
        placeholder="Enter your organization name"
        required
        helperText="This will be displayed in your dashboard"
      />
      <TextField
        label="Admin Email"
        placeholder="admin@example.com"
        required
        helperText="We'll send important notifications to this email"
      />
    </div>
  );
}

// Step 2 Content
function Step2Content() {
  const [scope, setScope] = useState<'organization' | 'account'>('organization');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#1f272f',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          Select Integration Scope
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="scope"
              checked={scope === 'organization'}
              onChange={() => setScope('organization')}
              style={{ accentColor: '#2366ed' }}
            />
            <span style={{ fontSize: '13px', color: '#1f272f' }}>Organization</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="scope"
              checked={scope === 'account'}
              onChange={() => setScope('account')}
              style={{ accentColor: '#2366ed' }}
            />
            <span style={{ fontSize: '13px', color: '#1f272f' }}>Account</span>
          </label>
        </div>
      </div>

      <WizardFormSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Management Account ID"
            placeholder="Enter Management Account ID"
            required
            helperText="Your 12-digit Management Account ID can be found in your AWS console"
          />
          <TextField
            label="Organization Name"
            placeholder="Enter Organization Name"
            required
            helperText="A friendly name to identify your organization"
          />
        </div>
      </WizardFormSection>
    </div>
  );
}

// Step 3 Content
function Step3Content() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <p style={{ fontSize: '14px', color: '#455465', lineHeight: 1.6 }}>
        VPC Flow Logs capture information about the IP traffic going to and from network interfaces in your VPC.
        This data is essential for monitoring and analyzing network traffic patterns.
      </p>
      <WizardFormSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="S3 Bucket Name"
            placeholder="my-flow-logs-bucket"
            required
            helperText="The S3 bucket where flow logs will be stored"
          />
          <TextField
            label="Log Format"
            placeholder="default"
            helperText="Leave as 'default' for standard fields or specify custom format"
          />
        </div>
      </WizardFormSection>
    </div>
  );
}

// Step 4 Content
function Step4Content() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <p style={{ fontSize: '14px', color: '#455465', lineHeight: 1.6 }}>
        Select the permissions you want to grant. We recommend the default settings for most use cases.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { label: 'Read EC2 instances', checked: true },
          { label: 'Read VPC configurations', checked: true },
          { label: 'Read security groups', checked: true },
          { label: 'Read IAM roles (optional)', checked: false },
        ].map((item) => (
          <label key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              defaultChecked={item.checked}
              style={{ accentColor: '#2366ed', width: '16px', height: '16px' }}
            />
            <span style={{ fontSize: '13px', color: '#1f272f' }}>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Step 5 Content
function Step5Content() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <p style={{ fontSize: '14px', color: '#455465', lineHeight: 1.6 }}>
        Click the button below to deploy the CloudFormation stack in your AWS account.
        This will create the necessary IAM roles and permissions.
      </p>
      <div style={{
        padding: '16px',
        backgroundColor: '#f5f7ff',
        borderRadius: '8px',
        border: '1px solid #dfe6ed'
      }}>
        <p style={{ fontSize: '13px', color: '#455465', margin: 0 }}>
          <strong>Stack Name:</strong> acme-integration-stack
        </p>
        <p style={{ fontSize: '13px', color: '#455465', margin: '8px 0 0 0' }}>
          <strong>Region:</strong> us-east-1
        </p>
      </div>
    </div>
  );
}

// Step 6 Content
function Step6Content() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <p style={{ fontSize: '14px', color: '#455465', lineHeight: 1.6 }}>
        Create a passkey for secure, passwordless authentication to your account.
      </p>
      <TextField
        label="Passkey Name"
        placeholder="My Work Laptop"
        required
        helperText="Give your passkey a memorable name"
      />
    </div>
  );
}

// Dynamic step content renderer
function StepContent() {
  const { currentStep } = useWizard();

  const stepContents = [
    {
      icon: null,
      title: "Configure Your Account",
      description: "Set up your organization details to get started",
      content: <Step1Content />,
    },
    {
      icon: <CloudIcon />,
      title: "Connect your AWS Cloud",
      description: "Select how you want to connect your AWS environment",
      content: <Step2Content />,
    },
    {
      icon: null,
      title: "Enable VPC Flow Logs",
      description: "Configure flow logs to capture network traffic data",
      content: <Step3Content />,
    },
    {
      icon: null,
      title: "Select Permissions",
      description: "Choose the access permissions for your integration",
      content: <Step4Content />,
    },
    {
      icon: null,
      title: "Deploy Stack in AWS",
      description: "Deploy the CloudFormation stack to complete the integration",
      content: <Step5Content />,
    },
    {
      icon: null,
      title: "Create Passkey",
      description: "Set up secure authentication for your account",
      content: <Step6Content />,
    },
  ];

  const current = stepContents[currentStep];

  return (
    <WizardContentBody
      icon={current.icon}
      title={current.title}
      description={current.description}
    >
      {current.content}
    </WizardContentBody>
  );
}

export default function WizardDemo() {
  const steps = [
    { id: "step1", label: "Configure Account" },
    { id: "step2", label: "Connect your AWS Cloud" },
    { id: "step3", label: "Enable VPC Flow Logs" },
    { id: "step4", label: "Select Permissions" },
    { id: "step5", label: "Deploy Stack in AWS" },
    { id: "step6", label: "Create Passkey" },
  ];

  const handleComplete = () => {
    alert("Wizard completed! In a real app, you would submit the data here.");
  };

  return (
    <Wizard steps={steps} onComplete={handleComplete}>
      <WizardHeader
        logo={<Logo />}
        title="Cloud Onboarding"
      />
      <WizardBody>
        <WizardStepper />
        <WizardContent>
          <StepContent />
          <WizardFooter />
        </WizardContent>
      </WizardBody>
    </Wizard>
  );
}

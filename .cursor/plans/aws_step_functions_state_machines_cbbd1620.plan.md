---
name: AWS Step Functions State Machines
overview: Implement AWS Step Functions Standard Workflows for all major business processes in the Mind-Links platform, including Contractor Onboarding, Payroll Processing, Contract Lifecycle, KYC Verification, and Milestone/Timesheet Payment flows.
todos:
  - id: foundation
    content: Set up Terraform module structure, IAM roles, and EventBridge event bus
    status: pending
  - id: kyc-sm
    content: Implement KYC Verification state machine with Veriff integration
    status: pending
  - id: onboarding-sm
    content: Implement Contractor Onboarding state machine with nested KYC
    status: pending
  - id: contract-sm
    content: Implement Contract Lifecycle state machine with monitoring
    status: pending
  - id: payroll-sm
    content: Implement Payroll Processing state machine with Stripe integration
    status: pending
  - id: milestone-sm
    content: Implement Milestone/Timesheet Payment state machine
    status: pending
  - id: lambda-handlers
    content: Create all Lambda function handlers for state machine tasks
    status: pending
  - id: eventbridge
    content: Configure EventBridge rules to trigger and connect state machines
    status: pending
  - id: monitoring
    content: Set up CloudWatch dashboards, alarms, and logging
    status: pending
---

# AWS Step Functions State Machine

Implementation

## Architecture Overview

AWS Step Functions will orchestrate all long-running business workflows across your microservices. Each state machine coordinates Lambda functions, service integrations, and human approval steps.

```mermaid
flowchart TB
    subgraph triggers [Event Triggers]
        API[API Gateway]
        EB[EventBridge]
        SQS[SQS Queues]
    end
    
    subgraph stepfunctions [AWS Step Functions]
        SM1[Contractor Onboarding]
        SM2[Payroll Processing]
        SM3[Contract Lifecycle]
        SM4[KYC Verification]
        SM5[Milestone Payment]
    end
    
    subgraph services [Microservices / Lambdas]
        AuthSvc[Auth Service]
        ContractorSvc[Contractor Service]
        ContractSvc[Contract Service]
        PaymentSvc[Payment Service]
        KYCSvc[KYC Service]
        NotifSvc[Notification Service]
    end
    
    subgraph storage [Data Stores]
        DDB[(DynamoDB)]
        S3[(S3)]
        QLDB[(QLDB Ledger)]
    end
    
    triggers --> stepfunctions
    stepfunctions --> services
    services --> storage
```

---

## State Machine 1: Contractor Onboarding

**Trigger:** `POST /api/clients/me/contractors/invite`**Duration:** Days to weeks

```mermaid
stateDiagram-v2
    [*] --> InvitationSent
    InvitationSent --> WaitForAcceptance: Send Email
    WaitForAcceptance --> InvitationExpired: 7 days timeout
    WaitForAcceptance --> InvitationAccepted: Contractor clicks link
    InvitationExpired --> [*]
    
    InvitationAccepted --> ContractorRegistration
    ContractorRegistration --> KYCRequired: Profile created
    
    KYCRequired --> WaitForKYCSubmission
    WaitForKYCSubmission --> KYCSubmitted: Documents uploaded
    WaitForKYCSubmission --> KYCReminder: 3 days no action
    KYCReminder --> WaitForKYCSubmission
    
    KYCSubmitted --> KYCVerification: Start KYC State Machine
    KYCVerification --> KYCApproved: Verified
    KYCVerification --> KYCRejected: Failed
    
    KYCRejected --> WaitForKYCResubmission
    WaitForKYCResubmission --> KYCSubmitted: Resubmitted
    
    KYCApproved --> ContractPending
    ContractPending --> WaitForContractSignature
    WaitForContractSignature --> ContractSigned: Both parties sign
    
    ContractSigned --> OnboardingComplete
    OnboardingComplete --> [*]
```

**States and Events:**| State | Event In | Actions | Event Out ||-------|----------|---------|-----------|| `InvitationSent` | API call | Save invitation, generate token | `invitation.sent` || `WaitForAcceptance` | - | Wait with 7-day timeout | - || `InvitationAccepted` | `invitation.accepted` | Update status | `contractor.registration.started` || `ContractorRegistration` | - | Create contractor profile | `contractor.profile.created` || `KYCRequired` | - | Trigger KYC notification | `kyc.required` || `KYCSubmitted` | `kyc.documents.uploaded` | Start verification | `kyc.verification.started` || `KYCApproved` | `kyc.approved` | Update contractor status | `contractor.kyc.approved` || `ContractPending` | - | Generate contract PDF | `contract.pending.signature` || `ContractSigned` | `contract.signed.both` | Activate contract | `contractor.onboarding.complete` |---

## State Machine 2: Payroll Processing

**Trigger:** `POST /api/clients/me/payroll/:id/process`**Duration:** Hours to days (includes payment settlement)

```mermaid
stateDiagram-v2
    [*] --> PayrollCreated
    PayrollCreated --> AddingLineItems: Draft mode
    AddingLineItems --> PayrollSubmitted: Client submits
    
    PayrollSubmitted --> ValidateEscrow
    ValidateEscrow --> InsufficientFunds: Balance too low
    ValidateEscrow --> FundsLocked: Balance OK
    
    InsufficientFunds --> WaitForFunding
    WaitForFunding --> ValidateEscrow: escrow.funded
    WaitForFunding --> PayrollCancelled: 7 days timeout
    
    FundsLocked --> ProcessingPayments
    ProcessingPayments --> PaymentBatch: Create Stripe batch
    
    PaymentBatch --> WaitForSettlement
    WaitForSettlement --> PaymentSettled: All payouts complete
    WaitForSettlement --> PaymentPartialFailure: Some failed
    
    PaymentPartialFailure --> RetryFailedPayments
    RetryFailedPayments --> WaitForSettlement
    
    PaymentSettled --> UpdateWallets
    UpdateWallets --> RecordLedger: QLDB entry
    RecordLedger --> PayrollCompleted
    
    PayrollCompleted --> SendNotifications
    SendNotifications --> [*]
    
    PayrollCancelled --> ReleaseFunds
    ReleaseFunds --> [*]
```

**States and Events:**| State | Event In | Actions | Event Out ||-------|----------|---------|-----------|| `PayrollCreated` | API call | Create payroll record | `payroll.created` || `PayrollSubmitted` | `payroll.submitted` | Lock for processing | `payroll.submitted` || `ValidateEscrow` | - | Check client escrow balance | - || `FundsLocked` | - | Reserve funds in escrow | `escrow.funds.locked` || `ProcessingPayments` | - | Initiate Stripe payouts | `payments.processing` || `WaitForSettlement` | - | Poll/webhook for Stripe status | - || `PaymentSettled` | `stripe.payout.completed` | Mark payments complete | `payments.settled` || `UpdateWallets` | - | Credit contractor wallets | `wallets.credited` || `RecordLedger` | - | Write to QLDB | `ledger.recorded` || `PayrollCompleted` | - | Update payroll status | `payroll.completed` |---

## State Machine 3: Contract Lifecycle

**Trigger:** `POST /api/clients/me/contracts`**Duration:** Months (entire contract duration)

```mermaid
stateDiagram-v2
    [*] --> ContractDrafted
    ContractDrafted --> GeneratePDF: Create contract
    GeneratePDF --> PendingClientSignature
    
    PendingClientSignature --> ClientSigned: Client signs
    ClientSigned --> PendingContractorSignature
    
    PendingContractorSignature --> WaitForContractorSignature
    WaitForContractorSignature --> ContractorSigned: Contractor signs
    WaitForContractorSignature --> SignatureReminder: 3 days
    SignatureReminder --> WaitForContractorSignature
    
    ContractorSigned --> ContractActive
    ContractActive --> MonitorContract: Start monitoring
    
    MonitorContract --> MilestoneSubmitted: milestone.submitted
    MonitorContract --> TimesheetSubmitted: timesheet.submitted
    MonitorContract --> ContractNearingEnd: 30 days before end
    MonitorContract --> TerminationRequested: terminate request
    
    MilestoneSubmitted --> MilestonePaymentFlow: Trigger payment SM
    MilestonePaymentFlow --> MonitorContract
    
    TimesheetSubmitted --> TimesheetApprovalFlow
    TimesheetApprovalFlow --> MonitorContract
    
    ContractNearingEnd --> RenewalNotification
    RenewalNotification --> MonitorContract
    
    TerminationRequested --> ProcessTermination
    ProcessTermination --> FinalPayment
    FinalPayment --> ContractTerminated
    
    MonitorContract --> ContractCompleted: End date reached
    ContractCompleted --> FinalSettlement
    FinalSettlement --> [*]
    
    ContractTerminated --> [*]
```

**Key Events:**

- `contract.created` - New contract drafted
- `contract.signed.client` - Client signature captured
- `contract.signed.contractor` - Contractor signature captured
- `contract.activated` - Both signatures, contract active
- `contract.milestone.submitted` - Work submitted for review
- `contract.terminated` - Early termination
- `contract.completed` - Natural end

---

## State Machine 4: KYC Verification

**Trigger:** `kyc.documents.uploaded` event or API call**Duration:** Hours to days

```mermaid
stateDiagram-v2
    [*] --> KYCInitiated
    KYCInitiated --> DocumentsUploaded: Contractor uploads
    
    DocumentsUploaded --> VeriffSessionCreated: Create Veriff session
    VeriffSessionCreated --> AutomatedVerification
    
    AutomatedVerification --> VeriffApproved: Veriff success
    AutomatedVerification --> VeriffDeclined: Veriff failed
    AutomatedVerification --> ManualReviewRequired: Needs human review
    
    VeriffApproved --> UpdateKYCStatus
    UpdateKYCStatus --> KYCApproved
    
    VeriffDeclined --> KYCRejected
    KYCRejected --> NotifyContractor
    NotifyContractor --> WaitForResubmission
    WaitForResubmission --> DocumentsUploaded: Resubmit
    WaitForResubmission --> KYCAbandoned: 30 days timeout
    
    ManualReviewRequired --> AssignToAdmin
    AssignToAdmin --> WaitForAdminReview
    WaitForAdminReview --> AdminApproved: Admin approves
    WaitForAdminReview --> AdminRejected: Admin rejects
    
    AdminApproved --> UpdateKYCStatus
    AdminRejected --> KYCRejected
    
    KYCApproved --> RecordAuditLog
    RecordAuditLog --> [*]
    
    KYCAbandoned --> [*]
```

**Integration Points:**

- **Veriff API** - Automated identity verification
- **Admin Dashboard** - Manual review queue via callback token
- **S3** - Document storage
- **DynamoDB** - KYC session and document status

---

## State Machine 5: Milestone/Timesheet Payment

**Trigger:** `milestone.approved` or `timesheet.approved` event**Duration:** Minutes to hours

```mermaid
stateDiagram-v2
    [*] --> ApprovalReceived
    ApprovalReceived --> ValidateApproval: Check authorization
    
    ValidateApproval --> CheckEscrowBalance
    CheckEscrowBalance --> SufficientFunds: Balance OK
    CheckEscrowBalance --> InsufficientFunds: Balance low
    
    InsufficientFunds --> NotifyClientFunding
    NotifyClientFunding --> WaitForFunding
    WaitForFunding --> CheckEscrowBalance: escrow.funded
    
    SufficientFunds --> LockFunds
    LockFunds --> CreateInvoice
    CreateInvoice --> ProcessPayment
    
    ProcessPayment --> InitiateStripePayout
    InitiateStripePayout --> WaitForPayout
    
    WaitForPayout --> PayoutSuccessful: Stripe success
    WaitForPayout --> PayoutFailed: Stripe error
    
    PayoutFailed --> RetryPayout: Retry up to 3x
    RetryPayout --> WaitForPayout
    PayoutFailed --> ManualIntervention: All retries failed
    
    PayoutSuccessful --> CreditContractorWallet
    CreditContractorWallet --> DebitClientEscrow
    DebitClientEscrow --> RecordInQLDB
    
    RecordInQLDB --> UpdateMilestoneStatus
    UpdateMilestoneStatus --> SendPaymentNotifications
    SendPaymentNotifications --> [*]
    
    ManualIntervention --> [*]
```

---

## Infrastructure Components

### Required AWS Resources

| Resource | Purpose ||----------|---------|| **Step Functions State Machines** | 5 state machines (one per workflow) || **Lambda Functions** | Individual task handlers (15-20 functions) || **EventBridge** | Event routing and triggers || **SQS Queues** | Dead letter queues, async processing || **DynamoDB Tables** | Execution state, idempotency keys || **IAM Roles** | Step Functions execution roles || **CloudWatch** | Logging, metrics, alarms || **SNS Topics** | Human approval callbacks |

### Terraform Module Structure

```javascript
infrastructure/
├── modules/
│   └── step-functions/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       ├── iam.tf
│       └── state-machines/
│           ├── contractor-onboarding.asl.json
│           ├── payroll-processing.asl.json
│           ├── contract-lifecycle.asl.json
│           ├── kyc-verification.asl.json
│           └── milestone-payment.asl.json
└── environments/
    ├── dev/
    └── prod/
```



### Lambda Functions to Create

| Function | State Machine | Purpose ||----------|--------------|---------|| `sendInvitationEmail` | Onboarding | Send contractor invitation || `createContractorProfile` | Onboarding | Initialize contractor record || `validateEscrowBalance` | Payroll, Milestone | Check client funds || `lockEscrowFunds` | Payroll, Milestone | Reserve payment amount || `initiateStripePayout` | Payroll, Milestone | Call Stripe API || `creditContractorWallet` | Payroll, Milestone | Update wallet balance || `recordQLDBTransaction` | Payroll, Milestone | Immutable ledger entry || `createVeriffSession` | KYC | Start Veriff verification || `processVeriffWebhook` | KYC | Handle Veriff callbacks || `generateContractPDF` | Contract | Create PDF document || `sendNotification` | All | Generic notification sender |---

## EventBridge Event Schema

All events follow this structure:

```json
{
  "version": "1.0",
  "id": "uuid",
  "source": "mindlinks.{service-name}",
  "detail-type": "{entity}.{action}",
  "time": "ISO8601",
  "detail": {
    "entityId": "uuid",
    "entityType": "contractor|contract|payroll|kyc",
    "action": "created|updated|approved|rejected",
    "actorId": "uuid",
    "actorType": "client|contractor|admin|system",
    "metadata": {}
  }
}
```

---

## Implementation Steps

### Phase 1: Foundation (Week 1)

- Set up Terraform module for Step Functions
- Create IAM roles and policies
- Set up EventBridge event bus
- Create base Lambda function structure

### Phase 2: KYC Verification (Week 2)

- Implement KYC state machine (simplest, standalone)
- Integrate with Veriff API
- Add admin review callback mechanism
- Test end-to-end flow

### Phase 3: Contractor Onboarding (Week 3)

- Implement onboarding state machine
- Integrate with KYC state machine (nested execution)
- Add invitation flow with timeouts
- Test full onboarding journey

### Phase 4: Contract Lifecycle (Week 4)

- Implement contract state machine
- Add milestone/timesheet monitoring
- Integrate with payment flows
- Test contract scenarios

### Phase 5: Payment Flows (Week 5)

- Implement payroll processing state machine
- Implement milestone payment state machine
- Integrate with Stripe
- Add QLDB recording
- Test payment scenarios

### Phase 6: Integration & Monitoring (Week 6)

- Connect all state machines via EventBridge
- Set up CloudWatch dashboards
- Add alerting for failures
- Performance testing
- Documentation

---

## Key Files to Create
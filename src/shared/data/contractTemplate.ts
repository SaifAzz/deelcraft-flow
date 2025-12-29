// mind Links style Contract Template

export interface ContractTemplate {
  id: string;
  name: string;
  type: "fixed" | "hourly";
  template: string;
}

export const deelContractTemplate: ContractTemplate = {
  id: "mindlinks-standard",
  name: "mind Links Standard Contractor Agreement",
  type: "fixed",
  template: `CONTRACTOR AGREEMENT

REF: [CONTRACT_REF]

This Contractor Agreement ("Agreement") is entered into as of [EFFECTIVE_DATE] (the "Effective Date"), between:

[CLIENT_NAME], a [STATE_OF_FORMATION] company having its principal place of business at [CLIENT_ADDRESS], registered under the number [CLIENT_REGISTRATION_NUMBER] and email: [CLIENT_EMAIL], ("Client"),

and

[CONTRACTOR_NAME], having its principal place of business at [CONTRACTOR_ADDRESS], registered under the number [CONTRACTOR_REGISTRATION_NUMBER] and email address: [CONTRACTOR_EMAIL], ("Contractor").

Client and Contractor desire to have Contractor perform services for Client, subject to and in accordance with the terms and conditions of this Agreement.

NOW, THEREFORE, the parties agree as follows:

1. SERVICES

1.1. Contractor agrees to perform the following services (the "Services") for Client:
[SERVICES_DESCRIPTION]

1.2. Contractor shall perform the Services in a professional and workmanlike manner, in accordance with industry standards and best practices.

1.3. Contractor shall comply with all applicable laws, regulations, and professional standards in performing the Services.

2. COMPENSATION

2.1. For the Services rendered under this Agreement, Client agrees to pay Contractor as follows:
[COMPENSATION_TERMS]

2.2. Payment shall be made [PAYMENT_SCHEDULE] in [CURRENCY].

2.3. All payments are subject to Contractor's completion and delivery of the Services to Client's satisfaction.

3. TERM AND TERMINATION

3.1. This Agreement shall commence on the Effective Date and shall continue until [END_DATE] or until terminated in accordance with this Section 3.

3.2. Either party may terminate this Agreement at any time with [NOTICE_PERIOD] days' written notice to the other party.

3.3. Upon termination, Contractor shall be entitled to payment for Services completed and accepted by Client prior to the termination date.

4. INDEPENDENT CONTRACTOR

4.1. Contractor is an independent contractor and not an employee, agent, or partner of Client.

4.2. Contractor shall be solely responsible for payment of all taxes, insurance, and other obligations arising from the Services.

4.3. Contractor has no authority to bind Client or incur obligations on Client's behalf.

5. CONFIDENTIALITY

5.1. Contractor agrees to maintain the confidentiality of all proprietary and confidential information of Client.

5.2. This obligation shall survive the termination of this Agreement.

6. INTELLECTUAL PROPERTY

6.1. All work product, deliverables, and intellectual property created by Contractor in the performance of the Services shall be the exclusive property of Client.

6.2. Contractor hereby assigns to Client all right, title, and interest in and to such work product and intellectual property.

7. WARRANTIES AND REPRESENTATIONS

7.1. Contractor represents and warrants that:
    (a) Contractor has the right and authority to enter into this Agreement;
    (b) The Services will be performed in a professional manner;
    (c) The Services will not infringe upon any third-party rights.

8. LIMITATION OF LIABILITY

8.1. IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT.

9. GOVERNING LAW

9.1. This Agreement shall be governed by and construed in accordance with the laws of [GOVERNING_JURISDICTION].

10. GENERAL PROVISIONS

10.1. This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements.

10.2. This Agreement may not be modified except in writing signed by both parties.

10.3. If any provision of this Agreement is found to be unenforceable, the remaining provisions shall remain in full force and effect.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

CLIENT:                          CONTRACTOR:

[CLIENT_SIGNATURE]               [CONTRACTOR_SIGNATURE]

[CLIENT_NAME]                    [CONTRACTOR_NAME]

Date: [DATE]                     Date: [DATE]`,
};

export function generateContractFromTemplate(
  template: ContractTemplate,
  data: {
    contractRef: string;
    effectiveDate: string;
    clientName: string;
    clientAddress: string;
    clientRegistrationNumber: string;
    clientEmail: string;
    contractorName: string;
    contractorAddress: string;
    contractorRegistrationNumber: string;
    contractorEmail: string;
    servicesDescription: string;
    compensationTerms: string;
    paymentSchedule: string;
    currency: string;
    endDate: string;
    noticePeriod: string;
    governingJurisdiction: string;
  }
): string {
  let contract = template.template;

  // Replace all placeholders
  contract = contract.replace(/\[CONTRACT_REF\]/g, data.contractRef);
  contract = contract.replace(/\[EFFECTIVE_DATE\]/g, data.effectiveDate);
  contract = contract.replace(/\[CLIENT_NAME\]/g, data.clientName);
  contract = contract.replace(/\[CLIENT_ADDRESS\]/g, data.clientAddress);
  contract = contract.replace(/\[CLIENT_REGISTRATION_NUMBER\]/g, data.clientRegistrationNumber);
  contract = contract.replace(/\[CLIENT_EMAIL\]/g, data.clientEmail);
  contract = contract.replace(/\[CONTRACTOR_NAME\]/g, data.contractorName);
  contract = contract.replace(/\[CONTRACTOR_ADDRESS\]/g, data.contractorAddress);
  contract = contract.replace(/\[CONTRACTOR_REGISTRATION_NUMBER\]/g, data.contractorRegistrationNumber);
  contract = contract.replace(/\[CONTRACTOR_EMAIL\]/g, data.contractorEmail);
  contract = contract.replace(/\[SERVICES_DESCRIPTION\]/g, data.servicesDescription);
  contract = contract.replace(/\[COMPENSATION_TERMS\]/g, data.compensationTerms);
  contract = contract.replace(/\[PAYMENT_SCHEDULE\]/g, data.paymentSchedule);
  contract = contract.replace(/\[CURRENCY\]/g, data.currency);
  contract = contract.replace(/\[END_DATE\]/g, data.endDate);
  contract = contract.replace(/\[NOTICE_PERIOD\]/g, data.noticePeriod);
  contract = contract.replace(/\[GOVERNING_JURISDICTION\]/g, data.governingJurisdiction);
  contract = contract.replace(/\[DATE\]/g, new Date().toLocaleDateString());

  return contract;
}


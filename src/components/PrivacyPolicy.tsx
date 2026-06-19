export default function PrivacyPolicy() {
  return (
    <section className="section legal-page" aria-labelledby="privacy-heading">
      <div className="section-inner" style={{ maxWidth: 800 }}>
        <div className="section-label">Legal</div>
        <h1 className="section-title" id="privacy-heading" style={{ marginBottom: 12 }}>Privacy Policy</h1>
        <p className="legal-meta" style={{ color: 'var(--text-dim)', fontSize: '14px', marginBottom: 32 }}>
          <strong>Effective Date:</strong> June 16, 2026 &nbsp;|&nbsp; <strong>Last Revised:</strong> June 16, 2026
        </p>

        <div className="legal-content">
          <hr className="divider" style={{ margin: '24px 0' }} />

          <h2>Introduction</h2>
          <p>
            <strong>[LEGAL ENTITY NAME]</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), operating the JobHunter platform at <a href="https://myjobhunter.in" target="_blank" rel="noopener noreferrer">myjobhunter.in</a>, is committed to protecting your personal data. This Privacy Policy explains what personal data we collect, why we collect it, how we use and share it, and what rights you have over it.
          </p>
          <p>
            We act as a <strong>Data Fiduciary</strong> as defined under India&rsquo;s <strong>Digital Personal Data Protection Act, 2023 (&ldquo;DPDPA&rdquo;)</strong> and as a <strong>Data Controller</strong> as defined under the <strong>EU General Data Protection Regulation (&ldquo;GDPR&rdquo;)</strong> with respect to personal data we process.
          </p>
          <p>
            If you are located in the European Economic Area (EEA), the United Kingdom (UK), or Switzerland, the GDPR-specific rights and obligations described throughout this Policy apply to you in addition to those under the DPDPA.
          </p>
          <p>
            By using the Platform, you acknowledge that you have read and understood this Privacy Policy. Where consent is required for processing, we will obtain it separately through clear, affirmative action.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>1. What Personal Data We Collect</h2>

          <h3>1.1 Data You Provide Directly</h3>
          <div className="table-responsive">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Identity</strong></td>
                  <td>Full name, date of birth, gender</td>
                </tr>
                <tr>
                  <td><strong>Contact</strong></td>
                  <td>Email address, phone number, city and state of residence</td>
                </tr>
                <tr>
                  <td><strong>Professional</strong></td>
                  <td>Resume file (PDF or DOCX), employment history, education, skills, certifications, and projects</td>
                </tr>
                <tr>
                  <td><strong>Job Preferences</strong></td>
                  <td>Target roles, industries, preferred locations, salary expectations, employment type, and years of experience</td>
                </tr>
                <tr>
                  <td><strong>Account Credentials</strong></td>
                  <td>Email address and hashed password</td>
                </tr>
                <tr>
                  <td><strong>User Communications</strong></td>
                  <td>Feedback on AI-generated resume variants, messages sent to our support team</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>1.2 Data Generated Through Your Use of the Platform</h3>
          <div className="table-responsive">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Application Activity</strong></td>
                  <td>Jobs selected, resume variants generated, variants approved or rejected, applications sent and their status</td>
                </tr>
                <tr>
                  <td><strong>Engagement Data</strong></td>
                  <td>Login timestamps, features accessed, approval decisions made</td>
                </tr>
                <tr>
                  <td><strong>Device and Technical</strong></td>
                  <td>IP address, browser type and version, operating system, device identifiers</td>
                </tr>
                <tr>
                  <td><strong>Log Data</strong></td>
                  <td>API request logs and error logs, retained solely for debugging and security purposes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>1.3 Data We Do Not Collect</h3>
          <ul>
            <li>Payment card or banking credentials (these are processed directly by our payment gateway and never stored by us)</li>
            <li>Biometric data of any kind</li>
            <li>Medical or health information</li>
            <li>Government-issued identity numbers such as Aadhaar, PAN, or passport numbers</li>
            <li>Data relating to criminal history</li>
          </ul>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>2. How We Use Your Personal Data</h2>
          <p>
            We process your personal data only for the purposes described below, and only where we have a valid lawful basis.
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Personal Data Used</th>
                  <th>Lawful Basis (DPDPA / GDPR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Creating and managing your account</td>
                  <td>Identity, contact, credentials</td>
                  <td>Consent / Contract performance</td>
                </tr>
                <tr>
                  <td>Providing AI resume curation</td>
                  <td>Resume, job preferences, professional data</td>
                  <td>Consent / Contract performance</td>
                </tr>
                <tr>
                  <td>Generating tailored resume variants</td>
                  <td>Resume content, job description analysis</td>
                  <td>Consent</td>
                </tr>
                <tr>
                  <td>Sending application emails to employers on your instruction</td>
                  <td>Name, contact details, approved resume and cover letter</td>
                  <td>Consent (explicit, per-application)</td>
                </tr>
                <tr>
                  <td>Tracking your job applications</td>
                  <td>Application activity, status logs</td>
                  <td>Consent / Contract performance</td>
                </tr>
                <tr>
                  <td>Identifying skill gaps and improvement suggestions</td>
                  <td>Resume, application outcomes</td>
                  <td>Consent</td>
                </tr>
                <tr>
                  <td>Processing subscription payments</td>
                  <td>Contact, billing details (via payment gateway)</td>
                  <td>Contract performance</td>
                </tr>
                <tr>
                  <td>Communicating service updates and changes to Terms</td>
                  <td>Email address</td>
                  <td>Legitimate interest / Legal obligation</td>
                </tr>
                <tr>
                  <td>Security, fraud prevention, and abuse detection</td>
                  <td>Technical data, usage logs</td>
                  <td>Legitimate interest / Legal obligation</td>
                </tr>
                <tr>
                  <td>Improving the Platform through aggregated analysis</td>
                  <td>Anonymised, de-identified usage patterns only</td>
                  <td>Legitimate interest</td>
                </tr>
                <tr>
                  <td>Complying with applicable legal obligations</td>
                  <td>As required by law</td>
                  <td>Legal obligation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            We do not use your personal data for advertising profiling. We do not sell, rent, or trade your personal data to third parties.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>3. AI Processing Disclosure</h2>
          <p>
            <strong>3.1</strong> The Platform uses large language models (LLMs) to analyse job descriptions and generate tailored resume variants from your uploaded resume. This constitutes automated processing of your personal data under both the DPDPA and the GDPR.
          </p>
          <p>
            <strong>3.2</strong> The AI Engine operates under a strict no-fabrication constraint. It processes only content explicitly present in your uploaded resume. All outputs are validated deterministically by a separate, rule-based system before being presented to you.
          </p>
          <p>
            <strong>3.3</strong> No fully automated decision with legal or similarly significant effects &mdash; such as any employment decision &mdash; is made by the Platform. All AI outputs are reviewed by you and require your explicit, affirmative approval before any action is taken.
          </p>
          <p>
            <strong>3.4</strong> To generate resume variants, the Platform transmits your resume content to third-party LLM API providers. These providers are listed in Section 4.2. We apply data minimisation practices and, where available, we do not permit providers to use your data for their model training.
          </p>
          <p>
            <strong>3.5</strong> You have the right to request human review of any automated output produced by the Platform before approving or taking action on it.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>4. How We Share Your Personal Data</h2>
          <p>
            We share your personal data only in the circumstances described in this section. We never sell, rent, or trade your personal data.
          </p>

          <h3>4.1 With Employers &mdash; With Your Explicit Per-Application Consent</h3>
          <p>
            When you approve a resume variant and instruct the Platform to submit an application, we transmit the following to the employer&rsquo;s contact address for that specific job:
          </p>
          <ul>
            <li>Your approved resume (PDF)</li>
            <li>Your approved cover letter (PDF)</li>
            <li>Your name, email address, and phone number as included in the application email body</li>
          </ul>
          <p>
            This sharing occurs exclusively on your instruction and with your prior explicit approval given on a per-application basis. We do not share your data with employers for any purpose beyond the application you have authorised.
          </p>

          <h3>4.2 With Service Providers Acting as Data Processors</h3>
          <p>
            We engage third-party service providers who process personal data on our behalf under binding data processing agreements that restrict their use of your data to the purposes we specify.
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Provider Category</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cloud infrastructure provider</td>
                  <td>Platform hosting and server-side data storage</td>
                </tr>
                <tr>
                  <td>Email delivery service (SendGrid)</td>
                  <td>Transactional email delivery, including application emails sent on your behalf</td>
                </tr>
                <tr>
                  <td>Object storage (MinIO / S3-compatible)</td>
                  <td>Secure storage of resume files and cover letter files</td>
                </tr>
                <tr>
                  <td>LLM API providers</td>
                  <td>AI resume curation. Providers include Anthropic, Google (Gemini), OpenAI, DeepSeek, and xAI. Only the active primary provider is called at any given time.</td>
                </tr>
                <tr>
                  <td>Job data aggregator APIs</td>
                  <td>Sourcing job listing data (JSearch, public ATS APIs including Greenhouse, Lever, Ashby)</td>
                </tr>
                <tr>
                  <td>Payment gateway</td>
                  <td>Subscription payment processing</td>
                </tr>
                <tr>
                  <td>Analytics providers</td>
                  <td>Aggregated, anonymised usage analytics (e.g., Google Analytics 4, PostHog, Microsoft Clarity)</td>
                </tr>
                <tr>
                  <td>Error monitoring</td>
                  <td>Application error logging (e.g., Sentry) &mdash; de-identified where possible</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>4.3 For Legal Compliance</h3>
          <p>
            We may disclose personal data where required to do so by applicable law, court order, judicial process, or a request by a competent government or regulatory authority. We will notify you of such disclosure to the extent permitted by law.
          </p>

          <h3>4.4 Business Transfers</h3>
          <p>
            In the event of a merger, acquisition, restructuring, or sale of all or a substantial portion of the Company&rsquo;s assets, your personal data may be transferred to the successor entity. We will notify you at least <strong>thirty (30) days</strong> in advance of such transfer and ensure the successor is bound by obligations no less protective than those in this Policy.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary for the purposes described in this Policy and to meet our legal obligations.
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Data Category</th>
                  <th>Retention Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Account and profile data</td>
                  <td>Duration of active account + 90 days following account deletion</td>
                </tr>
                <tr>
                  <td>Uploaded master resume</td>
                  <td>Duration of active account + 30 days following deletion request</td>
                </tr>
                <tr>
                  <td>AI-generated resume variants</td>
                  <td>12 months from the date of generation, or upon deletion request (whichever is earlier)</td>
                </tr>
                <tr>
                  <td>Application logs</td>
                  <td>24 months from the date of application</td>
                </tr>
                <tr>
                  <td>Payment and billing records</td>
                  <td>7 years, as required under applicable Indian financial and tax regulations</td>
                </tr>
                <tr>
                  <td>Technical and security logs</td>
                  <td>90 days</td>
                </tr>
                <tr>
                  <td>Anonymised, aggregated analytics</td>
                  <td>Retained indefinitely (cannot be re-identified to any individual)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Upon receiving a valid account deletion request, we will initiate erasure of your personal data within <strong>30 days</strong>, except where a longer retention period is required by law.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>6. Data Security</h2>
          <p>
            <strong>6.1</strong> We implement appropriate technical and organisational security measures, including:
          </p>
          <ul>
            <li>Encryption of data in transit using TLS 1.2 or higher</li>
            <li>Encryption of data at rest for stored resume files and sensitive records</li>
            <li>Role-based access controls limiting internal access to personal data on a need-to-know basis</li>
            <li>Time-limited, cryptographically signed URLs for resume file access &mdash; no resume files are publicly accessible</li>
            <li>Secure hashing of passwords using industry-standard algorithms</li>
            <li>Structured audit logging of all internal data access events</li>
            <li>Separation of microservices such that no component has unrestricted access to data owned by another</li>
          </ul>
          <p>
            <strong>6.2</strong> No method of transmission over the internet or electronic storage is completely secure. While we take these measures seriously, we cannot guarantee absolute security against all threats.
          </p>
          <p>
            <strong>6.3</strong> In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify you and the relevant regulatory authority within the timeframes required by the DPDPA and, where applicable, within 72 hours as required by GDPR Article 33.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            <strong>7.1 Essential Cookies.</strong> We use session management and authentication cookies that are strictly necessary for the Platform to function. These cannot be disabled without impairing Platform functionality.
          </p>
          <p>
            <strong>7.2 Analytics Technologies.</strong> We use analytics tools including Google Analytics 4, PostHog, and Microsoft Clarity to collect aggregated, anonymised data about how users interact with the Platform. This data does not identify you personally. You may manage these through your browser settings or through our cookie consent interface.
          </p>
          <p>
            <strong>7.3 No Advertising Cookies.</strong> We do not use advertising cookies. We do not engage in cross-site tracking for advertising or retargeting purposes.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>8. Your Rights as a Data Principal / Data Subject</h2>

          <h3>8.1 Rights Under the Digital Personal Data Protection Act, 2023 (for Users in India)</h3>
          <p>
            As a <strong>Data Principal</strong> under the DPDPA, you have the following rights:
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Right</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Right to Information</strong></td>
                  <td>Know what personal data we hold about you, the purposes for which it is processed, and the identities of any parties with whom it is shared</td>
                </tr>
                <tr>
                  <td><strong>Right to Correction and Completeness</strong></td>
                  <td>Request that we correct inaccurate, incomplete, or outdated personal data</td>
                </tr>
                <tr>
                  <td><strong>Right to Erasure</strong></td>
                  <td>Request deletion of personal data we hold about you, subject to lawful retention obligations</td>
                </tr>
                <tr>
                  <td><strong>Right to Grievance Redressal</strong></td>
                  <td>Raise a complaint with our Grievance Officer and, if the complaint is not resolved to your satisfaction, escalate to the Data Protection Board of India</td>
                </tr>
                <tr>
                  <td><strong>Right to Nominate</strong></td>
                  <td>Nominate another individual to exercise your data rights on your behalf in the event of your death or incapacity</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            To exercise any of these rights, contact us at <a href="mailto:privacy@myjobhunter.in">privacy@myjobhunter.in</a>. We will acknowledge your request within <strong>48 hours</strong> and provide a substantive response within <strong>30 days</strong>.
          </p>

          <h3>8.2 Rights Under the GDPR (for Users in the EEA, UK, and Switzerland)</h3>
          <p>
            If you are located in the European Economic Area, the United Kingdom, or Switzerland, you have the following rights under the GDPR:
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Right</th>
                  <th>GDPR Article</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Right of Access</strong></td>
                  <td>Art. 15</td>
                  <td>Obtain a copy of the personal data we hold about you</td>
                </tr>
                <tr>
                  <td><strong>Right to Rectification</strong></td>
                  <td>Art. 16</td>
                  <td>Request correction of inaccurate personal data</td>
                </tr>
                <tr>
                  <td><strong>Right to Erasure</strong></td>
                  <td>Art. 17</td>
                  <td>Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;)</td>
                </tr>
                <tr>
                  <td><strong>Right to Restriction</strong></td>
                  <td>Art. 18</td>
                  <td>Request that we restrict processing of your data in certain circumstances</td>
                </tr>
                <tr>
                  <td><strong>Right to Data Portability</strong></td>
                  <td>Art. 20</td>
                  <td>Receive your personal data in a structured, commonly used, machine-readable format</td>
                </tr>
                <tr>
                  <td><strong>Right to Object</strong></td>
                  <td>Art. 21</td>
                  <td>Object to processing based on legitimate interests, including profiling</td>
                </tr>
                <tr>
                  <td><strong>Right to Withdraw Consent</strong></td>
                  <td>Art. 7(3)</td>
                  <td>Withdraw consent at any time where processing is based on consent, without affecting the lawfulness of prior processing</td>
                </tr>
                <tr>
                  <td><strong>Right to Lodge a Complaint</strong></td>
                  <td>Art. 77</td>
                  <td>Lodge a complaint with your local data protection supervisory authority</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Lawful Bases for Processing Under GDPR:</strong>
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>Lawful Basis</th>
                  <th>When Applied</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Consent</strong> (Art. 6(1)(a))</td>
                  <td>AI processing of your resume; transmitting applications to employers; optional analytics</td>
                </tr>
                <tr>
                  <td><strong>Contract Performance</strong> (Art. 6(1)(b))</td>
                  <td>Account management; subscription fulfilment; application tracking</td>
                </tr>
                <tr>
                  <td><strong>Legal Obligation</strong> (Art. 6(1)(c))</td>
                  <td>Financial record retention; responding to lawful government requests</td>
                </tr>
                <tr>
                  <td><strong>Legitimate Interests</strong> (Art. 6(1)(f))</td>
                  <td>Platform security; fraud prevention; aggregated, anonymised service improvement</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            To exercise any GDPR rights, contact us at <a href="mailto:privacy@myjobhunter.in">privacy@myjobhunter.in</a>. We will respond within <strong>30 days</strong> as required by GDPR Article 12. If you are dissatisfied with our response, you have the right to lodge a complaint with your national data protection supervisory authority. A directory of EU supervisory authorities is available at: <a href="https://edpb.europa.eu" target="_blank" rel="noopener noreferrer">https://edpb.europa.eu</a>
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>9. Consent and Withdrawal</h2>
          <p>
            <strong>9.1</strong> Where consent is the lawful basis for processing, you may withdraw it at any time.
          </p>
          <p>
            <strong>9.2</strong> Withdrawal of consent does not affect the lawfulness of any processing carried out before the withdrawal.
          </p>
          <p>
            <strong>9.3</strong> Withdrawing consent for core processing activities &mdash; such as AI resume curation or email application sending &mdash; will limit or prevent your use of those features of the Platform.
          </p>
          <p>
            <strong>9.4</strong> To withdraw consent, contact <a href="mailto:privacy@myjobhunter.in">privacy@myjobhunter.in</a> or use the consent management settings within your account.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>10. International Data Transfers</h2>
          <p>
            <strong>10.1</strong> The Platform is operated from India. Your personal data is primarily stored and processed within India.
          </p>
          <p>
            <strong>10.2</strong> Certain service providers, including LLM API providers and analytics tools, may process data outside India. We ensure such transfers are conducted only:
          </p>
          <ul>
            <li>To countries, organisations, or under mechanisms approved or notified by the Central Government of India under the DPDPA; and</li>
            <li>For EEA/UK residents, under Standard Contractual Clauses (SCCs) or other appropriate safeguards as required by GDPR Chapter V.</li>
          </ul>
          <p>
            <strong>10.3</strong> You may request details about the specific safeguards applicable to cross-border transfers of your data by contacting <a href="mailto:privacy@myjobhunter.in">privacy@myjobhunter.in</a>.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>11. Children&rsquo;s Privacy</h2>
          <p>
            <strong>11.1</strong> The Platform is intended exclusively for users who are <strong>16 years of age or older</strong>.
          </p>
          <p>
            <strong>11.2</strong> In compliance with the DPDPA, which requires verifiable parental or guardian consent before processing personal data of individuals under 18, we implement age verification at the point of registration. We do not knowingly collect personal data from individuals under 18.
          </p>
          <p>
            <strong>11.3</strong> If we become aware that personal data of a minor has been collected without appropriate consent, we will delete it promptly.
          </p>
          <p>
            <strong>11.4</strong> If you believe a minor has registered on the Platform, please contact us immediately at <a href="mailto:grievance@myjobhunter.in">grievance@myjobhunter.in</a>.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>12. Links to Third-Party Sites</h2>
          <p>
            The Platform may contain links to employer career pages, job board aggregators, and other third-party websites. This Privacy Policy does not apply to any third-party website or service. We encourage you to review the privacy policies of any external sites you visit before providing personal data to them.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>13. Grievance Officer</h2>
          <p>
            In accordance with the DPDPA, 2023 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the Company has designated a Grievance Officer for data-related concerns:
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <tbody>
                <tr>
                  <td><strong>Name</strong></td>
                  <td>[GRIEVANCE OFFICER NAME]</td>
                </tr>
                <tr>
                  <td><strong>Designation</strong></td>
                  <td>Grievance Officer / Data Protection Contact</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td><a href="mailto:grievance@myjobhunter.in">grievance@myjobhunter.in</a></td>
                </tr>
                <tr>
                  <td><strong>Postal Address</strong></td>
                  <td>[REGISTERED ADDRESS], Surat, Gujarat, India</td>
                </tr>
                <tr>
                  <td><strong>Acknowledgement</strong></td>
                  <td>Within 48 hours of receipt</td>
                </tr>
                <tr>
                  <td><strong>Resolution</strong></td>
                  <td>Within 30 days of receipt</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            If your complaint is not resolved to your satisfaction by the Grievance Officer within 30 days, you may escalate it to the <strong>Data Protection Board of India</strong> once operational under the DPDPA.
          </p>
          <p>
            <strong>For EEA/UK Users:</strong> If you are located in the EEA or UK and require an EU or UK representative under GDPR Article 27 / UK GDPR, their details will be published here when appointed: <strong>[EU/UK REPRESENTATIVE &mdash; TO BE APPOINTED]</strong>
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>14. Changes to This Privacy Policy</h2>
          <p>
            <strong>14.1</strong> We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Platform features.
          </p>
          <p>
            <strong>14.2</strong> The updated Policy will be posted at <a href="https://myjobhunter.in/privacy-policy" target="_blank" rel="noopener noreferrer">myjobhunter.in/privacy-policy</a> with a revised &ldquo;Last Revised&rdquo; date.
          </p>
          <p>
            <strong>14.3</strong> For material changes, we will notify you via your registered email address at least <strong>fifteen (15) days</strong> before the changes take effect.
          </p>
          <p>
            <strong>14.4</strong> Your continued use of the Platform after the effective date of the revised Policy constitutes your acceptance of the changes. If you do not agree to the revised Policy, you may request account deletion before the effective date.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>15. Contact Us</h2>
          <p>
            For all privacy-related enquiries, data access requests, consent withdrawals, or concerns:
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <tbody>
                <tr>
                  <td><strong>Privacy Email</strong></td>
                  <td><a href="mailto:privacy@myjobhunter.in">privacy@myjobhunter.in</a></td>
                </tr>
                <tr>
                  <td><strong>Grievance Email</strong></td>
                  <td><a href="mailto:grievance@myjobhunter.in">grievance@myjobhunter.in</a></td>
                </tr>
                <tr>
                  <td><strong>Website</strong></td>
                  <td><a href="https://myjobhunter.in" target="_blank" rel="noopener noreferrer">https://myjobhunter.in</a></td>
                </tr>
                <tr>
                  <td><strong>Postal Address</strong></td>
                  <td>[REGISTERED ADDRESS], Surat, Gujarat, India</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="divider" style={{ margin: '32px 0' }} />
          <p style={{ fontStyle: 'italic', fontSize: '13px', color: 'var(--text-dim)' }}>
            This Privacy Policy was last revised on June 16, 2026. We recommend reviewing it periodically.
          </p>
        </div>
      </div>
    </section>
  )
}

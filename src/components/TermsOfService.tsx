export default function TermsOfService() {
  return (
    <section className="section legal-page" aria-labelledby="tos-heading">
      <div className="section-inner" style={{ maxWidth: 800 }}>
        <div className="section-label">Legal</div>
        <h1 className="section-title" id="tos-heading" style={{ marginBottom: 12 }}>Terms of Service</h1>
        <p className="legal-meta" style={{ color: 'var(--text-dim)', fontSize: '14px', marginBottom: 32 }}>
          <strong>Effective Date:</strong> June 16, 2026 &nbsp;|&nbsp; <strong>Last Revised:</strong> June 16, 2026
        </p>

        <div className="legal-content">
          <hr className="divider" style={{ margin: '24px 0' }} />

          <h2>1. Introduction</h2>
          <p>
            JobHunter (&ldquo;Platform&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is operated by <strong>[LEGAL ENTITY NAME]</strong>, a company incorporated under the laws of India with its registered office at <strong>[REGISTERED ADDRESS]</strong>, India. The Platform is accessible at <a href="https://myjobhunter.in" target="_blank" rel="noopener noreferrer">myjobhunter.in</a> and its associated applications.
          </p>
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Platform. By creating an account or using any part of the Platform, you agree to be bound by these Terms and our <a href="/privacy-policy">Privacy Policy</a>. If you do not agree, do not use the Platform.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>2. Eligibility</h2>
          <p>
            You must be at least <strong>16 years of age</strong> to create an account and use the Platform. By registering, you represent and warrant that:
          </p>
          <ul>
            <li>You are at least 16 years old;</li>
            <li>You have the legal capacity to enter into a binding agreement;</li>
            <li>You are not barred from using the Platform under any applicable law; and</li>
            <li>All information you provide is accurate, current, and complete.</li>
          </ul>
          <p>
            The Platform is designed for individuals actively seeking employment, including college students (who must be 16 or older), recent graduates, unemployed professionals, and freelancers.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>3. Account Registration</h2>
          <p>
            <strong>3.1</strong> You must register an account to access the core features of the Platform.
          </p>
          <p>
            <strong>3.2</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.
          </p>
          <p>
            <strong>3.3</strong> You must notify us immediately at <a href="mailto:support@myjobhunter.in">support@myjobhunter.in</a> if you suspect unauthorised access to your account.
          </p>
          <p>
            <strong>3.4</strong> We reserve the right to suspend or terminate accounts that provide false, misleading, or outdated information.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>4. Description of Services</h2>
          <p>
            JobHunter provides an end-to-end intelligent job application platform comprising the following modules:
          </p>
          <p>
            <strong>4.1 Listing Sources.</strong><br />
            The Platform aggregates publicly available job listings from authorised sources, including job board aggregator APIs, public Applicant Tracking System (ATS) career pages, and authorised data partners. Aggregated job data is stored internally and is not exported or shared externally.
          </p>
          <p>
            <strong>4.2 AI Engine.</strong><br />
            The Platform uses artificial intelligence to analyse job descriptions and generate tailored resume variants based exclusively on information you have provided in your uploaded master resume. While the Platform utilizes deterministic validation constraints to prevent the AI Engine from fabricating or embellishing experience, skills, certifications, or achievements, artificial intelligence models can make mistakes or produce incorrect outputs. Every AI-generated document requires your <strong>explicit approval</strong> and review before any further processing or transmission, and you are solely responsible for verifying the accuracy of all generated content.
          </p>
          <p>
            <strong>4.3 Application Sender.</strong><br />
            Upon your explicit approval of a resume variant and your active instruction to apply, the Platform sends a professional application email &mdash; attaching your approved resume and cover letter &mdash; to the employer&rsquo;s contact address extracted from the job listing. This email transmission is performed on your behalf using static, human-reviewed templates.
          </p>
          <p>
            <strong>4.4 Application Tracking.</strong><br />
            The Platform logs outbound application emails and tracks status updates such as sent, replied, interview scheduled, rejected, or no response.
          </p>
          <p>
            <strong>4.5 Skill Development Programme</strong> <em>(Future Phase).</em><br />
            A paid placement programme delivered by verified professional mentors. Separate terms specific to this programme will be published when the feature launches.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>5. No Fabrication Policy</h2>
          <p>
            <strong>5.1</strong> The AI Engine is bound by a strict no-fabrication rule. It may only reorder, rephrase, and emphasise existing content drawn from your uploaded resume. It cannot create new content.
          </p>
          <p>
            <strong>5.2</strong> If a required skill or qualification is absent from your resume, the AI Engine records it as a skill gap &mdash; it does not add it to your resume.
          </p>
          <p>
            <strong>5.3</strong> Any AI-generated resume variant containing fabricated content is automatically rejected by the Platform&rsquo;s deterministic validation layer and is never transmitted to any employer.
          </p>
          <p>
            <strong>5.4</strong> You remain solely responsible for the accuracy and honesty of the source resume you upload. Uploading a resume containing false information is a breach of these Terms and may constitute fraud under applicable law.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>6. User Approval Gate</h2>
          <p>
            <strong>6.1</strong> No AI-generated resume variant or cover letter is sent to any employer without your <strong>explicit prior approval</strong>.
          </p>
          <p>
            <strong>6.2</strong> Approval is obtained through a signed, time-limited approval link delivered to your registered email address, or through the in-application approval interface when available.
          </p>
          <p>
            <strong>6.3</strong> Once you approve a variant, you authorise the Platform to transmit the approved documents to the employer contact associated with the relevant job listing.
          </p>
          <p>
            <strong>6.4</strong> You may reject a variant and submit feedback for re-generation at any time before approval.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>7. Authorisation to Act on Your Behalf</h2>
          <p>
            <strong>7.1</strong> By approving a resume variant and instructing the Platform to apply, you grant the Company a limited, revocable authorisation to:
          </p>
          <ul>
            <li>Send a job application email on your behalf to the employer identified in the job listing;</li>
            <li>Attach your approved resume PDF and cover letter PDF to that email;</li>
            <li>Log the sent email in your application dashboard; and</li>
            <li>Record any status updates associated with that application.</li>
          </ul>
          <p>
            <strong>7.2</strong> This authorisation is strictly limited to the approved job application and does not extend to any other communication or action on your behalf.
          </p>
          <p>
            <strong>7.3</strong> The Platform applies a daily sending limit and a minimum interval between consecutive sends. These limits protect your sender reputation and promote responsible application practices.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>8. User Obligations and Prohibited Conduct</h2>
          <p>
            <strong>8.1</strong> You agree to use the Platform only for lawful job-seeking purposes.
          </p>
          <p>
            <strong>8.2</strong> You must not:
          </p>
          <ul>
            <li>Upload a resume containing false, fabricated, or misleading information;</li>
            <li>Attempt to circumvent the approval gate or the no-fabrication validation system;</li>
            <li>Use the Platform to send unsolicited, bulk, or spam email to employers;</li>
            <li>Attempt to reverse-engineer, copy, or exploit the Platform&rsquo;s proprietary job dataset;</li>
            <li>Use the Platform to apply for positions for which you have no genuine intent;</li>
            <li>Impersonate another person or submit another person&rsquo;s resume without their express consent;</li>
            <li>Attempt to gain unauthorised access to the Platform&rsquo;s systems, databases, or other users&rsquo; accounts;</li>
            <li>Use automated bots, scripts, or tools to interact with the Platform in ways not permitted by the Platform&rsquo;s published interfaces;</li>
            <li>Introduce malware, viruses, or any harmful code into the Platform.</li>
          </ul>
          <p>
            <strong>8.3</strong> Violation of these obligations may result in immediate account suspension or termination and, where applicable, referral to law enforcement authorities.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>9. Subscriptions and Payments</h2>
          <p>
            <strong>9.1 Free Tier:</strong> A limited set of features is available without payment, subject to usage caps described on the Platform&rsquo;s pricing page.
          </p>
          <p>
            <strong>9.2 Paid Tiers:</strong> Premium features are available under one-month or three-month subscription plans. Pricing is displayed on the Platform&rsquo;s pricing page and is subject to change with <strong>thirty (30) days&rsquo;</strong> prior notice to existing subscribers.
          </p>
          <p>
            <strong>9.3 Billing:</strong> Subscriptions are billed in advance on the billing cycle selected at the time of purchase (one-month or three-month). All prices are in Indian Rupees (INR) unless otherwise stated.
          </p>
          <p>
            <strong>9.4 Auto-Renewal:</strong> Subscriptions renew automatically at the end of each billing cycle unless cancelled by you before the renewal date.
          </p>
          <p>
            <strong>9.5 Taxes:</strong> Applicable Goods and Services Tax (GST) and any other statutory taxes will be added to your invoice as required under Indian law.
          </p>
          <p>
            <strong>9.6 Payment Processing:</strong> Payments are processed by third-party payment gateway providers. We do not store your full card or banking credentials on our servers.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>10. Intellectual Property</h2>
          <p>
            <strong>10.1 Platform IP.</strong> All software, algorithms, AI models, templates, trademarks, and other content comprising the Platform are owned by or licensed to the Company and are protected under applicable intellectual property laws.
          </p>
          <p>
            <strong>10.2 Your Content.</strong> You retain ownership of your uploaded resume, profile information, and any other content you submit. By uploading content, you grant the Company a limited, non-exclusive, royalty-free licence to process, store, and use your content solely to provide the Platform&rsquo;s services to you.
          </p>
          <p>
            <strong>10.3 AI-Generated Variants.</strong> AI-generated resume variants are derived from your content. Ownership of such variants vests in you, subject to our right to use them for service delivery.
          </p>
          <p>
            <strong>10.4 Feedback.</strong> Any suggestions, ideas, or feedback you provide to the Company may be used by the Company to improve the Platform without restriction or compensation to you.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>11. Third-Party Services and Employers</h2>
          <p>
            <strong>11.1</strong> The Platform sends application emails to third-party employers based on job listings aggregated from external sources. The Company does not control, endorse, or verify the accuracy of any job listing or employer information.
          </p>
          <p>
            <strong>11.2</strong> Your interaction with employers following an application sent through the Platform is solely between you and the employer. The Company is not a party to any employment relationship, offer, or negotiation.
          </p>
          <p>
            <strong>11.3</strong> The Company is not responsible for outcomes including, but not limited to, failure to receive responses, rejection of applications, or fraudulent job listings.
          </p>
          <p>
            <strong>11.4</strong> The Platform flags job listings where the contact address is a personal free-email domain (e.g., Gmail, Yahoo) as lower-trust and will warn you accordingly. You acknowledge that you assume full responsibility for any application you approve to such contacts.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>12. Disclaimer of Warranties</h2>
          <p>
            <strong>12.1</strong> The Platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, express or implied.
          </p>
          <p>
            <strong>12.2</strong> The Company does not warrant that:
          </p>
          <ul>
            <li>The Platform will be uninterrupted, error-free, or secure;</li>
            <li>Job listings are accurate, current, or free of fraud;</li>
            <li>AI-generated resume variants will result in interview calls or employment offers;</li>
            <li>Application emails will be received or read by the intended employer; or</li>
            <li>The Platform will meet your specific requirements.</li>
          </ul>
          <p>
            <strong>12.3</strong> To the fullest extent permitted by applicable law, the Company disclaims all implied warranties, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>13. Limitation of Liability</h2>
          <p>
            <strong>13.1</strong> To the maximum extent permitted by applicable law, the Company&rsquo;s total aggregate liability to you for any and all claims arising under or in connection with these Terms shall not exceed the total subscription fees paid by you to the Company in the <strong>three (3) calendar months</strong> immediately preceding the event giving rise to the claim, or INR 1,000 (whichever is higher).
          </p>
          <p>
            <strong>13.2</strong> In no event shall the Company be liable for indirect, incidental, special, consequential, or punitive damages, including loss of employment opportunity, loss of data, or loss of revenue, even if the Company has been advised of the possibility of such damages.
          </p>
          <p>
            <strong>13.3</strong> Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded or limited by applicable law.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>14. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless the Company and its officers, employees, and agents from and against any claims, damages, costs, and expenses (including reasonable legal fees) arising from or related to:
          </p>
          <ul>
            <li>Your breach of these Terms;</li>
            <li>Your use of the Platform in violation of any applicable law;</li>
            <li>Content you submit to the Platform, including any false resume information;</li>
            <li>Any application sent on your behalf that violates an employer&rsquo;s application policies; or</li>
            <li>Any dispute between you and an employer.</li>
          </ul>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>15. Termination</h2>
          <p>
            <strong>15.1 By You.</strong> You may terminate your account at any time by contacting <a href="mailto:support@myjobhunter.in">support@myjobhunter.in</a> or through your account settings. Termination does not entitle you to a refund for any unused portion of a prepaid subscription period.
          </p>
          <p>
            <strong>15.2 By Us.</strong> The Company may suspend or terminate your account, with or without notice, if you breach these Terms, engage in fraudulent activity, or if the Company discontinues the Platform.
          </p>
          <p>
            <strong>15.3 Effect of Termination.</strong> Upon termination, your access to the Platform ceases. Your personal data will be handled in accordance with our Privacy Policy and applicable law. Provisions of these Terms that by their nature should survive termination &mdash; including Sections 5, 10, 12, 13, 14, and 16 &mdash; shall survive.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>16. Governing Law and Dispute Resolution</h2>
          <p>
            <strong>16.1</strong> These Terms are governed by and construed in accordance with the laws of the <strong>Republic of India</strong>.
          </p>
          <p>
            <strong>16.2</strong> Any dispute arising out of or in connection with these Terms, including any question regarding their existence, validity, or termination, shall be subject to the exclusive jurisdiction of the courts located in <strong>Surat, Gujarat, India</strong>.
          </p>
          <p>
            <strong>16.3</strong> Before initiating formal legal proceedings, you agree to first contact the Company&rsquo;s Grievance Officer (details in Section 17) and allow <strong>thirty (30) days</strong> for good-faith resolution.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>17. Grievance Officer</h2>
          <p>
            In accordance with the Information Technology Act, 2000, the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and the Digital Personal Data Protection Act, 2023, the Company has designated a Grievance Officer:
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
                  <td>Grievance Officer</td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td><a href="mailto:grievance@myjobhunter.in">grievance@myjobhunter.in</a></td>
                </tr>
                <tr>
                  <td><strong>Address</strong></td>
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

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>18. Changes to These Terms</h2>
          <p>
            <strong>18.1</strong> We may update these Terms from time to time. The revised Terms will be posted on the Platform with an updated &ldquo;Last Revised&rdquo; date.
          </p>
          <p>
            <strong>18.2</strong> For material changes, we will notify you via your registered email address at least <strong>fifteen (15) days</strong> before the changes take effect.
          </p>
          <p>
            <strong>18.3</strong> Your continued use of the Platform after the effective date of revised Terms constitutes your acceptance of the changes. If you do not agree to the revised Terms, you must stop using the Platform and may request account deletion.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>19. Miscellaneous</h2>
          <p>
            <strong>19.1 Entire Agreement.</strong> These Terms and the Privacy Policy constitute the entire agreement between you and the Company regarding the Platform and supersede all prior agreements on the same subject.
          </p>
          <p>
            <strong>19.2 Severability.</strong> If any provision of these Terms is found to be unenforceable under applicable law, the remaining provisions will continue in full force and effect.
          </p>
          <p>
            <strong>19.3 No Waiver.</strong> Failure by the Company to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision.
          </p>
          <p>
            <strong>19.4 Assignment.</strong> You may not assign your rights or obligations under these Terms without our prior written consent. The Company may assign its rights and obligations in connection with a merger, acquisition, or sale of substantially all of its assets.
          </p>
          <p>
            <strong>19.5 Language.</strong> These Terms are drafted in the English language. In the event of any conflict with a translated version, the English version shall prevail.
          </p>

          <hr className="divider" style={{ margin: '32px 0' }} />

          <h2>20. Contact</h2>
          <p>
            For questions or concerns about these Terms:
          </p>
          <div className="table-responsive">
            <table className="legal-table">
              <tbody>
                <tr>
                  <td><strong>Email</strong></td>
                  <td><a href="mailto:legal@myjobhunter.in">legal@myjobhunter.in</a></td>
                </tr>
                <tr>
                  <td><strong>Website</strong></td>
                  <td><a href="https://myjobhunter.in" target="_blank" rel="noopener noreferrer">https://myjobhunter.in</a></td>
                </tr>
                <tr>
                  <td><strong>Address</strong></td>
                  <td>[REGISTERED ADDRESS], Surat, Gujarat, India</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="divider" style={{ margin: '32px 0' }} />
          <p style={{ fontStyle: 'italic', fontSize: '13px', color: 'var(--text-dim)' }}>
            These Terms were last revised on June 16, 2026. We recommend reviewing them periodically.
          </p>
        </div>
      </div>
    </section>
  )
}

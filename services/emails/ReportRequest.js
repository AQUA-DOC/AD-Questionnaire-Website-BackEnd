import "dotenv/config";

        // Test 'From' email: Acme <onboarding@resend.dev>
        // Test 'To' email: delivered@resend.dev


// Function for building Report-Request emails.
function buildReportRequestEmail(queuedData = {}) {
  const {
    employeeName = 'Unknown',
    reportName = 'Unknown Report',
    reportDescription = '',
    reportQuestion = '',
    frequency = 'N/A',
    intendedUse = '',
    delivery = 'N/A',
    needsBackfill = 'false',
    backfillDetails = '',
    submittedAt = new Date().toISOString()
  } = queuedData;

  // Set Constants
  const from = process.env.EMAIL_FROM ?? 'report-request@aquadocinc.org';
  const to = (process.env.EMAIL_TO ?? 'cray@aquadocinc.com')
    .split(',')
    .map(e => e.trim());

  return {
    from,
    to,
    subject: `ReportRequest: ${employeeName} - ${reportName}`,
    html: `
      <h1>Report Request</h1>

      <p><strong>Report Name:</strong> ${reportName}</p>
      <p><strong>Requested By:</strong> ${employeeName}</p>

      <p><strong>Description:</strong><br/>${reportDescription}</p>

      <p><strong>Report Question(s):</strong><br/>${reportQuestion}</p>

      <p><strong>Frequency:</strong> ${frequency}</p>

      <p><strong>Intended Use:</strong><br/>${intendedUse}</p>

      <p><strong>Delivery Method:</strong> ${delivery}</p>

      <p><strong>Needs Historical Backfill:</strong> ${needsBackfill === 'true' ? 'Yes' : 'No'}</p>

      ${
        needsBackfill === 'true'
          ? `<p><strong>Backfill Details:</strong><br/>${backfillDetails}</p>`
          : ''
      }

      <p><strong>Submitted At:</strong> ${submittedAt}</p>
    `
  };
}


export default buildReportRequestEmail;
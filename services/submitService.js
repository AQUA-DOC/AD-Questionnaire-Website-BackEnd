import { logger } from "../utils/logger.js";
import {
  enqueueEmail,
  queueSize
} from "../store/emailQueue.js";



const processReportRequest = async (req, res) => {
    try {
        let startQueueSize = queueSize();

        // Build the email to be later sent.
        let queuedData = req;

        // Test 'From' email: Acme <onboarding@resend.dev>
        // Test 'To' email: delivered@resend.dev

        // Build the email from passed information
        let email = {
            from: 'report-request@aquadocinc.org',
            to: ['cray@aquadocinc.com'],
            subject: `ReportRequest: ${queuedData.employeeName} - ${queuedData.reportName}`,
            html: `
                    <h1>Report Request</h1>

                    <p><strong>Report Name:</strong> ${queuedData.reportName}</p>
                    <p><strong>Requested By:</strong> ${queuedData.employeeName}</p>

                    <p><strong>Description:</strong><br/>${queuedData.reportDescription}</p>

                    <p><strong>Report Question(s):</strong><br/>${queuedData.reportQuestion}</p>

                    <p><strong>Frequency:</strong> ${queuedData.frequency}</p>

                    <p><strong>Intended Use:</strong><br/>${queuedData.intendedUse}</p>

                    <p><strong>Delivery Method:</strong> ${queuedData.delivery}</p>

                    <p><strong>Needs Historical Backfill:</strong>${queuedData.needsBackfill === 'true' ? 'Yes' : 'No'}</p>

                    ${
                        queuedData.needsBackfill === 'true'
                        ? `<p><strong>Backfill Details:</strong><br/>${queuedData.backfillDetails}</p>`
                        : ''
                    }

                    <p><strong>Submitted At:</strong> ${queuedData.submittedAt}</p>
                    `,
        }

        // Send to in-memory queue for batch processing
        enqueueEmail(email);
        let endQueueSize = queueSize();

        // console.log(`start size is: ${startQueueSize}`)
        // console.log(`end queue size is: ${endQueueSize}`)

        if (endQueueSize > startQueueSize) {
            let response = {
                status: 200,
                message: "success or data payload"
            }
            return response;
        }

        let response = {
                status: 400,
                message: "Error encountered"
            }

        logger.error("Error Storing data in memory. Data to be stored was...", {email});

        return response;
    } catch (error) {
        console.log(error);
        logger.error("Catch error in submitService:", {error})
    }
}


export default processReportRequest;
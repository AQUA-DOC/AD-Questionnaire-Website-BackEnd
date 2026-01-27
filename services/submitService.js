import { logger } from "../utils/logger.js";
import {
  enqueueEmail,
  queueSize
} from "../store/emailQueue.js";
// Import email templates
import buildReportRequestEmail from "./emails/ReportRequest.js";
import buildBranchManagerQuestionnaireEmail from "./emails/buildBranchManagerQuestionnaireEmail.js";


// submitService.js handles all submissions.
// It passes each submission type to its designated email creator / assembler


const processReportRequest = async (req, res) => {
    try {
        // initialize variables
        let startQueueSize = queueSize();
        let endQueueSize;
        let queuedData = req;
        let messageType;

        // Check message type
        if (queuedData?.messageType) {
            // Safe to use queuedData.messageType
            console.log(queuedData.messageType);
            messageType = queuedData.messageType;
        }

        // Declare the email variable
        let email;

        // Build the passed messageType and send to queue for batch processing.
        switch (messageType) {

        // Process Report-Requests
            case "report-request":
                console.log("Switch Statement Report Request Hit");
                // Build the email
                email = buildReportRequestEmail(queuedData);

                console.log(email);
                // Send email to queue for batch processing
                enqueueEmail(email);
                // increase queue size
                endQueueSize = queueSize();
                break;

        // Process Branch Manager Questionnaire
            case "branch-manager-questions":
                console.log("Switch statement branch manager questionnaire submission hit.")
                email = buildBranchManagerQuestionnaireEmail(queuedData)

                console.log(email);
                // Send email to queue for batch processing
                enqueueEmail(email);
                // increase queue size
                endQueueSize = queueSize();
                break;

        // Default response if not cases found.
            default:
                console.warn("Unknown or missing messageType");
                logger.error("ERROR: messageType not passed");
        }


        // Check if queue size increased.
        if (endQueueSize > startQueueSize) {
            // Return Success Message
            let response = {
                status: 200,
                message: "success or data payload"
            }
            return response;
        }
        // Return error message
        let response = {
                status: 400,
                message: "Error encountered"
            }
        // Log and return error
        logger.error("Error Storing data in memory. Data to be stored was...", {email});
        return response;
    } catch (error) {
        console.log(error);
        logger.error("Catch error in submitService:", {error})
    }
}


export default processReportRequest;
import { logger } from "../utils/logger.js";
import {
  enqueueEmail,
  queueSize
} from "../store/emailQueue.js";
// Import email templates
import buildReportRequestEmail from "./emails/ReportRequest.js";
import buildBranchManagerQuestionnaireEmail from "./emails/buildBranchManagerQuestionnaireEmail.js";
import buildRegionalManagerQuestionnaireEmail from "./emails/buildRegionalManagerQuestionnaireEmail.js";
import buildFinanceTeamQuestionnaireEmail from "./emails/buildFinanceTeamQuestionnaireEmail.js";
import buildClientCareTeamQuestionnaireEmail from "./emails/buildClientCareTeamQuestionnaireEmail.js";
import buildFountainsTeamQuestionnaireEmail from "./emails/buildFountainsTeamQuestionnaireEmail.js";



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
                // Build the email
                email = buildReportRequestEmail(queuedData);
                // Send email to queue for batch processing
                enqueueEmail(email);
                // increase queue size
                endQueueSize = queueSize();
                break;


        // Process Branch Manager Questionnaire
            case "branch-manager-questions":
                // build the email
                email = buildBranchManagerQuestionnaireEmail(queuedData)
                // Send email to queue for batch processing
                enqueueEmail(email);
                // increase queue size
                endQueueSize = queueSize();
                break;
            

        // Process Regional Manager Questionnaire
            case "regional-manager-questions":
                // build the email
                email = buildRegionalManagerQuestionnaireEmail(queuedData);
                // Send email to queue for batch processing
                enqueueEmail(email);
                // increase queue size
                endQueueSize = queueSize();
                break;


            case "finance-team-questions":
                // build the email
                email = buildFinanceTeamQuestionnaireEmail(queuedData);
                // Send email to queue for batch processing
                enqueueEmail(email);
                // increase queue size
                endQueueSize = queueSize();
                break;


            case "client-care-questions":
                // build the email
                email = buildClientCareTeamQuestionnaireEmail(queuedData);
                // Send email to queue for batch processing
                enqueueEmail(email);
                // increase queue size
                endQueueSize = queueSize();
                break;


            case "fountains-team-questions":
                // build the email
                email = buildFountainsTeamQuestionnaireEmail(queuedData)
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
        logger.error("Error Storing data in memory. Data to be stored was...", {
                    from: email.from,
                    to: email.to,
                    subject: email.subject,
                    htmlLength: email.html?.length
                });
        return response;
    } catch (error) {
        console.log(error);
        logger.error("Catch error in submitService:", {error})
    }
}


export default processReportRequest;
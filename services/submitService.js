// const {enqueueEmail, queueSize} = require("../store/emailQueue");
import {
  enqueueEmail,
  drainEmailQueue,
  queueSize
} from "../store/emailQueue.js";



const processReportRequest = async (req, res) => {
    try {
        // const queryParams = 'id, route, category, title, affiliate_link, link_text, view_count';
        // const readAllQuery = `SELECT ${queryParams} FROM page_content ORDER BY view_count DESC`;
        // const { rows } = await database.query(readAllQuery);
        console.log("Inside submit.service.js processReportRequest")
        console.log(req)
        let startQueueSize = queueSize();
        // sendToEmailQueue(req.data)
        enqueueEmail(req);
        let endQueueSize = queueSize();

        console.log(`start size is: ${startQueueSize}`)
        console.log(`end queue size is: ${endQueueSize}`)

        if (endQueueSize > startQueueSize) {
            let response = {
                status: 200,
                message: "success or data payload"
            }
            return response;
        }

        let response = {
                status: 404,
                message: "Error encountered"
            }
        console.log(response)
        return response;

        // if (rows !== undefined) {
        //     let response = {
        //         status: 200,
        //         message: rows
        //     }
        //     return response;
        // } else {
        //     let response = {
        //         status: 400,
        //         message: "Error"
        //     }
        //     return response;
        // }

    } catch (error) {
        console.log(error);
    }
}


export default processReportRequest;
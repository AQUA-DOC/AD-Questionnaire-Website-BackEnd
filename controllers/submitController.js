// const submitService = require('../services/submitService');
import processReportRequest from '../services/submitService.js';


const processReportRequestController = async (req, res) => {
    const result = await processReportRequest(req.body);
    console.log("Response is back at Controller")
    console.log(result)
    // res.send(result);
    res.status(200).json({ message: "Success Message." });
}


export default processReportRequestController;
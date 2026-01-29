import processReportRequest from '../services/submitService.js';


const processReportRequestController = async (req, res) => {
    const result = await processReportRequest(req.body);
    if (result !== undefined && result.status == 200) {
        res.status(200).json({ message: "Success Message." });
    } else {
        res.status(400).json({ message: "Problem encountered processing. Error returned to Controller." })
    }
}


export default processReportRequestController;
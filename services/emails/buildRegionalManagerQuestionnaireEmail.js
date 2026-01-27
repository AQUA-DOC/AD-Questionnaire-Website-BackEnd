import "dotenv/config";

// Function for building Regional Manager Questionnaire emails.
function buildRegionalManagerQuestionnaireEmail(queuedData = {}) {
  const {
    // Page 1
    name = "Unknown",
    routesInRegion = "Unknown",
    tenure = "",
    positionFocus = "",

    // Page 2 (Corporate)
    corporatePositives = "",
    corporateNegatives = "",
    corporateFutureSupport = "",

    // Page 3 (RealGreen)
    realGreenUseful = "",
    realGreenFrustrations = "",
    realGreenMissing = "",

    // Page 4 (General)
    scheduleMgmtVisits = "N/A",
    scheduleFountainsWork = "N/A",
    salesOpportunitySource = "",

    // Page 5 (Clients)
    clientIssuesNeedingInvolvement = "",
    recurringQualityIssues = "false",
    recurringQualityCauses = "",
    siteInfoEasierToCapture = "",
    everyVisitInfo = "",

    // Page 6
    meetInPerson = "",
    otherInput = "",

    submittedAt = new Date().toISOString(),
  } = queuedData;

  // Email routing
  const from =
    process.env.EMAIL_FROM ?? "regional-manager-questions@aquadocinc.org";

  const to = (process.env.EMAIL_TO ?? "cray@aquadocinc.com")
    .split(",")
    .map((e) => e.trim());

  // Small helper to make the sales source readable
  const salesSourceLabelMap = {
    "existing-clients": "Existing Clients",
    "new-leads": "New Leads",
    referrals: "Referrals",
    consultations: "Consultations",
  };
  const salesSourceLabel =
    salesSourceLabelMap[salesOpportunitySource] ?? salesOpportunitySource ?? "";

  return {
    from,
    to,
    subject: `Regional Manager Questionnaire: ${name} (${routesInRegion})`,
    html: `
      <h1>Regional Manager Questionnaire</h1>

      <h2>Role Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Routes in region:</strong> ${routesInRegion}</p>
      <p><strong>How long have you worked for AQUA DOC?</strong> ${tenure}</p>
      <p><strong>Focus of position:</strong><br/>${positionFocus}</p>

      <hr/>

      <h2>Corporate</h2>
      <p><strong>Positive effects of corporate:</strong><br/>${corporatePositives}</p>
      <p><strong>Negative effects of corporate:</strong><br/>${corporateNegatives}</p>
      <p><strong>How corporate could better support your position:</strong><br/>${corporateFutureSupport}</p>

      <hr/>

      <h2>RealGreen</h2>
      <p><strong>Most useful parts of RealGreen:</strong><br/>${realGreenUseful}</p>
      <p><strong>Parts that cause frustration:</strong><br/>${realGreenFrustrations}</p>
      <p><strong>What RealGreen should be able to do:</strong><br/>${realGreenMissing}</p>

      <hr/>

      <h2>General</h2>
      <p><strong>Accurate schedule for management visits:</strong> ${scheduleMgmtVisits}</p>
      <p><strong>Accurate schedule for fountains work:</strong> ${scheduleFountainsWork}</p>
      <p><strong>Most sales opportunities come from:</strong> ${
        salesSourceLabel || "(Not provided)"
      }</p>

      <hr/>

      <h2>Clients</h2>
      <p><strong>Client issues that most often require involvement:</strong><br/>${clientIssuesNeedingInvolvement}</p>
      <p><strong>Recurring quality issues across region:</strong> ${
        recurringQualityIssues === "true" ? "Yes" : "No"
      }</p>

      ${
        recurringQualityIssues === "true"
          ? `<p><strong>Believed causes:</strong><br/>${recurringQualityCauses}</p>`
          : ""
      }

      <p><strong>Info you wish was easier to capture/reference:</strong><br/>${siteInfoEasierToCapture}</p>
      <p><strong>Info that could be recorded at every visit without adding much time:</strong><br/>${everyVisitInfo}</p>

      <hr/>

      <h2>Follow-up</h2>
      <p><strong>Meet in person?</strong><br/>${meetInPerson}</p>

      ${
        otherInput
          ? `<hr/><h2>Additional Input</h2><p>${otherInput}</p>`
          : ""
      }

      <hr/>

      <p><strong>Submitted At:</strong> ${submittedAt}</p>
    `,
  };
}

export default buildRegionalManagerQuestionnaireEmail;
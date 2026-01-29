import "dotenv/config";

// Function for building Finance Team Questionnaire emails.
function buildFinanceTeamQuestionnaireEmail(queuedData = {}) {
  const {
    // Page 1
    name = "Unknown",
    tenure = "",
    positionFocus = "",

    // Page 2 (General)
    frequentTasks = "",
    manualTracking = "",
    infoNeedNoAccess = "",
    infoRequestFromOthers = "",

    // Page 3 (General Continued)
    accountInfoWishVisible = "",
    inconsistentProcesses = "",
    clientsRequestFinanceInfo = "",
    billingIssuesBeforeFinance = "",

    // Page 4 (Billing)
    billingCommonIssues = "",
    billingQuestionsHard = "false",
    billingQuestionsHardExplain = "",
    paymentPreference = "",
    customPaymentPlanExplain = "",

    // Page 5 (RealGreen)
    realGreenUseful = "",
    realGreenFrustrations = "",
    realGreenMissing = "",
    financeBetterCustomerExperience = "",

    // Page 6
    meetInPerson = "false",
    meetInPersonDetails = "",
    otherInput = "",

    submittedAt = new Date().toISOString(),
  } = queuedData;

  // Email routing
  const from =
    process.env.EMAIL_FROM ?? "finance-team-questions@aquadocinc.org";

  const to = (process.env.EMAIL_TO ?? "cray@aquadocinc.com")
    .split(",")
    .map((e) => e.trim());

  const paymentLabelMap = {
    yearly: "Yearly",
    quarterly: "Quarterly",
    monthly: "Monthly",
    "50-down-balance-on-completion": "50% down, balance on completion",
    "custom-payment-plan": "Custom payment plan",
    "": "N/A",
    undefined: "N/A",
    null: "N/A",
  };

  const paymentLabel =
    paymentLabelMap[paymentPreference] ?? String(paymentPreference);

  return {
    from,
    to,
    subject: `Finance Team Questionnaire: ${name}`,
    html: `
      <h1>Finance Team Questionnaire</h1>

      <h2>Role Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>How long have you worked for AQUA DOC?</strong><br/>${tenure}</p>
      <p><strong>Focus of your position:</strong><br/>${positionFocus}</p>

      <hr/>

      <h2>General (Day-to-Day)</h2>
      <p><strong>Finance tasks worked on most frequently:</strong><br/>${frequentTasks}</p>
      <p><strong>Information tracked manually / outside current systems:</strong><br/>${manualTracking}</p>
      <p><strong>Financial info needed but not always easy to access:</strong><br/>${infoNeedNoAccess}</p>
      <p><strong>Info often requested from other departments:</strong><br/>${infoRequestFromOthers}</p>

      <hr/>

      <h2>General (Continued)</h2>
      <p><strong>Info that should always be present/visible on an account:</strong><br/>${accountInfoWishVisible}</p>
      <p><strong>Inconsistent finance-related processes across branches/regions:</strong><br/>${inconsistentProcesses}</p>
      <p><strong>Info clients regularly request from finance:</strong><br/>${clientsRequestFinanceInfo}</p>
      <p><strong>Billing issues that originate before reaching finance:</strong><br/>${billingIssuesBeforeFinance}</p>

      <hr/>

      <h2>Billing</h2>
      <p><strong>Most common billing / invoice issues:</strong><br/>${billingCommonIssues}</p>
      <p><strong>Customer billing questions difficult to answer quickly:</strong> ${
        billingQuestionsHard === "true" ? "Yes" : "No"
      }</p>

      ${
        billingQuestionsHard === "true"
          ? `<p><strong>Elaboration:</strong><br/>${billingQuestionsHardExplain}</p>`
          : ""
      }

      <p><strong>How most clients want to pay:</strong> ${paymentLabel}</p>

      ${
        paymentPreference === "custom-payment-plan" && customPaymentPlanExplain
          ? `<p><strong>Custom payment plan details:</strong><br/>${customPaymentPlanExplain}</p>`
          : ""
      }

      <hr/>

      <h2>RealGreen</h2>
      <p><strong>Most useful parts of RealGreen:</strong><br/>${realGreenUseful}</p>
      <p><strong>Parts that slow down / cause frustration:</strong><br/>${realGreenFrustrations}</p>
      <p><strong>Things RealGreen should be able to do:</strong><br/>${realGreenMissing}</p>

      <hr/>

      <h2>Customer Experience</h2>
      <p><strong>How finance could provide a better customer experience:</strong><br/>${financeBetterCustomerExperience}</p>

      <hr/>

      <h2>Follow-up</h2>
      <p><strong>Would you like to meet in person?</strong> ${
        meetInPerson === "true" ? "Yes" : "No"
      }</p>

      ${
        meetInPerson === "true"
          ? `<p><strong>Topics to cover:</strong><br/>${meetInPersonDetails}</p>`
          : ""
      }

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

export default buildFinanceTeamQuestionnaireEmail;
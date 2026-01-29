import "dotenv/config";

// Function for building Client Care Specialist Questionnaire emails.
function buildClientCareTeamQuestionnaireEmail(queuedData = {}) {
  const {
    // Page 1
    name = "Unknown",
    tenure = "",
    positionFocus = "",

    // Page 2 (Customer Calls)
    mostCommonCallReason = "",
    otherCallReasons = "",
    questionsCantAnswer = "",

    // Page 3 (New Customers)
    newCustomerInfoNeeded = "",
    serviceQuestionsAsked = "",
    canScheduleConsultation = "false",
    consultationSchedulingBlockers = "",

    // Page 4 (RealGreen)
    realGreenUseful = "",
    realGreenFrustrations = "",
    realGreenMissing = "",
    accountInfoToKnow = "",
    clientCareBetterExperience = "",

    // Page 5
    meetInPerson = "false",
    meetInPersonDetails = "",
    otherInput = "",

    submittedAt = new Date().toISOString(),
  } = queuedData;

  // Email routing
  const from =
    process.env.EMAIL_FROM ?? "client-care-questions@aquadocinc.org";

  const to = (process.env.EMAIL_TO ?? "cray@aquadocinc.com")
    .split(",")
    .map((e) => e.trim());

  return {
    from,
    to,
    subject: `Client Care Questionnaire: ${name}`,
    html: `
      <h1>Client Care Specialist Questionnaire</h1>

      <h2>Role Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>How long have you worked for AQUA DOC?</strong><br/>${tenure}</p>
      <p><strong>Focus of your position:</strong><br/>${positionFocus}</p>

      <hr/>

      <h2>Customer Calls</h2>
      <p><strong>Most common reason clients call:</strong><br/>${mostCommonCallReason}</p>
      <p><strong>Other reasons clients call:</strong><br/>${otherCallReasons}</p>
      <p><strong>Questions you can’t answer yourself:</strong><br/>${questionsCantAnswer}</p>

      <hr/>

      <h2>New Customers</h2>
      <p><strong>Info needed from a new caller:</strong><br/>${newCustomerInfoNeeded}</p>
      <p><strong>Questions asked about the requested service:</strong><br/>${serviceQuestionsAsked}</p>
      <p><strong>Can schedule the consultation before hanging up:</strong> ${
        canScheduleConsultation === "true" ? "Yes" : "No"
      }</p>

      ${
        canScheduleConsultation === "false" && consultationSchedulingBlockers
          ? `<p><strong>If no, what prevents it:</strong><br/>${consultationSchedulingBlockers}</p>`
          : ""
      }

      <hr/>

      <h2>RealGreen</h2>
      <p><strong>Most useful parts of RealGreen:</strong><br/>${realGreenUseful}</p>
      <p><strong>Parts that slow down / cause frustration:</strong><br/>${realGreenFrustrations}</p>
      <p><strong>Things RealGreen should be able to do:</strong><br/>${realGreenMissing}</p>
      <p><strong>Account info you’d want to be aware of:</strong><br/>${accountInfoToKnow}</p>

      <hr/>

      <h2>Customer Experience</h2>
      <p><strong>How client care could provide a better customer experience:</strong><br/>${clientCareBetterExperience}</p>

      <hr/>

      <h2>Follow-up</h2>
      <p><strong>Would you like to meet in person?</strong> ${
        meetInPerson === "true" ? "Yes" : "No"
      }</p>

      ${
        meetInPerson === "true" && meetInPersonDetails
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

export default buildClientCareTeamQuestionnaireEmail;
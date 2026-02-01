import "dotenv/config";

// Function for building General Questionnaire emails.
function buildGeneralQuestionnaireEmail(queuedData = {}) {
  const {
    // Page 1
    name = "",
    tenure = "",
    position = "",
    positionFocus = "",

    // Page 2
    hardestToLearn = "",
    trainingWishHad = "",
    helpEase = "",

    // Page 3 (RealGreen)
    realGreenUseful = "",
    realGreenFrustrations = "",
    realGreenMissing = "",
    accountInfoToKnow = "",
    betterCustomerExperience = "",

    // Page 4
    oneChangeToMakeEasier = "",
    complicatedOrRepetitive = "",
    managementAwareness = "",

    // Page 5
    meetInPerson = "false",
    meetInPersonDetails = "",
    otherInput = "",

    submittedAt = new Date().toISOString(),
  } = queuedData;

  // Email routing (guard against empty env var)
  const from =
    process.env.EMAIL_FROM && process.env.EMAIL_FROM.trim()
      ? process.env.EMAIL_FROM.trim()
      : "general-questionnaire@aquadocinc.org";

  const to = (process.env.EMAIL_TO ?? "cray@aquadocinc.com")
    .split(",")
    .map((e) => e.trim());

  const displayName = name && name.trim().length > 0 ? name.trim() : "Anonymous";

  return {
    from,
    to,
    subject: `General Questionnaire: ${displayName}`,
    html: `
      <h1>General Questionnaire</h1>

      <h2>Role Information</h2>
      <p><strong>Name:</strong> ${displayName}</p>
      <p><strong>How long have you worked for AQUA DOC?</strong><br/>${tenure}</p>
      <p><strong>Position:</strong><br/>${position}</p>
      <p><strong>Focus of your position:</strong><br/>${positionFocus}</p>

      <hr/>

      <h2>Getting Started</h2>
      <p><strong>When you first started, what was hardest to learn?</strong><br/>${hardestToLearn}</p>
      <p><strong>Training/guidance you wish you had (not available today):</strong><br/>${trainingWishHad}</p>
      <p><strong>How easy is it to get help when you have a question/problem?</strong><br/>${helpEase}</p>

      <hr/>

      <h2>RealGreen</h2>
      <p><strong>Most useful parts of RealGreen:</strong><br/>${realGreenUseful}</p>
      <p><strong>Parts that slow down / cause frustration:</strong><br/>${realGreenFrustrations}</p>
      <p><strong>Things RealGreen should be able to do:</strong><br/>${realGreenMissing}</p>
      <p><strong>Account info you’d want to be aware of:</strong><br/>${accountInfoToKnow}</p>
      <p><strong>How AQUA DOC could provide a better customer experience:</strong><br/>${betterCustomerExperience}</p>

      <hr/>

      <h2>Process & Operations</h2>
      <p><strong>If you could change one thing to make your job easier:</strong><br/>${oneChangeToMakeEasier}</p>
      <p><strong>Anything unnecessarily complicated or repetitive:</strong><br/>${complicatedOrRepetitive}</p>
      <p><strong>Anything management should be more aware of:</strong><br/>${managementAwareness}</p>

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

export default buildGeneralQuestionnaireEmail;
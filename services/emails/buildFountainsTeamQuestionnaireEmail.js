import "dotenv/config";

// Function for building Fountains Team Questionnaire emails.
function buildFountainsTeamQuestionnaireEmail(queuedData = {}) {
  const {
    // Page 1
    name = "Unknown",
    tenure = "",
    positionFocus = "",

    // Page 2 (Systems)
    systemTypes = "",
    commonFailures = "",
    failureIntervals = "",

    // Page 3 (Inventory)
    inventoryVisibility = "",
    partsRunOut = "",
    inventoryTransfersRole = "",

    // Page 4 (Quotes)
    quoteMisses = "",
    quoteRevisions = "",
    moreInvolvedInQuotes = "",
    preScheduleInfo = "",

    // Page 5 (RealGreen)
    realGreenUseful = "",
    realGreenFrustrations = "",
    realGreenMissing = "",
    accountInfoToKnow = "",
    fountainsBetterExperience = "",

    // Page 6
    meetInPerson = "false",
    meetInPersonDetails = "",
    otherInput = "",

    submittedAt = new Date().toISOString(),
  } = queuedData;

  // Email routing
  const from =
    process.env.EMAIL_FROM ?? "fountains-team-questions@aquadocinc.org";

  const to = (process.env.EMAIL_TO ?? "cray@aquadocinc.com")
    .split(",")
    .map((e) => e.trim());

  return {
    from,
    to,
    subject: `Fountains Team Questionnaire: ${name}`,
    html: `
      <h1>Fountains Team Questionnaire</h1>

      <h2>Role Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>How long have you worked for AQUA DOC?</strong><br/>${tenure}</p>
      <p><strong>Focus of your position:</strong><br/>${positionFocus}</p>

      <hr/>

      <h2>Systems</h2>
      <p><strong>Systems worked with most often (brands/sizes/types):</strong><br/>${systemTypes}</p>
      <p><strong>Most common issues or failures:</strong><br/>${commonFailures}</p>
      <p><strong>Failures/issues on regular intervals:</strong><br/>${failureIntervals}</p>

      <hr/>

      <h2>Inventory</h2>
      <p><strong>How you currently know what parts are available / where they are / allocated to a job:</strong><br/>${inventoryVisibility}</p>
      <p><strong>Parts you regularly run out of or don’t have when needed:</strong><br/>${partsRunOut}</p>
      <p><strong>Your role in transferring inventory between locations:</strong><br/>${inventoryTransfersRole}</p>

      <hr/>

      <h2>Quotes</h2>
      <p><strong>Items frequently missed/underestimated in quotes:</strong><br/>${quoteMisses}</p>
      <p><strong>How often quotes need revision after work begins + why:</strong><br/>${quoteRevisions}</p>
      <p><strong>Should fountains be more involved in quotes + why:</strong><br/>${moreInvolvedInQuotes}</p>
      <p><strong>Info you wish was always confirmed before scheduling a job:</strong><br/>${preScheduleInfo}</p>

      <hr/>

      <h2>RealGreen</h2>
      <p><strong>Most useful parts of RealGreen:</strong><br/>${realGreenUseful}</p>
      <p><strong>Parts that slow down / cause frustration:</strong><br/>${realGreenFrustrations}</p>
      <p><strong>Things RealGreen should be able to do:</strong><br/>${realGreenMissing}</p>
      <p><strong>Account info you’d want to be aware of:</strong><br/>${accountInfoToKnow}</p>

      <hr/>

      <h2>Customer Experience</h2>
      <p><strong>How fountains team could provide a better customer experience:</strong><br/>${fountainsBetterExperience}</p>

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

export default buildFountainsTeamQuestionnaireEmail;
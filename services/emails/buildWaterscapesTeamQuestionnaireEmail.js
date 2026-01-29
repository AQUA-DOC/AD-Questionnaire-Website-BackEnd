import "dotenv/config";

// Function for building Waterscapes Team Questionnaire emails.
function buildWaterscapesTeamQuestionnaireEmail(queuedData = {}) {
  const {
    // Page 1
    name = "Unknown",
    tenure = "",
    positionFocus = "",

    // Page 2 (Systems)
    featureTypes = "",
    commonPostInstallIssues = "",
    seasonalIssues = "",

    // Page 3 (Plants)
    plantsFrequency = "",
    plantIssues = "",
    bioInfoWishEasier = "",

    // Page 4 (General)
    quoteMisses = "",
    siteConditions = "",
    preScheduleInfo = "",

    // Page 5 (RealGreen)
    realGreenUseful = "",
    realGreenFrustrations = "",
    realGreenMissing = "",
    waterscapesBetterExperience = "",

    // Page 6
    meetInPerson = "false",
    meetInPersonDetails = "",
    otherInput = "",

    submittedAt = new Date().toISOString(),
  } = queuedData;

  // Email routing
  const from =
    process.env.EMAIL_FROM ?? "waterscapes-team-questions@aquadocinc.org";

  const to = (process.env.EMAIL_TO ?? "cray@aquadocinc.com")
    .split(",")
    .map((e) => e.trim());

  return {
    from,
    to,
    subject: `Waterscapes Team Questionnaire: ${name}`,
    html: `
      <h1>Waterscapes Team Questionnaire</h1>

      <h2>Role Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>How long have you worked for AQUA DOC?</strong><br/>${tenure}</p>
      <p><strong>Focus of your position:</strong><br/>${positionFocus}</p>

      <hr/>

      <h2>Systems</h2>
      <p><strong>Water feature types worked with most often:</strong><br/>${featureTypes}</p>
      <p><strong>Most common post-install issues:</strong><br/>${commonPostInstallIssues}</p>
      <p><strong>Issues that occur at regular intervals/seasons:</strong><br/>${seasonalIssues}</p>

      <hr/>

      <h2>Plants</h2>
      <p><strong>How often you care for/install plants:</strong><br/>${plantsFrequency}</p>
      <p><strong>Most frequent plant-related issues:</strong><br/>${plantIssues}</p>
      <p><strong>Plant/biological info you wish was easier to reference:</strong><br/>${bioInfoWishEasier}</p>

      <hr/>

      <h2>General</h2>
      <p><strong>Items frequently missed/underestimated in quotes:</strong><br/>${quoteMisses}</p>
      <p><strong>Site conditions that complicate waterscape work:</strong><br/>${siteConditions}</p>
      <p><strong>Info you wish was always confirmed before scheduling:</strong><br/>${preScheduleInfo}</p>

      <hr/>

      <h2>RealGreen</h2>
      <p><strong>Most useful parts of RealGreen:</strong><br/>${realGreenUseful}</p>
      <p><strong>Parts that slow down / cause frustration:</strong><br/>${realGreenFrustrations}</p>
      <p><strong>Things RealGreen should be able to do:</strong><br/>${realGreenMissing}</p>

      <hr/>

      <h2>Customer Experience</h2>
      <p><strong>How waterscapes team could provide a better customer experience:</strong><br/>${waterscapesBetterExperience}</p>

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

export default buildWaterscapesTeamQuestionnaireEmail;
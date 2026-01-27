import "dotenv/config";

// Function for building Branch Manager Questionnaire emails.
function buildBranchManagerQuestionnaireEmail(queuedData = {}) {
  const {
    // Page 1
    name = 'Unknown',
    branch = 'Unknown',
    branchUnique = '',
    branchBiggestChallenge = '',

    // Page 2 (Corporate)
    corporatePositives = '',
    corporateNegatives = '',
    corporateFutureSupport = '',

    // Page 3 (RealGreen)
    realGreenUseful = '',
    realGreenFrustrations = '',
    realGreenFiveThings = '',

    // Page 4 (General)
    scheduleMgmtVisits = 'N/A',
    scheduleFountainsWork = 'N/A',
    requiresPermits = 'false',
    permitsList = '',
    contractSpecialTerms = '',
    infoWishAccess = '',

    // Page 5 (Training)
    trainingRealGreenStruggle = '',
    trainingOutsideStruggle = '',
    trainingMissing = '',

    // Page 6 (Clients + Other)
    clientsUnableToAccommodate = '',
    clientsUsefulInfo = '',
    clientsImproveExperience = '',
    otherInput = '',

    submittedAt = new Date().toISOString()
  } = queuedData;

  // Email routing
  const from =
    process.env.EMAIL_FROM ?? 'branch-manager-questions@aquadocinc.org';

  const to = (process.env.EMAIL_TO ?? 'cray@aquadocinc.com')
    .split(',')
    .map(e => e.trim());

  return {
    from,
    to,
    subject: `Branch Manager Questionnaire: ${name} (${branch})`,
    html: `
      <h1>Branch Manager Questionnaire</h1>

      <h2>Branch Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Branch:</strong> ${branch}</p>
      <p><strong>What makes this branch unique?</strong><br/>${branchUnique}</p>
      <p><strong>Biggest challenge:</strong><br/>${branchBiggestChallenge}</p>

      <hr/>

      <h2>Corporate</h2>
      <p><strong>Positive effects of corporate:</strong><br/>${corporatePositives}</p>
      <p><strong>Negative effects of corporate:</strong><br/>${corporateNegatives}</p>
      <p><strong>How corporate could better support this branch:</strong><br/>${corporateFutureSupport}</p>

      <hr/>

      <h2>RealGreen</h2>
      <p><strong>Most useful parts of RealGreen:</strong><br/>${realGreenUseful}</p>
      <p><strong>Parts that cause frustration:</strong><br/>${realGreenFrustrations}</p>
      <p><strong>5 things RealGreen should be able to do:</strong><br/>${realGreenFiveThings}</p>

      <hr/>

      <h2>General Operations</h2>
      <p><strong>Accurate schedule for management visits:</strong> ${scheduleMgmtVisits}</p>
      <p><strong>Accurate schedule for fountains work:</strong> ${scheduleFountainsWork}</p>
      <p><strong>Requires licenses / permits:</strong> ${requiresPermits === 'true' ? 'Yes' : 'No'}</p>

      ${
        requiresPermits === 'true'
          ? `<p><strong>Licenses / permits required:</strong><br/>${permitsList}</p>`
          : ''
      }

      <p><strong>Special contract terms needed:</strong><br/>${contractSpecialTerms}</p>
      <p><strong>Information needed to manage branch better:</strong><br/>${infoWishAccess}</p>

      <hr/>

      <h2>Training</h2>
      <p><strong>RealGreen training challenges:</strong><br/>${trainingRealGreenStruggle}</p>
      <p><strong>Non-RealGreen training challenges:</strong><br/>${trainingOutsideStruggle}</p>
      <p><strong>Missing or desired training:</strong><br/>${trainingMissing}</p>

      <hr/>

      <h2>Clients</h2>
      <p><strong>Client requests we can’t accommodate:</strong><br/>${clientsUnableToAccommodate}</p>
      <p><strong>Useful client information to record:</strong><br/>${clientsUsefulInfo}</p>
      <p><strong>Ideas to improve client experience:</strong><br/>${clientsImproveExperience}</p>

      ${
        otherInput
          ? `<hr/><h2>Additional Input</h2><p>${otherInput}</p>`
          : ''
      }

      <hr/>

      <p><strong>Submitted At:</strong> ${submittedAt}</p>
    `
  };
}

export default buildBranchManagerQuestionnaireEmail;
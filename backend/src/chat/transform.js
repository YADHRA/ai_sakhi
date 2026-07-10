// Maps the raw assessment object returned by Gemini (see prompt.js's JSON
// schema) into the response shape the frontend actually consumes (see the
// contract documented in frontend/src/services/api.js).
//
// Why this exists: prompt.js's schema uses rich, snake_case field names
// (situation_summary, applicable_laws, action_plan, evidence_to_collect...)
// designed for good LLM output quality. The frontend's ChatBubble expects
// reply/laws/actionPlan/evidence/helplines. Without this translation layer
// every field lookup on the frontend silently misses.

const EMERGENCY_HELPLINES = [
  { name: 'Women Helpline (All India)', number: '181' },
  { name: 'Police', number: '112' },
  { name: 'NALSA Legal Aid', number: '15100' },
];

function mapAssessmentToResponse(assessment = {}) {
  const {
    situation_summary = '',
    category = 'Other',
    priority = 'Low',
    applicable_laws = [],
    rights = [],
    legal_remedies = [],
    immediate_actions = [],
    action_plan = [],
    evidence_to_collect = [],
    follow_up_questions = [],
    disclaimer = '',
  } = assessment || {};

  return {
    reply: situation_summary,
    category,
    priority,
    laws: applicable_laws.map((law) =>
      typeof law === 'string'
        ? { title: law }
        : { title: law.law, confidence: law.confidence }
    ),
    rights,
    legalRemedies: legal_remedies,
    immediateActions: immediate_actions,
    actionPlan: action_plan.map((step) =>
      typeof step === 'string'
        ? { step, urgency_bucket: 'ongoing' }
        : step
    ),
    evidence: evidence_to_collect,
    followUpQuestions: follow_up_questions,
    disclaimer,
    helplines: priority === 'Emergency' ? EMERGENCY_HELPLINES : [],
  };
}

module.exports = { mapAssessmentToResponse };
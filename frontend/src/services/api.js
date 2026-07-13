import axios from 'axios'

// Base URL comes from .env (VITE_API_BASE_URL). Falls back to local backend.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ai-sakhi-4xs9.onrender.com'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Sends a message to AiSakhi's backend AI endpoint.
 * Backend contract: POST /api/chat
 *   body: { message: string, history?: Array<{ role: 'user'|'assistant', content: string }> }
 *   response: {
 *     reply: string,                 // plain-language summary
 *     category?: string,
 *     priority?: 'Low'|'Medium'|'High'|'Emergency',
 *     laws?: Array<{ title, section, description }>,
 *     rights?: Array<string>,
 *     legalRemedies?: Array<string>,
 *     immediateActions?: Array<string>,
 *     actionPlan?: Array<string>,
 *     evidence?: Array<string>,
 *     followUpQuestions?: Array<string>,
 *     disclaimer?: string,
 *     helplines?: Array<{ name, number }>,
 *   }
 *
 * @param {string} message - The user's message/question.
 * @param {Array} history - Prior conversation turns for context.
 * @returns {Promise<object>} structured AI response
 */
export async function sendChatMessage(message, history = []) {
  try {
    const response = await apiClient.post('/api/chat', {
      message,
      history,
    })
    // Backend wraps the payload as { success, data }. Unwrap it so callers
    // get the assessment object directly, matching the contract documented
    // above (reply, laws, rights, actionPlan, evidence, helplines, ...).
    return response.data?.data
  } catch (error) {
    if (error.response) {
      // Server responded with a non-2xx status
      const serverMessage =
        error.response.data?.error ||
        error.response.data?.message ||
        'The server could not process your request right now.'
      throw new Error(serverMessage)
    } else if (error.request) {
      // No response received — backend likely offline
      throw new Error(
        'Could not reach the AiSakhi server. Please make sure the backend is running on http://localhost:5000.'
      )
    } else {
      throw new Error('Something went wrong while sending your message.')
    }
  }
}

export default apiClient
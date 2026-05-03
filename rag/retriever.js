// file: rag/retriever.js
import { ECI_KNOWLEDGE } from './knowledgeBase';

/**
 * Simulates retrieval from a vector database by performing a simple keyword search.
 * @param {string} query - The user message/query.
 * @returns {string} - Combined string of relevant facts.
 */
export async function retrieveContext(query) {
  const normalizedQuery = query.toLowerCase();
  
  // Simple filter based on keywords
  const relevantFacts = ECI_KNOWLEDGE.filter(item => {
    const keywords = item.fact.toLowerCase().split(' ');
    return keywords.some(word => word.length > 3 && normalizedQuery.includes(word));
  });

  if (relevantFacts.length === 0) {
    return "No specific ECI documentation found for this query. Refer to general guidelines.";
  }

  // Map to a single string context
  return relevantFacts.map(f => `[${f.category}]: ${f.fact}`).join('\n');
}

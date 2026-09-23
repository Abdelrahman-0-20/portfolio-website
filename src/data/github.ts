/**
 * PHASE 1 ENRICHMENT — live GitHub data, verified 2026-09-22 via the
 * GitHub REST API (api.github.com/users/Abdelrahman-0-20) + raw READMEs.
 *
 * Verified: repo URLs below all exist. NO *.streamlit.app deployment was
 * verifiable (share.streamlit.io serves an empty SPA shell; no homepage or
 * description fields set on any repo), so no live-app links are claimed
 * beyond the CV contract's own streamlit profile URL (SV-02).
 * LinkedIn: HTTP 999 bot-block — CV data used verbatim instead.
 */

export interface VerifiedRepo {
  name: string
  url: string
  language: 'Python' | 'Jupyter Notebook'
  /** Registry code shown in the hangar strip */
  code: string
  /** One-liner — paraphrased strictly from the repo README (verified) */
  logline: string
}

/** Missions whose generic profile link can be upgraded to a verified specific repo */
export const missionRepoOverrides: Record<string, string> = {
  'SV-01': 'https://github.com/Abdelrahman-0-20/Fraud-Detection',
  'SV-02': 'https://github.com/Abdelrahman-0-20/House-Predict',
  'SV-04': 'https://github.com/Abdelrahman-0-20/Spam-filtering',
  'SV-05': 'https://github.com/Abdelrahman-0-20/Bank-Customer-segmentation-classify',
  'SV-07': 'https://github.com/Abdelrahman-0-20/Breast-Cancer',
  'SV-08': 'https://github.com/Abdelrahman-0-20/support-tickets',
}

/** Missions where no specific public repo could be verified (kept on contract link) */
export const linkTodos: string[] = ['SV-03', 'SV-06']

export const githubProfile = {
  handle: 'Abdelrahman-0-20',
  url: 'https://github.com/Abdelrahman-0-20',
  publicRepos: 36,
  joined: '2023-11-25',
}

/** R&D bays — verified Tier-1 repos from the live API scan */
export const sideHangar: VerifiedRepo[] = [
  {
    name: 'rag-chat',
    url: 'https://github.com/Abdelrahman-0-20/rag-chat',
    language: 'Python',
    code: 'BAY-R1',
    logline: 'PDF-QA chatbot — FAISS bi-encoder + cross-encoder rerank; every answer cites its source.',
  },
  {
    name: 'ML-AutoV3',
    url: 'https://github.com/Abdelrahman-0-20/ML-AutoV3',
    language: 'Python',
    code: 'BAY-A3',
    logline: 'Single-file Streamlit autoML — 12+ regression/classification models, cross-validation, SHAP explainability.',
  },
  {
    name: 'ML-Automation-Platform',
    url: 'https://github.com/Abdelrahman-0-20/ML-Automation-Platform',
    language: 'Python',
    code: 'BAY-MP',
    logline: 'Modular Streamlit ML pipeline platform — profiler → cleaning → EDA → features → modeling → reports.',
  },
  {
    name: 'Local-LLM-App-with-Streamlit-Ollama',
    url: 'https://github.com/Abdelrahman-0-20/Local-LLM-App-with-Streamlit-Ollama',
    language: 'Python',
    code: 'BAY-LLM',
    logline: '100% local Ollama chat UI (llama3.2:3b) — streaming, model picker, no data leaves the machine.',
  },
  {
    name: 'sentiment-analysis-by-ollama-langchain-chroma',
    url: 'https://github.com/Abdelrahman-0-20/sentiment-analysis-by-ollama-langchain-chroma',
    language: 'Python',
    code: 'BAY-SA',
    logline: 'Sentiment app over 662 pizza reviews — Ollama + LangChain + ChromaDB, top_k=5 retrieval.',
  },
]
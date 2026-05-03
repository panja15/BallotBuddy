// file: lib/i18n.js

export const commonTranslations = {
  en: {
    trustNote: "Based on official guidelines from the Election Commission of India",
    votingDay: "Voting Day Guide",
    findBooth: "Find Polling Booth",
    back: "Back",
    next: "Next",
    save: "Save Draft",
    loading: "Loading...",
  },
  hi: {
    trustNote: "भारत निर्वाचन आयोग के आधिकारिक दिशा-निर्देशों पर आधारित",
    votingDay: "मतदान दिवस गाइड",
    findBooth: "मतदान केंद्र खोजें",
    back: "पीछे",
    next: "आगे",
    save: "ड्राफ्ट सहेजें",
    loading: "लोड हो रहा है...",
  }
};

export const getLang = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('ballotBuddy_lang') || 'en';
  }
  return 'en';
};

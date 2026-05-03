// file: lib/forms/form8.schema.js

export const FORM_8_SCHEMA = {
  id: "form-8",
  title: "Form 8: Correction of Entries",
  description: "Use this form for correction of particulars in the electoral roll.",
  sections: [
    {
      id: "identity",
      title: "Current Identity",
      fields: [
        {
          name: "epicNumber",
          label: "EPIC Number",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "The 10-digit alphanumeric code on your Voter ID card.",
            commonMistakes: "Confusing zero (0) with the letter 'O'.",
            tip: "Find this at the top of your Voter ID card."
          }
        }
      ]
    },
    {
      id: "correction",
      title: "Field to be Corrected",
      fields: [
        {
          name: "correctionField",
          label: "What needs correction?",
          type: "select",
          options: ["Name", "Age", "Address", "Photo"],
          required: true,
          aiHelp: {
            explanation: "Select the specific category you wish to update.",
            commonMistakes: "Trying to correct multiple unrelated fields in one form.",
            tip: "You will need a specific proof for the field you select (e.g., Birth Cert for Age)."
          }
        },
        {
          name: "newValue",
          label: "Correct Value",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "Enter the correct information that should appear in the roll.",
            commonMistakes: "Typing the old (incorrect) value again.",
            tip: "This must match your uploaded document proof exactly."
          }
        }
      ]
    }
  ]
};

// file: lib/forms/form8a.schema.js

export const FORM_8A_SCHEMA = {
  id: "form-8a",
  title: "Form 8A: Transposition of Entry",
  description: "Use this form for transposition of an entry in the electoral roll within the same constituency.",
  sections: [
    {
      id: "details",
      title: "Voter Details",
      fields: [
        {
          name: "epic",
          label: "EPIC Number",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "Your unique Voter ID number.",
            commonMistakes: "Incorrect EPIC entry.",
            tip: "This form is only for shifting within the SAME assembly constituency."
          }
        },
        {
          name: "newAddress",
          label: "New Address",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "Enter your full new address.",
            commonMistakes: "Using a temporary address.",
            tip: "You must have been residing at this new address for at least 6 months."
          }
        }
      ]
    }
  ]
};

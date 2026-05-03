// file: lib/forms/form7.schema.js

export const FORM_7_SCHEMA = {
  id: "form-7",
  title: "Form 7: Objection to Name Inclusion",
  description: "Use this form to object to the inclusion of a name in the electoral roll.",
  sections: [
    {
      id: "objector",
      title: "Objector Details",
      fields: [
        {
          name: "objectorEpic",
          label: "Your EPIC Number",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "Enter your own Voter ID (EPIC) number.",
            commonMistakes: "Using someone else's EPIC number.",
            tip: "You must be a registered voter to file an objection."
          }
        }
      ]
    },
    {
      id: "target",
      title: "Objection Target Details",
      fields: [
        {
          name: "targetName",
          label: "Name of Person Objected To",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "Enter the full name as it appears in the draft roll.",
            commonMistakes: "Spelling mistakes can lead to the objection being ignored.",
            tip: "Check the exact spelling in the latest published draft roll."
          }
        },
        {
          name: "reason",
          label: "Reason for Objection",
          type: "select",
          options: ["Death", "Shifting", "Not a Citizen", "Underage"],
          required: true,
          aiHelp: {
            explanation: "Select the primary reason for your objection.",
            commonMistakes: "Selecting 'Death' without having a death certificate reference.",
            tip: "Be prepared to provide proof for your selection during the hearing."
          }
        }
      ]
    }
  ]
};

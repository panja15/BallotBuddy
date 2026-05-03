// file: lib/forms/form6.schema.js

export const FORM_6_SCHEMA = {
  id: "form-6",
  title: "Form 6: Application for First-Time Voter",
  description: "Use this form to register as a new voter in India.",
  sections: [
    {
      id: "personal",
      title: "Personal Details",
      fields: [
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "Enter your first name as it appears on your birth certificate or Aadhaar card.",
            commonMistakes: "Do not use nicknames or initials if they aren't on your official ID.",
            tip: "Double-check the spelling; it's hard to change once printed on the card."
          }
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "Enter your family name or surname.",
            commonMistakes: "Leaving this blank if you have a single name (put a dot if mandatory and you have no surname, check local guidelines).",
            tip: "Ensure it matches your identity documents exactly."
          }
        },
        {
          name: "dob",
          label: "Date of Birth",
          type: "date",
          required: true,
          validation: {
            minAge: 18,
            message: "You must be 18 years or older to register."
          },
          aiHelp: {
            explanation: "Select your date of birth from the calendar.",
            commonMistakes: "Incorrect year selection is the most common reason for rejection.",
            tip: "You must be 18 on the qualifying date (e.g., Jan 1st) to be eligible."
          }
        },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: ["Male", "Female", "Third Gender"],
          required: true,
          aiHelp: {
            explanation: "Select your gender.",
            commonMistakes: "Mismatched gender compared to photo proof.",
            tip: "Ensure this matches your other identity proofs."
          }
        }
      ]
    },
    {
      id: "address",
      title: "Address Details",
      fields: [
        {
          name: "houseNo",
          label: "House/Door Number",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "Enter your house number or apartment name.",
            commonMistakes: "Using old house numbers that don't match the utility bill.",
            tip: "Provide the exact number mentioned in your address proof."
          }
        },
        {
          name: "locality",
          label: "Locality/Street/Area",
          type: "text",
          required: true,
          aiHelp: {
            explanation: "The specific area or street where you reside.",
            commonMistakes: "Being too vague (e.g., just 'Central Delhi').",
            tip: "Be as specific as possible to help the BLO find your residence."
          }
        },
        {
          name: "pincode",
          label: "Pincode",
          type: "number",
          required: true,
          validation: {
            pattern: "^[1-9][0-9]{5}$",
            message: "Pincode must be a 6-digit number."
          },
          aiHelp: {
            explanation: "The 6-digit postal code of your area.",
            commonMistakes: "Entering a wrong pincode can send your application to the wrong constituency.",
            tip: "Verify your pincode from an official utility bill."
          }
        }
      ]
    },
    {
      id: "declaration",
      title: "Declaration",
      fields: [
        {
          name: "aadhaar",
          label: "Aadhaar Number (Optional)",
          type: "text",
          required: false,
          aiHelp: {
            explanation: "Providing Aadhaar helps in faster verification and de-duplication.",
            commonMistakes: "Typing the wrong 12-digit number.",
            tip: "Link your Aadhaar to make future profile updates easier."
          }
        }
      ]
    }
  ]
};

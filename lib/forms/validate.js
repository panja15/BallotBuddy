// file: lib/forms/validate.js

/**
 * Validates form data against a schema.
 * @param {Object} schema - The form schema.
 * @param {Object} formData - The current form state.
 * @returns {Object} - An object containing error messages keyed by field name.
 */
export function validateForm(schema, formData) {
  const errors = {};

  schema.sections.forEach(section => {
    section.fields.forEach(field => {
      const value = formData[field.name];

      // Required validation
      if (field.required && (!value || value.toString().trim() === '')) {
        errors[field.name] = `${field.label} is required.`;
        return;
      }

      // Pattern/Regex validation
      if (field.validation?.pattern && value) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          errors[field.name] = field.validation.message || `Invalid format for ${field.label}.`;
        }
      }

      // Min/Max length for numbers or strings
      if (field.validation?.minLength && value?.length < field.validation.minLength) {
        errors[field.name] = `${field.label} must be at least ${field.validation.minLength} characters.`;
      }

      if (field.validation?.minAge && value) {
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < field.validation.minAge) {
          errors[field.name] = `You must be at least ${field.validation.minAge} years old.`;
        }
      }
    });
  });

  return errors;
}

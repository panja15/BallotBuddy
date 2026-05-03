import { describe, it, expect } from 'vitest';
import { commonTranslations } from '../lib/i18n';

describe('i18n Utility', () => {
  it('should have basic English translations', () => {
    expect(commonTranslations.en.findBooth).toBe('Find Polling Booth');
  });

  it('should have basic Hindi translations', () => {
    expect(commonTranslations.hi.findBooth).toBe('मतदान केंद्र खोजें');
  });
});

describe('Environment Configuration', () => {
  it('should be in test environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });
});

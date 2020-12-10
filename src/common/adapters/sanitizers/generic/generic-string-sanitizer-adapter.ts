/* eslint-disable @typescript-eslint/no-explicit-any */
import sanitizeHtml from 'sanitize-html';
import { SanitizerError } from '~/application/errors/sanitizer-error';
import { Sanitizer } from '~/application/ports/sanitizers/sanitizer';

export class GenericStringSanitizerAdapter implements Sanitizer<any, string> {
  sanitize(value: any) {
    if (typeof value === 'undefined') {
      return '';
    }

    if (typeof value !== 'string') {
      throw new SanitizerError('Invalid value');
    }

    return sanitizeHtml(value);
  }
}

export const genericStringSanitizerSingleton = new GenericStringSanitizerAdapter();

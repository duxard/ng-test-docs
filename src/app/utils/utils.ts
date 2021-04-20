/**
 * Simple utility to convert multiline text to string without line separators and carriage returns
 */
export const textFlatten = (text: string): string => text.replace(/\r?\n|\r/gm, '')
                                                         .replace(/\s+/g, ' ')
                                                         .trim();

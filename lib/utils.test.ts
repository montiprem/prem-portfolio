import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge simple strings', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should resolve tailwind classes conflicts correctly', () => {
    // tailwind-merge resolves p-2 and p-4 (they conflict), keeping the last one
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    // text-sm and text-lg conflict
    expect(cn('text-sm text-lg')).toBe('text-lg');
  });

  it('should handle conditional classes using objects', () => {
    expect(cn('base-class', { 'active-class': true, 'inactive-class': false })).toBe('base-class active-class');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('should ignore null, undefined, false, and empty strings', () => {
    expect(cn('class1', null, undefined, false, '', 'class2')).toBe('class1 class2');
  });

  it('should handle complex combinations', () => {
    const isHovered = true;
    const isDisabled = false;

    expect(
      cn(
        'base-button px-4 py-2 bg-blue-500',
        isHovered && 'bg-blue-600',
        isDisabled && 'opacity-50',
        { 'text-white': true, 'text-gray-200': false },
        ['rounded-md', 'shadow-sm']
      )
    ).toBe('base-button px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm');
  });
});

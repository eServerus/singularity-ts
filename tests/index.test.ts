import '../src/index';

describe('String prototype extensions', () => {
    test('capitalization should capitalize first letter and lowercase the rest', () => {
        expect('hello WORLD'.capitalize()).toBe('Hello world');
        expect('tEST'.capitalize()).toBe('Test');
        expect(''.capitalize()).toBe('');
    });

    test('camelCase should convert string to camelCase', () => {
        expect('hello world'.camelCase()).toBe('helloWorld');
        expect('This is a test'.camelCase()).toBe('thisIsATest');
        expect('alreadyCamelCase'.camelCase()).toBe('alreadycamelcase');
        expect(''.camelCase()).toBe('');
    });
});

describe('Array prototype extension: compactMap', () => {
    test('compactMap should filter out null and undefined', () => {
        const arr = [1, null, 2, undefined, 3];
        const result = arr.compactMap(x => x);
        expect(result).toEqual([1, 2, 3]);
    });

    test('compactMap should map and filter', () => {
        const arr = ['1', 'a', '2', null, '3'];
        const result = arr.compactMap(x => x && !isNaN(Number(x)) ? Number(x) : null);
        expect(result).toEqual([1, 2, 3]);
    });
});

describe('Array prototype extension: compactMap with optionals', () => {
    test('compactMap should remove undefined values', () => {
        const arr: (number | undefined)[] = [1, undefined, 2, undefined, 3];
        const result = arr.compactMap(x => x);
        expect(result).toEqual([1, 2, 3]);
    });

    test('compactMap should remove null values', () => {
        const arr: (number | null)[] = [1, null, 2, null, 3];
        const result = arr.compactMap(x => x);
        expect(result).toEqual([1, 2, 3]);
    });

    test('compactMap should remove both null and undefined', () => {
        const arr: (number | null | undefined)[] = [1, null, undefined, 2, null, 3, undefined];
        const result = arr.compactMap(x => x);
        expect(result).toEqual([1, 2, 3]);
    });

    test('compactMap should work with strings and null/undefined', () => {
        const arr: (string | null | undefined)[] = ['a', null, undefined, 'b', 'c', null];
        const result = arr.compactMap(x => x);
        expect(result).toEqual(['a', 'b', 'c']);
    });
});

describe('Array prototype extension: compactMap without params', () => {
    test('compactMap should remove null and undefined by default', () => {
        const arr = [1, null, 2, undefined, 3];
        const result = arr.compactMap();
        expect(result).toEqual([1, 2, 3]);
    });

    test('compactMap should work with strings and null/undefined by default', () => {
        const arr = ['a', null, undefined, 'b', 'c', null];
        const result = arr.compactMap();
        expect(result).toEqual(['a', 'b', 'c']);
    });

    test('compactMap should return empty array if all values are null or undefined', () => {
        const arr = [null, undefined, null];
        const result = arr.compactMap();
        expect(result).toEqual([]);
    });
});

describe('Array prototype extension: deepCopy', () => {
    test('deepCopy should return a new array with the same primitive values', () => {
        const arr = [1, 2, 3];
        const copy = arr.deepCopy();
        expect(copy).toEqual(arr);
        expect(copy).not.toBe(arr); // Should not be the same reference
    });

    test('deepCopy should deeply copy nested arrays and objects', () => {
        const arr = [{ a: 1 }, [2, 3], { b: { c: 4 } }];
        const copy = arr.deepCopy();
        expect(copy).toEqual(arr);
        expect(copy).not.toBe(arr);
        expect(copy[0]).not.toBe(arr[0]);
        expect(copy[1]).not.toBe(arr[1]);
        expect(copy[2]).not.toBe(arr[2]);
        expect((copy[2] as any).b).not.toBe((arr[2] as any).b);
    });
});
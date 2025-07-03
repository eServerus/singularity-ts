
declare global {
    interface String {
        capitalize(): string;
        camelCase(): string;
    }
}

String.prototype.capitalize = function (): string {
    if (!this.length) return '';
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.camelCase = function (): string {
    return this
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

declare global {
    interface Array<T> {
        compactMap<U = T>(callback?: (element: T, index: number, array: T[]) => U | null | undefined): U[];
        deepCopy(): T[];
    }
}

Array.prototype.compactMap = function <T, U = T>(
    this: T[],
    callback: (element: T, index: number, array: T[]) => U | null | undefined = x => x as unknown as U
): U[] {
    const result: U[] = [];
    for (let i = 0; i < this.length; i++) {
        const mapped = callback(this[i], i, this);
        if (mapped !== null && mapped !== undefined) {
            result.push(mapped);
        }
    }
    return result;
};

Array.prototype.deepCopy = function <T>(this: T[]): T[] {
    return JSON.parse(JSON.stringify(this));
};

export { };
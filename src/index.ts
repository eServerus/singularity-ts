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
        compact(): T[];
        deepCopy(): T[];
    }
    interface ReadonlyArray<T> {
        deepCopy(): T[];
    }
}

Array.prototype.compact = function <T>(
    this: (T | undefined | null)[],
): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.length; i++) {
        const item = this[i];
        if (item !== null && item !== undefined)
            result.push(item);
    }
    return result;
};

Array.prototype.deepCopy = function <T>(this: T[]): T[] {
    return JSON.parse(JSON.stringify(this));
};

export { };
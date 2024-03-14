export interface HashComparer {
    compare(plainText: string, hash: string): Promise<boolean> | boolean;
}

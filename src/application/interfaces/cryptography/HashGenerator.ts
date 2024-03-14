export interface HashGenerator {
    hash(value: string): Promise<string> | string;
}

// Interface pour les résultats de test
export interface TestResult {
    id: string;
    name: string;
    passed: boolean;
    elements?: {
        tagName: string;
        selector?: string;
        altText?: string;
        adjacentText?: string;
        compliant: boolean;
    }[];
    error?: string;
}

// Interface pour les résultats complets d'une URL
export interface UrlResult {
    url: string;
    tests: TestResult[];
} 
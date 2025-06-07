import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import puppeteer from 'puppeteer';

// Interface pour les résultats de test
interface TestResult {
    id: string;
    name: string;
    passed: boolean;
    elements?: {
        tagName: string;
        selector?: string;
        altText?: string;
        compliant: boolean;
    }[];
    error?: string;
}

// Interface pour les résultats complets d'une URL
interface UrlResult {
    url: string;
    tests: TestResult[];
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        // Récupérer les URLs du corps de la requête
        const urls = await request.json();
        
        console.log('URLs reçues:', urls);
        
        // Pour chaque URL, faire passer les tests du RGAA 4.1.2
        // On commence par le critère 1.1 (Alternatives textuelles)
        const results: UrlResult[] = [];
        
        // Lancer le navigateur une seule fois pour toutes les URLs
        // Utiliser le navigateur installé par npx puppeteer browsers install chrome
        const browser = await puppeteer.launch({ 
            headless: true,
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
        });
        
        for (const url of urls) {
            try {
                const urlResults: UrlResult = {
                    url,
                    tests: []
                };
                
                // Test 1.1.1 - Images avec alternative textuelle
                const test1_1_1 = await testImageAltText(browser, url);
                urlResults.tests.push(test1_1_1);
                
                results.push(urlResults);
            } catch (error) {
                console.error(`Erreur lors de l'analyse de l'URL ${url}:`, error);
                results.push({
                    url,
                    tests: [{
                        id: "error",
                        name: "Erreur d'analyse",
                        passed: false,
                        error: String(error)
                    }]
                });
            }
        }
        
        // Fermer le navigateur
        await browser.close();
        
        // Retourner les résultats des tests
        return json({
            success: true,
            message: 'Analyse RGAA terminée',
            data: results
        });
    } catch (error) {
        console.error('Erreur lors du traitement des URLs:', error);
        return json({
            success: false,
            message: 'Erreur lors du traitement des URLs',
            error: String(error)
        }, { status: 400 });
    }
};

/**
 * Test 1.1.1 - Vérifie que chaque image porteuse d'information a une alternative textuelle
 */
async function testImageAltText(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Rechercher toutes les images dans la page
        const imagesData = await page.evaluate(() => {
            const result = [];
            
            // Sélectionner toutes les balises img
            const images = document.querySelectorAll('img');
            for (const img of images) {
                // Vérifier si l'image a une alternative textuelle
                const alt = img.getAttribute('alt');
                const ariaLabel = img.getAttribute('aria-label');
                const ariaLabelledby = img.getAttribute('aria-labelledby');
                const title = img.getAttribute('title');
                
                // Une image est considérée comme ayant une alternative textuelle si au moins l'un des attributs est présent
                const hasAltText = alt !== null || ariaLabel !== null || ariaLabelledby !== null || title !== null;
                
                // Déterminer si l'image est décorative (alt="")
                const isDecorative = alt === '';
                
                result.push({
                    tagName: 'img',
                    selector: getUniqueSelector(img),
                    src: img.getAttribute('src'),
                    altText: alt || ariaLabel || title || (ariaLabelledby ? 'Via aria-labelledby' : null),
                    isDecorative,
                    compliant: hasAltText
                });
            }
            
            // Sélectionner les éléments avec role="img"
            const roleImages = document.querySelectorAll('[role="img"]');
            for (const img of roleImages) {
                const ariaLabel = img.getAttribute('aria-label');
                const ariaLabelledby = img.getAttribute('aria-labelledby');
                
                const hasAltText = ariaLabel !== null || ariaLabelledby !== null;
                
                result.push({
                    tagName: img.tagName.toLowerCase(),
                    selector: getUniqueSelector(img),
                    altText: ariaLabel || (ariaLabelledby ? 'Via aria-labelledby' : null),
                    compliant: hasAltText
                });
            }
            
            // Fonction pour tenter de construire un sélecteur unique pour un élément
            function getUniqueSelector(element: Element): string {
                if (element.id) {
                    return `#${element.id}`;
                }
                
                // Sélecteur basique avec classe ou tag et position
                const classes = element.className ? Array.from(element.classList).join('.') : '';
                const classSelector = classes ? `.${classes}` : element.tagName.toLowerCase();
                
                const siblings = element.parentNode ? Array.from(element.parentNode.children) : [];
                const index = siblings.indexOf(element);
                
                return `${classSelector}:nth-child(${index + 1})`;
            }
            
            return result;
        });
        
        // Déterminer si le test est passé (toutes les images ont une alternative textuelle)
        const nonCompliantImages = imagesData.filter((img: any) => !img.compliant);
        const passed = nonCompliantImages.length === 0;
        
        return {
            id: '1.1.1',
            name: 'Alternative textuelle aux images',
            passed,
            elements: imagesData
        };
    } catch (error) {
        console.error('Erreur lors du test 1.1.1:', error);
        return {
            id: '1.1.1',
            name: 'Alternative textuelle aux images',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
} 
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
        details?: string;
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
        const results: UrlResult[] = [];
        
        // Lancer le navigateur une seule fois pour toutes les URLs
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
                
                // Critère 1.1 - Images
                const test1_1_1 = await testImageAltText(browser, url);
                urlResults.tests.push(test1_1_1);
                
                const test1_1_2 = await testAreaAltText(browser, url);
                urlResults.tests.push(test1_1_2);
                
                const test1_1_3 = await testInputImageAltText(browser, url);
                urlResults.tests.push(test1_1_3);
                
                const test1_1_4 = await testServerSideImageMap(browser, url);
                urlResults.tests.push(test1_1_4);
                
                const test1_1_5 = await testSvgAltText(browser, url);
                urlResults.tests.push(test1_1_5);
                
                const test1_1_6 = await testObjectImageAltText(browser, url);
                urlResults.tests.push(test1_1_6);
                
                // Critère 6.1 - Liens
                const test6_1_1 = await testLinkText(browser, url);
                urlResults.tests.push(test6_1_1);
                
                // Critère 8.2 - Code valide
                const test8_2_1 = await testHtmlValidity(browser, url);
                urlResults.tests.push(test8_2_1);
                
                // Critère 11.1 - Formulaires - Champs avec étiquette
                const test11_1_1 = await testFormFieldLabels(browser, url);
                urlResults.tests.push(test11_1_1);
                
                // Critère 11.2 - Formulaires - Étiquettes pertinentes
                const test11_2_1 = await testFormLabelRelevance(browser, url);
                urlResults.tests.push(test11_2_1);
                
                // Critère 11.10 - Formulaires - Contrôle de saisie
                const test11_10_1 = await testFormErrorIdentification(browser, url);
                urlResults.tests.push(test11_10_1);
                
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

/**
 * Test 1.1.2 - Vérifie que chaque zone d'une image réactive a une alternative textuelle
 */
async function testAreaAltText(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const areasData = await page.evaluate(() => {
            const result = [];
            const areas = document.querySelectorAll('area');
            
            for (const area of areas) {
                const alt = area.getAttribute('alt');
                const ariaLabel = area.getAttribute('aria-label');
                const hasAltText = alt !== null || ariaLabel !== null;
                
                result.push({
                    tagName: 'area',
                    selector: getUniqueSelector(area),
                    altText: alt || ariaLabel,
                    compliant: hasAltText,
                    details: `href: ${area.getAttribute('href')}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                const siblings = element.parentNode ? Array.from(element.parentNode.children) : [];
                const index = siblings.indexOf(element);
                return `area:nth-child(${index + 1})`;
            }
            
            return result;
        });
        
        const passed = areasData.length === 0 || areasData.every((area: any) => area.compliant);
        
        return {
            id: '1.1.2',
            name: 'Alternative textuelle aux zones d\'images réactives',
            passed,
            elements: areasData
        };
    } catch (error) {
        return {
            id: '1.1.2',
            name: 'Alternative textuelle aux zones d\'images réactives',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 1.1.3 - Vérifie que chaque bouton de type image a une alternative textuelle
 */
async function testInputImageAltText(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const inputsData = await page.evaluate(() => {
            const result = [];
            const inputs = document.querySelectorAll('input[type="image"]');
            
            for (const input of inputs) {
                const alt = input.getAttribute('alt');
                const ariaLabel = input.getAttribute('aria-label');
                const ariaLabelledby = input.getAttribute('aria-labelledby');
                const title = input.getAttribute('title');
                const hasAltText = alt !== null || ariaLabel !== null || ariaLabelledby !== null || title !== null;
                
                result.push({
                    tagName: 'input',
                    selector: getUniqueSelector(input),
                    altText: alt || ariaLabel || title || (ariaLabelledby ? 'Via aria-labelledby' : null),
                    compliant: hasAltText,
                    details: `src: ${input.getAttribute('src')}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                const name = element.getAttribute('name');
                if (name) return `input[name="${name}"]`;
                const siblings = element.parentNode ? Array.from(element.parentNode.children) : [];
                const index = siblings.indexOf(element);
                return `input[type="image"]:nth-child(${index + 1})`;
            }
            
            return result;
        });
        
        const passed = inputsData.length === 0 || inputsData.every((input: any) => input.compliant);
        
        return {
            id: '1.1.3',
            name: 'Alternative textuelle aux boutons image',
            passed,
            elements: inputsData
        };
    } catch (error) {
        return {
            id: '1.1.3',
            name: 'Alternative textuelle aux boutons image',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 1.1.4 - Vérifie la présence d'alternatives aux images réactives côté serveur
 */
async function testServerSideImageMap(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const ismapData = await page.evaluate(() => {
            const result = [];
            const images = document.querySelectorAll('img[ismap]');
            
            for (const img of images) {
                // Chercher des liens alternatifs dans le même conteneur ou à proximité
                const parent = img.closest('a') || img.parentElement;
                const nearbyLinks = parent ? parent.querySelectorAll('a') : [];
                const hasAlternativeLinks = nearbyLinks.length > 1; // Plus d'un lien (l'image + alternatives)
                
                result.push({
                    tagName: 'img',
                    selector: getUniqueSelector(img),
                    compliant: hasAlternativeLinks,
                    details: `Liens alternatifs trouvés: ${nearbyLinks.length}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                return `img[ismap]:nth-of-type(${Array.from(document.querySelectorAll('img[ismap]')).indexOf(element) + 1})`;
            }
            
            return result;
        });
        
        const passed = ismapData.length === 0 || ismapData.every((img: any) => img.compliant);
        
        return {
            id: '1.1.4',
            name: 'Alternatives aux images réactives côté serveur',
            passed,
            elements: ismapData
        };
    } catch (error) {
        return {
            id: '1.1.4',
            name: 'Alternatives aux images réactives côté serveur',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 1.1.5 - Vérifie que chaque image vectorielle SVG a role="img" et une alternative textuelle
 */
async function testSvgAltText(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const svgData = await page.evaluate(() => {
            const result = [];
            const svgs = document.querySelectorAll('svg');
            
            for (const svg of svgs) {
                const role = svg.getAttribute('role');
                const hasRoleImg = role === 'img';
                
                // Vérifier les alternatives textuelles
                const title = svg.querySelector('title')?.textContent;
                const ariaLabel = svg.getAttribute('aria-label');
                const ariaLabelledby = svg.getAttribute('aria-labelledby');
                const hasAltText = title || ariaLabel || ariaLabelledby;
                
                const compliant = hasRoleImg && hasAltText;
                
                result.push({
                    tagName: 'svg',
                    selector: getUniqueSelector(svg),
                    altText: title || ariaLabel || (ariaLabelledby ? 'Via aria-labelledby' : null),
                    compliant,
                    details: `role="${role}", hasAltText: ${!!hasAltText}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                const siblings = Array.from(element.parentNode?.children || []);
                const index = siblings.indexOf(element);
                return `svg:nth-child(${index + 1})`;
            }
            
            return result;
        });
        
        const passed = svgData.length === 0 || svgData.every((svg: any) => svg.compliant);
        
        return {
            id: '1.1.5',
            name: 'Images vectorielles SVG avec role et alternative',
            passed,
            elements: svgData
        };
    } catch (error) {
        return {
            id: '1.1.5',
            name: 'Images vectorielles SVG avec role et alternative',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 1.1.6 - Vérifie les alternatives aux images objet
 */
async function testObjectImageAltText(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const objectData = await page.evaluate(() => {
            const result = [];
            const objects = document.querySelectorAll('object[type^="image/"]');
            
            for (const obj of objects) {
                const role = obj.getAttribute('role');
                const ariaLabel = obj.getAttribute('aria-label');
                const ariaLabelledby = obj.getAttribute('aria-labelledby');
                
                // Vérifier la présence d'un contenu alternatif ou de liens adjacents
                const hasRoleAndAlt = role === 'img' && (ariaLabel || ariaLabelledby);
                const nextSibling = obj.nextElementSibling;
                const hasAdjacentLink = nextSibling && (nextSibling.tagName === 'A' || nextSibling.tagName === 'BUTTON');
                
                const compliant = hasRoleAndAlt || hasAdjacentLink;
                
                result.push({
                    tagName: 'object',
                    selector: getUniqueSelector(obj),
                    altText: ariaLabel || (ariaLabelledby ? 'Via aria-labelledby' : null),
                    compliant,
                    details: `role="${role}", adjacent link: ${hasAdjacentLink}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                return `object[type^="image/"]:nth-of-type(${Array.from(document.querySelectorAll('object[type^="image/"]')).indexOf(element) + 1})`;
            }
            
            return result;
        });
        
        const passed = objectData.length === 0 || objectData.every((obj: any) => obj.compliant);
        
        return {
            id: '1.1.6',
            name: 'Alternatives aux images objet',
            passed,
            elements: objectData
        };
    } catch (error) {
        return {
            id: '1.1.6',
            name: 'Alternatives aux images objet',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 6.1.1 - Vérifie que chaque lien a un intitulé
 */
async function testLinkText(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const linksData = await page.evaluate(() => {
            const result = [];
            const links = document.querySelectorAll('a[href]');
            
            for (const link of links) {
                const textContent = link.textContent?.trim();
                const ariaLabel = link.getAttribute('aria-label');
                const ariaLabelledby = link.getAttribute('aria-labelledby');
                const title = link.getAttribute('title');
                
                // Vérifier si le lien contient une image avec alt
                const imgWithAlt = link.querySelector('img[alt]');
                const imgAlt = imgWithAlt ? imgWithAlt.getAttribute('alt') : null;
                
                const hasLinkText = textContent || ariaLabel || ariaLabelledby || title || imgAlt;
                
                result.push({
                    tagName: 'a',
                    selector: getUniqueSelector(link),
                    altText: textContent || ariaLabel || title || imgAlt || (ariaLabelledby ? 'Via aria-labelledby' : null),
                    compliant: !!hasLinkText,
                    details: `href: ${link.getAttribute('href')}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                const href = element.getAttribute('href');
                if (href) return `a[href="${href}"]`;
                const siblings = Array.from(element.parentNode?.children || []);
                const index = siblings.indexOf(element);
                return `a:nth-child(${index + 1})`;
            }
            
            return result;
        });
        
        const nonCompliantLinks = linksData.filter((link: any) => !link.compliant);
        const passed = nonCompliantLinks.length === 0;
        
        return {
            id: '6.1.1',
            name: 'Intitulé des liens',
            passed,
            elements: linksData
        };
    } catch (error) {
        return {
            id: '6.1.1',
            name: 'Intitulé des liens',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 8.2.1 - Vérification basique de la validité HTML
 */
async function testHtmlValidity(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const validityData = await page.evaluate(() => {
            const result = [];
            const issues = [];
            
            // Vérifications basiques de structure HTML
            const duplicateIds = [];
            const ids = new Set();
            const elementsWithId = document.querySelectorAll('[id]');
            
            for (const element of elementsWithId) {
                const id = element.getAttribute('id');
                if (ids.has(id)) {
                    duplicateIds.push(id);
                } else {
                    ids.add(id);
                }
            }
            
            if (duplicateIds.length > 0) {
                issues.push(`IDs dupliqués: ${duplicateIds.join(', ')}`);
            }
            
            // Vérifier la présence d'un DOCTYPE
            const hasDoctype = document.doctype !== null;
            if (!hasDoctype) {
                issues.push('DOCTYPE manquant');
            }
            
            // Vérifier la présence des balises essentielles
            const hasTitle = document.querySelector('title') !== null;
            if (!hasTitle) {
                issues.push('Balise <title> manquante');
            }
            
            const hasLang = document.documentElement.getAttribute('lang') !== null;
            if (!hasLang) {
                issues.push('Attribut lang manquant sur <html>');
            }
            
            result.push({
                tagName: 'html',
                selector: 'html',
                compliant: issues.length === 0,
                details: issues.length > 0 ? issues.join('; ') : 'Aucune erreur détectée'
            });
            
            return result;
        });
        
        const passed = validityData.every((item: any) => item.compliant);
        
        return {
            id: '8.2.1',
            name: 'Validité du code HTML',
            passed,
            elements: validityData
        };
    } catch (error) {
        return {
            id: '8.2.1',
            name: 'Validité du code HTML',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 11.1.1 - Vérifie que chaque champ de formulaire a une étiquette
 */
async function testFormFieldLabels(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const formData = await page.evaluate(() => {
            const result = [];
            const formFields = document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="reset"]):not([type="button"]):not([type="image"]), select, textarea');
            
            for (const field of formFields) {
                const id = field.getAttribute('id');
                const name = field.getAttribute('name');
                
                // Vérifier les différentes façons d'associer une étiquette
                const labelFor = id ? document.querySelector(`label[for="${id}"]`) : null;
                const labelParent = field.closest('label');
                const ariaLabel = field.getAttribute('aria-label');
                const ariaLabelledby = field.getAttribute('aria-labelledby');
                const title = field.getAttribute('title');
                const placeholder = field.getAttribute('placeholder');
                
                const hasLabel = labelFor || labelParent || ariaLabel || ariaLabelledby || title;
                
                let labelText = '';
                if (labelFor) labelText = labelFor.textContent?.trim() || '';
                else if (labelParent) labelText = labelParent.textContent?.trim() || '';
                else if (ariaLabel) labelText = ariaLabel;
                else if (title) labelText = title;
                else if (ariaLabelledby) labelText = 'Via aria-labelledby';
                
                result.push({
                    tagName: field.tagName.toLowerCase(),
                    selector: getUniqueSelector(field),
                    altText: labelText,
                    compliant: !!hasLabel,
                    details: `type: ${field.getAttribute('type') || 'text'}, name: ${name || 'none'}, placeholder: ${placeholder || 'none'}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                const name = element.getAttribute('name');
                if (name) return `${element.tagName.toLowerCase()}[name="${name}"]`;
                const siblings = Array.from(element.parentNode?.children || []);
                const index = siblings.indexOf(element);
                return `${element.tagName.toLowerCase()}:nth-child(${index + 1})`;
            }
            
            return result;
        });
        
        const nonCompliantFields = formData.filter((field: any) => !field.compliant);
        const passed = nonCompliantFields.length === 0;
        
        return {
            id: '11.1.1',
            name: 'Étiquettes des champs de formulaire',
            passed,
            elements: formData
        };
    } catch (error) {
        return {
            id: '11.1.1',
            name: 'Étiquettes des champs de formulaire',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 11.2.1 - Vérifie la pertinence des étiquettes de formulaire
 */
async function testFormLabelRelevance(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const labelData = await page.evaluate(() => {
            const result = [];
            const labels = document.querySelectorAll('label');
            
            for (const label of labels) {
                const forAttr = label.getAttribute('for');
                const labelText = label.textContent?.trim();
                
                // Vérifier si l'étiquette a du contenu textuel
                const hasText = labelText && labelText.length > 0;
                
                // Vérifier si l'étiquette est associée à un champ
                let associatedField = null;
                if (forAttr) {
                    associatedField = document.getElementById(forAttr);
                } else {
                    associatedField = label.querySelector('input, select, textarea');
                }
                
                const isRelevant = hasText && associatedField;
                
                result.push({
                    tagName: 'label',
                    selector: getUniqueSelector(label),
                    altText: labelText || '',
                    compliant: isRelevant,
                    details: `for: ${forAttr || 'none'}, has field: ${!!associatedField}, text length: ${labelText?.length || 0}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                const forAttr = element.getAttribute('for');
                if (forAttr) return `label[for="${forAttr}"]`;
                const siblings = Array.from(element.parentNode?.children || []);
                const index = siblings.indexOf(element);
                return `label:nth-child(${index + 1})`;
            }
            
            return result;
        });
        
        const nonCompliantLabels = labelData.filter((label: any) => !label.compliant);
        const passed = nonCompliantLabels.length === 0;
        
        return {
            id: '11.2.1',
            name: 'Pertinence des étiquettes de formulaire',
            passed,
            elements: labelData
        };
    } catch (error) {
        return {
            id: '11.2.1',
            name: 'Pertinence des étiquettes de formulaire',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}

/**
 * Test 11.10.1 - Vérifie la présence d'aide à la saisie pour les champs obligatoires
 */
async function testFormErrorIdentification(browser: any, url: string): Promise<TestResult> {
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        const errorData = await page.evaluate(() => {
            const result = [];
            const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required], [aria-required="true"]');
            
            for (const field of requiredFields) {
                const id = field.getAttribute('id');
                
                // Vérifier la présence d'indications d'aide
                const ariaDescribedby = field.getAttribute('aria-describedby');
                const ariaInvalid = field.getAttribute('aria-invalid');
                const title = field.getAttribute('title');
                const placeholder = field.getAttribute('placeholder');
                
                // Chercher des éléments d'aide à proximité
                const parent = field.parentElement;
                const helpText = parent?.querySelector('.help-text, .error-message, .hint, [role="alert"]');
                
                // Vérifier les patterns de validation
                const pattern = field.getAttribute('pattern');
                const type = field.getAttribute('type');
                
                const hasValidationHelp = ariaDescribedby || title || helpText || pattern || 
                    ['email', 'url', 'tel', 'number'].includes(type || '');
                
                result.push({
                    tagName: field.tagName.toLowerCase(),
                    selector: getUniqueSelector(field),
                    compliant: hasValidationHelp,
                    details: `required: true, type: ${type || 'text'}, has help: ${hasValidationHelp}, aria-invalid: ${ariaInvalid || 'none'}`
                });
            }
            
            function getUniqueSelector(element: Element): string {
                if (element.id) return `#${element.id}`;
                const name = element.getAttribute('name');
                if (name) return `${element.tagName.toLowerCase()}[name="${name}"]`;
                const siblings = Array.from(element.parentNode?.children || []);
                const index = siblings.indexOf(element);
                return `${element.tagName.toLowerCase()}:nth-child(${index + 1})`;
            }
            
            return result;
        });
        
        const nonCompliantFields = errorData.filter((field: any) => !field.compliant);
        const passed = nonCompliantFields.length === 0;
        
        return {
            id: '11.10.1',
            name: 'Aide à la saisie pour champs obligatoires',
            passed,
            elements: errorData
        };
    } catch (error) {
        return {
            id: '11.10.1',
            name: 'Aide à la saisie pour champs obligatoires',
            passed: false,
            error: String(error)
        };
    } finally {
        await page.close();
    }
}
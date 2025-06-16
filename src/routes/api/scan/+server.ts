import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import puppeteer from 'puppeteer';
import type { UrlResult } from './types';
import { test__1_1 } from './tests/1x/1_1';
import { test__1_2 } from './tests/1x/1_2';
import { test__1_3 } from './tests/1x/1_3';
import { test__1_4 } from './tests/1x/1_4';
import { test__1_5 } from './tests/1x/1_5';
import { test__1_6 } from './tests/1x/1_6';

export const POST: RequestHandler = async ({ request }) => {
    const urls = await request.json();

    console.log('URLs reçues:', urls);

    const results: UrlResult[] = [];

    for (const url of urls) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);

            const html = await page.content();

            // Importer et exécuter le test 1.1
            const testResult = test__1_1(html);

            // Importer et exécuter le test 1.2
            const testResult2 = test__1_2(html);

            // Importer et exécuter le test 1.3
            const testResult3 = test__1_3(html);

            // Importer et exécuter le test 1.4
            const testResult4 = test__1_4(html);

            // Importer et exécuter le test 1.5
            const testResult5 = test__1_5(html);

            // Importer et exécuter le test 1.6
            const testResult6 = test__1_6(html);

            results.push({
                url,
                tests: [
                    {
                        id: '1.1',
                        name: 'Chaque image porteuse d’information a-t-elle une alternative textuelle ?',
                        passed: testResult
                    },
                    {
                        id: '1.2',
                        name: 'Chaque image de décoration est-elle correctement ignorée par les technologies d’assistance ?',
                        passed: testResult2
                    },
                    {
                        id: '1.3',
                        name: 'Pour chaque image porteuse d’information ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?',
                        passed: testResult3
                    },
                    {
                        id: '1.4',
                        name: 'Pour chaque image utilisée comme CAPTCHA ou image-test, ayant une alternative textuelle, cette alternative permet-elle d’identifier la nature et la fonction de l’image ?',
                        passed: testResult4
                    },
                    {
                        id: '1.5',
                        name: 'Pour chaque image utilisée comme CAPTCHA ou image-test, ayant une alternative textuelle, cette alternative permet-elle d’identifier la nature et la fonction de l’image ?',
                        passed: testResult5
                    },
                    {
                        id: '1.6',
                        name: 'Chaque image porteuse d’information a-t-elle, si nécessaire, une description détaillée ?',
                        passed: testResult6
                    }
                ]
            });

            await browser.close();
        } catch (error) {
            console.error(`Erreur lors de l'analyse de ${url}:`, error);
        }
    }

    return json({ results });
};
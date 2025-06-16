import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import puppeteer from 'puppeteer';
import type { UrlResult } from './types';
import { test__1_1 } from './tests/1x/1_1';
import { test__1_2 } from './tests/1x/1_2';

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

            results.push({
                url,
                tests: [{ id: '1.1', name: ' Chaque image porteuse d’information a-t-elle une alternative textuelle ?', passed: testResult }, { id: '1.2', name: 'Images de décoration', passed: testResult2 }]
            });

            await browser.close();
        } catch (error) {
            console.error(`Erreur lors de l'analyse de ${url}:`, error);
        }
    }

    return json({ results });
};
const objectifJSON = {
    "number": 5,
    "title": "Pour chaque image utilisée comme [CAPTCHA](#captcha), une solution d'accès alternatif au contenu ou à la fonction du CAPTCHA est-elle présente ?",
    "tests": {
        "1": [
            "Chaque image (balises `<img>`, `<area>`, `<object>`, `<embed>`, `<svg>`, `<canvas>` ou possédant un attribut WAI-ARIA `role=\"img\"`) utilisée comme [CAPTCHA](#captcha) vérifie-t-elle une de ces conditions ?",
            "Il existe une autre forme de [CAPTCHA](#captcha) non graphique, au moins ;",
            "Il existe une autre solution d'accès à la fonctionnalité qui est sécurisée par le [CAPTCHA](#captcha)."
        ],
        "2": [
            "Chaque bouton associé à une image (balise `input` avec l'attribut `type=\"image\"`) utilisée comme [CAPTCHA](#captcha) vérifie-t-il une de ces conditions ?",
            "Il existe une autre forme de [CAPTCHA](#captcha) non graphique, au moins ;",
            "Il existe une autre solution d'accès à la fonctionnalité sécurisée par le [CAPTCHA](#captcha)."
        ]
    },
    "references": [
        {
            "wcag": [
                "1.1.1 Non-text Content (A)"
            ]
        },
        {
            "techniques": [
                "G144"
            ]
        }
    ]
};

export { objectifJSON };

export function test__1_5(html: string): boolean {
    // Recherche des images qui pourraient être des CAPTCHA
    const captchaImages = html.match(/<img[^>]*>/g) || [];
    const captchaButtons = html.match(/<input[^>]*type="image"[^>]*>/g) || [];

    // Vérification des alternatives pour chaque image CAPTCHA
    for (const img of captchaImages) {
        // Vérifier s'il existe une alternative non graphique
        const hasNonGraphicAlternative = html.includes('captcha-audio') ||
            html.includes('captcha-text') ||
            html.includes('captcha-alternative');

        // Vérifier s'il existe une autre solution d'accès
        const hasAlternativeAccess = html.includes('alternative-access') ||
            html.includes('bypass-captcha');

        if (!hasNonGraphicAlternative && !hasAlternativeAccess) {
            return false;
        }
    }

    // Vérification des alternatives pour chaque bouton CAPTCHA
    for (const button of captchaButtons) {
        const hasNonGraphicAlternative = html.includes('captcha-audio') ||
            html.includes('captcha-text') ||
            html.includes('captcha-alternative');

        const hasAlternativeAccess = html.includes('alternative-access') ||
            html.includes('bypass-captcha');

        if (!hasNonGraphicAlternative && !hasAlternativeAccess) {
            return false;
        }
    }

    return true;
} 
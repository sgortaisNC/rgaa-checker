const objectifJSON = {
    "number": 1,
    "title": "",
    "tests": {
        "1": [
            "Chaque image (balise `<img>` ou balise possédant l'attribut WAI-ARIA `role=\"img\"`) [porteuse d'information](#image-porteuse-d-information) a-t-elle une [alternative textuelle](#alternative-textuelle-image) ?"
        ],
        "2": [
            "Chaque [zone](#zone-d-une-image-reactive) d'une [image réactive](#image-reactive) (balise `<area>`) [porteuse d'information](#image-porteuse-d-information) a-t-elle une [alternative textuelle](#alternative-textuelle-image) ?"
        ],
        "3": [
            "Chaque bouton de type `image` (balise `<input>` avec l'attribut `type=\"image\"`) a-t-il une [alternative textuelle](#alternative-textuelle-image) ?"
        ],
        "4": [
            "Chaque [zone cliquable](#zone-cliquable) d'une image réactive côté serveur est-elle doublée d'un mécanisme utilisable quel que soit le dispositif de pointage utilisé et permettant d'accéder à la même destination ?"
        ],
        "5": [
            "Chaque image vectorielle (balise `<svg>`) [porteuse d'information](#image-porteuse-d-information), vérifie-t-elle ces conditions ?",
            "La balise `<svg>` possède un attribut WAI-ARIA `role=\"img\"` ;",
            "La balise `<svg>` a une [alternative textuelle](#alternative-textuelle-image)."
        ],
        "6": [
            "Chaque [image objet](#image-objet) (balise `<object>` avec l'attribut `type=\"image/…\"`) [porteuse d'information](#image-porteuse-d-information), vérifie-t-elle une de ces conditions ?",
            "La balise `<object>` possède une [alternative textuelle](#alternative-textuelle-image) et un attribut `role=\"img\"` ;",
            "L'élément `<object>` est immédiatement suivi d'un [lien ou bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à un [contenu alternatif](#contenu-alternatif) ;",
            "Un mécanisme permet à l'utilisateur de remplacer l'élément `<object>` par un [contenu alternatif](#contenu-alternatif)."
        ],
        "7": [
            "Chaque image embarquée (balise `<embed>` avec l'attribut `type=\"image/…\"`) [porteuse d'information](#image-porteuse-d-information), vérifie-t-elle une de ces conditions ?",
            "La balise `<embed>` possède une [alternative textuelle](#alternative-textuelle-image) et un attribut `role=\"img\"` ;",
            "L'élément `<embed>` est immédiatement suivi d'un [lien ou bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à un [contenu alternatif](#contenu-alternatif) ;",
            "Un mécanisme permet à l'utilisateur de remplacer l'élément `<embed>` par un [contenu alternatif](#contenu-alternatif)."
        ],
        "8": [
            "Chaque image bitmap (balise `<canvas>`) [porteuse d'information](#image-porteuse-d-information), vérifie-t-elle une de ces conditions ?",
            "La balise `<canvas>` possède une [alternative textuelle](#alternative-textuelle-image) et un attribut `role=\"img\"` ;",
            "Un [contenu alternatif](#contenu-alternatif) est présent entre les balises `<canvas>` et `</canvas>` ;",
            "L'élément `<canvas>` est immédiatement suivi d'un [lien ou bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à un [contenu alternatif](#contenu-alternatif) ;",
            "Un mécanisme permet à l'utilisateur de remplacer l'élément `<canvas>` par un [contenu alternatif](#contenu-alternatif)."
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
                "H36",
                "H37",
                "H53",
                "F65",
                "H24"
            ]
        }
    ]
};

export { objectifJSON };

/**
 * Test 1.1 - Chaque image porteuse d'information a-t-elle une alternative textuelle ?
 * @param html - Le code HTML à analyser
 * @returns true si le test est passé, false sinon
 */
export function test__1_1(html: string) {
    // Vérifier les images (balise img)
    const images = html.match(/<img[^>]*>/g) || [];
    for (const img of images) {
        if (!img.includes('alt=') && !img.includes('role="presentation"')) {
            return false;
        }
    }

    // Vérifier les zones d'image réactive (balise area)
    const areas = html.match(/<area[^>]*>/g) || [];
    for (const area of areas) {
        if (!area.includes('alt=')) {
            return false;
        }
    }

    // Vérifier les boutons de type image
    const imageButtons = html.match(/<input[^>]*type="image"[^>]*>/g) || [];
    for (const button of imageButtons) {
        if (!button.includes('alt=')) {
            return false;
        }
    }

    // Vérifier les images vectorielles (svg)
    const svgs = html.match(/<svg[^>]*>[\s\S]*?<\/svg>/g) || [];
    for (const svg of svgs) {
        if (!svg.includes('role="img"') || !svg.includes('aria-label=') && !svg.includes('aria-labelledby=')) {
            return false;
        }
    }

    // Vérifier les images objet
    const objects = html.match(/<object[^>]*type="image\/[^"]*"[^>]*>[\s\S]*?<\/object>/g) || [];
    for (const obj of objects) {
        const hasAlt = obj.includes('alt=') && obj.includes('role="img"');
        const hasAdjacentLink = obj.match(/<\/object>\s*<a[^>]*>/) || obj.match(/<\/object>\s*<button[^>]*>/);
        const hasReplacement = obj.includes('data-alternative=');

        if (!hasAlt && !hasAdjacentLink && !hasReplacement) {
            return false;
        }
    }

    // Vérifier les images embarquées
    const embeds = html.match(/<embed[^>]*type="image\/[^"]*"[^>]*>/g) || [];
    for (const embed of embeds) {
        const hasAlt = embed.includes('alt=') && embed.includes('role="img"');
        const hasAdjacentLink = embed.match(/<\/embed>\s*<a[^>]*>/) || embed.match(/<\/embed>\s*<button[^>]*>/);
        const hasReplacement = embed.includes('data-alternative=');

        if (!hasAlt && !hasAdjacentLink && !hasReplacement) {
            return false;
        }
    }

    // Vérifier les images bitmap
    const canvases = html.match(/<canvas[^>]*>[\s\S]*?<\/canvas>/g) || [];
    for (const canvas of canvases) {
        const hasAlt = canvas.includes('alt=') && canvas.includes('role="img"');
        const hasContent = canvas.match(/<canvas[^>]*>[\s\S]+?<\/canvas>/);
        const hasAdjacentLink = canvas.match(/<\/canvas>\s*<a[^>]*>/) || canvas.match(/<\/canvas>\s*<button[^>]*>/);
        const hasReplacement = canvas.includes('data-alternative=');

        if (!hasAlt && !hasContent && !hasAdjacentLink && !hasReplacement) {
            return false;
        }
    }

    return true;
}
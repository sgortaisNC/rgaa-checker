const objectifJSON = {
    "number": 3,
    "title": "Pour chaque image [porteuse d’information](#image-porteuse-d-information) ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente (hors cas particuliers) ?",
    "tests": {
        "1": [
            "Chaque image (balise `<img>` ou balise possédant l’attribut WAI-ARIA `role=\"img\"`) [porteuse d’information](#image-porteuse-d-information), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente (hors cas particuliers) ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent."
        ],
        "2": [
            "Pour chaque [zone](#zone-d-une-image-reactive) (balise `<area>`) d’une [image réactive](#image-reactive) [porteuse d’information](#image-porteuse-d-information), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente (hors cas particuliers) ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent."
        ],
        "3": [
            "Pour chaque [bouton](#bouton-formulaire) de type `image` (balise `<input>` avec l’attribut `type=\"image\"`), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente (hors cas particuliers) ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent."
        ],
        "4": [
            "Pour chaque [image objet](#image-objet) (balise `<object>` avec l’attribut `type=\"image/…\"`) [porteuse d’information](#image-porteuse-d-information), ayant une [alternative textuelle](#alternative-textuelle-image) ou un [contenu alternatif](#contenu-alternatif), cette alternative est-elle pertinente (hors cas particuliers) ?",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent ;",
            "S’il est présent le [contenu alternatif](#contenu-alternatif) est pertinent."
        ],
        "5": [
            "Pour chaque image embarquée (balise `<embed>` avec l’attribut `type=\"image/…\"`) [porteuse d’information](#image-porteuse-d-information), ayant une [alternative textuelle](#alternative-textuelle-image) ou un [contenu alternatif](#contenu-alternatif), cette alternative est-elle pertinente (hors cas particuliers) ?",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent ;",
            "S’il est présent le [contenu alternatif](#contenu-alternatif) est pertinent."
        ],
        "6": [
            "Pour chaque image vectorielle (balise `<svg>`) [porteuse d’information](#image-porteuse-d-information), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente (hors cas particuliers) ?",
            "S’il est présent, le contenu de l'élément `<title>` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent."
        ],
        "7": [
            "Pour chaque image bitmap (balise `<canvas>`) [porteuse d’information](#image-porteuse-d-information), ayant une [alternative textuelle](#alternative-textuelle-image) ou un [contenu alternatif](#contenu-alternatif), cette alternative est-elle pertinente (hors cas particuliers) ?",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent ;",
            "S’il est présent le [contenu alternatif](#contenu-alternatif) est pertinent."
        ],
        "8": [
            "Pour chaque image bitmap (balise `<canvas>`) [porteuse d’information](#image-porteuse-d-information) et ayant  un [contenu alternatif](#contenu-alternatif) entre `<canvas>` et `</canvas>`, ce [contenu alternatif](#contenu-alternatif) est-il [correctement restitué par les technologies d’assistance](#correctement-restitue-par-les-technologies-d-assistance) ?"
        ],
        "9": [
            "Pour chaque image [porteuse d’information](#image-porteuse-d-information) et ayant une [alternative textuelle](#alternative-textuelle-image), l’[alternative textuelle](#alternative-textuelle-image) est-elle [courte et concise](#alternative-courte-et-concise) (hors cas particuliers) ?"
        ]
    },
}

export { objectifJSON };

/**
 * Test 1.3 - Pour chaque image porteuse d’information ayant une alternative textuelle, cette alternative est-elle pertinente (hors cas particuliers) ?
 * @param html - Le code HTML à analyser
 * @returns true si le test est passé, false sinon
 */
export function test__1_3(html: string) {
    // Vérifier les images
    const images = html.match(/<img[^>]*>/g) || [];
    for (const img of images) {
        if (img.includes('alt=') && !img.includes('alt="') && !img.includes('alt=\'\'') && !img.includes('alt=\' \'')) {
            return false;
        }
    }

    // Vérifier les zones d'image réactive
    const areas = html.match(/<area[^>]*>/g) || [];
    for (const area of areas) {
        if (area.includes('alt=') && !area.includes('alt="') && !area.includes('alt=\'\'') && !area.includes('alt=\' \'')) {
            return false;
        }
    }

    // Vérifier les boutons de type image
    const imageButtons = html.match(/<input[^>]*type="image"[^>]*>/g) || [];
    for (const button of imageButtons) {
        if (button.includes('alt=') && !button.includes('alt="') && !button.includes('alt=\'\'') && !button.includes('alt=\' \'')) {
            return false;
        }
    }

    // Vérifier les images objet
    const objects = html.match(/<object[^>]*>/g) || [];
    for (const obj of objects) {
        if (obj.includes('type="image/') &&
            ((obj.includes('title=') && !obj.includes('title="') && !obj.includes('title=\'\'') && !obj.includes('title=\' \'')) ||
                (obj.includes('aria-label=') && !obj.includes('aria-label="') && !obj.includes('aria-label=\'\'') && !obj.includes('aria-label=\' \'')) ||
                (obj.includes('aria-labelledby=') && !obj.includes('aria-labelledby="') && !obj.includes('aria-labelledby=\'\'') && !obj.includes('aria-labelledby=\' \'')))) {
            return false;
        }
    }

    // Vérifier les images embarquées
    const embeds = html.match(/<embed[^>]*>/g) || [];
    for (const embed of embeds) {
        if (embed.includes('type="image/') &&
            ((embed.includes('title=') && !embed.includes('title="') && !embed.includes('title=\'\'') && !embed.includes('title=\' \'')) ||
                (embed.includes('aria-label=') && !embed.includes('aria-label="') && !embed.includes('aria-label=\'\'') && !embed.includes('aria-label=\' \'')) ||
                (embed.includes('aria-labelledby=') && !embed.includes('aria-labelledby="') && !embed.includes('aria-labelledby=\'\'') && !embed.includes('aria-labelledby=\' \'')))) {
            return false;
        }
    }

    // Vérifier les images vectorielles
    const svgs = html.match(/<svg[^>]*>/g) || [];
    for (const svg of svgs) {
        if (svg.includes('role="img"') &&
            ((svg.includes('aria-label=') && !svg.includes('aria-label="') && !svg.includes('aria-label=\'\'') && !svg.includes('aria-label=\' \'')) ||
                (svg.includes('aria-labelledby=') && !svg.includes('aria-labelledby="') && !svg.includes('aria-labelledby=\'\'') && !svg.includes('aria-labelledby=\' \'')))) {
            return false;
        }
    }

    // Vérifier les images bitmap
    const canvases = html.match(/<canvas[^>]*>/g) || [];
    for (const canvas of canvases) {
        if ((canvas.includes('title=') && !canvas.includes('title="') && !canvas.includes('title=\'\'') && !canvas.includes('title=\' \'')) ||
            (canvas.includes('aria-label=') && !canvas.includes('aria-label="') && !canvas.includes('aria-label=\'\'') && !canvas.includes('aria-label=\' \'')) ||
            (canvas.includes('aria-labelledby=') && !canvas.includes('aria-labelledby="') && !canvas.includes('aria-labelledby=\'\'') && !canvas.includes('aria-labelledby=\' \''))) {
            return false;
        }
    }

    return true;
} 
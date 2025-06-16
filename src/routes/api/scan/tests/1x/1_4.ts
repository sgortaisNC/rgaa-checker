const objectifJSON = {
    "number": 4,
    "title": "Pour chaque image utilisée comme [CAPTCHA](#captcha) ou comme [image-test](#image-test), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative permet-elle d’identifier la nature et la fonction de l’image ?",
    "tests": {
        "1": [
            "Pour chaque image (balise `<img>`) utilisée comme [CAPTCHA](#captcha) ou comme [image-test](#image-test), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent."
        ],
        "2": [
            "Pour chaque zone (balise `<area>`) d’une image réactive utilisée comme [CAPTCHA](#captcha) ou comme [image-test](#image-test), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent."
        ],
        "3": [
            "Pour chaque [bouton](#bouton-formulaire) de type image (balise `<input>` avec l’attribut `type=\"image\"`) utilisé comme [CAPTCHA](#captcha) ou comme [image-test](#image-test), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent."
        ],
        "4": [
            "Pour chaque [image objet](#image-objet) (balise `<object>` avec l’attribut `type=\"image/…\"`) utilisée comme [CAPTCHA](#captcha) ou comme [image-test](#image-test), ayant une [alternative textuelle](#alternative-textuelle-image) ou un [contenu alternatif](#contenu-alternatif), cette alternative est-elle pertinente ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent ;",
            "S’il est présent le [contenu alternatif](#contenu-alternatif) est pertinent."
        ],
        "5": [
            "Pour chaque image embarquée (balise `<embed>` avec l’attribut `type=\"image/…\"`) utilisée comme [CAPTCHA](#captcha) ou comme [image-test](#image-test), ayant une [alternative textuelle](#alternative-textuelle-image) ou un [contenu alternatif](#contenu-alternatif), cette alternative est-elle pertinente ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent ;",
            "S’il est présent le [contenu alternatif](#contenu-alternatif) est pertinent."
        ],
        "6": [
            "Pour chaque image vectorielle (balise `<svg>`) utilisée comme [CAPTCHA](#captcha) ou comme [image-test](#image-test), ayant une [alternative textuelle](#alternative-textuelle-image), cette alternative est-elle pertinente ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent."
        ],
        "7": [
            "Pour chaque image bitmap (balise `<canvas>`) utilisée comme [CAPTCHA](#captcha) ou comme [image-test](#image-test), ayant une [alternative textuelle](#alternative-textuelle-image) ou un [contenu alternatif](#contenu-alternatif), cette alternative est-elle pertinente ?",
            "S’il est présent, le contenu de l’attribut `alt` est pertinent ;",
            "S’il est présent, le contenu de l’attribut `title` est pertinent ;",
            "S’il est présent, le contenu de l’attribut WAI-ARIA `aria-label` est pertinent ;",
            "S’il est présent, le [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) associé via l’attribut WAI-ARIA `aria-labelledby` est pertinent ;",
            "S’il est présent le [contenu alternatif](#contenu-alternatif) est pertinent."
        ]
    }
};

export { objectifJSON };

export function test__1_4(html: string) {
    // Vérifier les images objets utilisées comme CAPTCHA ou image-test
    const objects = html.match(/<object[^>]*type="image\/[^"]*"[^>]*>[\s\S]*?<\/object>/g) || [];
    for (const obj of objects) {
        const hasAlt = obj.includes('alt=');
        const hasTitle = obj.includes('title=');
        const hasAriaLabel = obj.includes('aria-label=');
        const hasAriaLabelledby = obj.includes('aria-labelledby=');
        const hasAltContent = obj.match(/<object[^>]*>[\s\S]+?<\/object>/);

        if (!hasAlt && !hasTitle && !hasAriaLabel && !hasAriaLabelledby && !hasAltContent) {
            return false;
        }
    }

    // Vérifier les images embarquées utilisées comme CAPTCHA ou image-test
    const embeds = html.match(/<embed[^>]*type="image\/[^"]*"[^>]*>/g) || [];
    for (const embed of embeds) {
        const hasAlt = embed.includes('alt=');
        const hasTitle = embed.includes('title=');
        const hasAriaLabel = embed.includes('aria-label=');
        const hasAriaLabelledby = embed.includes('aria-labelledby=');

        if (!hasAlt && !hasTitle && !hasAriaLabel && !hasAriaLabelledby) {
            return false;
        }
    }

    // Vérifier les images vectorielles utilisées comme CAPTCHA ou image-test
    const svgs = html.match(/<svg[^>]*>[\s\S]*?<\/svg>/g) || [];
    for (const svg of svgs) {
        const hasAlt = svg.includes('alt=');
        const hasTitle = svg.includes('title=');
        const hasAriaLabel = svg.includes('aria-label=');
        const hasAriaLabelledby = svg.includes('aria-labelledby=');

        if (!hasAlt && !hasTitle && !hasAriaLabel && !hasAriaLabelledby) {
            return false;
        }
    }

    // Vérifier les images bitmap utilisées comme CAPTCHA ou image-test
    const canvases = html.match(/<canvas[^>]*>[\s\S]*?<\/canvas>/g) || [];
    for (const canvas of canvases) {
        const hasAlt = canvas.includes('alt=');
        const hasTitle = canvas.includes('title=');
        const hasAriaLabel = canvas.includes('aria-label=');
        const hasAriaLabelledby = canvas.includes('aria-labelledby=');
        const hasAltContent = canvas.match(/<canvas[^>]*>[\s\S]+?<\/canvas>/);

        if (!hasAlt && !hasTitle && !hasAriaLabel && !hasAriaLabelledby && !hasAltContent) {
            return false;
        }
    }

    return true;
}







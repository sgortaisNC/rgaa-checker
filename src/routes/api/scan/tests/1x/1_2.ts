const objectifJSON = {
    "number": 2,
    "title": "Chaque [image de décoration](#image-de-decoration) est-elle correctement ignorée par les technologies d’assistance ?",
    "tests": {
        "1": [
            "Chaque image (balise `<img>`) [de décoration](#image-de-decoration), sans [légende](#legende-d-image), vérifie-t-elle une de ces conditions ?",
            "La balise `<img>` possède un attribut `alt` vide (`alt=\"\"`) et est dépourvue de tout autre attribut permettant de fournir une [alternative textuelle](#alternative-textuelle-image) ;",
            "La balise `<img>` possède un attribut WAI-ARIA `aria-hidden=\"true\"` ou `role=\"presentation\"`."
        ],
        "2": [
            "Chaque [zone non cliquable](#zone-non-cliquable) (balise `<area>` sans attribut `href`) [de décoration](#image-de-decoration), vérifie-t-elle une de ces conditions ?",
            "La balise `<area>` possède un attribut `alt` vide (`alt=\"\"`) et est dépourvue de tout autre attribut permettant de fournir une [alternative textuelle](#alternative-textuelle-image) ;",
            "La balise `<area>` possède un attribut WAI-ARIA `aria-hidden=\"true\"` ou `role=\"presentation\"`."
        ],
        "3": [
            "Chaque [image objet](#image-objet) (balise `<object>` avec l’attribut `type=\"image/…\"`) [de décoration](#image-de-decoration), sans [légende](#legende-d-image), vérifie-t-elle ces conditions ?",
            "La balise `<object>` possède un attribut WAI-ARIA `aria-hidden=\"true\"` ;",
            "La balise `<object>` est dépourvue d’alternative textuelle ;",
            "Il n’y a aucun texte faisant office d’alternative textuelle entre `<object>` et `</object>`."
        ],
        "4": [
            "Chaque image vectorielle (balise `<svg>`) [de décoration](#image-de-decoration), sans [légende](#legende-d-image), vérifie-t-elle ces conditions ?",
            "La balise `<svg>` possède un attribut WAI-ARIA `aria-hidden=\"true\"` ;",
            "La balise `<svg>` et ses enfants sont dépourvus d’[alternative textuelle](#alternative-textuelle-image) ;",
            "Les balises `<title>` et `<desc>` sont absentes ou vides ;",
            "La balise `<svg>` et ses enfants sont dépourvus d’attribut `title`."
        ],
        "5": [
            "Chaque image bitmap (balise `<canvas>`) [de décoration](#image-de-decoration), sans [légende](#legende-d-image), vérifie-t-elle ces conditions ?",
            "La balise `<canvas>` possède un attribut WAI-ARIA `aria-hidden=\"true\"` ;",
            "La balise `<canvas>` et ses enfants sont dépourvus d’[alternative textuelle](#alternative-textuelle-image) ;",
            "Il n’y a aucun texte faisant office d’[alternative textuelle](#alternative-textuelle-image) entre `<canvas>` et `</canvas>`."
        ],
        "6": [
            "Chaque image embarquée (balise `<embed>` avec l’attribut `type=\"image/…\"`) [de décoration](#image-de-decoration), sans [légende](#legende-d-image), vérifie-t-elle ces conditions ?",
            "La balise `<embed>` possède un attribut WAI-ARIA `aria-hidden=\"true\"` ;",
            "La balise `<embed>` et ses enfants sont dépourvus d’[alternative textuelle](#alternative-textuelle-image)."
        ]
    },
    "technicalNote": [
        "Lorsqu'une image est associée à une [légende](#legende-d-image), la note technique WCAG recommande de prévoir systématiquement une [alternative textuelle](#alternative-textuelle-image) (cf. critère 1.9). Dans ce cas le critère 1.2 est non applicable.",
        "Dans le cas d'une image vectorielle (balise `<svg>`) de décoration qui serait affichée au travers d'un élément `<use href=\"…\">` enfant de l'élément `<svg>`, le test 1.2.4 s'appliquera également à l'élément `<svg>` associée par le biais de l'élément `<use>`.",
        "Un attribut WAI-ARIA `role=\"presentation\"` peut être utilisé sur les images de décoration et les zones non cliquables de décoration. Le rôle `\"none\"` introduit en ARIA 1.1 et synonyme du rôle `\"presentation\"` peut être aussi utilisé. Il reste préférable cependant d'utiliser le rôle `\"presentation\"` en attendant un support satisfaisant du rôle `\"none\"`."
    ],
};

export { objectifJSON };

/** 
 * Test 1.2 - Chaque image de décoration est-elle correctement ignorée par les technologies d’assistance ?
 * @param html - Le code HTML à analyser
 * @returns true si le test est passé, false sinon
 */
export function test__1_2(html: string) {
    // Vérifier les images décoratives
    const images = html.match(/<img[^>]*>/g) || [];
    for (const img of images) {
        const hasEmptyAlt = img.includes('alt=""') && !img.includes('alt=" ') && !img.includes('alt=\' \'');
        const hasAriaHidden = img.includes('aria-hidden="true"');
        const hasRolePresentation = img.includes('role="presentation"');

        if (!hasEmptyAlt && !hasAriaHidden && !hasRolePresentation) {
            return false;
        }
    }

    // Vérifier les zones non cliquables décoratives
    const areas = html.match(/<area[^>]*>/g) || [];
    for (const area of areas) {
        if (!area.includes('href')) {
            const hasEmptyAlt = area.includes('alt=""') && !area.includes('alt=" ') && !area.includes('alt=\' \'');
            const hasAriaHidden = area.includes('aria-hidden="true"');
            const hasRolePresentation = area.includes('role="presentation"');

            if (!hasEmptyAlt && !hasAriaHidden && !hasRolePresentation) {
                return false;
            }
        }
    }

    // Vérifier les images objets décoratives
    const objects = html.match(/<object[^>]*type="image\/[^"]*"[^>]*>[\s\S]*?<\/object>/g) || [];
    for (const obj of objects) {
        const hasAriaHidden = obj.includes('aria-hidden="true"');
        const hasNoAlt = !obj.includes('alt=') && !obj.includes('aria-label=') && !obj.includes('aria-labelledby=');
        const hasNoTextContent = !obj.match(/<object[^>]*>[\s\S]+?<\/object>/);

        if (!hasAriaHidden || !hasNoAlt || !hasNoTextContent) {
            return false;
        }
    }

    // Vérifier les images vectorielles décoratives
    const svgs = html.match(/<svg[^>]*>[\s\S]*?<\/svg>/g) || [];
    for (const svg of svgs) {
        const hasAriaHidden = svg.includes('aria-hidden="true"');
        const hasNoAlt = !svg.includes('aria-label=') && !svg.includes('aria-labelledby=');
        const hasNoTitleDesc = !svg.includes('<title>') && !svg.includes('<desc>');
        const hasNoTitleAttr = !svg.includes('title=');

        if (!hasAriaHidden || !hasNoAlt || !hasNoTitleDesc || !hasNoTitleAttr) {
            return false;
        }
    }

    // Vérifier les images bitmap décoratives
    const canvases = html.match(/<canvas[^>]*>[\s\S]*?<\/canvas>/g) || [];
    for (const canvas of canvases) {
        const hasAriaHidden = canvas.includes('aria-hidden="true"');
        const hasNoAlt = !canvas.includes('alt=') && !canvas.includes('aria-label=') && !canvas.includes('aria-labelledby=');
        const hasNoTextContent = !canvas.match(/<canvas[^>]*>[\s\S]+?<\/canvas>/);

        if (!hasAriaHidden || !hasNoAlt || !hasNoTextContent) {
            return false;
        }
    }

    // Vérifier les images embarquées décoratives
    const embeds = html.match(/<embed[^>]*type="image\/[^"]*"[^>]*>/g) || [];
    for (const embed of embeds) {
        const hasAriaHidden = embed.includes('aria-hidden="true"');
        const hasNoAlt = !embed.includes('alt=') && !embed.includes('aria-label=') && !embed.includes('aria-labelledby=');

        if (!hasAriaHidden || !hasNoAlt) {
            return false;
        }
    }

    return true;

} 
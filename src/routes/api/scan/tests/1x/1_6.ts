const objectifJSON = {
    "number": 6,
    "title": "Chaque image [porteuse d'information](#image-porteuse-d-information) a-t-elle, si nécessaire, une [description détaillée](#description-detaillee-image) ?",
    "tests": {
        "1": [
            "Chaque image (balise `<img>`) [porteuse d'information](#image-porteuse-d-information), qui nécessite une [description détaillée](#description-detaillee-image), vérifie-t-elle une de ces conditions ?",
            "Il existe un attribut `longdesc` qui donne l'adresse (URL) d'une page ou d'un emplacement dans la page contenant la [description détaillée](#description-detaillee-image) ;",
            "Il existe une [alternative textuelle](#alternative-textuelle-image) contenant la référence à une [description détaillée](#description-detaillee-image) adjacente à l'image ;",
            "Il existe un [lien ou un bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à la [description détaillée](#description-detaillee-image)."
        ],
        "2": [
            "Chaque [image objet](#image-objet) (balise `<object>` avec l'attribut `type=\"image/…\"`) [porteuse d'information](#image-porteuse-d-information), qui nécessite une [description détaillée](#description-detaillee-image), vérifie-t-elle une de ces conditions ?",
            "Il existe un attribut `longdesc` qui donne l'adresse (URL) d'une page ou d'un emplacement dans la page contenant la [description détaillée](#description-detaillee-image) ;",
            "Il existe une [alternative textuelle](#alternative-textuelle-image) contenant la référence à une [description détaillée](#description-detaillee-image) adjacente à l'image ;",
            "Il existe un [lien ou un bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à la [description détaillée](#description-detaillee-image)."
        ],
        "3": [
            "Chaque image embarquée (balise `<embed>`) [porteuse d'information](#image-porteuse-d-information), qui nécessite une [description détaillée](#description-detaillee-image), vérifie-t-elle une de ces conditions ?",
            "Il existe un attribut `longdesc` qui donne l'adresse (URL) d'une page ou d'un emplacement dans la page contenant la [description détaillée](#description-detaillee-image) ;",
            "Il existe une [alternative textuelle](#alternative-textuelle-image) contenant la référence à une [description détaillée](#description-detaillee-image) adjacente à l'image ;",
            "Il existe un [lien ou un bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à la [description détaillée](#description-detaillee-image)."
        ],
        "4": [
            "Chaque [bouton](#bouton-formulaire) de type image (balise `<input>` avec l'attribut `type=\"image\"`) [porteur d'information](#image-porteuse-d-information), qui nécessite une [description détaillée](#description-detaillee-image), vérifie-t-il une de ces conditions ?",
            "Il existe un attribut `longdesc` qui donne l'adresse (URL) d'une page ou d'un emplacement dans la page contenant la [description détaillée](#description-detaillee-image) ;",
            "Il existe une [alternative textuelle](#alternative-textuelle-image) contenant la référence à une [description détaillée](#description-detaillee-image) adjacente à l'image ;",
            "Il existe un [lien ou un bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à la [description détaillée](#description-detaillee-image)."
        ],
        "5": [
            "Chaque image vectorielle (balise `<svg>`) [porteuse d'information](#image-porteuse-d-information), qui nécessite une [description détaillée](#description-detaillee-image), vérifie-t-elle une de ces conditions ?",
            "Il existe un attribut WAI-ARIA `aria-label` contenant l'alternative textuelle et une référence à une [description détaillée](#description-detaillee-image) adjacente ;",
            "Il existe un attribut WAI-ARIA `aria-labelledby` associant un [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) faisant office d'alternative textuelle et un autre faisant office de [description détaillée](#description-detaillee-image) ;",
            "Il existe un attribut WAI-ARIA `aria-describedby` associant un [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) faisant office de [description détaillée](#description-detaillee-image) ;",
            "Il existe un [lien ou un bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à la [description détaillée](#description-detaillee-image)."
        ],
        "6": [
            "Pour chaque image vectorielle (balise `<svg>`) [porteuse d'information](#image-porteuse-d-information), ayant une [description détaillée](#description-detaillee-image), la référence éventuelle à la [description détaillée](#description-detaillee-image) dans l'attribut WAI-ARIA `aria-label` et la [description détaillée](#description-detaillee-image) associée par l'attribut WAI-ARIA `aria-labelledby` ou `aria-describedby` sont-elles correctement restituées par les technologies d'assistance ?"
        ],
        "7": [
            "Chaque image bitmap (balise `<canvas>`), [porteuse d'information](#image-porteuse-d-information), qui nécessite une [description détaillée](#description-detaillee-image), vérifie-t-elle une de ces conditions ?",
            "Il existe un attribut WAI-ARIA `aria-label` contenant l'alternative textuelle et une référence à une [description détaillée](#description-detaillee-image) adjacente ;",
            "Il existe un attribut WAI-ARIA `aria-labelledby` associant un passage de texte faisant office d'alternative textuelle et un autre faisant office de [description détaillée](#description-detaillee-image) ;",
            "Il existe un contenu textuel entre `<canvas>` et `</canvas>` faisant référence à une [description détaillée](#description-detaillee-image) adjacente à l'image bitmap ;",
            "Il existe un contenu textuel entre `<canvas>` et `</canvas>` faisant office de [description détaillée](#description-detaillee-image) ;",
            "Il existe un [lien ou bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à la [description détaillée](#description-detaillee-image)."
        ],
        "8": [
            "Pour chaque image bitmap (balise `<canvas>`) [porteuse d'information](#image-porteuse-d-information), qui implémente une référence à une [description détaillée](#description-detaillee-image) adjacente, cette référence est-elle correctement restituée par les technologies d'assistance ?"
        ],
        "9": [
            "Pour chaque image (balise `<img>`, `<input>` avec l'attribut `type=\"image\"`, `<area>`, `<object>`, `<embed>`, `<svg>`, `<canvas>`, ou possédant un attribut WAI-ARIA `role=\"img\"`) [porteuse d'information](#image-porteuse-d-information), qui est accompagnée d'une [description détaillée](#description-detaillee-image) et qui utilise un attribut WAI-ARIA `aria-describedby`, l'attribut WAI-ARIA `aria-describedby` associe-t-il la [description détaillée](#description-detaillee-image) ?"
        ],
        "10": [
            "Chaque balise possédant un attribut WAI-ARIA `role=\"img\"` [porteuse d'information](#image-porteuse-d-information), qui nécessite une [description détaillée](#description-detaillee-image), vérifie-t-elle une de ces conditions ?",
            "Il existe un attribut WAI-ARIA `aria-label` contenant l'[alternative textuelle](#alternative-textuelle-image) et une référence à une [description détaillée](#description-detaillee-image) adjacente ;",
            "Il existe un attribut WAI-ARIA `aria-labelledby` associant un [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) faisant office d'[alternative textuelle](#alternative-textuelle-image) et un autre faisant office de [description détaillée](#description-detaillee-image) ;",
            "Il existe un attribut WAI-ARIA `aria-describedby` associant un [passage de texte](#passage-de-texte-lie-par-aria-labelledby-ou-aria-describedby) faisant office de [description détaillée](#description-detaillee-image) ;",
            "Il existe un [lien ou un bouton adjacent](#lien-ou-bouton-adjacent) permettant d'accéder à la [description détaillée](#description-detaillee-image)."
        ]
    },
    "technicalNote": [
        "Dans le cas du SVG, le manque de support de l'élément `<title>` et `<desc>` par les technologies d'assistance crée une difficulté dans le cas de l'implémentation de l'[alternative textuelle](#alternative-textuelle-image) de l'image et de sa [description détaillée](#description-detaillee-image). Dans ce cas, il est recommandé d'utiliser l'attribut WAI-ARIA `aria-label` pour implémenter à la fois l'[alternative textuelle](#alternative-textuelle-image) courte et la référence à la [description détaillée](#description-detaillee-image) adjacente ou l'attribut WAI-ARIA `aria-labelledby` pour associer les passages de texte faisant office d'alternative courte et de [description détaillée](#description-detaillee-image).",
        "L'utilisation de l'attribut WAI-ARIA aria-describedby n'est pas recommandée pour lier une image (`<img>`, `<object>`, `<embed>`, `<canvas>`) à sa [description détaillée](#description-detaillee-image), par manque de support des technologies d'assistance. Néanmoins, lorsqu'il est utilisé, l'attribut devra nécessairement faire référence à l'`id` de la zone contenant la [description détaillée](#description-detaillee-image).",
        "La [description détaillée](#description-detaillee-image) adjacente peut être implémentée via une balise `<figcaption>`, dans ce cas le critère 1.9 doit être vérifié (utilisation de `<figure>` et des attributs WAI-ARIA `role=\"figure\"` et `aria-label`, notamment).",
        "L'attribut `longdesc` qui constitue une des conditions du test 1.6.1 (et dont la pertinence est vérifiée avec le test 1.7.1) est désormais considéré comme obsolète par la spécification HTML en cours. La vérification de cet attribut ne sera donc requise que pour les versions de la spécification HTML antérieure à HTML 5."
    ],
    "references": [
        {
            "wcag": [
                "1.1.1 Non-text Content (A)"
            ]
        },
        {
            "techniques": [
                "G92",
                "G74",
                "G73",
                "H45",
                "ARIA6"
            ]
        }
    ]
};

export { objectifJSON };

export function test__1_6(html: string): boolean {
    // Recherche des images qui nécessitent une description détaillée
    const images = html.match(/<img[^>]*>/g) || [];
    const objects = html.match(/<object[^>]*type="image\/[^"]*"[^>]*>/g) || [];
    const embeds = html.match(/<embed[^>]*>/g) || [];
    const svgs = html.match(/<svg[^>]*>/g) || [];
    const canvases = html.match(/<canvas[^>]*>/g) || [];
    const roleImages = html.match(/<[^>]*role="img"[^>]*>/g) || [];

    // Fonction pour vérifier la présence d'une description détaillée
    const hasDetailedDescription = (element: string, context: string): boolean => {
        // Vérifier l'attribut longdesc
        if (element.includes('longdesc=')) return true;

        // Vérifier les attributs ARIA
        if (element.includes('aria-describedby=')) return true;
        if (element.includes('aria-labelledby=')) return true;

        // Vérifier les liens adjacents
        const elementIndex = context.indexOf(element);
        const surroundingContext = context.slice(Math.max(0, elementIndex - 200), elementIndex + 200);
        if (surroundingContext.includes('<a href=') || surroundingContext.includes('<button')) return true;

        // Vérifier les figcaptions pour les images
        if (element.startsWith('<img') && context.includes('<figcaption>')) return true;

        return false;
    };

    // Vérification pour chaque type d'élément
    for (const img of images) {
        if (!hasDetailedDescription(img, html)) return false;
    }

    for (const obj of objects) {
        if (!hasDetailedDescription(obj, html)) return false;
    }

    for (const embed of embeds) {
        if (!hasDetailedDescription(embed, html)) return false;
    }

    for (const svg of svgs) {
        if (!hasDetailedDescription(svg, html)) return false;
    }

    for (const canvas of canvases) {
        if (!hasDetailedDescription(canvas, html)) return false;
    }

    for (const roleImg of roleImages) {
        if (!hasDetailedDescription(roleImg, html)) return false;
    }

    return true;
} 
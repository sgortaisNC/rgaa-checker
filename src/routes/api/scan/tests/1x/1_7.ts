const objectifJSON = {
    "number": 1,
    "title": "",
    "tests": {
        "1": [
            "Chaque image (balise `<img>` ou balise possédant l'attribut WAI-ARIA `role=\"img\"`) [porteuse d'information](#image-porteuse-d-information) a-t-elle une [alternative textuelle](#alternative-textuelle-image) ?"
        ]
    },
    "references": [
        {
            "wcag": [
                "1.1.1 Non-text Content (A)"
            ]
        }
    ]
};

export { objectifJSON };

export function test__1_7() {
    return true;
} 
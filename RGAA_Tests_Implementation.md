# Tests automatisés RGAA 4.1.2 - Implémentation

## Vue d'ensemble

Ce document détaille l'implémentation des tests automatisés conformes au [Référentiel général d'amélioration de l'accessibilité (RGAA 4.1.2)](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/) du gouvernement français.

## Critères implémentés

### 1. Images (Critère 1.1) - ✅ Complet

#### 1.1.1 - Alternative textuelle aux images
- **Test** : Vérifie que chaque image (`<img>` ou `[role="img"]`) a une alternative textuelle
- **Vérifications** :
  - Attribut `alt`
  - Attribut `aria-label`
  - Attribut `aria-labelledby`
  - Attribut `title`
- **Conformité** : Le test passe si toutes les images ont au moins une alternative textuelle

#### 1.1.2 - Alternative textuelle aux zones d'images réactives
- **Test** : Vérifie que chaque zone `<area>` d'une image réactive a une alternative textuelle
- **Vérifications** :
  - Attribut `alt`
  - Attribut `aria-label`
- **Conformité** : Le test passe si toutes les zones ont une alternative textuelle

#### 1.1.3 - Alternative textuelle aux boutons image
- **Test** : Vérifie que chaque `<input type="image">` a une alternative textuelle
- **Vérifications** :
  - Attribut `alt`
  - Attribut `aria-label`
  - Attribut `aria-labelledby`
  - Attribut `title`
- **Conformité** : Le test passe si tous les boutons image ont une alternative textuelle

#### 1.1.4 - Alternatives aux images réactives côté serveur
- **Test** : Vérifie la présence d'alternatives pour les images avec attribut `ismap`
- **Vérifications** : Présence de liens alternatifs à proximité
- **Conformité** : Le test passe si des alternatives sont disponibles

#### 1.1.5 - Images vectorielles SVG
- **Test** : Vérifie que chaque `<svg>` a `role="img"` et une alternative textuelle
- **Vérifications** :
  - Attribut `role="img"`
  - Élément `<title>`
  - Attribut `aria-label`
  - Attribut `aria-labelledby`
- **Conformité** : Le test passe si le role ET l'alternative sont présents

#### 1.1.6 - Alternatives aux images objet
- **Test** : Vérifie les alternatives pour `<object type="image/...">`
- **Vérifications** :
  - Combinaison `role="img"` + alternative textuelle
  - Liens ou boutons adjacents
- **Conformité** : Le test passe si une alternative est disponible

### 2. Liens (Critère 6.1)

#### 6.1.1 - Intitulé des liens
- **Test** : Vérifie que chaque lien `<a href>` a un intitulé
- **Vérifications** :
  - Contenu textuel
  - Attribut `aria-label`
  - Attribut `aria-labelledby`
  - Attribut `title`
  - Images avec `alt` dans le lien
- **Conformité** : Le test passe si tous les liens ont un intitulé

### 3. Code valide (Critère 8.2)

#### 8.2.1 - Validité du code HTML
- **Test** : Vérifications basiques de la structure HTML
- **Vérifications** :
  - Absence d'IDs dupliqués
  - Présence du DOCTYPE
  - Présence de la balise `<title>`
  - Attribut `lang` sur `<html>`
- **Conformité** : Le test passe si aucune erreur n'est détectée

### 4. Formulaires (Critères 11.x)

#### 11.1.1 - Étiquettes des champs de formulaire
- **Test** : Vérifie que chaque champ de formulaire a une étiquette
- **Champs concernés** : `input`, `select`, `textarea` (sauf types système)
- **Vérifications** :
  - Balise `<label for="...">` associée
  - Balise `<label>` parente
  - Attribut `aria-label`
  - Attribut `aria-labelledby`
  - Attribut `title`
- **Conformité** : Le test passe si tous les champs ont une étiquette

#### 11.2.1 - Pertinence des étiquettes de formulaire
- **Test** : Vérifie que les étiquettes sont pertinentes et associées
- **Vérifications** :
  - Présence de contenu textuel dans l'étiquette
  - Association correcte avec un champ
- **Conformité** : Le test passe si toutes les étiquettes sont pertinentes

#### 11.10.1 - Aide à la saisie pour champs obligatoires
- **Test** : Vérifie la présence d'aide pour les champs obligatoires
- **Champs concernés** : `[required]` ou `[aria-required="true"]`
- **Vérifications** :
  - Attribut `aria-describedby`
  - Attribut `title`
  - Éléments d'aide à proximité (`.help-text`, `[role="alert"]`, etc.)
  - Attribut `pattern` pour validation
  - Types HTML5 avec validation intégrée (`email`, `url`, `tel`, `number`)
- **Conformité** : Le test passe si tous les champs obligatoires ont une aide

## Architecture technique

### Utilisation de Puppeteer
- Navigation automatique vers les URLs à tester
- Évaluation du DOM côté client pour les vérifications
- Gestion d'erreurs robuste pour chaque test

### Structure des résultats
```typescript
interface TestResult {
    id: string;          // Identifiant du critère (ex: "1.1.1")
    name: string;        // Nom descriptif du test
    passed: boolean;     // Résultat du test
    elements?: {         // Détails des éléments testés
        tagName: string;
        selector: string;
        altText?: string;
        compliant: boolean;
        details?: string;
    }[];
    error?: string;      // Erreur éventuelle
}
```

### Gestion d'erreurs
- Timeout configuré à 30 secondes par page
- Gestion des erreurs de navigation
- Tests isolés (échec d'un test n'impacte pas les autres)
- Fermeture propre des pages après chaque test

## Prochaines étapes possibles

### Critères supplémentaires facilement automatisables :
- **Critère 1.2** : Images de décoration
- **Critère 1.3** : Images porteuses d'information complexe
- **Critère 3.1** : Contraste des couleurs
- **Critère 4.1** : Média temporel avec transcription
- **Critère 5.3** : Linéarisation des tableaux
- **Critère 7.1** : Scripts et changements de contexte
- **Critère 9.1** : Titres hiérarchiques
- **Critère 10.4** : Lisibilité du texte
- **Critère 12.1** : Navigation par liens d'évitement

### Améliorations techniques :
- Intégration avec des API de validation HTML (W3C Validator)
- Tests de contraste automatisés
- Vérification des landmarks ARIA
- Tests de navigation au clavier
- Détection des animations et transitions

## Références

- [RGAA 4.1.2 - Critères et tests officiels](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [EN 301 549 V2.1.2](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/02.01.02_60/en_301549v020102p.pdf)
# Extension Chrome Ananasit

Extension Chrome pour envoyer des URLs et du texte sélectionné vers le système Ananasit de Musiques Incongrues.

## Fonctionnalités

- **Clic sur l'icône** : Envoie l'URL de la page courante et le texte sélectionné (si présent)
- **Menu contextuel sur sélection** : Clic droit sur du texte sélectionné → "Envoyer vers Ananasit"
- **Menu contextuel sur page** : Clic droit n'importe où → "Envoyer cette page vers Ananasit"

## Installation

### Mode développeur (pour tester)

1. Ouvrez Chrome et allez sur `chrome://extensions/`
2. Activez le "Mode développeur" (en haut à droite)
3. Cliquez sur "Charger l'extension non empaquetée"
4. Sélectionnez le dossier `chrome-extension`

### Avant l'installation

**Important** : Vous devez ajouter les icônes dans le dossier `icons/` :
- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

Voir [icons/README.md](icons/README.md) pour plus de détails.

## Structure

```
chrome-extension/
├── manifest.json       # Configuration de l'extension
├── background.js       # Script principal (service worker)
├── icons/             # Icônes de l'extension
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # Ce fichier
```

## Configuration

L'URL du webhook n8n est définie dans [background.js](background.js:2) :

```javascript
const WEBHOOK_URL = 'https://n8n.musiques-incongrues.net/webhook/ananasit';
```

Modifiez cette URL si nécessaire.

## Publier sur le Chrome Web Store

Pour publier l'extension publiquement :

1. Créez un compte développeur Chrome (frais unique de 5$)
2. Préparez les assets requis (captures d'écran, description, etc.)
3. Empaquetez l'extension en ZIP
4. Soumettez sur le [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)

## Licence

À définir selon les besoins du projet Musiques Incongrues.

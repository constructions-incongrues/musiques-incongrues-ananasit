# Extension Chrome Ananas It ! pour Musiques Incongrues

Extension Chrome pour envoyer des URLs et du texte sélectionné vers le forum des Musiques Incongrues.

## Fonctionnalités

- **Clic sur l'icône** : Envoie l'URL de la page courante et le texte sélectionné (si présent)
- **Menu contextuel sur sélection** : Clic droit sur du texte sélectionné → "Envoyer vers Musiques Incongrues"
- **Menu contextuel sur page** : Clic droit n'importe où → "Envoyer cette page vers Musiques Incongrues"

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

### Publication automatique avec GitHub Actions

Ce projet inclut des workflows GitHub Actions pour automatiser la publication. Voir [.github/workflows/README.md](.github/workflows/README.md) pour la documentation complète.

**Configuration requise :**

1. Créez un compte développeur Chrome (frais unique de 5$)
2. Publiez manuellement l'extension une première fois pour obtenir l'Extension ID
3. Configurez les secrets GitHub (voir documentation des workflows) :
   - `CHROME_EXTENSION_ID`
   - `CHROME_CLIENT_ID`
   - `CHROME_CLIENT_SECRET`
   - `CHROME_REFRESH_TOKEN`

**Publication :**

- **Automatique** : Créez une release GitHub et le workflow publiera automatiquement
- **Manuel** : Utilisez "Run workflow" dans l'onglet Actions de GitHub

### Publication manuelle

Pour publier l'extension manuellement :

1. Préparez les assets requis (captures d'écran, description, etc.)
2. Empaquetez l'extension en ZIP :
   ```bash
   cd chrome-extension
   zip -r ../ananasit-extension.zip . -x "*.md" -x "icons/logo-*.png"
   ```
3. Soumettez sur le [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)

## Développement

### Structure du projet

```
.
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       ├── build.yml       # Build et validation automatiques
│       ├── publish.yml     # Publication sur Chrome Web Store
│       └── README.md       # Documentation des workflows
├── chrome-extension/
│   ├── manifest.json       # Configuration de l'extension
│   ├── background.js       # Script principal (service worker)
│   └── icons/              # Icônes de l'extension
└── README.md               # Ce fichier
```

### Workflows disponibles

- **Build Extension** : Valide et package l'extension sur chaque push/PR
- **Publish to Chrome Web Store** : Publie automatiquement lors d'une release

## Licence

À définir selon les besoins du projet Musiques Incongrues.

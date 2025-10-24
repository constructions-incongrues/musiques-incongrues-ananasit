# GitHub Workflows pour Ananasit Extension

Ce dossier contient les workflows GitHub Actions pour automatiser la publication de l'extension Chrome.

## Workflows disponibles

### 1. Build Extension (`build.yml`)

**Déclenchement automatique :**
- Push sur `main` ou `develop`
- Pull requests vers `main`

**Actions :**
- Valide le fichier `manifest.json`
- Vérifie la présence de tous les fichiers requis
- Crée un package ZIP de l'extension
- Archive l'artefact pendant 30 jours

### 2. Publish to Chrome Web Store (`publish.yml`)

**Déclenchement :**
- Automatique lors d'une nouvelle release GitHub
- Manuel via "workflow_dispatch" (avec numéro de version)

**Actions :**
- Met à jour la version dans le manifest (si déclenchement manuel)
- Crée le package ZIP
- Publie automatiquement sur le Chrome Web Store
- Attache le ZIP à la release GitHub (si applicable)

## Configuration requise

### Secrets GitHub à configurer

Pour que le workflow de publication fonctionne, vous devez ajouter ces secrets dans votre repository :
**Settings → Secrets and variables → Actions → New repository secret**

| Secret | Description | Comment l'obtenir |
|--------|-------------|-------------------|
| `CHROME_EXTENSION_ID` | ID de votre extension | Visible dans l'URL du dashboard Chrome Web Store |
| `CHROME_CLIENT_ID` | Client ID de l'API Google | [Console Google Cloud](https://console.cloud.google.com/apis/credentials) |
| `CHROME_CLIENT_SECRET` | Client Secret de l'API | [Console Google Cloud](https://console.cloud.google.com/apis/credentials) |
| `CHROME_REFRESH_TOKEN` | Refresh Token OAuth2 | Voir instructions ci-dessous |

### Obtenir les credentials Google Cloud

1. **Créer un projet Google Cloud** (si pas déjà fait)
   - Allez sur https://console.cloud.google.com/
   - Créez un nouveau projet

2. **Activer l'API Chrome Web Store**
   - Dans votre projet, activez "Chrome Web Store API"

3. **Créer des credentials OAuth 2.0**
   - Allez dans "APIs & Services" → "Credentials"
   - Cliquez "Create Credentials" → "OAuth client ID"
   - Type : "Desktop app" ou "Web application"
   - Notez le `Client ID` et `Client Secret`

4. **Obtenir le Refresh Token**

   Utilisez ce script Node.js :

   ```bash
   npm install -g chrome-webstore-upload-cli

   # Lancez la commande suivante et suivez les instructions
   chrome-webstore-upload get-refresh-token
   ```

   Ou utilisez cette méthode manuelle :

   ```bash
   # 1. Construisez cette URL (remplacez CLIENT_ID)
   https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/chromewebstore&client_id=YOUR_CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob

   # 2. Ouvrez l'URL dans un navigateur et autorisez l'application
   # 3. Copiez le code d'autorisation

   # 4. Échangez le code contre un refresh token avec curl
   curl -X POST \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "code=YOUR_AUTH_CODE" \
     -d "grant_type=authorization_code" \
     -d "redirect_uri=urn:ietf:wg:oauth:2.0:oob" \
     https://accounts.google.com/o/oauth2/token

   # 5. Le refresh_token est dans la réponse JSON
   ```

5. **Extension ID**
   - Publiez manuellement votre extension une première fois sur le Chrome Web Store
   - L'ID apparaît dans l'URL : `https://chrome.google.com/webstore/detail/[EXTENSION_ID]`

## Utilisation

### Publication automatique avec une release

1. Créez un tag et une release sur GitHub :
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Créez la release sur GitHub (depuis l'interface web)

3. Le workflow se déclenchera automatiquement et publiera l'extension

### Publication manuelle

1. Allez dans l'onglet "Actions" de votre repository GitHub
2. Sélectionnez "Publish to Chrome Web Store"
3. Cliquez "Run workflow"
4. Entrez le numéro de version (ex: 1.0.1)
5. Cliquez "Run workflow"

## Vérification du build

Le workflow de build s'exécute sur chaque push et pull request pour vérifier :
- La validité du JSON du manifest
- La présence de tous les fichiers requis
- La création correcte du package ZIP

## Troubleshooting

### Erreur : "Extension ID not found"
→ Vérifiez que le secret `CHROME_EXTENSION_ID` est correctement configuré

### Erreur : "Invalid credentials"
→ Vérifiez les secrets `CHROME_CLIENT_ID`, `CHROME_CLIENT_SECRET`, et `CHROME_REFRESH_TOKEN`

### Erreur : "Token expired"
→ Régénérez un nouveau refresh token et mettez à jour le secret

## Ressources

- [Chrome Web Store API Documentation](https://developer.chrome.com/docs/webstore/using_webstore_api/)
- [chrome-extension-upload Action](https://github.com/mnao305/chrome-extension-upload)
- [Google Cloud Console](https://console.cloud.google.com/)

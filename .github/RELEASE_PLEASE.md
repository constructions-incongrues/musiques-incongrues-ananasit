# Release Please - Guide d'utilisation

Ce projet utilise [Release Please](https://github.com/googleapis/release-please) pour automatiser la gestion des versions et des releases.

## Comment ça fonctionne

Release Please analyse vos commits selon le format **Conventional Commits** et :
1. Crée automatiquement un CHANGELOG.md
2. Met à jour les numéros de version
3. Crée des Pull Requests de release
4. Publie automatiquement l'extension sur le Chrome Web Store

## Format des commits

Utilisez le format Conventional Commits pour vos messages de commit :

### Types de commits

- **feat:** Nouvelle fonctionnalité (incrémente MINOR)
  ```bash
  feat: add dark mode support
  feat(ui): add settings page
  ```

- **fix:** Correction de bug (incrémente PATCH)
  ```bash
  fix: resolve context menu display issue
  fix(webhook): handle timeout errors
  ```

- **perf:** Amélioration de performance (incrémente PATCH)
  ```bash
  perf: optimize icon loading
  ```

- **docs:** Documentation uniquement
  ```bash
  docs: update README with new features
  ```

- **refactor:** Refactoring sans changement fonctionnel
  ```bash
  refactor: simplify background script logic
  ```

- **style:** Formatage, espaces, etc.
  ```bash
  style: format code with prettier
  ```

- **test:** Ajout ou modification de tests
  ```bash
  test: add unit tests for webhook handler
  ```

- **chore:** Tâches de maintenance
  ```bash
  chore: update dependencies
  ```

- **ci:** Modifications CI/CD
  ```bash
  ci: add release-please workflow
  ```

### Breaking Changes

Pour une version MAJOR (1.x.x → 2.0.0), ajoutez `BREAKING CHANGE:` dans le corps du commit :

```bash
feat: redesign extension API

BREAKING CHANGE: The webhook URL format has changed.
Users must update their n8n webhook configuration.
```

Ou utilisez le suffixe `!` :

```bash
feat!: redesign extension API
```

## Workflow de release

### 1. Commits sur main

Quand vous mergez des commits sur `main`, Release Please :
- Analyse les commits depuis la dernière release
- Crée/met à jour une Pull Request de release

### 2. Review de la PR de release

La PR créée par Release Please contient :
- Mise à jour du `CHANGELOG.md`
- Nouveau numéro de version dans `package.json`
- Nouveau numéro de version dans `chrome-extension/manifest.json`

Exemple de PR title : `chore(main): release 1.1.0`

### 3. Merge de la PR

Quand vous mergez la PR de release :
- Une release GitHub est créée automatiquement
- Le tag Git est créé (ex: `v1.1.0`)
- L'extension est automatiquement publiée sur le Chrome Web Store (en mode `trustedTesters`)

## Publication manuelle

Si vous voulez publier manuellement sans attendre Release Please :

1. Allez dans **Actions → Publish to Chrome Web Store (Manual)**
2. Cliquez **Run workflow**
3. Choisissez les options :
   - **Publish**: `true` pour publier, `false` pour upload uniquement
   - **Publish target**: `trustedTesters` ou `default` (public)

## Configuration

### Fichiers de configuration

- [`.release-please-manifest.json`](../.release-please-manifest.json) - Version actuelle
- [`release-please-config.json`](../release-please-config.json) - Configuration Release Please
- [`.github/workflows/release-please.yml`](workflows/release-please.yml) - Workflow GitHub Actions

### Sections du Changelog

Les commits sont organisés dans le CHANGELOG selon leur type :
- ✨ Features (`feat`)
- 🐛 Bug Fixes (`fix`)
- ⚡ Performance Improvements (`perf`)
- 🔄 Reverts (`revert`)
- 📝 Documentation (`docs`)
- ♻️ Code Refactoring (`refactor`)

Les types `style`, `chore`, `test`, `build`, `ci` sont cachés par défaut.

## Exemples de workflow

### Scénario 1 : Nouvelle fonctionnalité

```bash
git checkout -b feat/new-feature
# Faites vos modifications
git commit -m "feat: add copy to clipboard button"
git push origin feat/new-feature
# Créez une PR et mergez sur main
```

→ Release Please créera une PR pour la version 1.1.0

### Scénario 2 : Correction de bug

```bash
git checkout -b fix/webhook-error
# Faites vos corrections
git commit -m "fix: handle network timeout in webhook call"
git push origin fix/webhook-error
# Créez une PR et mergez sur main
```

→ Release Please mettra à jour la PR existante ou créera une PR pour 1.0.1

### Scénario 3 : Breaking change

```bash
git checkout -b feat/api-v2
# Faites vos modifications
git commit -m "feat!: redesign API with new webhook format

BREAKING CHANGE: Webhook URL structure changed from
/webhook?url=... to /api/v2/webhook with JSON body"
git push origin feat/api-v2
# Créez une PR et mergez sur main
```

→ Release Please créera une PR pour la version 2.0.0

## Ressources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Release Please Documentation](https://github.com/googleapis/release-please)
- [Semantic Versioning](https://semver.org/)

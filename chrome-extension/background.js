// URL du webhook n8n
const WEBHOOK_URL = 'https://n8n.musiques-incongrues.net/webhook/ananasit';

// Créer le menu contextuel lors de l'installation
chrome.runtime.onInstalled.addListener(() => {
  // Menu contextuel pour le texte sélectionné
  chrome.contextMenus.create({
    id: 'ananasit-selection',
    title: 'Envoyer vers Musiques Incongrues',
    contexts: ['selection']
  });

  // Menu contextuel pour la page (sans sélection)
  chrome.contextMenus.create({
    id: 'ananasit-page',
    title: 'Envoyer cette page vers Ananasit',
    contexts: ['page']
  });
});

// Gérer les clics sur le menu contextuel
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'ananasit-selection' || info.menuItemId === 'ananasit-page') {
    sendToAnanasit(tab.url, info.selectionText || '');
  }
});

// Gérer les clics sur l'icône de l'extension
chrome.action.onClicked.addListener((tab) => {
  // Injecter un script pour récupérer la sélection
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getSelection
  }, (results) => {
    if (results && results[0]) {
      const selection = results[0].result || '';
      sendToAnanasit(tab.url, selection);
    }
  });
});

// Fonction pour récupérer la sélection (injectée dans la page)
function getSelection() {
  return window.getSelection().toString();
}

// Fonction pour envoyer les données vers le webhook
function sendToAnanasit(url, text) {
  const webhookUrl = `${WEBHOOK_URL}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  chrome.tabs.create({ url: webhookUrl });
}

// Set extension toggle to on when it is installed
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    ext_active: 'on',
    femColor: '#730000',
    mascColor: '#000873',
    neutColor: '#125200',
    ambColor: '#440052',
  })
})

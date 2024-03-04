const { ipcRenderer } = require('electron');

document.getElementById('openWindowBtn').addEventListener('click', () => {
  ipcRenderer.send('open-new-window');
});

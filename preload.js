/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  json = ipcRenderer.send('load-json');
})

const { contextBridge, ipcRenderer } = require('electron/renderer')

// Exposed protected methods in the render process
contextBridge.exposeInMainWorld(
  // Allowed 'ipcRenderer' methods
  'bridge', {
      // From main to render
      loadJson: (message) => {
          ipcRenderer.on('loadJson', message);
      }
  }
);



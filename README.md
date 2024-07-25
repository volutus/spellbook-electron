# Spellbook Electron

Cloned initially from the [Electron Quick Start Guide](https://electronjs.org/docs/latest/tutorial/quick-start). This application acts as a simple spellbook for quick reference.

## To Use

This section was copied from the initial setup document since it's still accurate.
To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/volutus/spellbook-electron
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Building
To build the binaries yourself, you'll need to run the command within build.cmd -- this will create a Windows binary. Other platforms are theoretically supported by Electron but untested. To add them, it'd be easiest to change the platform flag to --all

**You'll also need the spells.json resource file**. [I used the following repo, but any JSON file that follows this format is supported.](https://github.com/vorpalhex/srd_spells). Other formats could be supported by a mapping system if desired with low effort.

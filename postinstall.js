// Try fetch'em
const { version, name } = require('./package.json');
const os = require('os');
const fs = require('fs');
const net = require('net');
const http = require('http');
const cp = require('child_process');
const path = require('path');

const EXT = os.platform() === 'win32' ? '.exe' : '';
const ARTIFACT_NAME = `${name}`;
const ARTIFACT = `${ARTIFACT_NAME}${EXT}`;
const URL = `https://github.com/pblanco-dekalabs/rusty-bin-spilke-npm/releases/download/v${version}/${ARTIFACT}`;

http.get(URL, res => {
  if (res.errored) {
    console.log(`Can't reach binaries for ${version} on ${os.platform()}, building them...`);
    cp.execSync('cargo build --release', {
      'shell': true,
      env: {
        FORCE_COLORS: true
      },
      stdio: 'inherit'
    });
    fs.copyFileSync(path.join('target', 'release', ARTIFACT), path.join('bin', ARTIFACT_NAME));
  } else {
    const out = fs.createWriteStream(path.join('bin', ARTIFACT_NAME));
    res.pipe(out);
  }
});

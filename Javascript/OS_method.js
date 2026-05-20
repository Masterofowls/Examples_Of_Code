const os = require('node:os');

const main = () => {
  console.log('Platform:', os.platform());
  console.log('Architecture:', os.arch());
  console.log('CPU cores:', os.cpus().length);
  console.log('Total memory (GB):', (os.totalmem() / 1024 ** 3).toFixed(2));
  console.log('Free memory (GB):', (os.freemem() / 1024 ** 3).toFixed(2));
  console.log('Hostname:', os.hostname());
  console.log('Home dir:', os.homedir());
  console.log('Uptime (seconds):', Math.floor(os.uptime()));
};

main();

import cluster from 'cluster';
import os from 'os';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
    exec: __dirname + '/app.js'
});

for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.id} has been killed`);
    console.log('starting another worker');
    cluster.fork();
});

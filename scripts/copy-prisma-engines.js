// scripts/copy-prisma-engines.js
const fs = require('fs');
const path = require('path');

// Cartella del client prisma generato
const prismaClientDir = path.join(process.cwd(), 'node_modules', '.prisma', 'client');

// Percorsi target nei quali copiare i motori
const targets = [
  path.join(process.cwd(), '.next', 'server', 'prisma-client'),
  path.join(process.cwd(), 'api', 'prisma-client'),
  path.join(process.cwd(), 'node_modules', '.prisma', 'client')
];

if (!fs.existsSync(prismaClientDir)) {
  console.error('Prisma client dir not found:', prismaClientDir);
  process.exit(1);
}

// Copia tutti i file della cartella prisma client nei target
for (const outDir of targets) {
  try {
    fs.mkdirSync(outDir, { recursive: true });
    for (const file of fs.readdirSync(prismaClientDir)) {
      const src = path.join(prismaClientDir, file);
      const dest = path.join(outDir, file);
      try {
        fs.copyFileSync(src, dest);
      } catch (err) {
        console.warn('Could not copy file', file, 'to', outDir, err.message);
      }
    }
    console.log('Copied prisma client to', outDir);
  } catch (err) {
    console.warn('Cannot copy to', outDir, err.message);
  }
}

// ---- FIX: imposta variabili d’ambiente per il runtime Prisma ----

// Nota: queste environment variables devono essere attive anche in runtime su Vercel
console.log('Setting Prisma engine environment variables');

process.env.PRISMA_CLIENT_ENGINE_TYPE = 'binary';
// imposta il path relativo al motore rhel openssl 3.0
process.env.PRISMA_QUERY_ENGINE_LIBRARY = './node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node';
process.env.PRISMA_QUERY_ENGINE_BINARY = './node_modules/.prisma/client/query_engine-rhel-openssl-3.0.x';

console.log('PRISMA_CLIENT_ENGINE_TYPE =', process.env.PRISMA_CLIENT_ENGINE_TYPE);
console.log('PRISMA_QUERY_ENGINE_LIBRARY =', process.env.PRISMA_QUERY_ENGINE_LIBRARY);
console.log('PRISMA_QUERY_ENGINE_BINARY =', process.env.PRISMA_QUERY_ENGINE_BINARY);

// Salvi qualche info in un file log per debug se serve
try {
  fs.writeFileSync(path.join(process.cwd(), 'prisma-engine-debug.json'), {
    engineType: process.env.PRISMA_CLIENT_ENGINE_TYPE,
    library: process.env.PRISMA_QUERY_ENGINE_LIBRARY,
    binary: process.env.PRISMA_QUERY_ENGINE_BINARY
  });
} catch (e) {
  // ignore
}
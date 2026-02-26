import * as migration_20260225_071016 from './20260225_071016';
import * as migration_20260226_052732 from './20260226_052732';

export const migrations = [
  {
    up: migration_20260225_071016.up,
    down: migration_20260225_071016.down,
    name: '20260225_071016',
  },
  {
    up: migration_20260226_052732.up,
    down: migration_20260226_052732.down,
    name: '20260226_052732'
  },
];

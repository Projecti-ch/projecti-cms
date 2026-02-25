import * as migration_20260225_071016 from './20260225_071016';

export const migrations = [
  {
    up: migration_20260225_071016.up,
    down: migration_20260225_071016.down,
    name: '20260225_071016'
  },
];

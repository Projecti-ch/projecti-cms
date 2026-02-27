import * as migration_20260225_071016 from './20260225_071016';
import * as migration_20260226_052732 from './20260226_052732';
import * as migration_20260227_085017 from './20260227_085017';
import * as migration_20260227_113000 from './20260227_113000';

export const migrations = [
  {
    up: migration_20260225_071016.up,
    down: migration_20260225_071016.down,
    name: '20260225_071016',
  },
  {
    up: migration_20260226_052732.up,
    down: migration_20260226_052732.down,
    name: '20260226_052732',
  },
  {
    up: migration_20260227_085017.up,
    down: migration_20260227_085017.down,
    name: '20260227_085017',
  },
  {
    up: migration_20260227_113000.up,
    down: migration_20260227_113000.down,
    name: '20260227_113000'
  },
];

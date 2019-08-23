// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/controller/admin';
import ExportFood from '../../../app/controller/food';
import ExportMerchants from '../../../app/controller/merchants';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    food: ExportFood;
    merchants: ExportMerchants;
  }
}

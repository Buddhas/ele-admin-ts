// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/service/admin';
import ExportFood from '../../../app/service/food';
import ExportMerchants from '../../../app/service/merchants';
import ExportPreferential from '../../../app/service/preferential';

declare module 'egg' {
  interface IService {
    admin: ExportAdmin;
    food: ExportFood;
    merchants: ExportMerchants;
    preferential: ExportPreferential;
  }
}

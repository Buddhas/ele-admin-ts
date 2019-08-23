// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/model/admin';
import ExportFood from '../../../app/model/food';
import ExportMerchants from '../../../app/model/merchants';
import ExportPreferential from '../../../app/model/preferential';

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Food: ReturnType<typeof ExportFood>;
    Merchants: ReturnType<typeof ExportMerchants>;
    Preferential: ReturnType<typeof ExportPreferential>;
  }
}

// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/controller/admin';
import ExportFood from '../../../app/controller/food';
import ExportMerchants from '../../../app/controller/merchants';
import ExportOrder from '../../../app/controller/order';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    food: ExportFood;
    merchants: ExportMerchants;
    order: ExportOrder;
  }
}

// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAddress from '../../../app/controller/address';
import ExportAdmin from '../../../app/controller/admin';
import ExportFood from '../../../app/controller/food';
import ExportMainIndex from '../../../app/controller/mainIndex';
import ExportMerchantCategory from '../../../app/controller/merchantCategory';
import ExportMerchants from '../../../app/controller/merchants';
import ExportOrder from '../../../app/controller/order';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    address: ExportAddress;
    admin: ExportAdmin;
    food: ExportFood;
    mainIndex: ExportMainIndex;
    merchantCategory: ExportMerchantCategory;
    merchants: ExportMerchants;
    order: ExportOrder;
    user: ExportUser;
  }
}

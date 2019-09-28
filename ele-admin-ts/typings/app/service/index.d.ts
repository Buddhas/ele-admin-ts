// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/service/admin';
import ExportFood from '../../../app/service/food';
import ExportFoodCategory from '../../../app/service/foodCategory';
import ExportMerchants from '../../../app/service/merchants';
import ExportOrder from '../../../app/service/order';
import ExportOrderDetail from '../../../app/service/orderDetail';
import ExportPreferential from '../../../app/service/preferential';
import ExportShopCategory from '../../../app/service/shopCategory';

declare module 'egg' {
  interface IService {
    admin: ExportAdmin;
    food: ExportFood;
    foodCategory: ExportFoodCategory;
    merchants: ExportMerchants;
    order: ExportOrder;
    orderDetail: ExportOrderDetail;
    preferential: ExportPreferential;
    shopCategory: ExportShopCategory;
  }
}

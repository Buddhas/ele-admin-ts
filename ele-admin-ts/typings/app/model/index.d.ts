// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/model/admin';
import ExportFood from '../../../app/model/food';
import ExportMerchants from '../../../app/model/merchants';
import ExportOrder from '../../../app/model/order';
import ExportOrderDetail from '../../../app/model/orderDetail';
import ExportPreferential from '../../../app/model/preferential';

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Food: ReturnType<typeof ExportFood>;
    Merchants: ReturnType<typeof ExportMerchants>;
    Order: ReturnType<typeof ExportOrder>;
    OrderDetail: ReturnType<typeof ExportOrderDetail>;
    Preferential: ReturnType<typeof ExportPreferential>;
  }
}

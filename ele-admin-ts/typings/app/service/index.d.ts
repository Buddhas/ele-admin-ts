// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAddress from '../../../app/service/address';
import ExportAdmin from '../../../app/service/admin';
import ExportFood from '../../../app/service/food';
import ExportFoodCategory from '../../../app/service/foodCategory';
import ExportMerchants from '../../../app/service/merchants';
import ExportOrder from '../../../app/service/order';
import ExportOrderDetail from '../../../app/service/orderDetail';
import ExportPreferential from '../../../app/service/preferential';
import ExportShopCategory from '../../../app/service/shopCategory';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    address: AutoInstanceType<typeof ExportAddress>;
    admin: AutoInstanceType<typeof ExportAdmin>;
    food: AutoInstanceType<typeof ExportFood>;
    foodCategory: AutoInstanceType<typeof ExportFoodCategory>;
    merchants: AutoInstanceType<typeof ExportMerchants>;
    order: AutoInstanceType<typeof ExportOrder>;
    orderDetail: AutoInstanceType<typeof ExportOrderDetail>;
    preferential: AutoInstanceType<typeof ExportPreferential>;
    shopCategory: AutoInstanceType<typeof ExportShopCategory>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}

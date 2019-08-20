// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/model/admin';
import ExportMerchants from '../../../app/model/merchants';
import ExportPost from '../../../app/model/post';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Merchants: ReturnType<typeof ExportMerchants>;
    Post: ReturnType<typeof ExportPost>;
    User: ReturnType<typeof ExportUser>;
  }
}

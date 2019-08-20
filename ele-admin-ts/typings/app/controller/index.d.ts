// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/controller/admin';
import ExportMerchants from '../../../app/controller/merchants';
import ExportPost from '../../../app/controller/post';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    merchants: ExportMerchants;
    post: ExportPost;
    user: ExportUser;
  }
}

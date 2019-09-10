/*
 * @Descripttion: controller基类
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-10 09:51:26
 */
import { Controller } from "egg"

export class BaseController extends Controller {

  /**
   * @Descripttion: 请求成功
   * @Author: 笑佛弥勒
   * @param {status} 状态
   * @param {data} 响应数据
   * @return:
   */
  success(status: number, message: string, data?: any) {
    if (data) {
      this.ctx.body = {
        status: status,
        message: message,
        data: data
      }
    } else {
      this.ctx.body = {
        status: status,
        message: message
      }
    }
  }

  /**
   * @Descripttion: 失败
   * @Author: 笑佛弥勒
   * @param {status} 状态
   * @param {data} 错误提示
   * @return:
   */
  fail(status: number, message: string) {
    this.ctx.body = {
      status: status || 500,
      message: message,
    };
  }
}

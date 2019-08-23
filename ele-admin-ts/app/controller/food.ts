/*
 * @Descripttion: 食品Controller层
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-22 20:17:28
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-23 10:22:51
 */
import { Controller } from "egg";
import * as path from "path";

export default class Food extends Controller {
    /**
     * @Descripttion: 添加食品
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async createdFood() {
        let params = this.ctx.request.body;
        params.shop_id = Number(params.shop_id)
        params.price = Number(params.price)
        try {
            this.ctx.validate({ params: "addFood" });
        } catch (error) {
            this.ctx.body = {
                msg: error,
                status: "-1"
            };
            return;
        }
        
        try {
            this.ctx.body = await this.ctx.service.food.createdFood(params);
        } catch (error) {
            this.ctx.body = {
                msg: "添加食品失败",
                status: "-1"
            }
        }
    }

    /**
     * @Descripttion: 删除食品
     * @Author: 笑佛弥勒
     * @param {type} 
     * @return: 
     */
    public async deleteFood() {
        
    }
}
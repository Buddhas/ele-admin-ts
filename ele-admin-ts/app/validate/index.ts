/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-12 17:24:57
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-12 20:35:40
 */
import { Application } from 'egg';

export default function(app: Application) {
    let { validator } = app;
    /**
     * @Descripttion: 手机校验
     * @Author: 笑佛弥勒
     * @param {value} 传入手机号 
     * @return: 
     */
    validator.addRule('mobile', (value) => {
        let reg = /1\d{10}/
        if (reg.test(value)) {
            throw "请填写正确的手机号码";
        }
    })
}
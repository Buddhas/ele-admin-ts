/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-12 17:24:57
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-08-23 17:27:24
 */
import { Application } from 'egg';

export default function(app: Application) {
    let { validator } = app;
    let reg = /1\d{10}/
    
    // 手机校验
    validator.addRule('mobile', (value) => {
        if (reg.test(value)) {
            throw "请填写正确的手机号码";
        }
    })
    
    // 商户添加校验
    validator.addRule('addMerchants', (params) => {
        if (params.name.trim().length === 0) {
            throw "请填写商户名"
        } else if (params.address.trim().length === 0) {
            throw "请填写商户地址"
        } else if (reg.test(params.mobile)) {
            throw "请填写正确的手机号码"
        } else if (params.synopsis.trim().length === 0) {
            throw "请填写商铺简介"
        } else if (params.slogan.trim().length === 0) {
            throw "请填写商铺标语"
        } else if (params.category.trim().length === 0) {
            throw "请选择商铺分类"
        } else if (Number(params.ship_price) != 0 && !Number(params.ship_price)) {
            throw "请填写配送费"
        } else if (Number(params.send_price) != 0 && !Number(params.send_price)) {
            throw "请填写起送价"
        } else if (params.start_time.trim().length === 0) {
            throw "请选择开始营业时间"
        } else if (params.end_time.trim().length === 0) {
            throw "请选择结束营业时间"
        } else if (params.shop_avatar.trim().length === 0) {
            throw "请上传商铺头像"
        } else if (params.business_license.trim().length === 0) {
            throw "请上传营业执照"
        } else if (params.catering_license.trim().length === 0) {
            throw "请上传餐饮许可证"
        } else if (params.longitude.trim().length === 0 || params.latitude.trim().length === 0 ) {
            throw "经纬度错误"
        }
    })

    // 更新商铺信息
    validator.addRule('updateMerchants', (params) => {
        if (params.name.trim().length === 0) {
            throw "请填写商户名"
        } else if (params.address.trim().length === 0) {
            throw "请填写商户地址"
        } else if (reg.test(params.mobile)) {
            throw "请填写正确的手机号码"
        } else if (params.synopsis.trim().length === 0) {
            throw "请填写商铺简介"
        } else if (params.slogan.trim().length === 0) {
            throw "请填写商铺标语"
        } else if (params.category.trim().length === 0) {
            throw "请选择商铺分类"
        } else if (params.shop_avatar.trim().length === 0) {
            throw "请上传商铺头像"
        } else if (params.longitude.trim().length === 0 || params.latitude.trim().length === 0 ) {
            throw "经纬度错误"
        }
    })

    // 添加食品校验
    validator.addRule('addFood', (rule, params) => {
        if (params.name.trim().length === 0) {
            throw "请填写商户名"
        } else if (params.introduce.trim().length === 0) {
            throw "请填写食品介绍"
        } else if (params.category.trim().length === 0) {
            throw "请填写食品分类"
        } else if (params.image.trim().length === 0) {
            throw "请上传图片"
        } else if ( !Number(params.shop_id)) {
            throw "所选商铺有误"
        } else if (!Number(params.price)) {
            throw "请填写食品价格"
        }
    })

    // 更改食品属性校验
    validator.addRule('updatFood', (rule, value) => {
        if (value.name.trim().length === 0) {
            throw "请填写商户名"
        } else if (value.introduce.trim().length === 0) {
            throw "请填写食品介绍"
        } else if (value.category.trim().length === 0) {
            throw "请填写食品分类"
        } else if (value.image.trim().length === 0) {
            throw "请上传图片"
        } else if (!Number(value.price)) {
            throw "请填写食品价格"
        }
    })
}
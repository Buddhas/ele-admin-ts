/*
 * @Descripttion: 
 * @version: 
 * @Author: 笑佛弥勒
 * @Date: 2019-08-12 17:24:57
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2019-09-26 20:05:29
 */
import { Application } from 'egg';

export default function(app: Application) {
    let { validator } = app;
    let reg = /0?(13|14|15|17|18|19)[0-9]{9}/
    
    // 手机校验
    validator.addRule('mobile', (value, params) => {
        if (!reg.test(params)) {
            throw "请填写正确的手机号码";
        }
    })
    
    // 商户添加校验
    validator.addRule('addMerchants', (value, params) => {
        if (params.name.trim().length === 0) {
            throw "请填写商户名"
        } else if (params.address.trim().length === 0) {
            throw "请填写商户地址"
        } else if (!reg.test(params.mobile)) {
            throw "请填写正确的手机号码"
        } else if (params.synopsis.trim().length === 0) {
            throw "请填写商铺简介"
        } else if (params.slogan.trim().length === 0) {
            throw "请填写商铺标语"
        } else if (params.category.length === 0) {
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
        } else if (params.longitude === 0 || params.latitude === 0 ) {
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

    // 用户下单校验
    validator.addRule('addOrder', (rule, params) => {
        // 订单状态：0：待支付、1：准时送达、2：超时
        let status = [0,1,2]
        if (!Number(params.shop_id)) {
            throw "商户id错误"
        } else if (!Number(params.price)) {
            throw "订单价格错误"
        } else if (!Number(params.user_id)) {
            throw "用户id错误"
        } else if (!Number(params.ship_fee)) {
            throw "配送费错误"
        } else if (!Number(params.meals_fee)) {
            throw "餐盒费错误"
        } else if (!Number(params.user_address_id)) {
            throw "用户地址id"
        } else if (!Number(params.preferential_id)) {
            throw "优惠id错误"
        } else if (!status.includes(params.status)) {
            throw "订单状态错误"
        }
    })

    // 订单详情
    validator.addRule('orderDetail', (rule, params) => {
        if (params.food_name.trim().length === 0) {
            throw "食品名称错误"
        } else if (!Number(params.food_id)) {
            throw "食品id错误"
        } else if (!Number(params.count)) {
            throw "食品数量错误"
        } else if (!Number(params.price)) {
            throw "食品价格错误"
        }
    })
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(app) {
    let { validator } = app;
    let reg = /0?(13|14|15|17|18|19)[0-9]{9}/;
    // 手机校验
    validator.addRule('mobile', (value, params) => {
        if (!reg.test(params)) {
            throw "请填写正确的手机号码";
        }
    });
    // 商户添加校验
    validator.addRule('addMerchants', (value, params) => {
        if (params.name.trim().length === 0) {
            throw "请填写商户名";
        }
        else if (params.address.trim().length === 0) {
            throw "请填写商户地址";
        }
        else if (!reg.test(params.mobile)) {
            throw "请填写正确的手机号码";
        }
        else if (params.synopsis.trim().length === 0) {
            throw "请填写商铺简介";
        }
        else if (params.slogan.trim().length === 0) {
            throw "请填写商铺标语";
        }
        else if (params.category.length === 0) {
            throw "请选择商铺分类";
        }
        else if (Number(params.ship_price) != 0 && !Number(params.ship_price)) {
            throw "请填写配送费";
        }
        else if (Number(params.send_price) != 0 && !Number(params.send_price)) {
            throw "请填写起送价";
        }
        else if (params.top_up === 0 || params.minus === 0 || params.top_up <= params.minus) {
            throw "满减额错误";
        }
        else if (params.start_time.trim().length === 0) {
            throw "请选择开始营业时间";
        }
        else if (params.end_time.trim().length === 0) {
            throw "请选择结束营业时间";
        }
        else if (params.shop_avatar.trim().length === 0) {
            throw "请上传商铺头像";
        }
        else if (params.business_license.trim().length === 0) {
            throw "请上传营业执照";
        }
        else if (params.shop_environment.trim().length === 0) {
            throw "请上传商家环境图片";
        }
        else if (params.catering_license.trim().length === 0) {
            throw "请上传餐饮许可证";
        }
        else if (params.longitude === 0 || params.latitude === 0) {
            throw "经纬度错误";
        }
    });
    // 更新商铺信息
    validator.addRule('updateMerchants', (params) => {
        if (params.name.trim().length === 0) {
            throw "请填写商户名";
        }
        else if (params.address.trim().length === 0) {
            throw "请填写商户地址";
        }
        else if (reg.test(params.mobile)) {
            throw "请填写正确的手机号码";
        }
        else if (params.synopsis.trim().length === 0) {
            throw "请填写商铺简介";
        }
        else if (params.slogan.trim().length === 0) {
            throw "请填写商铺标语";
        }
        else if (params.category.trim().length === 0) {
            throw "请选择商铺分类";
        }
        else if (params.shop_avatar.trim().length === 0) {
            throw "请上传商铺头像";
        }
        else if (params.longitude.trim().length === 0 || params.latitude.trim().length === 0) {
            throw "经纬度错误";
        }
    });
    // 添加食品校验
    validator.addRule('addFood', (rule, params) => {
        if (params.name.trim().length === 0) {
            throw "请填写食品名称";
        }
        else if (params.introduce.trim().length === 0) {
            throw "请填写食品介绍";
        }
        else if (Number(params.category) === 0) {
            throw "请选择食品分类";
        }
        else if (params.image.trim().length === 0) {
            throw "请上传图片";
        }
        else if (!Number(params.shop_id)) {
            throw "商铺有误";
        }
        else if (!Number(params.price)) {
            throw "请填写食品价格";
        }
        else if (!Number(params.package_price)) {
            throw "请填写食品包装费";
        }
    });
    // 更改食品属性校验
    validator.addRule('updatFood', (rule, value) => {
        if (value.name.trim().length === 0) {
            throw "请填写商户名";
        }
        else if (value.introduce.trim().length === 0) {
            throw "请填写食品介绍";
        }
        else if (value.category.trim().length === 0) {
            throw "请填写食品分类";
        }
        else if (value.image.trim().length === 0) {
            throw "请上传图片";
        }
        else if (!Number(value.price)) {
            throw "请填写食品价格";
        }
    });
    // 用户下单校验
    validator.addRule('addOrder', (rule, params) => {
        // 订单状态：0：待支付、1：准时送达、2：超时
        let status = [0, 1, 2];
        if (!Number(params.shop_id)) {
            throw "商户id错误";
        }
        else if (!Number(params.price)) {
            throw "订单价格错误";
        }
        else if (!Number(params.user_id)) {
            throw "用户id错误";
        }
        else if (!Number(params.ship_fee)) {
            throw "配送费错误";
        }
        else if (!Number(params.meals_fee)) {
            throw "餐盒费错误";
        }
        else if (!Number(params.user_address_id)) {
            throw "用户地址id";
        }
        else if (!Number(params.preferential_id)) {
            throw "优惠id错误";
        }
        else if (!status.includes(params.status)) {
            throw "订单状态错误";
        }
    });
    // 订单详情
    validator.addRule('orderDetail', (rule, params) => {
        if (params.food_name.trim().length === 0) {
            throw "食品名称错误";
        }
        else if (!Number(params.food_id)) {
            throw "食品id错误";
        }
        else if (!Number(params.count)) {
            throw "食品数量错误";
        }
        else if (!Number(params.price)) {
            throw "食品价格错误";
        }
    });
    // 添加地址校验
    validator.addRule('addAddress', (rule, params) => {
        if (params.update && params.update === 1 && !Number(params.id)) {
            throw "地址id错误";
        }
        else if (params.user_name.trim().length === 0) {
            throw "请填写用户姓名";
        }
        else if (!Number(params.id)) {
            throw "用户id错误";
        }
        else if (!Number(params.sex)) {
            throw "请选择用户性别";
        }
        else if (!reg.test(params.mobile)) {
            throw "手机号格式错误";
        }
        else if (params.address.trim().length === 0) {
            throw "请填写用户地址";
        }
        else if (params.detail.trim().length === 0) {
            throw "请填写详细地址";
        }
        else if (!Number(params.label)) {
            throw "请选择地址标签";
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLG1CQUF3QixHQUFnQjtJQUNwQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLElBQUksR0FBRyxHQUFHLCtCQUErQixDQUFBO0lBRXpDLE9BQU87SUFDUCxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNuQixNQUFNLFlBQVksQ0FBQztTQUN0QjtJQUNMLENBQUMsQ0FBQyxDQUFBO0lBRUYsU0FBUztJQUNULFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ2hELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sUUFBUSxDQUFBO1NBQ2pCO2FBQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDM0MsTUFBTSxTQUFTLENBQUE7U0FDbEI7YUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakMsTUFBTSxZQUFZLENBQUE7U0FDckI7YUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QyxNQUFNLFNBQVMsQ0FBQTtTQUNsQjthQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzFDLE1BQU0sU0FBUyxDQUFBO1NBQ2xCO2FBQU0sSUFB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
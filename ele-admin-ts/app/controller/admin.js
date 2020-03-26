"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion: 管理员controller层
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2019-08-06 16:46:01
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-15 18:28:15
 */
const baseController_1 = require("../core/baseController");
const path = require("path");
const util_1 = require("../util/util");
const utility = require("utility");
const enum_1 = require("../util/enum");
class AdminController extends baseController_1.BaseController {
    /**
     * @Descripttion: 管理员登录 || 注册 接口
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async login() {
        const { ctx } = this;
        let { mobile, password } = this.ctx.request.body;
        try {
            ctx.validate({ mobile: "mobile" });
            ctx.validate({ password: { type: "string", min: 1, max: 10 } });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, error);
            return;
        }
        let res = await ctx.service.admin.hasUser(mobile);
        // 加密密码
        password = utility.md5(password);
        let token = '';
        if (!res) {
            try {
                await ctx.service.admin.createUser(mobile, password);
                // 生成token
                await this.ctx.helper.loginToken().then((res) => token = res); // 取到生成token
                await this.app.redis.set(mobile, token, 'ex', 7200); // 保存到redis
                ctx.cookies.set('authorization', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60,
                    domain: 'localhost'
                }); // 保存到cookie
                this.success(enum_1.Status.Success, '注册成功');
            }
            catch (error) {
                ctx.logger.error(`-----用户注册失败------`, error);
                ctx.logger.error(`入参params：mobile:${mobile}、password:${password}`);
                this.fail(enum_1.Status.SystemError, "用户注册失败");
            }
        }
        else {
            if (res.password == password) {
                await this.ctx.helper.loginToken({ mobile: mobile, password: password }).then((res) => token = res); // 取到生成token
                await this.app.redis.set(mobile, token, 'ex', 7200); // 保存到redis
                ctx.cookies.set('authorization', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60,
                    domain: 'localhost'
                }); // 保存到cookie
                ctx.body = { data: { token, expires: this.config.login_token_time }, code: 1, msg: '登录成功' }; // 返回
                this.success(enum_1.Status.Success, '登录成功');
            }
            else {
                this.fail(enum_1.Status.SystemError, "密码错误");
            }
        }
    }
    /**
     * @Descripttion: 退出登录
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async logOut() {
        let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im1vYmlsZSI6IjE3Njg4NzAyMDk5IiwicGFzc3dvcmQiOiJlMTBhZGMzOTQ5YmE1OWFiYmU1NmUwNTdmMjBmODgzZSJ9LCJleHAiOjE1NzA1NDExNTcsImlhdCI6MTU3MDUzMzk1N30.t7wHKdm_eunoUKsUQMulUjhk2hIJgtRQrxe2B7Ev9ujkQ5onTVleECsFJW5p04PNL84J1nNUE_9W1aHtCo3UrtX38PPiz8M1aQgLVhbj4-eTShUKILE0Gk2MI_88SyO2HtUzL94u_CZ7wtR_Rh6URK7adR5aAZxu7BE5jrYPVlY';
        const res = this.ctx.helper.verifyToken(token); // 解密获取的Token
        try {
            // await this.app.redis.del(res.mobile)
            await this.app.redis.del('17688702099');
            this.success(enum_1.Status.Success, '退出登录成功');
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '登出错误');
        }
    }
    /**
     * @Descripttion: 获取当前管理员信息
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getCurrentAdmin() {
        let token = this.ctx.cookies.get('authorization');
        const res = this.ctx.helper.verifyToken(token); // 解密获取的Token
        try {
            let data = await this.service.admin.getUser(res.mobile);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询出错');
        }
    }
    /**
     * @Descripttion: 修改管理员头像
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async updateAvatar() {
        const stream = await this.ctx.getFileStream();
        const uplaodBasePath = "app/public/adminAvatar";
        const filename = `${Date.now()}${path
            .extname(stream.filename)
            .toLocaleLowerCase()}`;
        try {
            util_1.mkdirSync(path.join(uplaodBasePath));
            const target = path.join(uplaodBasePath, filename);
            util_1.saveImg(stream, target);
            await this.ctx.service.admin.updateAvatar(filename, "17688702092");
            let data = {
                filename: filename,
            };
            this.success(enum_1.Status.Success, '管理员头像保存成功', data);
        }
        catch (error) {
            this.ctx.logger.error(`-----修改管理员头像失败------`, error);
            this.fail(enum_1.Status.SystemError, "修改管理员头像失败");
        }
    }
    /**
     * @Descripttion: 获取管理员数量
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getAdminCount() {
        return await this.ctx.service.admin.getAdminCount();
    }
    /**
     * @Descripttion: 管理员列表分页
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async findAdminByPage() {
        let { page, pageSize } = this.ctx.query;
        page = Number(page);
        pageSize = Number(pageSize);
        try {
            this.ctx.validate({ page: "number" }, { page: page });
            this.ctx.validate({ pageSize: "number" }, { pageSize: pageSize });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, "参数错误");
            return;
        }
        try {
            let data = await this.ctx.service.admin.findAdminByPage(page, pageSize);
            this.success(enum_1.Status.Success, '成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, "查询出错");
        }
    }
    /**
     * @Descripttion: 数据总览
     * @Author: 笑佛弥勒
     * @return:
     */
    async totalData() {
        try {
            let currentData = await this.ctx.service.admin.currentData();
            let dateAWeek = await this.ctx.service.admin.dateAWeek();
            let data = {
                currentData: currentData,
                dateAWeek: dateAWeek
            };
            this.success(enum_1.Status.Success, '查询成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, "获取数据出错");
        }
    }
    /**
     * @Descripttion: 获取商铺分类
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getShopCategory() {
        try {
            let category = await this.ctx.service.shopCategory.getAllCategory();
            this.success(enum_1.Status.Success, '查询成功', category);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, "获取数据出错");
        }
    }
    /**
     * @Descripttion: 验证管理员是否登录
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async isLogin() {
        let authToken = this.ctx.cookies.get('authorization');
        if (!authToken) {
            this.success(enum_1.Status.Success, '未登录', '');
            return;
        }
        const res = this.ctx.helper.verifyToken(authToken);
        try {
            let data = await this.ctx.service.admin.getUser(res.mobile);
            this.success(enum_1.Status.Success, '已登录', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '系统错误');
        }
    }
}
exports.default = AdminController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZG1pbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0dBT0c7QUFDSCwyREFBdUQ7QUFDdkQsNkJBQTRCO0FBQzVCLHVDQUFpRDtBQUNqRCxtQ0FBa0M7QUFDbEMsdUNBQXFDO0FBQ3JDLE1BQXFCLGVBQWdCLFNBQVEsK0JBQWM7SUFDekQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3BCLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ2hELElBQUk7WUFDRixHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7WUFDbEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1NBQ2hFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEMsT0FBTTtTQUNQO1FBRUQsSUFBSSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDakQsT0FBTztRQUNQLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2hDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUNkLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixJQUFJO2dCQUNGLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENB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
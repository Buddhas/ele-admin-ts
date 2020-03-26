"use strict";
/*
 * @Descripttion:
 * @version:
 * @Author: 笑佛弥勒
 * @Date: 2020-02-18 17:21:14
 * @LastEditors: 笑佛弥勒
 * @LastEditTime: 2020-03-17 20:43:39
 */
Object.defineProperty(exports, "__esModule", { value: true });
const baseController_1 = require("../core/baseController");
const enum_1 = require("../util/enum");
class User extends baseController_1.BaseController {
    /**
     * @Descripttion: 发送邮件
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async sendEmail() {
        let { email } = this.ctx.request.body;
        let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!reg.test(email)) {
            this.fail(enum_1.Status.InvalidParams, '邮箱格式错误');
            return;
        }
        try {
            // let data = await this.ctx.helper.sendEmail(email, this.app) // 发送邮箱
            const codeExit = await this.app.redis.get(`code_${email}`);
            if (codeExit) {
                this.success(enum_1.Status.InvalidRequest, '不可重复发送');
                return;
            }
            const code = this.ctx.helper.random(10000, 99999);
            await this.app.redis.set(`code_${email}`, code, 'ex', 3600);
            this.success(enum_1.Status.Success, '发送成功', code);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '发送失败');
        }
    }
    /**
     * @Descripttion: 注册或登录页面
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async login() {
        let { email, code } = this.ctx.request.body;
        let token = '';
        if (await this.app.redis.get(`code_${email}`) != code) {
            this.fail(enum_1.Status.CodeError, '验证码错误');
        }
        else {
            let userDetail = await this.ctx.service.user.getUserByEmail(email);
            // 如果用户存在了
            if (userDetail) {
                await this.ctx.helper.loginToken({ user_id: userDetail['user_id'], email: userDetail['email'] }).then((res) => token = res); // 取到生成token
                await this.app.redis.set(email, token, 'ex', 7200); // 保存到redis
                this.ctx.cookies.set('authorization', token, {
                    maxAge: 1000 * 60 * 60,
                    domain: 'localhost'
                }); // 保存到cookie
                await this.app.redis.del(`code_${email}`);
                this.success(enum_1.Status.Success, '登录成功');
            }
            else {
                await this.ctx.service.user.createdUser({
                    email: email,
                    user_name: email
                });
                let userDetail = await this.ctx.service.user.getUserByEmail(email);
                await this.ctx.helper.loginToken({ user_id: userDetail['user_id'], email: userDetail['email'] }).then((res) => token = res); // 取到生成token
                await this.app.redis.set(email, token, 'ex', 7200); // 保存到redis
                this.ctx.cookies.set('authorization', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60,
                    domain: 'localhost'
                }); // 保存到cookie
                await this.app.redis.del(`code_${email}`);
                this.success(enum_1.Status.Success, '注册成功');
            }
        }
    }
    /**
     * @Descripttion: 验证用户是否登录
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
            let data = await this.ctx.service.user.getUserByEmail(res.email);
            this.success(enum_1.Status.Success, '已登录', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '系统错误');
        }
    }
    /**
     * @Descripttion: 获取参数列表
     * @Author: 笑佛弥勒
     * @param {type}
     * @return:
     */
    async getUserList() {
        let { page, pageSize } = this.ctx.query;
        try {
            this.ctx.validate({ page: "number" }, { page: Number(page) });
            this.ctx.validate({ pageSize: "number" }, { pageSize: Number(pageSize) });
        }
        catch (error) {
            this.fail(enum_1.Status.InvalidParams, '参数错误');
            return;
        }
        try {
            let data = await this.ctx.service.user.getUserList(Number(page), Number(pageSize));
            this.success(enum_1.Status.Success, '查询成功', data);
        }
        catch (error) {
            this.fail(enum_1.Status.SystemError, '查询失败');
        }
    }
}
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7O0FBRUgsMkRBQXVEO0FBQ3ZELHVDQUFxQztBQUNyQyxNQUFxQixJQUFLLFNBQVEsK0JBQWM7SUFFOUM7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsU0FBUztRQUNwQixJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQ3JDLElBQUksR0FBRyxHQUFHLHVHQUF1RyxDQUFBO1FBQ2pILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUN6QyxPQUFNO1NBQ1A7UUFDRCxJQUFJO1lBQ0Ysc0VBQXNFO1lBQ3RFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUMxRCxJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQU0sQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUE7Z0JBQzdDLE9BQU07YUFDUDtZQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUE7WUFDaEQsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsYUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDM0M7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUN0QztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO1FBQzNDLElBQUksS0FBSyxHQUFVLEVBQUUsQ0FBQTtRQUNyQixJQUFJLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsU0FBUyxFQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3BDO2FBQU07WUFDTCxJQUFJLFVBQVUsR0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDdEUsVUFBVTtZQUNWLElBQUksVUFBVSxFQUFFO2dCQUNkLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQSxDQUFDLFlBQVk7Z0JBQ3hJLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBLENBQUMsV0FBVztnQkFDOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUU7b0JBQzNDLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUU7b0JBQ3RCLE1BQU0sRUFBRSxXQUFXO2lCQUNwQixDQUFDLENBQUEsQ0FBQyxZQUFZO2dCQUNmLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2FBQ3JDO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDdEMsS0FBSyxFQUFFLEtBQUs7b0JBQ1osU0FBUyxFQUFFLEtBQUs7aUJBQ2pCLENBQUMsQ0FBQTtnQkFDRixJQUFJLFVBQVUsR0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3RFLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQSxDQUFDLFlBQVk7Z0JBQ3hJLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBLENBQUMsV0FBVztnQkFDOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUU7b0JBQzNDLFFBQVEsRUFBRSxJQUFJO29CQUNkLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUU7b0JBQ3RCLE1BQU0sRUFBRSxXQUFXO2lCQUNwQixDQUFDLENBQUEsQ0FBQyxZQUFZO2dCQUNmLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO2FBQ3JDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxLQUFLLENBQUMsT0FBTztRQUNsQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDckQsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDdkMsT0FBTTtTQUNQO1FBQ0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2xELElBQUk7WUFDRixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDMUM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUN0QztJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxXQUFXO1FBQ3RCLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDdkMsSUFBSTtZQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUMxRTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFNLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZDLE9BQU07U0FDUDtRQUVELElBQUk7WUFDRixJQUFJLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1lBQ2xGLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDM0M7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQTtTQUN0QztJQUNILENBQUM7Q0FDRjtBQXBIRCx1QkFvSEMifQ==
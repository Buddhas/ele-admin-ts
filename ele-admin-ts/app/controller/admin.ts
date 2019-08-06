import { Controller, Context } from 'egg';

export default class AdminController extends Controller {
    public async login(ctx: Context) {
        await ctx.service.Admin.login()
    }
}


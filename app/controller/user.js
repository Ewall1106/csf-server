"use strict";

const { Controller } = require("egg");
const fse = require("fs-extra");

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hello world";
  }

  async create_user_space() {
    try {
      const { ctx } = this;
      const { uid } = ctx.query;

      if (!uid) ctx.throw(401, "用户ID不存在");
      if (fse.existsSync(`/mnt/auto/${uid}`)) ctx.throw(500, "文件夹已经存在");
      await fse.copy("/mnt/auto/sd/personalize", `/mnt/auto/${uid}`, {
        overwrite: false,
      });

      ctx.body = {
        status: true,
        data: { uid },
        message: "复制成功",
      };
    } catch (error) {
      this.ctx.throw(500, error);
    }
  }
}

module.exports = UserController;

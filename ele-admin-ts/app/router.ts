'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { router, controller } = app;
  router.get('/', controller.user.index);
  router.post('/login', controller.admin.login);
  app.resources('users', '/users', app.controller.user);
  app.resources('posts', '/posts', app.controller.post);
}

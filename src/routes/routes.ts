import { Router } from 'express';

import TestRoutes from './test.routes';

class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/test', TestRoutes.router);
    return router;
  }
}

export default AppRoutes;

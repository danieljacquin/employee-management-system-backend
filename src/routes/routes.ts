import { Router } from 'express';

import { EmployeeRoutes } from './employee.routes';
import TestRoutes from './test.routes';

class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/test', TestRoutes.router);
    router.use('/api/employee', EmployeeRoutes.router);
    return router;
  }
}

export default AppRoutes;

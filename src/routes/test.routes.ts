import { Request, Response, Router } from 'express';

class TestRoutes {
  static get router(): Router {
    const router = Router();
    /**
     * @openapi
     * /test:
     *   get:
     *     description: sample of swagger
     *     responses:
     *       200:
     *         description: example of documentation.
     */
    router.get('/', (req: Request, res: Response) => {
      res.send('¡Hola desde Express con TypeScript!');
    });

    return router;
  }
}

export default TestRoutes;

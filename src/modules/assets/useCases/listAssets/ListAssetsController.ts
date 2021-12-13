import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAssetsUseCase } from "./ListAssetsUseCase";

class ListAssetsController {
  async handle(req: Request, res: Response) {
    const listAssetsUseCase = container.resolve(ListAssetsUseCase);

    const all = await listAssetsUseCase.execute();

    return res.json(all);
  }
}

export { ListAssetsController };

import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowAssetUseCase } from "./ShowAssetUseCase";

class ShowAssetController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const showAssetUseCase = container.resolve(ShowAssetUseCase);

    const asset = await showAssetUseCase.execute(id);

    return res.json(asset);
  }
}

export { ShowAssetController };

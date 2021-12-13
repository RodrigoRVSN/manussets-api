import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteAssetUseCase } from "./DeleteAssetUseCase";

class DeleteAssetController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteAssetUseCase = container.resolve(DeleteAssetUseCase);

    await deleteAssetUseCase.execute(id);

    return res.status(200).json({ message: "Máquina removida!" });
  }
}

export { DeleteAssetController };

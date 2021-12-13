import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAssetUseCase } from "./UpdateAssetUseCase";

class UpdateAssetController {
  async handle(req: Request, res: Response) {
    const { image, name, description, model, owner, status, health_level } =
      req.body;
    const { id } = req.params;

    const updateAssetUseCase = container.resolve(UpdateAssetUseCase);

    await updateAssetUseCase.execute(id, {
      image,
      name,
      description,
      model,
      owner,
      status,
      health_level,
    });

    return res.status(200).json({ message: "Máquina atualizada!" });
  }
}

export { UpdateAssetController };

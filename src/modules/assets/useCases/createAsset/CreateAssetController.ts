import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAssetUseCase } from "./CreateAssetUseCase";

class CreateAssetController {
  async handle(req: Request, res: Response) {
    const { name, description, model, owner, status, health_level } = req.body;
    const photo_file = req.file?.location as string;

    const createAssetUseCase = container.resolve(CreateAssetUseCase);

    await createAssetUseCase.execute({
      image: photo_file,
      name,
      description,
      model,
      owner,
      status,
      health_level,
    });

    return res.status(201).send();
  }
}

export { CreateAssetController };

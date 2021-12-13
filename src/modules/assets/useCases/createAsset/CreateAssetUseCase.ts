import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IAssets } from "../../dtos/IAssets";
import { IAssetsRepository } from "../../repositories/IAssetsRepository";

@injectable()
class CreateAssetUseCase {
  constructor(
    @inject("AssetsRepository")
    private assetsRepository: IAssetsRepository,
  ) {}

  async execute(data: IAssets): Promise<void> {
    const assetAlreadyExists = await this.assetsRepository.findByName(
      data.name,
    );

    if (assetAlreadyExists) {
      throw new AppError("Máquina já existe!", 400);
    }

    await this.assetsRepository.create(data);
  }
}

export { CreateAssetUseCase };

import { inject, injectable } from "tsyringe";

import { splitToDeleteS3Object } from "../../../../config/upload";
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
      splitToDeleteS3Object(assetAlreadyExists.image);
      throw new AppError("Máquina já existe!", 400);
    }

    await this.assetsRepository.create(data);
  }
}

export { CreateAssetUseCase };

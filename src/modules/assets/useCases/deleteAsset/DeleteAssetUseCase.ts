import { inject, injectable } from "tsyringe";

import { splitToDeleteS3Object } from "../../../../config/upload";
import { AppError } from "../../../../errors/AppError";
import { IAssetsRepository } from "../../repositories/IAssetsRepository";

@injectable()
class DeleteAssetUseCase {
  constructor(
    @inject("AssetsRepository")
    private assetsRepository: IAssetsRepository,
  ) {}

  async execute(asset_id: string): Promise<void> {
    const assetAlreadyExists = await this.assetsRepository.findById(asset_id);

    if (!assetAlreadyExists) {
      throw new AppError("Máquina não existe!", 400);
    }

    if (assetAlreadyExists.image) {
      await this.assetsRepository.deleteOne(asset_id);
      splitToDeleteS3Object(assetAlreadyExists.image);
    }
  }
}

export { DeleteAssetUseCase };

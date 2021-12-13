import { inject, injectable } from "tsyringe";

import { deleteFromS3 } from "../../../../config/upload";
import { AppError } from "../../../../errors/AppError";
import { IAssets } from "../../dtos/IAssets";
import Asset from "../../entities/Asset";
import { IAssetsRepository } from "../../repositories/IAssetsRepository";

@injectable()
class DeleteAssetUseCase {
  constructor(
    @inject("AssetsRepository")
    private assetsRepository: IAssetsRepository,
  ) {}

  async execute(asset_id: string): Promise<IAssets> {
    const assetAlreadyExists = await this.assetsRepository.findById(asset_id);

    if (!assetAlreadyExists) {
      throw new AppError("Máquina não existe!", 400);
    }

    await Asset.deleteOne({ _id: asset_id });

    if (assetAlreadyExists.image) {
      const bucketSplitted = assetAlreadyExists.image.split("/");
      const keyOfBucket = bucketSplitted[bucketSplitted.length - 1];
      deleteFromS3(keyOfBucket);
    }

    return assetAlreadyExists;
  }
}

export { DeleteAssetUseCase };

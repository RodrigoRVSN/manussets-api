import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IAssets } from "../../dtos/IAssets";
import { IAssetsRepository } from "../../repositories/IAssetsRepository";

@injectable()
class ShowAssetUseCase {
  constructor(
    @inject("AssetsRepository")
    private assetsRepository: IAssetsRepository,
  ) {}

  async execute(asset_id: string): Promise<IAssets> {
    const assetAlreadyExists = await this.assetsRepository.findById(asset_id);

    if (!assetAlreadyExists) {
      throw new AppError("Máquina não existe!", 400);
    }

    return assetAlreadyExists;
  }
}

export { ShowAssetUseCase };

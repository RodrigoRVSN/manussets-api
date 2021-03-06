import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IAssets } from "../../dtos/IAssets";
import { IAssetsRepository } from "../../repositories/IAssetsRepository";

@injectable()
class UpdateAssetUseCase {
  constructor(
    @inject("AssetsRepository")
    private assetsRepository: IAssetsRepository,
  ) {}

  async execute(id: string, data: IAssets): Promise<void> {
    const assetAlreadyExists = await this.assetsRepository.findById(id);

    if (!assetAlreadyExists) {
      throw new AppError("Máquina não existe!", 400);
    }

    await this.assetsRepository.updateOne(id, data);
  }
}

export { UpdateAssetUseCase };

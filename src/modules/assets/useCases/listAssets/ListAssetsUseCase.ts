import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IAssets } from "../../dtos/IAssets";
import { IAssetsRepository } from "../../repositories/IAssetsRepository";

@injectable()
class ListAssetsUseCase {
  constructor(
    @inject("AssetsRepository")
    private assetsRepository: IAssetsRepository,
  ) {}

  async execute(): Promise<IAssets[]> {
    const assetAlreadyExists =
      (await this.assetsRepository.findAll()) as unknown as IAssets[];

    if (!assetAlreadyExists) {
      throw new AppError("Máquina não existe!", 400);
    }

    return assetAlreadyExists;
  }
}

export { ListAssetsUseCase };

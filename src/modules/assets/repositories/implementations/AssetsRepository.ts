import { IAssets } from "../../dtos/IAssets";
import Asset from "../../entities/Asset";
import { IAssetsRepository } from "../IAssetsRepository";

class AssetsRepository implements IAssetsRepository {
  private repository;
  constructor() {
    this.repository = Asset;
  }

  async create({
    image,
    name,
    description,
    model,
    owner,
    status,
    health_level,
  }: IAssets) {
    const asset = {
      image,
      name,
      description,
      model,
      owner,
      status,
      health_level,
    };

    await this.repository.create(asset);
  }

  async findById(asset_id: string): Promise<IAssets | undefined> {
    const asset = (await this.repository.findById(
      asset_id,
    )) as unknown as IAssets;
    return asset;
  }

  async findByName(name: string): Promise<IAssets | undefined> {
    const asset = (await this.repository.findOne({
      name,
    })) as unknown as IAssets;
    return asset;
  }

  async findAll(): Promise<IAssets[] | undefined> {
    const assets = (await this.repository.find()) as unknown as IAssets[];
    return assets;
  }
}

export { AssetsRepository };

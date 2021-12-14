import { IAssets } from "../../dtos/IAssets";
import Asset from "../../entities/Asset";
import { IAssetsRepository } from "../IAssetsRepository";

class AssetsRepository implements IAssetsRepository {
  private repository;
  constructor() {
    this.repository = Asset;
  }

  async create(data: IAssets) {
    await this.repository.create(data);
  }

  async findById(asset_id: string): Promise<IAssets | undefined> {
    const asset = (await this.repository.findById(
      asset_id,
    )) as unknown as IAssets;
    return asset;
  }

  async deleteOne(asset_id: string): Promise<void> {
    await this.repository.deleteOne({ _id: asset_id });
  }

  async updateOne(asset_id: string, data: IAssets): Promise<void> {
    await this.repository.findByIdAndUpdate(asset_id, data);
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

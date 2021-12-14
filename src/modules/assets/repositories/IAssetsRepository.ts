import { IAssets } from "../dtos/IAssets";

interface IAssetsRepository {
  findAll(): Promise<IAssets[] | undefined>;
  findById(asset_id: string): Promise<IAssets | undefined>;
  deleteOne(asset_id: string): Promise<void>;
  updateOne(asset_id: string, data: IAssets): Promise<void>;
  findByName(name: string): Promise<IAssets | undefined>;
  create(data: IAssets): Promise<void>;
}

export { IAssetsRepository };

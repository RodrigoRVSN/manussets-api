import { IAssets } from "../dtos/IAssets";

interface IAssetsRepository {
  findAll(): Promise<IAssets[] | undefined>;
  findById(asset_id: string): Promise<IAssets | undefined>;
  findByName(name: string): Promise<IAssets | undefined>;
  create(data: IAssets): Promise<void>;
}

export { IAssetsRepository };

import { container } from "tsyringe";

import { IAssetsRepository } from "../../modules/assets/repositories/IAssetsRepository";
import { AssetsRepository } from "../../modules/assets/repositories/implementations/AssetsRepository";

container.registerSingleton<IAssetsRepository>(
  "AssetsRepository",
  AssetsRepository,
);

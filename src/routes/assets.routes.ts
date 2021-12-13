import { Router } from "express";

import { upload } from "../config/upload";
import { CreateAssetController } from "../modules/assets/useCases/createAsset/CreateAssetController";
import { DeleteAssetController } from "../modules/assets/useCases/deleteAsset/DeleteAssetController";
import { ListAssetsController } from "../modules/assets/useCases/listAssets/ListAssetsController";
import { ShowAssetController } from "../modules/assets/useCases/showAsset/ShowAssetController";
import { UpdateAssetController } from "../modules/assets/useCases/updateAsset/UpdateAssetController";

const createAssetController = new CreateAssetController();
const listAssetsController = new ListAssetsController();
const showAssetController = new ShowAssetController();
const deleteAssetController = new DeleteAssetController();
const updateAssetController = new UpdateAssetController();

const assetsRoutes = Router();

assetsRoutes.post("/new", upload.single("image"), createAssetController.handle);
assetsRoutes.get("/list", listAssetsController.handle);
assetsRoutes.get("/show/:id", showAssetController.handle);
assetsRoutes.put(
  "/update/:id",
  upload.single("image"),
  updateAssetController.handle,
);
assetsRoutes.delete("/remove/:id", deleteAssetController.handle);

export { assetsRoutes };

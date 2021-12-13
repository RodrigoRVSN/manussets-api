import mongoose from "mongoose";

import { IAssets } from "../dtos/IAssets";

export const AssetModel = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  model: { type: String, required: true },
  owner: { type: String, required: true },
  status: { type: String, required: true },
  health_level: { type: Number, required: true },
});

export default mongoose.model<IAssets>("Asset", AssetModel);

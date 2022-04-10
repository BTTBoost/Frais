import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop(
  "0xD507b89c5E10fAE147D24D16bbC1897d9e01EDbd"
);

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Faris Headband",
        description: "This NFT will give you access to FarisDAO!",
        image: readFileSync("scripts/assets/faris.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();

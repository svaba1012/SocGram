// import Jimp from "jimp/browser/lib/jimp.js";
const { Image } = require("image-js");

const WINDOW_WIDTH = 400;
const RATIO = 1;

const aspectRatioValues = {
  "1/1": 1,
  "4/5": 0.8,
  "16/9": 16 / 9,
};

export const cropImage = async (file, ratioStr) => {
  const ratio = aspectRatioValues[ratioStr];
  let windowHeight = WINDOW_WIDTH / ratio;
  let windowWidth = WINDOW_WIDTH;
  if (ratio < 1) {
    windowHeight = WINDOW_WIDTH;
    windowWidth = WINDOW_WIDTH * ratio;
  }

  let zoomCoeficient = 1 + file.zoom / 100;
  let imageDisplayedWidth, imageDisplayedHeight, scaleConstant;
  if (file.width / file.height >= ratio) {
    imageDisplayedHeight = windowHeight * zoomCoeficient;
    imageDisplayedWidth = (file.width / file.height) * imageDisplayedHeight;

    scaleConstant = file.width / imageDisplayedWidth;
  } else {
    imageDisplayedWidth = windowWidth * zoomCoeficient;
    imageDisplayedHeight = (file.height / file.width) * imageDisplayedWidth;

    scaleConstant = file.width / imageDisplayedWidth;
  }
  let image = await Image.load(file.url);
  let cropedImage = image.crop({
    x: file.scroll.left * scaleConstant,
    y: file.scroll.top * scaleConstant,
    width: windowWidth * scaleConstant,
    height: windowHeight * scaleConstant,
  });

  // let url = cropedImage.toDataURL("image/png");
  return cropedImage;
};

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

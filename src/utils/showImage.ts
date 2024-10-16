interface ShowImageImgObjProps {
  key: string;
  url: string;
  _id: string;
}

const showImage = (imageObj: ShowImageImgObjProps | string) => {
  if (typeof imageObj === "string") {
    if (imageObj?.includes("amazonaws")) return imageObj;
    return `${import.meta.env.VITE_BACKEND_IMAGEURL}${imageObj}`;
  }

  if (!imageObj?.url) return "";

  if (imageObj?.url?.includes("amazonaws")) return imageObj?.url;

  return `${import.meta.env.VITE_BACKEND_IMAGEURL}${imageObj?.url}`;
};

export default showImage;

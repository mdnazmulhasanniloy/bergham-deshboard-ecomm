/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Image, Row } from "antd";
import config from "../../config";
import showImage from "../../utils/showImage";

const ProductCard = ({ product }: { product: any }) => {
  // Set primary image for product
  const primaryImage = product?.images?.length
    ? (showImage(product?.images[0]) as any)
    : config?.no_image_url;

  return (
    <div className="product-card bg-transparent text-black px-4 py-6 cursor-pointer border border-black rounded-2xl">
      <Row gutter={[16, 16]} align="middle">
        <Col span={8}>
          <Image
            src={primaryImage}
            alt={`Image of ${product?.name}`}
            style={{ width: "auto", height: "150px", borderRadius: "10px" }}
          />
        </Col>
        <Col span={16} className="space-y-1">
          <h1 className="text-20 font-500">{product?.name}</h1>
          <h5 className="text-black">{product?.category?.name}</h5>
          <h5 className="font-600 text-20">${product?.price}</h5>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={24}>
          <h1 className="text-20 font-500">Description</h1>
          <p className="text-wite">{product?.shortDescription}</p>
        </Col>
      </Row>
      <Row className="mt-6 border p-4 border-black text-black rounded-2xl text-18 font-500">
        <Col span={24}>
          <div className="flex justify-between mb-2">
            <p>Total Sales</p>
            <p>{product?.sales}</p>
          </div>
          <div className="flex justify-between">
            <p>Remaining Products</p>
            <div className="flex gap-x-2">
              <p>{product?.stock}</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCard;

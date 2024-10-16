import { Spin } from "antd";

export default function CustomSpinner() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}

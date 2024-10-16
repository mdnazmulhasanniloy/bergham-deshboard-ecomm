import { Pagination } from "antd";
interface PaginationProps {
  total: number;
  pageSize: any;
  onChange?: (page: number, pageSize: number) => void;
}
const EPagination = ({
  total = 0,
  pageSize = 10,
  onChange,
}: PaginationProps) => {
  return (
    <div>
      <Pagination
        defaultCurrent={1}
        total={total}
        onChange={onChange}
        pageSize={pageSize}
      />
    </div>
  );
};

export default EPagination;

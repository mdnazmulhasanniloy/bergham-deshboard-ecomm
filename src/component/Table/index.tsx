/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Table, TablePaginationConfig } from "antd";
interface ScrollProps {
  x?: number;
  y?: number | "max";
}
interface ETableProps {
  loading?: boolean;
  onTableChange?: () => void;
  column: any;
  data: any[];
  style?: React.CSSProperties;
  pagination?: TablePaginationConfig | undefined | true | false;
  theme?: Record<string, any>;
  scroll?: ScrollProps;
}

const ETable = ({
  loading,
  onTableChange,
  column,
  data,
  style,
  pagination = false,
  theme,
  scroll,
}: ETableProps) => {
  return (
    <ConfigProvider theme={theme}>
      <Table
        style={style}
        loading={loading}
        columns={column}
        dataSource={data}
        //@ts-ignore
        pagination={pagination}
        onChange={onTableChange}
        scroll={scroll}
      ></Table>
    </ConfigProvider>
  );
};

export default ETable;

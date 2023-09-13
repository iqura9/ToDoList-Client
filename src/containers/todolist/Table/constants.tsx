import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IToDo } from "..";

interface DataType {
  key: string;
  name: string;
}

// const columnsHandler: ColumnsType<DataType> = (onDelete) => {
//   return
// };

export const columnsHandler = (
  onDelete: (val: string) => void
): ColumnsType<DataType> => [
  {
    title: "Name",
    dataIndex: "name",
    width: "90%",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record: DataType) => (
      <Space size="middle">
        <Button onClick={() => onDelete(record.key.toString())}>Delete</Button>
      </Space>
    ),
    width: "10%",
  },
];

export const handleToDoData = (data: IToDo[]) => {
  return data.map((el) => ({
    key: el?.key,
    name: el?.value,
  }));
};

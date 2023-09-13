import { Table } from "antd";
import React, { FC, useState } from "react";
import { columnsHandler, handleToDoData } from "./constants";
import "./styles.scss";
import { IToDo } from "..";

const ToDoListTable: FC<Props> = ({ data, onDeleteHandler }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = columnsHandler(onDeleteHandler);
  return (
    <div className="todo-list__table">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={handleToDoData(data)}
      />
    </div>
  );
};

type Props = {
  data: IToDo[];
  onDeleteHandler: (id: string) => void;
};

export default ToDoListTable;

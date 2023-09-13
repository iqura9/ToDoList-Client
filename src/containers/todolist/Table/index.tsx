import { Button, Table } from "antd";
import React, { FC, useState } from "react";
import { columnsHandler, handleToDoData } from "./constants";
import "./styles.scss";
import { IToDo } from "..";

const ToDoListTable: FC<Props> = ({ data, onDeleteHandler }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const stringKeys = newSelectedRowKeys.map((key) => String(key));
    console.log("selectedRowKeys changed: ", stringKeys);
    setSelectedRowKeys(stringKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = columnsHandler(onDeleteHandler);
  return (
    <div className="todo-list__table">
      <Button
        type="primary"
        className="todo-list__delete-button"
        size="large"
        disabled={!selectedRowKeys.length}
        onClick={() => {
          onDeleteHandler(selectedRowKeys);
          setSelectedRowKeys([]);
        }}
      >
        Delete{" "}
        {selectedRowKeys.length > 0 && `${selectedRowKeys.length} todos?`}
      </Button>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={handleToDoData(data)}
        pagination={{
          pageSize: 5,
        }}
      />
    </div>
  );
};

type Props = {
  data: IToDo[];
  onDeleteHandler: (id: string | string[]) => void;
};

export default ToDoListTable;

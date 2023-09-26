import { Button, Table } from "antd";
import { FC, useState } from "react";
import { Row, columnsHandler, handleToDoData } from "./constants";
import "./styles.scss";
import { IToDo } from "..";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const ToDoListTable: FC<Props> = ({
  data,
  onDeleteHandler,
  setData,
  onUpdate,
  total,
  refetchData,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const onSelectChangeApi = (newSelectedRowKeys: string[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onDeleteHandlerNew = (id: string | string[]) => {
    onDeleteHandler(id);
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChangeApi,
  };

  const columns = columnsHandler(onDeleteHandlerNew, onUpdate);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setData((previous: IToDo[]) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };
  return (
    <div className="todo-list__table">
      <Button
        type="primary"
        className="todo-list__delete-button"
        size="large"
        disabled={!selectedRowKeys.length}
        data-testid="submit_button"
        onClick={() => {
          onDeleteHandler(selectedRowKeys);
          setSelectedRowKeys([]);
        }}
      >
        Delete{" "}
        {selectedRowKeys.length > 0 && `${selectedRowKeys.length} todos?`}
      </Button>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={data.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            rowSelection={rowSelection}
            columns={columns}
            dataSource={handleToDoData(data)}
            pagination={{
              pageSize: 5,
              total: total,
              onChange: (page, pageSize) => {
                if (refetchData) refetchData(page, pageSize);
              },
            }}
            components={{
              body: {
                row: Row,
              },
            }}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};

type Props = {
  data: IToDo[];
  onDeleteHandler: (id: string | string[]) => void;
  setData: (data: IToDo[]) => void;
  onUpdate: (id: string, updatedValue: string) => void;
  total: number;
  refetchData?: (page: number, pageSize: number) => void;
};

export default ToDoListTable;

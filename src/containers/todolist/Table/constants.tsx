import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IToDo } from "..";
import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DataType {
  key: string;
  name: string;
}

export const columnsHandler = (
  onDelete: (val: string) => void
): ColumnsType<DataType> => [
  {
    key: "sort",
  },
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

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

export const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement).key === "sort") {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{ touchAction: "none", cursor: "move" }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

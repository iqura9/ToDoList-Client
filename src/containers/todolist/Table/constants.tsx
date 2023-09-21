import { Button, Input, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { IToDo } from "..";
import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface DataType {
  key: string;
  name: string;
}

export const columnsHandler = (
  onDelete: (val: string) => void,
  onUpdate: (id: string, updatedValue: string) => void
): ColumnsType<DataType> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editMode, setEditMode] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editedValue, setEditedValue] = useState<string>("");

  const handleDoubleClick = (record: DataType) => {
    setEditMode(record.key);
    setEditedValue(record.name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handleSave = () => {
    console.log("save");
    onUpdate(editMode || "", editedValue);
    setEditMode(null);
  };

  return [
    {
      key: "sort",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "90%",
      render: (_, record: DataType) => (
        <div
          style={{ cursor: "pointer" }}
          onDoubleClick={() => handleDoubleClick(record)}
        >
          {editMode === record.key ? (
            <Input
              type="text"
              value={editedValue}
              onChange={handleInputChange}
              onPressEnter={handleSave}
            />
          ) : (
            record.name
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: DataType) => (
        <Space size="middle">
          {editMode === record.key ? (
            <Button onClick={handleSave}>Save</Button>
          ) : (
            <Button onClick={() => onDelete(record.key)}>Delete</Button>
          )}
        </Space>
      ),
      width: "10%",
    },
  ];
};

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

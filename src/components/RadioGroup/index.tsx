import { Radio, Space } from "antd";
import { useToDoContext } from "../../context/ToDoContext";

const ToDoRadioGroup = () => {
  const { selectedValue, handleRadioChange } = useToDoContext();

  return (
    <Radio.Group
      onChange={handleRadioChange}
      value={selectedValue}
      style={{ marginBottom: "20px" }}
    >
      <Space direction="horizontal">
        <Radio value={"Localstorage"}>Localstorage</Radio>
        <Radio value={"GraphQL"}>GraphQL</Radio>
        <Radio value={"Rest API"}>Rest API</Radio>
      </Space>
    </Radio.Group>
  );
};

export default ToDoRadioGroup;

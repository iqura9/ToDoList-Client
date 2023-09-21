import { Button, Form, Input, Row, Space } from "antd";
import { FC } from "react";

const CreateToDo: FC<Props> = ({ setTodo }) => {
  const [form] = Form.useForm();

  const handleSubmit = (data: { value: string }) => {
    setTodo(data.value);
    form.resetFields();
  };

  return (
    <Form name="todo-create-form" onFinish={handleSubmit} form={form}>
      <Row>
        <Space.Compact
          style={{ maxWidth: "600px", width: "-webkit-fill-available" }}
        >
          <Form.Item
            name="value"
            rules={[
              {
                required: true,
                message: "Value is required",
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Space.Compact>
      </Row>
    </Form>
  );
};

type Props = {
  setTodo: (value: string) => void;
};

export default CreateToDo;

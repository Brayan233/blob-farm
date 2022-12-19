import { Form, Input, Modal } from "antd";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { useMutation, UseMutationResult } from "react-query";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";



interface Values {
  name: string;
  size: number;
  color: string;
}

interface Blob {
  name: string;
  size: number;
  color: string;
}

interface BlobFormProps {
  open: boolean;
  setOpen: (test: boolean) => void;
  refetch: () => void;
  mode: string;
  initialValues?: Values;
  currentBlob?: Blob;
}

const BlobForm: React.FC<BlobFormProps> = ({
  mode,
  open,
  setOpen,
  refetch,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [background, setBackground] = useState("#fff");
  const { id } = useParams();

  const mutation: UseMutationResult<
    AxiosResponse<any, any> | void,
    any,
    any,
    any
  > = useMutation({
    mutationFn: (variables: any) => {
      const { blob, mode } = variables;
      if (mode === "create") {
        return axios.post("/api/blobs", blob);
      } else if (mode === "update") {
        return axios.put(`/api/blobs/${blob.id}`, blob);
      } else if (mode === "delete") {
        return axios.delete(`/api/blobs/${blob.id}`);
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onCreate = (values: any) => {
    values.color = background;
    console.log("Received values of form: ", values);
    mutation.mutate({ blob: values, mode: "create" });
    setOpen(false);
  };

  const onUpdate = async (values: any) => {
    values.color = background;
    values.id = id;

    mutation.mutate({ blob: values, mode: "update" });
    setOpen(false);
  };

  const onDelete = async (id: string | undefined) => {
    mutation.mutate({ blob: { id }, mode: "delete" });
    setOpen(false);
  };

  const onCancel = async () => {
    setOpen(false);
  };

  const handleChangeComplete = (color: any) => {
    setBackground(color.hex);
    console.log(background);
  };

  const renderConfirmationModal = () => {
    return (
      <Modal
        visible={open}
        title="Delete blob"
        okText="Delete"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          onDelete(id);
        }}
      >
        <p>Are you sure you want to delete this blob?</p>
      </Modal>
    );
  };

  const renderForm = (initialValues?: Values) => {
    return (
      <Modal
        visible={open}
        title={mode === "create" ? "Create a new blob" : "Update blob"}
        okText={mode === "create" ? "Create" : "Update"}
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              if (mode === "create") {
                onCreate(values);
              } else {
                onUpdate(values);
              }
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={initialValues}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the blob !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="color" label="Color">
            <SketchPicker
              color={background}
              onChangeComplete={handleChangeComplete}
            />
          </Form.Item>
          <Form.Item name="size" label="Size">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return mode === "delete"
    ? renderConfirmationModal()
    : renderForm(initialValues);
};

export default BlobForm;

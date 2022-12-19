import {FC} from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd";
import BlobComponent from "../../components/BlobComponent/BlobComponent";
import BlobUpdateForm from "../../components/BlobComponent/Modal";
import { useQuery } from "react-query";
import axios from "axios";

const BlobDetails: FC = () => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");

  const { id } = useParams();
  const { data, isLoading, refetch } = useQuery(
    ["blob", id],
    async () => {
      const result = await axios.get(`/api/blobs/${id}`);
      return result.data;
    },
    { refetchOnWindowFocus: false }
  );

  const onUpdateClick = () => {
    setOpen(true)
    setMode('update')
  }

  const onDeleteClick = () => {
    setOpen(true)
    setMode('delete')
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Blob {id} introuvable</div>;
  }

  return (
    <>
      <div>
        <BlobComponent blob={data}  />
        <h2>{data.name}</h2>
        <p>Color: {data.color}</p>
        <p>Size: {data.size} mm</p>
        <Button onClick={onUpdateClick}>Update blob</Button>
        <Button onClick={onDeleteClick}>Delete blob</Button>

      </div>
      <BlobUpdateForm
        refetch={refetch}
        open={open}
        setOpen={setOpen}
        mode={mode}
        initialValues={data}
      />
    </>
  );
};

export default BlobDetails;

import { Header as AntdHeader } from "antd/lib/layout/layout";
import { FC } from "react";
import { ImHome2 } from "react-icons/im";
import { Button } from "antd";
import { useState } from "react";
import classes from "./Header.module.less";
import BlobCreateForm from "../BlobComponent/Modal";


const Header: FC<{refetch:any}> = ({refetch}) => {

  const [open, setOpen] = useState(false);
  const mode = "create"
  return (
    <AntdHeader>
      <div className={classes.content}>
        <ImHome2 size="18px" />
        <h1>Blob farm</h1>
        <Button onClick={() => setOpen(true)}>Add blob</Button>
      </div>
      <BlobCreateForm
        refetch={refetch}
        open={open}
        setOpen={setOpen}
        mode={mode}
      />
    </AntdHeader>
  );
};

export default Header;

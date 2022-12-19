import { Spin } from 'antd';
import { FC } from 'react';
import BlobComponent from '../../components/BlobComponent/BlobComponent';
import classes from './Home.module.less';

const Home: FC<{ data: any, isLoading: any }> = ({ data,isLoading }) => {

  return (
    <div className={classes.container}>
      { isLoading ?
        <Spin size="large" /> : 
        data.blobs?.map((blob:any) => <BlobComponent blob={blob} key={blob.id} />)
      }
    </div>
  );
};

export default Home;

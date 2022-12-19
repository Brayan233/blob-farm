import { ConfigProvider, Layout } from "antd";
import en from "antd/lib/locale/en_US";
import { FC } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.less";
import { AppRoute } from "./App.models";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import BlobDetails from "./pages/BlobDetails/BlobDetails";
import axios from 'axios';
import { useQuery } from 'react-query';

const locales = { en };

const App: FC = () => {
  

  const { data, isLoading, refetch } = useQuery("data", async () => {
    const result = await axios.get("/api/blobs");
    console.log(result);
    return result.data;
  },{ refetchOnWindowFocus: false });

  const routes: AppRoute[] = [
    {
      path: "/blobs/:id",
      component: <BlobDetails />,
    },
    {
      path: "/blobs",
      component: <Home data={data} isLoading={isLoading} />,
    },
  ];

  const createRoute = (route: AppRoute) => {
    return (
      <Route path={route.path} element={route.component} key={route.path} />
    );
  };

  return (
    <ConfigProvider locale={locales.en}>
      <Layout>
        <Header refetch={refetch} />
        <Content>
          <Routes>
            {routes.map((route) => createRoute(route))}
            <Route path="/" element={<Navigate replace to="/blobs" />} />
          </Routes>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

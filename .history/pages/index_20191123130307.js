import React from "react";
import { DataProvider } from "../src/DataContext";
import AppForm from "../components/SubmitForm";
import Table from "../components/Table";
import Descriptiom from "../components/Description";
import { Page } from "@shopify/polaris";

function Home() {
  return (
    <DataProvider>
      <Page title='Spreadsheet App' narrowWidth>
        <Table />
        <AppForm />
        <Descriptiom />
        <div></div>
      </Page>
    </DataProvider>
  );
}

export default Home;
import React from 'react';
import { DataProvider } from '../src/DataContext';
import AppForm from '../components/SubmitForm';
import Table from '../components/Table';
import Descriptiom from '../components/Description';
import { Page } from '@shopify/polaris';

function Home() {
	return (
		<DataProvider>
			<Page title='Spreadsheet App' subtitle="For a demo, select C3 and press 'Enter' twice or load data." narrowWidth>
				<Table />
				<AppForm />
				<Descriptiom />
			</Page>
		</DataProvider>
	);
}

export default Home;

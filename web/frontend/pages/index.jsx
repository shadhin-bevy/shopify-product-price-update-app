import { TitleBar } from '@shopify/app-bridge-react';
import {
  Button,
  IndexTable,
  LegacyCard,
  useIndexResourceState,
} from '@shopify/polaris';
import React, {useState, useEffect} from 'react';
import { useAuthenticatedFetch } from "../hooks";
import { useNavigate } from '@shopify/app-bridge-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const authFetch = useAuthenticatedFetch();
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const response = await authFetch('/api/products');
      const jsonData = await response.json();
      setProducts(jsonData.data);
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const resourceName = {
    singular: 'products',
    plural: 'product',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(products);

  const rowMarkup = products.map(
    (
      product,
      index,
    ) => (
      <IndexTable.Row
        id={product.id}
        key={product.id}
        selected={selectedResources.includes(product.id)}
        position={index}
      >
        <IndexTable.Cell>{product.id}</IndexTable.Cell>
        <IndexTable.Cell>{product.title}</IndexTable.Cell>
        <IndexTable.Cell>{product.variants[0].inventory_quantity} in stock</IndexTable.Cell>
        <IndexTable.Cell>${product.variants[0].price}</IndexTable.Cell>
        <IndexTable.Cell>{product.vendor}</IndexTable.Cell>
        <IndexTable.Cell>
          <Button onClick={() => navigate(`/EditPrice/${product.id}`)}>
            Update price
          </Button>
        </IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
		<>
			<LegacyCard>
				<TitleBar title='Products list'/>

				<IndexTable
					resourceName={resourceName}
					itemCount={products.length}
					selectedItemsCount={
						allResourcesSelected ? 'All' : selectedResources.length
					}
					onSelectionChange={handleSelectionChange}
					headings={[
						{title: 'Id'},
						{title: 'Product'},
						{title: 'Stock'},
						{title: 'Price'},
						{title: 'Vendor'},
            {title: 'Update price'},
					]}
					selectable={false}
				>
					{rowMarkup}
				</IndexTable>
			</LegacyCard>
		</>
  );
}
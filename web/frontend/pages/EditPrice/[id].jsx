import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useAuthenticatedFetch } from "../../hooks";
import { useNavigate } from '@shopify/app-bridge-react';

export default function EditPrice() {
  const { id } = useParams();
  const [ inputValue, setInputValue ] = useState('');
  const [ variantId, setVariantId ] = useState('');
  const [ productTiele, setProductTiele ] = useState('');
  const [ oldPrice, setOldPrice ] = useState([]);
  const [ request, setRequest] = useState({});
  const authFetch = useAuthenticatedFetch();
  const formLabel = `Update price for - ${productTiele} - Current price: $${oldPrice}`;
  const navigate = useNavigate();

  useEffect(() => {
    authFetch(`/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setVariantId(data.variants[0].admin_graphql_api_id)
      setOldPrice(data.variants[0].price);
      setProductTiele(data.title);
    })
    .catch((err) => console.log('Error: ', err));
  }, []);

  useEffect(() => {
    authFetch(`/api/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
  }, [authFetch, request]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqBody = {
      id: variantId,
      price: parseFloat(inputValue)
    }
    setRequest(reqBody);

    setInputValue('');

    navigate('/');
  }

  const handleChange = (value) => {
    setInputValue(value)
  }

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={inputValue}
            onChange={handleChange}
            placeholder="Update price..."
            label={formLabel}
            type="Text"
          />
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
    </Page>
  )
}
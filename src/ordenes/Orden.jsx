import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {Container, Title, OrdersContainer} from './Orden-style'

const Orden = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await fetch(
        "https://sw2pn8sas4.execute-api.us-east-1.amazonaws.com/test/orden/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if required
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders: {error.message}</div>;

  return (
    <Container>
      <Title>Orders</Title>
      <OrdersContainer>
        {data.body && data.body.length > 0 ? (
          data.body.map((order, index) => (
            <div key={index}>
              <p><strong>Order ID:</strong> {order.order_id}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <hr />
            </div>
          ))
        ) : (
          <div>No orders found</div>
        )}
      </OrdersContainer>
    </Container>
  );
};

export default Orden;
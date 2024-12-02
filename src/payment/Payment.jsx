import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {Container, Title, PaymentsContainer} from './Payment-style'

const Payments = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await fetch(
        "https://rsz8uzsnjb.execute-api.us-east-1.amazonaws.com/test/pago/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading payments: {error.message}</div>;

  return (
    <Container>
      <Title>Payments</Title>
      <PaymentsContainer>
        {data.body && data.body.length > 0 ? (
          data.body.map((payment, index) => (
            <div key={index}>
              <p><strong>Payment ID:</strong> {payment.payment_id}</p>
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
              <hr />
            </div>
          ))
        ) : (
          <div>No payments found</div>
        )}
      </PaymentsContainer>
    </Container>
  );
};

export default Payments;
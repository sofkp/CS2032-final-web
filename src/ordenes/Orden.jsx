import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTenant } from "../contexts/TenantContext";
import {
  Container,
  Title,
  OrdersContainer,
  OrderCard,
  OrderInfo,
  OrderUser,
  ProductName,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductPrice,
} from "./Orden-style";

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
          data.body.map((order) => (
            <OrderCard key={order.order_id}>
            <OrderInfo>
              <OrderUser>{order.user_id}</OrderUser>
              <div>Order ID: {order.order_id}</div>

              <details>
                <summary>Productos</summary>
                <div
                  style={{ display: "grid", gridTemplateColumns: "3fr 3fr" }}
                >
                  {order.products.map((product) => (
                    <div key={product.product_id}>
                      <ProductCard key={product.product_id}>
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                        />
                        <ProductInfo>
                          <ProductName>{product.product_name}</ProductName>
                          <ProductPrice>${product.product_price}</ProductPrice>
                        </ProductInfo>
                      </ProductCard>
                    </div>
                  ))}
                </div>
              </details>
            </OrderInfo>
          </OrderCard>
          ))
        ) : (
          <div>No orders found</div>
        )}
      </OrdersContainer>
    </Container>
  );
};

export default Orden;

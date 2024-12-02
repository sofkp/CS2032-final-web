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
  const { tenantID, inventoryID } = useTenant();

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await fetch("https://example.com/orders");
      return response.json();
    },
  });

  const searchProducts = async ({ product_id }) => {
    const response = await fetch(
      `https://8y2hkh9bpk.execute-api.us-east-1.amazonaws.com/test/product/select`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          tenant_id: tenantID,
          producto_id: product_id,
        }),
      }
    );
    return response.json();
  };

  // if (isLoading) return <div>Loading...</div>;

  const orders = [
    {
      tenant_id: "wong",
      order_id: "O10001",
      user_id: "user9695@gmail.com",
      user_info: {
        info: "Info del user#user9695@gmail.com#",
      },
      products: [
        {
          product_brand: "Samsung",
          product_id: "001",
          product_info: {
            description:
              "Smartphone con cámara de alta resolución y rendimiento excepcional.",
          },
          product_name: "Galaxy S23 Ultra",
          product_price: 12000,
          tenant_id: "uwu",
        },
      ],
      inventory_id: "I6484",
    },
  ];

  useEffect(() => {
    searchProducts({ product_id: "002" });
  }, [orders]);

  return (
    <Container>
      <Title>Orders</Title>
      <OrdersContainer>
        {orders.map((order) => (
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
        ))}
      </OrdersContainer>
    </Container>
  );
};

export default Orden;

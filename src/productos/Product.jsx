import React from "react";
import { Container } from "./Producto-style";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";

const reviews = [
  {
    tenant_id: "wong",
    product_id: "P18373",
    review_id: "R1",
    user_id: "user5885@gmail.com",
    comentario: "I would not buy it again, it has defects.",
    stars: 5,
  },
  {
    tenant_id: "plaza_vea",
    product_id: "P18384",
    review_id: "R2",
    user_id: "user7622@gmail.com",
    comentario: "Excellent product, highly recommended.",
    stars: 2,
  },
  {
    tenant_id: "wong",
    product_id: "P10563",
    review_id: "R3",
    user_id: "user9329@gmail.com",
    comentario: "Good quality product, would buy again.",
    stars: 1,
  },
  {
    tenant_id: "metro",
    product_id: "P13851",
    review_id: "R4",
    user_id: "user8444@gmail.com",
    comentario: "I would not buy it again, it has defects.",
    stars: 4,
  },
  {
    tenant_id: "tottus",
    product_id: "P19265",
    review_id: "R5",
    user_id: "user4325@gmail.com",
    comentario: "The product met my expectations.",
    stars: 5,
  },
];

const Product = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const encodeProduct = params.get("product");
  const product = encodeProduct ? JSON.parse(atob(encodeProduct)) : null;

  console.log(product);

  return (
    <div>
      <Container>
        <h1>{product.product_name}</h1>
        <p>{product.product_brand}</p>
        <p>{product.product_price}</p>
        <img src={product.image} alt={product.product_name} />
      </Container>
      <div>
        <h2>Reviews</h2>
        <div>
          {reviews.map((review) => (
            <div key={review.review_id}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    {review.user_id} - {review.stars} stars
                  </Card.Text>
                  <Card.Text>{review.comentario}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

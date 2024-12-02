import React from "react";
import { Container } from "./Producto-style";
import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";

const Product = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const encodeProduct = params.get("product");
  const product = encodeProduct ? JSON.parse(atob(encodeProduct)) : null;

  console.log(product);

  const renderSpecifications = (specifications) => (
    <table>
      <thead>
        <tr>
          <th>Specification</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(specifications).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>
              {typeof value === "string" 
                ? value // Mostrar directamente si es un string
                : Object.entries(value).map(([subKey, subValue]) => ( // Manejar objetos anidados
                    <div key={subKey}>
                      <strong>{subKey}:</strong> {subValue}
                    </div>
                  ))
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  

  const renderFeatures = (features) => (
    <ul>
      {features.map((feature, index) => (
        <li key={index}>
          {typeof feature === "string" ? feature : feature.feature}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <Container>
        <img src={product.image} alt={product.product_name} />
        <h1>{product.product_name}</h1>
        <p>{product.product_brand}</p>
        <p>{product.product_price}</p>
        <p>{product.product_info.description}</p>

        <h2>Specifications</h2>
        {renderSpecifications(product.product_info.specifications)}

        <h2>Features</h2>
        {renderFeatures(product.product_info.features)}
      </Container>
    </div>
  );
};

export default Product;

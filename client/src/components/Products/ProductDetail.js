import React from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import useProducts from "../../hooks/useProducts";
import Product, { BtnAddToCart } from "./Product";
import LoadingSpinner from "../LoadingSpinner";
import { useCart } from "../../context/CartContext";

export const ProductWrapper = styled.div`
	background-color: #fbfafa;
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	gap: 15px;
`;
export const Details = styled.section`
	width: 80%;
	display: flex;
	justify-content: space-between;
	gap: 50px;
`;
export const ProductImg = styled.img`
	background-color: transparent;
	min-width: 250px;
	object-fit: contain;
	max-height: 500px;
`;
export const TextDetails = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`;
export const RelatedContainer = styled.section`
	display: flex;
	width: 90%;
	flex-wrap: wrap;
	overflow: auto;
	justify-content: center;
`;
export const PriceAction = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const BackBtn = styled.button`
	width: 80px;
	height: 30px;
	border-radius: 12px;
	border: 0;
	transition: 100ms linear all;
	&:hover {
		transform: scale(1.08);
		box-shadow: 2px 2px 5px 2px rgba(40, 40, 40, 0.34);
	}
`;

function ProductDetail() {
	const { increaseItemQuantity } = useCart();
	const { id } = useParams();
	const navigate = useNavigate();
	const productData = useFetch(`https://fakestoreapi.com/products/${id}`);
	const sameCategory = useProducts()
		.filter(
			(p) => p.id !== productData.id && p.category === productData.category
		)
		.map((p) => <Product key={p.id} product={p} />);
	return (
		<>
			{productData.length === 0 ? (
				<LoadingSpinner />
			) : (
				<ProductWrapper>
					<h1>{productData.title}</h1>
					<Details>
						<ProductImg src={productData.image} alt={productData.title} />
						<TextDetails>
							<h3>Category: {productData.category}</h3>
							<p>{productData.description}</p>
							<PriceAction>
								<span>Price: ${Number(productData.price).toFixed(2)}</span>
								<BtnAddToCart
									onClick={() => {
										increaseItemQuantity(productData.id);
									}}>
									Add to cart
								</BtnAddToCart>
								<BackBtn onClick={() => navigate(-1)}>Go Back</BackBtn>
							</PriceAction>
						</TextDetails>
					</Details>
					<h3>More from this category:</h3>
					<RelatedContainer>{sameCategory}</RelatedContainer>
				</ProductWrapper>
			)}
		</>
	);
}

export default ProductDetail;

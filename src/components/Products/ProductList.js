import React, { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import ProductForm from './ProductForm';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

const ProductList = () => {
  const { products, dispatch } = useContext(ProductContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Liste des produits</h2>
      <Button onClick={handleAddProduct} className="btn-primary mb-3">Ajouter un produit</Button>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-3">
            <Card>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Prix: {product.price} €</p>
                <Button onClick={() => handleEditProduct(product)} className="btn-warning me-2">Modifier</Button>
                <Button onClick={() => handleDeleteProduct(product.id)} className="btn-danger">Supprimer</Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentProduct ? "Modifier le produit" : "Ajouter un produit"}>
        <ProductForm product={currentProduct} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProductList;

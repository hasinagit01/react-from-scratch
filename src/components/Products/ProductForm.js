import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ProductContext } from '../../contexts/ProductContext';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Le nom du produit est requis'),
  description: Yup.string().required('La description est requise'),
  price: Yup.number().positive('Le prix doit être positif').required('Le prix est requis'),
});

const ProductForm = ({ product, onClose }) => {
  const { dispatch } = useContext(ProductContext);

  const initialValues = product || { name: '', description: '', price: '' };

  const handleSubmit = (values, { setSubmitting }) => {
    if (product) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: { ...values, id: product.id } });
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: { ...values, id: Date.now() } });
    }
    setSubmitting(false);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
        <Form>
          <Input
            label="Nom du produit"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            required
          />
          <Textarea
            label="Description"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            required
          />
          <Input
            label="Prix"
            type="number"
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price && errors.price}
            required
          />
          <Button type="submit" className="btn-primary" disabled={isSubmitting}>
            {product ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;

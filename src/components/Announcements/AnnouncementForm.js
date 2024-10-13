import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { AnnouncementContext } from '../../contexts/AnnouncementContext';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import Button from '../UI/Button';

const AnnouncementSchema = Yup.object().shape({
  title: Yup.string().required('Le titre est requis'),
  content: Yup.string().required('Le contenu est requis'),
  date: Yup.date().required('La date est requise'),
});

const AnnouncementForm = ({ announcement, onClose }) => {
  const { addAnnouncement, updateAnnouncement } = useContext(AnnouncementContext);

  const initialValues = announcement || { title: '', content: '', date: '' };

  const handleSubmit = (values, { setSubmitting }) => {
    if (announcement) {
      updateAnnouncement({ ...values, id: announcement.id });
    } else {
      addAnnouncement({ ...values, id: Date.now() });
    }
    setSubmitting(false);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AnnouncementSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
        <Form>
          <Input
            label="Titre de l'annonce"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && errors.title}
            required
          />
          <Textarea
            label="Contenu"
            name="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.content && errors.content}
            required
          />
          <Input
            label="Date"
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.date && errors.date}
            required
          />
          <Button type="submit" className="btn-primary" disabled={isSubmitting}>
            {announcement ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AnnouncementForm;

import React, { useContext, useState } from 'react';
import { AnnouncementContext } from '../../contexts/AnnouncementContext';
import AnnouncementForm from './AnnouncementForm';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Modal from '../UI/Modal';

const AnnouncementList = () => {
  const { announcements, deleteAnnouncement } = useContext(AnnouncementContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

  const handleAddAnnouncement = () => {
    setCurrentAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleEditAnnouncement = (announcement) => {
    setCurrentAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleDeleteAnnouncement = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      deleteAnnouncement(id);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Liste des annonces</h2>
      <Button onClick={handleAddAnnouncement} className="btn-primary mb-3">Ajouter une annonce</Button>
      <div className="row">
        {announcements.map(announcement => (
          <div key={announcement.id} className="col-md-4 mb-3">
            <Card>
              <div className="card-body">
                <h5 className="card-title">{announcement.title}</h5>
                <p className="card-text">{announcement.content}</p>
                <p className="card-text">Date: {announcement.date}</p>
                <Button onClick={() => handleEditAnnouncement(announcement)} className="btn-warning me-2">Modifier</Button>
                <Button onClick={() => handleDeleteAnnouncement(announcement.id)} className="btn-danger">Supprimer</Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentAnnouncement ? "Modifier l'annonce" : "Ajouter une annonce"}>
        <AnnouncementForm announcement={currentAnnouncement} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default AnnouncementList;

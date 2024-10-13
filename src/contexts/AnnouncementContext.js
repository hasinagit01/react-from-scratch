import React, { createContext, useState } from 'react';
import announcementData from '../data/announcements.json';

export const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState(announcementData);

  const addAnnouncement = (announcement) => {
    setAnnouncements([...announcements, announcement]);
  };

  const updateAnnouncement = (updatedAnnouncement) => {
    setAnnouncements(announcements.map(announcement => 
      announcement.id === updatedAnnouncement.id ? updatedAnnouncement : announcement
    ));
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  return (
    <AnnouncementContext.Provider value={{ announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

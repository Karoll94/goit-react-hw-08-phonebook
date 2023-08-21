import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../store/reducer';
import React, { useEffect } from 'react';
import UserMenu from 'components/UserMenu/UserMenu';

export default function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.store.items);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        paddingBottom: '35px',
      }}
    >
      <UserMenu />
      <h2>Phonebook</h2>
      <ContactForm />

      <div className="contacts--container">
        <h4 className="contacts--title">Contacts</h4>
        <Filter />
        {contacts.length > 0 ? <ContactList /> : <h6>No contacts found</h6>}
      </div>
    </div>
  );
}

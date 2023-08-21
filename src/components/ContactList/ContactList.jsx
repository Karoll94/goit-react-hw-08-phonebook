import ContactItem from 'components/ContactItem/ContactItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../store/reducer';

export default function ContactList() {
  const contacts = useSelector(state => state.store.items);
  const filter = useSelector(state => state.store.filter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className='contact-list'>
      {filteredContacts.map(
        contact => (
          (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDeleteContact={() => handleDeleteContact(contact.id)}
            />
          )
        )
      )}
    </ul>
  );
}

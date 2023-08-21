import { useDispatch } from 'react-redux';
import { deleteContact } from '../../store/reducer';

export default function ContactItem({ contact }) {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteContact(contact.id));
  };
  return (
    <li className='list--item'>
      <p>Name:</p>
      <h5 className='list--item__name'> {contact.name}</h5>
      <p>Phone:</p>
      {contact.number}
      
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

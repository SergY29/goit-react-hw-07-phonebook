import { Container } from './App.styled';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../redux/contactSlice';
import { setFilter, getFilter } from '../redux/filterSlice';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  console.log(contacts);

  const filteredNames = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  console.log(contacts);

  const handleFilter = event => {
    const { value } = event.target;
    dispatch(setFilter(value));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={handleFilter} />
      <ContactList contacts={filteredNames} />
    </Container>
  );
};

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from './App.styled';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

import { fetchContacts } from 'redux/operations';
import { setFilter } from 'redux/filterSlice';
import {
  selectContacts,
  selectError,
  selectIsLoading,
  selectFilter,
} from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      {contacts.length > 0 && (
        <>
          <h1>Phonebook</h1>
          <ContactForm contacts={contacts} />
          <h2>Contacts</h2>
          <Filter filter={filter} onFilter={handleFilter} />
          {isLoading && !error && <b>Request in progress...</b>}
          <ContactList contacts={filteredNames} />
        </>
      )}
    </Container>
  );
};

//
//
//
//

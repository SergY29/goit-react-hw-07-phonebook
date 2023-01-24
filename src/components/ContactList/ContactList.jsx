import PropTypes from 'prop-types';
import { Button, Item } from './ContactList.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';

export const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();

  return (
    <ul>
      {contacts.map(({ id, name, phone, createdAt }) => (
        <Item key={id}>
          <p>created: {createdAt}</p>
          {name}: {phone}
          <Button type="button" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </Button>
        </Item>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      createdAt: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};

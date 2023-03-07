const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("db", "contacts.json");

/**
 * Load contact list from file.
 * @returns {object}
 */
const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    const contacts = JSON.parse(result.toString());

    return contacts;
  } catch (err) {
    console.log("Something went wrong: ", err.message);
  }
};

/**
 * Get contact by it id.
 * @param {string} contactId - contact id
 * @returns {object}
 */
const getContactById = async (contactId) => {
  const contacts = await listContacts();

  return contacts.find((person) => {
    if (person.id === contactId) return console.log(person);
  });
};

/**
 * Remove contact by it id.
 * @param {string} contactId - contact id
 * @returns {void}
 */
const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const renewContacts = contacts.filter((person) => person.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(renewContacts));

  return;
};

/**
 * Add contact.
 * @param {string} name - name contact that adding
 * @param {string} email - email contact that adding
 * @param {string} phone - phone contact that adding
 * @returns {void}
 */
const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

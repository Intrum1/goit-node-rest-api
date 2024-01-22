import { promises as fs } from "fs";

const contactsPath = "../db/contacts.json";

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    // console.log.table(readResult);
    return JSON.parse(readResult);
  } catch (err) {
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact =
      contacts.find((contact) => contact.id === contactId) || null;
    return contact || null;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (!removedContact) return null;

    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId,
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: Date.now().toString(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return null;
  }
}

async function updateContactService(id, name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const existingContactIndex = contacts.findIndex(
      (contact) => contact.id === id,
    );

    if (existingContactIndex === -1) {
      return null;
    }

    contacts[existingContactIndex].name =
      name || contacts[existingContactIndex].name;
    contacts[existingContactIndex].email =
      email || contacts[existingContactIndex].email;
    contacts[existingContactIndex].phone =
      phone || contacts[existingContactIndex].phone;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return contacts[existingContactIndex];
  } catch (error) {
    return null;
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
};

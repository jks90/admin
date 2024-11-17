import { EmailList } from '@/interfaces/mail-interfaces';

export let listEmails: EmailList[] = [
];

export const addListEmail = (list: EmailList) => {
  listEmails.push(list);
};

export const getListEmails = async () => {
  return listEmails;
};

export const updateEmail = async (list: EmailList) => {
  const index = listEmails.findIndex((l) => l.id === list.id);
  listEmails[index] = list;
};

export const updateListEmail = async (list: EmailList[]) => {
  listEmails = list;
};
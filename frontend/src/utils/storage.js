const STORAGE_KEY = 'online_ide_snippets';

export const getSnippets = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveSnippets = (snippets) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
};

export const createSnippet = (title = 'Untitled', language = 'javascript', code = '') => {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    title,
    language,
    code,
    lastModified: new Date().toISOString()
  };
};

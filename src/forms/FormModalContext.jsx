import { createContext, useCallback, useContext, useState } from 'react';
import FormModal from '../components/FormModal.jsx';

// One place that owns the audit and contact pop-ups, so any part of the page
// (the call-to-action buttons, the footer email link, ...) can open them.
const FormModalContext = createContext(() => {});

export function FormModalProvider({ children }) {
  const [openForm, setOpenForm] = useState(null); // 'audit' | 'contact' | null
  const open = useCallback((type) => setOpenForm(type), []);

  return (
    <FormModalContext.Provider value={open}>
      {children}
      {/* Rendered at page level, outside the navy sections, so the modal uses the light theme. */}
      {openForm && <FormModal type={openForm} onClose={() => setOpenForm(null)} />}
    </FormModalContext.Provider>
  );
}

// Returns open(type), where type is 'audit' or 'contact'.
export function useFormModal() {
  return useContext(FormModalContext);
}

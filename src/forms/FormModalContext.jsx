import { createContext, useCallback, useContext, useState } from 'react';
import FormModal from '../components/FormModal.jsx';

// One place that owns the audit and contact pop-ups, so any part of the page
// (the call-to-action buttons, the footer email link, ...) can open them.
const FormModalContext = createContext(() => {});

export function FormModalProvider({ children }) {
  // { type: 'audit' | 'contact', initial: { fieldId: value } } or null
  const [openForm, setOpenForm] = useState(null);
  const open = useCallback((type, initial = {}) => setOpenForm({ type, initial }), []);

  return (
    <FormModalContext.Provider value={open}>
      {children}
      {/* Rendered at page level, outside the navy sections, so the modal uses the light theme. */}
      {openForm && <FormModal type={openForm.type} initial={openForm.initial} onClose={() => setOpenForm(null)} />}
    </FormModalContext.Provider>
  );
}

// Returns open(type, initial): type is 'audit' or 'contact'; initial prefills fields,
// e.g. open('audit', { selling: 'no' }) for a launch request.
export function useFormModal() {
  return useContext(FormModalContext);
}

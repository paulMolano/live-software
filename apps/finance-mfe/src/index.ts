// Indirection required by Module Federation: the federation runtime must boot
// before any shared dependency (React, react-dom, etc.) is evaluated.
import('./bootstrap');
export {};


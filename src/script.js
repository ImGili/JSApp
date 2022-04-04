import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import ThreeComponent from './components/ThreeComponent';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ThreeComponent />);
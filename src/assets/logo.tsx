

import React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 150 68"><defs><style>.cls-1{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3{clip-path:url(#clip-path-2);}</style><clipPath id="clip-path"><path class="cls-1" d="M30.13,67V.94H45.2V67ZM81,67,65.6,26.8h-.28L65.69,67H52.31V.94H68.78L84,41.73h.29L84,.94H97V67Zm52.5,0-2.72-12H115.85l-2.71,12h-15L114.26.94h18.81l16,66.08Zm-9.92-51.7h-.38l-5.61,28.09h11.32l-5.33-28.09Z"/></clipPath><clipPath id="clip-path-2"><path class="cls-1" d="M32.63,46.46c1.07-2.24-1.07-2-1.92-.11C28.25,52,22.47,64.59,13.06,64.59,6,64.59,7.82,53.82,9.42,50c2.89,0,9.84-2.24,13.16-4.69,6.84-5.23,10-12.48,5.88-15.58-4.7-3.52-12.83.54-18.29,6.94-4.7,5.54-8.34,13.54-8.23,19.94C2,63.31,6.86,66.83,12.21,66.83c11.87,0,16.47-11.84,20.42-20.37Zm-11.12-3c-3.85,3.2-9.41,4.7-11.34,4.7a64.39,64.39,0,0,1,6.42-10c13.16-15.89,13.69-2,4.92,5.33Z"/></clipPath></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g class="cls-2"><image width="150" height="68" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABECAQAAADJ/gRNAAAAc0lEQVR42u3QAQEAAAgCoPw/2i44ACaQ9hhFlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJkiVLlixZsmTJ2j3E/Ie9zipelwAAAABJRU5ErkJggg=="/></g><g class="cls-3"><image width="150" height="68" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABECAYAAABj98zGAAAACXBIWXMAAAsSAAALEgHS3X78AAAA3ElEQVR4Xu3UsQ2DUBQEwWdER7j/CqAmKOFLlld2MBNfuLrXzNwDX7atBvAJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWCWGREBYJYZEQFon9nGO1+Zn3XKsJf8pjkRAWCWGREBYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWCWGREBYJYZEQFglhkRAWCWGReABTcgOJlVzCkAAAAABJRU5ErkJggg=="/></g></g></g></svg>
`;

export default () => <SvgCss xml={xml} width="70%" height="70%" />;

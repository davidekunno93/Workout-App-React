# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Limitations:
1) Using useEffect to handle login authentication - only senses if auth data changes, therefore, if you i.e. type the wrong password twice, the auth data remains "wrongPassword" and the alert doesn't trigger the second time **FIXED**

2) Modal for workout instructions when viewing exercise cards? **Instructions on the back**

3) Adding dropsets and supersets

4) BuildFinal page - when rep # goes from single to double digits the text shifts - make independent div container for # and center text? **DONE**

5) Make pages responsive and fit to phone device

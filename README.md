# RestCountries(Altin Deltina)

This application fullfilled your requirements.(https://jm-test-assessment.vercel.app/#designs)

## Installation Guide

# 🌍 Country Explorer – Vue 3 + Composition API + Vite

A modern, responsive country explorer built with Vue 3, Pinia, Tailwind CSS, and Composition API. This app allows users to search, filter, and view countries fetched from the REST Countries API. It includes a clean UI, dynamic sorting, pagination, error handling, and test coverage.

## 🔗 Live Demo

👉 [View Demo](https://your-demo-url.netlify.app)  
*(Replace this link with your deployed URL, e.g., Vercel, Netlify, or GitHub Pages)*

---

## 📁 Project Structure

assets/icon-arrow-down.svg

components/headerComponents.vue

components/Home.test.js: contains unit tests for core functionalities (search, filters, UI behavior)

composables/getGetData.js: a composable that fetches country data from the API and exposes it reactively

router/index.js indicate the router of all the pages

views/HomeView.vue: the main view that uses all components and handles filters, sorting, and pagination

Aoo.vue: displays individual country data

store/index.js: manages global state (e.g., selected region, current page)






---

## 🚀 Features

- 🔍 **Search by name** (real-time filtering)
- 🌍 **Filter by region** using radio buttons
- 🔢 **Sort by name or population** (asc/desc)
- 📦 **Pagination** with "Next" button
- ☁️ **Live data** fetched from REST Countries API
- ⚙️ **Error handling** and loading states
- 🧪 **Unit tests** with Vitest & Testing Library
- 🧼 **Tailwind CSS** for modern styling
- ⚡ **Vite** for fast development builds

---

## 🧠 Tech Stack

- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

---

## 🧪 Running Tests

```bash
# Run all unit tests
npm run test

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```
---

## 🧰 Code Explanation


---
## ✅ How to Use
Open the app.

Use the search bar to filter by country name.

Filter results by region using the radio buttons.

Sort the list via the dropdown by name or population.

Navigate using the Next button to paginate through results.

---
## ⚠️ Edge Cases & Error Handling
Graceful fallback UI when no countries match filters

Error message when API fails to respond

Loading spinner while fetching data


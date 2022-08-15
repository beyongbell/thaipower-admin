export default function ({ $axios, redirect, store }) {
    $axios.onRequest(config => {
      config.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("token");
    });
  }
  
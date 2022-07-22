const fetcher = (URL, options: {}) => {
  return fetch(URL, options)
    .then((res) => res.json())
    .catch((err) => err);
};

export default fetcher;

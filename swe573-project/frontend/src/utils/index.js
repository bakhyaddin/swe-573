const urlValidator = (_, values) => {
  // eslint-disable-next-line no-useless-escape
  const urlRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  const validatedInput = urlRegex.test(values);
  if (values === undefined || values.length === 0) {
    return Promise.reject(Error('Please input your email!'));
  } if (!validatedInput) {
    return Promise.reject(Error('Please input a valid url!'));
  }
  return Promise.resolve();
};

export { urlValidator };

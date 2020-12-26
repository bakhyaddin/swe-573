import xmlHttpRequest from '../xmlHttpRequest';

const useLogin = async (userdata) => {
  try {
    const response = await xmlHttpRequest({
      method: 'POST',
      path: 'auth/login/',
      body: {
        email: userdata.email,
        password: userdata.password,
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const useRegister = async (userdata) => {
  try {
    const response = await xmlHttpRequest({
      method: 'POST',
      path: 'auth/create-user/',
      body: {
        email: userdata.email,
        password: userdata.password,
        name: userdata.name,
        surname: userdata.surname,
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getReuqestedData = async (values) => {
  try {
    const response = await xmlHttpRequest({
      method: 'POST',
      path: 'posts/posts/',
      body: {
        search: values.search,
      },
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export { useLogin, useRegister, getReuqestedData };

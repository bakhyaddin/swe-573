import xmlHttpRequest from '../xmlHttpRequest';

// const user = JSON.parse(window.localStorage.getItem('userSWE573'));

const useCheckToken = async () => {
  try {
    const response = await xmlHttpRequest({
      method: 'GET',
      path: 'auth/check-token/',
      sendToken: true,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

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
      sendToken: true,
      body: values,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getResults = async () => {
  try {
    const response = await xmlHttpRequest({
      method: 'GET',
      path: 'posts/get-results/',
      sendToken: true,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteResult = async (id) => {
  try {
    const response = await xmlHttpRequest({
      method: 'DELETE',
      path: `posts/delete-result/${id}/`,
      sendToken: true,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  useLogin, useRegister, getReuqestedData, useCheckToken, getResults, deleteResult,
};

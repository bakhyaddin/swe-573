import xmlHttpRequest from '../xmlHttpRequest';

const useLogin = async (userdata) => {
  try {
    const response = await xmlHttpRequest({
      method: 'POST',
      path: 'auth/login/',
      email: userdata.email,
      password: userdata.password,
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
      path: 'auth/login/',
      email: userdata.email,
      password: userdata.password,
    });
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export { useLogin, useRegister };

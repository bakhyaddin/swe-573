import React, { useEffect } from 'react';

import { getResults } from '../../hooks/useXmlHttpService';

const Profile = () => {
  useEffect(() => {
    getResults()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      this is profile
    </div>
  );
};

export default Profile;

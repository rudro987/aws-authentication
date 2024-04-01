import { useEffect, useState } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';

const Test = () => {
  const [userAttributes, setUserAttributes] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  console.log(userAttributes);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userAttributes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Attributes</h2>
      {
            <ul>
            <li>{userAttributes.email}</li>
            <li><img src={userAttributes.picture} className="max-w-sm rounded-lg shadow-2xl" /></li>
            <li></li>
            <li></li>
            </ul>
      }
    </div>
  );
};

export default Test;
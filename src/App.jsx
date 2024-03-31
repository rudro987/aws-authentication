import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const App = ({ signOut, user }) => {
  console.log(user)
  return (
    <>
      <div>
    <Heading level={1}>Hello</Heading>
    <Button onClick={signOut}>Sign out</Button>
    <h2>Amplify Todos</h2>
    ...
  </div>
      
    </>
  );
};

export default withAuthenticator(App);

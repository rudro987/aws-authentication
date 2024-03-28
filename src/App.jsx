import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
Amplify.configure(config);

export function App() {
  return (
    <div className="max-w-7xl mx-auto">
        <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

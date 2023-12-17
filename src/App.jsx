import {  Routes, Route  } from "react-router-dom";
import SigninForm from "./pages/auth/form/SigninForm";
import SignupForm from "./pages/auth/form/SignupForm";
import AuthLayout from "./pages/auth/AuthLayout";
import RootLayout from "./pages/root/RootLayout";
import Home from "./pages/root/Home";
import Profile from './pages/root/Profile';
import { Toaster } from "react-hot-toast";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";

function App() {
  return (
  <main className=" h-screen">
    
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>
    
      <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
      
        </Route>

      </Routes>
    
  <Toaster position="top-right"/>
  </main>
  );
}

export default App;

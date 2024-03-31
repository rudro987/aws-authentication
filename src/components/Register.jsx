import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Storage, Auth } from 'aws-amplify';
import { AmplifySignUp } from '@aws-amplify/ui-react';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Upload the image file to S3
      const uploadedImage = await Storage.put(`images/${imageFile.name}`, imageFile, {
        contentType: imageFile.type,
      });

      // Sign up the user with the uploaded image key
      const { user } = await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email,
          name: data.name,
          'custom:profilePicture': uploadedImage.key,
        },
      });

      console.log('User signed up successfully:', user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
        />
        {errors.name && <span>Name is required</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: true })}
        />
        {errors.email && <span>Email is required</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>Password is required</span>}
      </div>

      <div>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Register;

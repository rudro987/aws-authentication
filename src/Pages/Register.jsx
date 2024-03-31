import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);
    
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
          name="image"
        />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Register;

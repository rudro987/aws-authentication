import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';

const Validations = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        
    }
  return (
    <>
      <Link to="/">
        <button className="btn btn-success mb-20">Home</button>
      </Link>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="User Name"
                  className="input input-bordered"
                  {...register('userName', { required: true })}
                />
                {errors.userName && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register('confirmationCode', { required: true })}
                />
                {errors.confirmationCode && <span>This field is required</span>}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">validate</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Validations;

import { useForm } from 'react-hook-form';
import useAuth from '../Hooks/useAuth';

const Validations = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {handleConfirmSignUp} = useAuth();
    const onSubmit = async (data) => {
        console.log(data);
        const { nextStep } = await handleConfirmSignUp(data.email, data.confirmationCode);
        console.log(nextStep);
    }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register('email', { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="Confirmation code"
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

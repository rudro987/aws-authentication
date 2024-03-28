import { useForm } from "react-hook-form";
import { confirmSignUp } from "aws-amplify/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Validations = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const validateCode = async (data) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: data.email,
        confirmationCode: data.confirmationCode,
      });

      if (isSignUpComplete) {
        Swal.fire({
          icon: "success",
          title: "Registration successfull",
          text: "You will be redirected to the login page ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(validateCode)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="Email address"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-700 font-bold">
                  Email address is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmation code</span>
              </label>
              <input
                type="number"
                placeholder="Confirmation Code"
                className="input input-bordered"
                {...register("confirmationCode", { required: true })}
              />
              {errors.confirmationCode && (
                <span className="text-red-700 font-bold">
                  Confirmation code is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Validate</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Validations;

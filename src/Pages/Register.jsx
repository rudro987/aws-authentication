import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadData, getUrl } from "aws-amplify/storage";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { loading, handleSignUp } = useAuth();

  const onSubmit = async (data) => {
    const random = Math.floor(Math.random() * 10000);
    const fileName = `${random}-${data.image[0].name}`;
    const result = await uploadData({
      key: fileName,
      data: data.image[0],
      options: {
        accessLevel: "guest", // defaults to `guest` but can be 'private' | 'protected' | 'guest'
      },
    }).result;

    if (result.key) {
      const getUrlResult = await getUrl({
        key: result.key,
        options: {
          accessLevel: "guest", // can be 'private', 'protected', or 'guest' but defaults to `guest`
        },
      });
      console.log(getUrlResult);
      const imageFile = getUrlResult.url.origin + getUrlResult.url.pathname;
      console.log(imageFile);
      if (getUrlResult.url) {
        try {
          const { nextStep } = await handleSignUp(
            data.firstName,
            data.lastName,
            data.email,
            data.password,
            imageFile
          );
          console.log(nextStep);
  
          switch (nextStep.signUpStep) {
            case "CONFIRM_SIGN_UP":
              Swal.fire({
                title: "Need validation",
                text: "Please check your email for validation code!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Go to validations >",
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate("/validations");
                }
              });
              break;
              default: break
          }
        } catch (error) {
          console.error("Error signing up: ", error);
        }
        
      }
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                placeholder="profile pic"
                className="input input-bordered"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-info">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

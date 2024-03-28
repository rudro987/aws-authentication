import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { uploadData, getUrl } from 'aws-amplify/storage';

const Register = () => {
  const { createNewUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    const file = data.image[0];
    let imageUrl = '';

    const result = uploadData({
      key: file.name,
      data: file
    }).result;

    console.log(result.key);
    
    
    try {
      if(result.key){
        imageUrl = await getUrl(result.key);
      }
      const { nextStep } = await createNewUser(data.email, data.password, data.name, imageUrl);
      console.log(imageUrl);
      
      if (nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
        Swal.fire({
          icon: "success",
          title: "Verification required",
          text: "Please check your email for confirmation code",
          html: "You will be redirected to the login page ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate("/validations");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full name"
                className="input input-bordered"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-700 font-bold">
                  Full name is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
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
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                placeholder="Upload your image"
                className="input input-bordered"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-red-700 font-bold">
                  Image is required
                </span>
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
                <span className="text-red-700 font-bold">
                  Password is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

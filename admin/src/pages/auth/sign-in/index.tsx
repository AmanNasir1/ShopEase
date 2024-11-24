import { Form } from "antd";
import ShopEaseLogo from "../../../assets/svgs/icons/logo.svg";
import SEContainer from "../../../component/atoms/SEContainer";
import {
  PasswordInput,
  TextInput,
} from "../../../component/molecules/form-label-input/index.";
import SEButton from "../../../component/atoms/sp-button";
import { Link } from "react-router-dom";

function SignInPage() {
  const [form] = Form.useForm();
  return (
    <div className="flex h-full min-h-screen flex-1 flex-col items-center justify-center">
      <SEContainer className="w-[400px] p-10">
        <div className="flex flex-1 items-center justify-center">
          <img src={ShopEaseLogo} alt="" className="w-12 mx-auto" />
        </div>
        <div className="flex flex-col items-center py-5">
          <h1 className="text-xl font-bold">Welcome to ShopEase</h1>
          <p>Login to continue</p>
        </div>
        <Form form={form} className="flex flex-col gap-4">
          <TextInput
            label="Email"
            name="email"
            placeholder="Enter your email"
          />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
          />
          <div className="flex justify-end">
            <Link
              to={"/auth/forgot-password"}
              className="text-md font-medium text-black hover:text-gray-900 hover:opacity-90"
            >
              Forgot Password
            </Link>
          </div>
          <SEButton className="w-full" type="primary" htmlType="submit">
            Login
          </SEButton>
        </Form>
        <div className="flex items-center justify-center gap-1 mt-3">
          <p>Don't have an account?</p>
          <Link
            to={"/auth/sign-up"}
            className="text-md font-medium text-black hover:text-gray-900 hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>
      </SEContainer>
    </div>
  );
}

export default SignInPage;

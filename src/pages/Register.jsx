import { Link } from "react-router-dom";
import { Input } from "../components/input";

const Register = () => {
  return (
    <div className="w-full max-w-[1000px]">
      <div className="animate-fade-in-up group relative w-full overflow-hidden rounded-2xl border border-[#CAA969]/20 bg-gradient-to-br from-black/80 via-[#1a1a1a]/90 to-black/80 p-6 shadow-2xl backdrop-blur-xl transition-all !duration-100 hover:border-[#CAA969]/40 hover:shadow-[#CAA969]/20 sm:p-8">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="animate-text-shimmer mb-2 bg-gradient-to-r from-[#CAA969] via-[#FFE7B9] to-[#CAA969] bg-clip-text text-4xl font-bold text-transparent">
            Create an account
          </h1>
          <p className="text-sm text-[#CAA969]">
            Register today! Start building points and get access to exclusive
            discounts.
          </p>
        </div>

        {/* Info Notice */}
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-[#2a2a2a]/50 p-4">
          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white text-black">
            <span className="text-xs font-bold">i</span>
          </div>
          <p className="text-sm text-[#B4B4B4]">
            Please note we have to conduct identity and security checks in order
            to ensure safe delivery of your items.
          </p>
        </div>

        {/* Registration Form */}
        <form className="space-y-5">
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group/input relative">
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                First Name*
              </label>
              <Input
                labelInput={false}
                type="text"
                id="firstName"
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="First Name*"
                required
              />
            </div>

            <div className="group/input relative">
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                Last Name*
              </label>
              <Input
                labelInput={false}
                type="text"
                id="lastName"
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="Last Name*"
                required
              />
            </div>
          </div>

          {/* Date of Birth & Mobile Number Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group/input relative">
              <label
                htmlFor="dateOfBirth"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                Date of Birth *
              </label>
              <Input
                labelInput={false}
                type="text"
                id="dateOfBirth"
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="Date of Birth *"
                required
              />
            </div>

            <div className="group/input relative">
              <label
                htmlFor="mobileNumber"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                Mobile Number*
              </label>
              <div className="flex gap-2 text-white">
                <Input
                  labelInput={false}
                  type="tel"
                  id="mobileNumber"
                  className="flex-1 rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                  placeholder="Mobile Number*"
                  required
                  phoneNumber={true}
                  defaultCountryCode="+44"
                  onCountryCodeChange={(country) => {
                    console.log("Selected country:", country);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="group/input relative">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#B4B4B4]"
            >
              Email*
            </label>
            <Input
              labelInput={false}
              type="email"
              id="email"
              className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
              placeholder="Email*"
              required
            />
          </div>

          {/* Password & Confirm Password Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group/input relative">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                Password*
              </label>
              <div className="relative">
                <Input
                  labelInput={false}
                  type="password"
                  id="password"
                  className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 pr-12 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                  placeholder="Password*"
                  required
                />
              </div>
            </div>

            <div className="group/input relative">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                Confirm Password*
              </label>
              <div className="relative">
                <Input
                  labelInput={false}
                  type="password"
                  id="confirmPassword"
                  className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 pr-12 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                  placeholder="Confirm Password*"
                  required
                />
              </div>
            </div>
          </div>

          {/* Find Address */}
          <div className="group/input relative">
            <label
              htmlFor="findAddress"
              className="mb-2 block text-sm font-medium text-[#B4B4B4]"
            >
              Find Address
            </label>
            <Input
              labelInput={false}
              type="text"
              id="findAddress"
              className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
              placeholder="Find Address"
            />
          </div>

          {/* House No & Street Name Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group/input relative">
              <label
                htmlFor="houseNo"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                House No. / Name*
              </label>
              <Input
                labelInput={false}
                type="text"
                id="houseNo"
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="House No. / Name*"
                required
              />
            </div>

            <div className="group/input relative">
              <label
                htmlFor="streetName"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                Street Name*
              </label>
              <Input
                labelInput={false}
                type="text"
                id="streetName"
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="Street Name*"
                required
              />
            </div>
          </div>

          {/* City & Postal Code Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group/input relative">
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                City*
              </label>
              <Input
                labelInput={false}
                type="text"
                id="city"
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="City*"
                required
              />
            </div>

            <div className="group/input relative">
              <label
                htmlFor="postalCode"
                className="mb-2 block text-sm font-medium text-[#B4B4B4]"
              >
                Postal/Zip Code*
              </label>
              <Input
                labelInput={false}
                type="text"
                id="postalCode"
                className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
                placeholder="Postal/Zip Code*"
                required
              />
            </div>
          </div>

          {/* Country */}
          <div className="group/input relative">
            <label
              htmlFor="country"
              className="mb-2 block text-sm font-medium text-[#B4B4B4]"
            >
              Country*
            </label>
            <Input
              labelInput={false}
              type="text"
              id="country"
              className="w-full rounded-lg border border-[#CAA969]/20 bg-black/50 px-4 py-3 text-white placeholder-[#6B6B6B] transition-all duration-300 focus:border-[#CAA969] focus:outline-none focus:ring-2 focus:ring-[#CAA969]/20"
              placeholder="Country*"
              required
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              className="mt-1 h-4 w-4 rounded border-[#CAA969]/20 bg-black/50 text-[#CAA969] focus:ring-2 focus:ring-[#CAA969]/20"
              required
            />
            <label htmlFor="agreeToTerms" className="text-sm text-[#B4B4B4]">
              I agree to the{" "}
              <a
                href="#"
                className="text-[#CAA969] underline hover:text-[#FFE7B9]"
              >
                terms of service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#CAA969] underline hover:text-[#FFE7B9]"
              >
                privacy policy
              </a>
              .
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="group/button relative w-full cursor-pointer overflow-hidden rounded-lg bg-gradient-to-r from-[#CAA969] to-[#D1AB59] py-4 font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#CAA969]/20"
          >
            <span className="relative z-10">Create Account</span>
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#8B8B8B]">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-[#CAA969] transition-colors duration-300 hover:text-[#FFE7B9]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

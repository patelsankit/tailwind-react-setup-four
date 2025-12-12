import * as React from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils";

// Country codes list
const countryCodes = [
  { code: "+44", flag: "🇬🇧", country: "UK" },
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+1", flag: "🇺🇸", country: "USA" },
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+971", flag: "🇦🇪", country: "UAE" },
];

type InputProps = React.ComponentProps<"input"> & {
  loading?: boolean;
  labelInput?: boolean;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  showPasswordToggle?: boolean; // Optional: can explicitly enable/disable toggle for password fields
  labelClass?: string;
  phoneNumber?: boolean; // Enable phone number with country code dropdown
  onCountryCodeChange?: (country: {
    code: string;
    flag: string;
    country: string;
  }) => void;
  defaultCountryCode?: string; // Default country code (e.g., "+44")
};

function Input({
  className,
  type,
  loading,
  labelInput = true,
  label,
  error = false,
  errorMessage,
  showPasswordToggle = true, // Default to true for password fields
  labelClass,
  phoneNumber = false,
  onCountryCodeChange,
  defaultCountryCode = "+44",
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // Find the default country based on defaultCountryCode
  const defaultCountry =
    countryCodes.find((c) => c.code === defaultCountryCode) || countryCodes[0];
  const [selectedCountryCode, setSelectedCountryCode] =
    React.useState(defaultCountry);

  // Handler for country code change
  const handleCountryCodeChange = (country: typeof defaultCountry) => {
    setSelectedCountryCode(country);
    onCountryCodeChange?.(country);
  };

  // Determine if this is a password field
  const isPasswordField = type === "password";
  const shouldShowToggle = isPasswordField && showPasswordToggle && !loading;

  // Use the internal showPassword state to determine the actual input type
  const inputType = isPasswordField && showPassword ? "text" : type;

  React.useEffect(() => {
    // Check if input has value on mount or when props.value changes
    if (props.value) {
      setHasValue(String(props.value).length > 0);
    }
  }, [props.value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    props.onBlur?.(e);
  };

  if (loading) {
    return <div className="h-14 animate-pulse rounded-md bg-gray-200"></div>;
  }

  // Regular input without floating label
  if (!labelInput) {
    return (
      <div className="relative w-full">
        {phoneNumber && !loading && (
          <div className="absolute left-3 top-1/2 z-[99] flex -translate-y-1/2 items-center gap-2"></div>
        )}
        <input
          type={inputType}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs max-sm:h-12- flex h-14 w-full min-w-0 rounded border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] selection:bg-blue-400 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            shouldShowToggle && "pr-10",
            className,
            phoneNumber && "!pl-16"
          )}
          {...props}
        />
        {shouldShowToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-7 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    );
  }

  // Floating label input
  const isActive = isFocused || hasValue;
  const labelText = label || props.placeholder;

  return (
    <div
      className={`group relative w-full ${
        isActive ? "label-is-active" : "label-is-not-active"
      }`}
    >
      {phoneNumber && !loading && (
        <div className="absolute left-3 top-1/2 z-[99] flex -translate-y-1/2 items-center gap-2"></div>
      )}
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground selection:text-primary-foreground max-sm:h-12- flex h-14 w-full min-w-0 rounded-lg border bg-white px-4 py-3 text-base outline-none transition-all selection:bg-blue-400 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:!hidden placeholder:!text-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "!border-red-500 shadow-[0px_4px_4px_rgba(255,0,0,0.10)] focus:border-red-500"
            : "border-gray-300 focus:border-black",
          shouldShowToggle && "!pr-12",
          phoneNumber && "!pl-16",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=""
        {...props}
      />
      {shouldShowToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-7 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}
      <label
        className={cn(
          "pointer-events-none absolute bg-white px-1 transition-all ease-in-out",
          phoneNumber
            ? "left-3 group-[.label-is-not-active]:left-16"
            : "left-3",
          isActive
            ? "!text-12 -top-2.5"
            : "text-14 max-sm:text-13- max-sm:top-3.5- top-4",
          error
            ? isActive
              ? "!text-12 !-top-2.5 text-red-500"
              : "!text-12 !-top-2.5 text-red-500"
            : isActive
            ? "text-black"
            : "text-black/40",

          labelClass
        )}
      >
        {labelText}
      </label>
      {error && errorMessage && (
        <p className="text-13 mt-1 text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export { Input };

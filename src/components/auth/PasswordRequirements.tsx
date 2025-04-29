
interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  return (
    <div className="pt-2 text-sm">
      <ul className="space-y-1 text-muted-foreground list-disc pl-5">
        <li className={password.length >= 8 ? "text-green-500" : ""}>
          At least 8 characters long
        </li>
        <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
          Contains uppercase letter
        </li>
        <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
          Contains a number
        </li>
        <li className={/[!@#$%^&*]/.test(password) ? "text-green-500" : ""}>
          Contains special character (!@#$%^&*)
        </li>
      </ul>
    </div>
  );
};

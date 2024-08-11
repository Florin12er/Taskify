import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface FormSubmitProps {
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?:
    | "default"
    | "destructive"
    | "outline"
    | "outline"
    | "ghost"
    | "link"
    | "primary";
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant = "primary",
}: FormSubmitProps) => {
    const { pending } = useFormStatus();


    return (
        <Button
            type="submit"
            size={"sm"}
            variant={variant}
            disabled={disabled || pending}
            className={className}
        >
            {children}
        </Button>
    );
};


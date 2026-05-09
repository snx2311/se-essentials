import { cn } from "@/lib/utils";
import { Lock, Shield } from "lucide-react";

interface SecureBadgeProps {
  variant?: "transaction" | "encrypted" | "both";
  className?: string;
}

export function SecureBadge({ variant = "both", className }: SecureBadgeProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {(variant === "transaction" || variant === "both") && (
        <span className="badge-secure" data-ocid="secure.transaction_badge">
          <Shield size={11} />
          Verified Secure Transaction
        </span>
      )}
      {(variant === "encrypted" || variant === "both") && (
        <span className="badge-secure" data-ocid="secure.encrypted_badge">
          <Lock size={11} />
          End-to-End Encrypted
        </span>
      )}
    </div>
  );
}

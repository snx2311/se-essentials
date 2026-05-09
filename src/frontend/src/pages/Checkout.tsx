import { createActor } from "@/backend";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SecureBadge } from "@/components/SecureBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Lock, Package, Truck } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SHIPPING_CENTS = 1500n; // $15.00 flat

function centsToUSD(cents: bigint): string {
  return (Number(cents) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

const PAYMENT_METHODS = [
  { id: "Credit Card", label: "Credit Card", icon: CreditCard },
  { id: "Crypto", label: "Crypto", icon: Lock },
] as const;

export default function Checkout() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { items, total, updateQuantity, removeItem, clear } = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Credit Card" | "Crypto">(
    "Credit Card",
  );

  const subtotal = total();
  const grandTotal = subtotal + SHIPPING_CENTS;

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor || items.length === 0) throw new Error("No items in cart");
      if (!address.trim()) throw new Error("Shipping address required");
      const item = items[0];
      return actor.placeOrder(
        item.productId,
        BigInt(item.quantity),
        address.trim(),
        paymentMethod,
      );
    },
    onSuccess: () => {
      toast.success("Order placed successfully! Your items are on their way.");
      clear();
      navigate({ to: "/orders" });
    },
    onError: (err: Error) =>
      toast.error(
        err.message === "Shipping address required"
          ? err.message
          : "Failed to place order. Please try again.",
      ),
  });

  const isDisabled =
    items.length === 0 || !address.trim() || mutation.isPending;

  return (
    <div className="flex flex-col pb-24" data-ocid="checkout.page">
      {/* Sticky header */}
      <div className="sticky top-[57px] z-20 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Go back"
          data-ocid="checkout.back_button"
        >
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>
        <span className="font-display text-sm font-bold text-foreground">
          Secure Checkout
        </span>
        <Lock size={13} className="ml-auto text-muted-foreground" />
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* ---- Order Summary ---- */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
          data-ocid="checkout.order_summary"
        >
          <div className="flex items-center gap-2">
            <Package size={13} className="text-muted-foreground" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Order Summary
            </h2>
          </div>

          {items.length === 0 ? (
            <div
              className="flex flex-col items-center py-10 text-center rounded-[16px] border border-dashed border-border"
              data-ocid="checkout.empty_state"
            >
              <Package size={28} className="text-muted-foreground/40 mb-2" />
              <p className="text-sm font-semibold text-foreground">
                Your cart is empty
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Add items to continue checkout
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 rounded-lg text-xs"
                onClick={() => navigate({ to: "/" })}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="rounded-[16px] border border-border overflow-hidden">
              {items.map((item, i) => (
                <div
                  key={String(item.productId)}
                  className={`flex items-center gap-3 p-3 ${
                    i < items.length - 1 ? "border-b border-border" : ""
                  }`}
                  data-ocid={`checkout.order_item.${i + 1}`}
                >
                  {/* Thumbnail */}
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-[10px] bg-muted border border-border">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-xs font-bold text-muted-foreground/30">
                          SE
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    {item.cryptoPrice && (
                      <p className="text-[10px] text-muted-foreground">
                        {item.cryptoPrice}
                      </p>
                    )}
                    {/* Quantity controls */}
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-smooth text-xs"
                        data-ocid={`checkout.qty_decrease.${i + 1}`}
                      >
                        −
                      </button>
                      <span
                        className="text-xs font-semibold text-foreground w-4 text-center"
                        data-ocid={`checkout.qty.${i + 1}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            Math.min(5, item.quantity + 1),
                          )
                        }
                        className="flex h-5 w-5 items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted transition-smooth text-xs"
                        data-ocid={`checkout.qty_increase.${i + 1}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        className="ml-1 text-[10px] text-muted-foreground hover:text-foreground transition-smooth underline underline-offset-2"
                        data-ocid={`checkout.remove_item.${i + 1}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right shrink-0">
                    <span className="font-display text-sm font-bold text-foreground">
                      {centsToUSD(item.price * BigInt(item.quantity))}
                    </span>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-muted-foreground">
                        {centsToUSD(item.price)} each
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Price breakdown */}
              <div className="border-t border-border bg-muted/40 px-4 py-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {centsToUSD(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Truck size={10} />
                    Shipping (flat)
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {centsToUSD(SHIPPING_CENTS)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-border">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Total
                  </span>
                  <span className="font-display text-lg font-bold text-foreground">
                    {centsToUSD(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.section>

        {/* ---- Shipping Address ---- */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
          data-ocid="checkout.shipping_section"
        >
          <div className="flex items-center gap-2">
            <Truck size={13} className="text-muted-foreground" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Shipping Address
            </h2>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address" className="text-xs text-muted-foreground">
              Delivery Address
            </Label>
            <textarea
              id="address"
              placeholder={
                "Full address, city & postal code\ne.g. 42 Merchant St, Yangon, Myanmar 11181"
              }
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-[12px] border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-smooth"
              data-ocid="checkout.address_input"
            />
          </div>
        </motion.section>

        {/* ---- Payment Method ---- */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
          data-ocid="checkout.payment_section"
        >
          <div className="flex items-center gap-2">
            <CreditCard size={13} className="text-muted-foreground" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Payment Method
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => {
              const selected = paymentMethod === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPaymentMethod(id)}
                  className={`flex flex-col items-center gap-1.5 rounded-[16px] border py-4 text-xs font-semibold uppercase tracking-wider transition-smooth ${
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:border-foreground/40 hover:bg-muted/50"
                  }`}
                  data-ocid={`checkout.payment_method.${id.toLowerCase().replace(" ", "_")}`}
                >
                  <Icon size={16} strokeWidth={1.75} />
                  {label}
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* ---- Security ---- */}
        <SecureBadge variant="both" />

        {/* ---- Confirm ---- */}
        {mutation.isError && (
          <p
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive text-center"
            data-ocid="checkout.error_state"
          >
            Order failed. Please check your details and try again.
          </p>
        )}

        <Button
          type="button"
          disabled={isDisabled}
          onClick={() => mutation.mutate()}
          className="w-full rounded-[16px] py-6 text-sm font-bold uppercase tracking-widest"
          data-ocid="checkout.submit_button"
        >
          {mutation.isPending ? (
            <span className="flex items-center gap-2">
              <LoadingSpinner size="sm" />
              Placing Order…
            </span>
          ) : (
            `Confirm Order — ${centsToUSD(grandTotal)}`
          )}
        </Button>

        <p className="text-center text-[10px] text-muted-foreground">
          Encrypted Connection Active · Meta-Scrubbed
        </p>
      </div>
    </div>
  );
}

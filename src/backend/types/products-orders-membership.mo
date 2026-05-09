module {
  // --- Product ---
  public type Category = { #DigitalArt; #DesignerGoods };

  public type Product = {
    id : Nat;
    title : Text;
    description : Text;
    category : Category;
    price : Nat;             // USD cents
    cryptoPrice : ?Text;     // optional crypto amount string
    imageUrl : Text;
    rating : Nat;            // 0-5 (multiplied by 10 for one decimal, e.g. 45 = 4.5)
    reviewCount : Nat;
    inStock : Bool;
    tierRequired : MemberTier;
    distanceKm : Float;
  };

  // --- Order ---
  public type OrderStatus = { #Pending; #Processing; #Delivered; #Cancelled };

  public type Order = {
    id : Nat;
    buyer : Principal;
    productId : Nat;
    quantity : Nat;
    shippingAddress : Text;
    paymentMethod : Text;
    status : OrderStatus;
    createdAt : Int;
  };

  // --- Membership ---
  public type MemberTier = { #Standard; #Executive; #Elite };

  public type Membership = {
    user : Principal;
    tier : MemberTier;
  };
};

import Map "mo:core/Map";
import List "mo:core/List";
import Types "types/products-orders-membership";
import Common "types/common";

module {
  // Old Product type (from previous version — missing tierRequired and distanceKm)
  type OldCategory = { #DigitalArt; #DesignerGoods };
  type OldProduct = {
    id : Nat;
    title : Text;
    description : Text;
    category : OldCategory;
    price : Nat;
    cryptoPrice : ?Text;
    imageUrl : Text;
    rating : Nat;
    reviewCount : Nat;
    inStock : Bool;
  };
  type OldMemberTier = { #Standard; #Executive; #Elite };
  type OldOrderStatus = { #Pending; #Processing; #Delivered; #Cancelled };
  type OldOrder = {
    id : Nat;
    buyer : Principal;
    productId : Nat;
    quantity : Nat;
    shippingAddress : Text;
    paymentMethod : Text;
    status : OldOrderStatus;
    createdAt : Int;
  };

  type OldActor = {
    products : Map.Map<Common.ProductId, OldProduct>;
    wishlists : Map.Map<Principal, List.List<Common.ProductId>>;
    orders : Map.Map<Common.OrderId, OldOrder>;
    memberships : Map.Map<Principal, OldMemberTier>;
    adminPrincipal : { var value : ?Principal };
    state : { var nextProductId : Nat; var nextOrderId : Nat; var seeded : Bool };
  };

  type NewActor = {
    products : Map.Map<Common.ProductId, Types.Product>;
    wishlists : Map.Map<Principal, List.List<Common.ProductId>>;
    orders : Map.Map<Common.OrderId, Types.Order>;
    memberships : Map.Map<Principal, Types.MemberTier>;
    adminPrincipal : { var value : ?Principal };
    state : { var nextProductId : Nat; var nextOrderId : Nat; var seeded : Bool };
  };

  public func run(old : OldActor) : NewActor {
    let products = old.products.map<Common.ProductId, OldProduct, Types.Product>(
      func(_id, p) {
        {
          p with
          tierRequired = #Standard;
          distanceKm = 0.0;
        }
      }
    );
    {
      products;
      wishlists = old.wishlists;
      orders = old.orders;
      memberships = old.memberships;
      adminPrincipal = old.adminPrincipal;
      state = old.state;
    };
  };
};

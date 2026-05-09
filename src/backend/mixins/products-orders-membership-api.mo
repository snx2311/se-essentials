import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/products-orders-membership";
import Common "../types/common";
import Lib "../lib/products-orders-membership";

mixin (
  products : Map.Map<Common.ProductId, Types.Product>,
  wishlists : Map.Map<Principal, List.List<Common.ProductId>>,
  orders : Map.Map<Common.OrderId, Types.Order>,
  memberships : Map.Map<Principal, Types.MemberTier>,
  adminPrincipal : { var value : ?Principal },
  state : { var nextProductId : Nat; var nextOrderId : Nat; var seeded : Bool }
) {
  // ---- Seed on first deploy (called by actor init) ----

  func ensureSeeded() : () {
    if (not state.seeded) {
      Lib.seedSampleProducts(products, state);
      state.seeded := true;
    }
  };

  // ---- Product catalog ----

  public query func getProduct(id : Common.ProductId) : async ?Types.Product {
    Lib.getProduct(products, id)
  };

  public query func listProducts() : async [Types.Product] {
    Lib.listProducts(products)
  };

  // ---- Wishlist ----

  public query ({ caller }) func getWishlist() : async [Common.ProductId] {
    Lib.getWishlist(wishlists, caller)
  };

  public shared ({ caller }) func addToWishlist(productId : Common.ProductId) : async () {
    Lib.addToWishlist(wishlists, caller, productId)
  };

  public shared ({ caller }) func removeFromWishlist(productId : Common.ProductId) : async () {
    Lib.removeFromWishlist(wishlists, caller, productId)
  };

  // ---- Orders ----

  public shared ({ caller }) func placeOrder(
    productId : Common.ProductId,
    quantity : Nat,
    shippingAddress : Text,
    paymentMethod : Text
  ) : async Types.Order {
    Lib.placeOrder(orders, state, caller, productId, quantity, shippingAddress, paymentMethod)
  };

  public query ({ caller }) func listMyOrders() : async [Types.Order] {
    Lib.listOrdersByUser(orders, caller)
  };

  public query func getOrder(id : Common.OrderId) : async ?Types.Order {
    Lib.getOrder(orders, id)
  };

  // ---- Membership ----

  public query ({ caller }) func getMyMembership() : async Types.MemberTier {
    Lib.getMembership(memberships, caller)
  };

  public shared ({ caller }) func upgradeMembership(newTier : Types.MemberTier) : async () {
    Lib.upgradeMembership(memberships, caller, newTier)
  };

  // ---- Admin ----

  func assertAdmin(caller : Principal) {
    switch (adminPrincipal.value) {
      case (?admin) {
        if (not Principal.equal(caller, admin)) {
          Runtime.trap("Unauthorized: admin only")
        }
      };
      case null {
        // first caller becomes admin
        adminPrincipal.value := ?caller
      };
    }
  };

  public shared ({ caller }) func adminAddProduct(
    title : Text,
    description : Text,
    category : Types.Category,
    price : Nat,
    cryptoPrice : ?Text,
    imageUrl : Text,
    inStock : Bool,
    tierRequired : Types.MemberTier,
    distanceKm : Float
  ) : async Types.Product {
    assertAdmin(caller);
    Lib.addProduct(products, state, title, description, category, price, cryptoPrice, imageUrl, inStock, tierRequired, distanceKm)
  };

  public shared ({ caller }) func adminUpdateStock(
    id : Common.ProductId,
    inStock : Bool
  ) : async () {
    assertAdmin(caller);
    Lib.updateStock(products, id, inStock)
  };
};

import Map "mo:core/Map";
import List "mo:core/List";
import Types "types/products-orders-membership";
import Common "types/common";
import ProductsOrdersMembershipApi "mixins/products-orders-membership-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  let products = Map.empty<Common.ProductId, Types.Product>();
  let wishlists = Map.empty<Principal, List.List<Common.ProductId>>();
  let orders = Map.empty<Common.OrderId, Types.Order>();
  let memberships = Map.empty<Principal, Types.MemberTier>();
  let adminPrincipal = { var value : ?Principal = null };
  let state = { var nextProductId = 0; var nextOrderId = 0; var seeded = false };

  include ProductsOrdersMembershipApi(products, wishlists, orders, memberships, adminPrincipal, state);

  ensureSeeded();

  system func postupgrade() {
    ensureSeeded();
  };
};

import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Types "../types/products-orders-membership";
import Common "../types/common";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  // ---- Product helpers ----

  public func getProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId
  ) : ?Types.Product {
    products.get(id)
  };

  public func listProducts(
    products : Map.Map<Common.ProductId, Types.Product>
  ) : [Types.Product] {
    products.values().toArray()
  };

  public func addProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    state : { var nextProductId : Nat },
    title : Text,
    description : Text,
    category : Types.Category,
    price : Nat,
    cryptoPrice : ?Text,
    imageUrl : Text,
    inStock : Bool,
    tierRequired : Types.MemberTier,
    distanceKm : Float
  ) : Types.Product {
    let id = state.nextProductId;
    state.nextProductId += 1;
    let product : Types.Product = {
      id;
      title;
      description;
      category;
      price;
      cryptoPrice;
      imageUrl;
      rating = 0;
      reviewCount = 0;
      inStock;
      tierRequired;
      distanceKm;
    };
    products.add(id, product);
    product
  };

  public func updateStock(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
    inStock : Bool
  ) {
    switch (products.get(id)) {
      case (?p) { products.add(id, { p with inStock }) };
      case null {};
    }
  };

  public func seedSampleProducts(
    products : Map.Map<Common.ProductId, Types.Product>,
    state : { var nextProductId : Nat }
  ) {
    // 3 Digital Art
    ignore addProduct(products, state,
      "Void Signal #001",
      "A generative glitch-art piece exploring the liminal space between digital corruption and intentional design. 1-of-1 signed edition.",
      #DigitalArt, 85000, ?"0.031 ETH", "/assets/art1.jpg", true, #Elite, 2.5);

    ignore addProduct(products, state,
      "Obsidian Mirror Series IV",
      "High-contrast monochrome photography print rendered as an authenticated digital asset. Archival resolution, immutable provenance.",
      #DigitalArt, 120000, ?"0.044 ETH", "/assets/art2.jpg", true, #Elite, 4.7);

    ignore addProduct(products, state,
      "Recursive Bloom",
      "Algorithmic botanical study — a fractal-rendered bloom that evolves with each viewing context. Certified unique token.",
      #DigitalArt, 64000, ?"0.023 ETH", "/assets/art3.jpg", true, #Executive, 1.2);

    // 3 Designer Goods
    ignore addProduct(products, state,
      "Carbon-Weave Card Holder",
      "Ultra-thin RFID-shielded card holder crafted from aerospace-grade carbon fibre. Matte black finish. Holds 6 cards.",
      #DesignerGoods, 28900, null, "/assets/goods1.jpg", true, #Executive, 3.1);

    ignore addProduct(products, state,
      "Monolith Mechanical Pen",
      "CNC-machined stainless steel writing instrument with precision German nib. Matte black PVD coating. Limited run of 200.",
      #DesignerGoods, 47500, null, "/assets/goods2.jpg", true, #Standard, 0.8);

    ignore addProduct(products, state,
      "Cipher Leather Notebook",
      "Full-grain black leather journal with 192 GSM archival pages. Debossed minimal grid. Lay-flat binding. A5 format.",
      #DesignerGoods, 19900, null, "/assets/goods3.jpg", true, #Standard, 5.4);
  };

  // ---- Wishlist helpers ----

  public func getWishlist(
    wishlists : Map.Map<Principal, List.List<Common.ProductId>>,
    user : Principal
  ) : [Common.ProductId] {
    switch (wishlists.get(user)) {
      case (?list) { list.toArray() };
      case null { [] };
    }
  };

  public func addToWishlist(
    wishlists : Map.Map<Principal, List.List<Common.ProductId>>,
    user : Principal,
    productId : Common.ProductId
  ) {
    let list = switch (wishlists.get(user)) {
      case (?existing) { existing };
      case null {
        let fresh = List.empty<Common.ProductId>();
        wishlists.add(user, fresh);
        fresh
      };
    };
    // avoid duplicates
    if (not list.contains(productId)) {
      list.add(productId)
    }
  };

  public func removeFromWishlist(
    wishlists : Map.Map<Principal, List.List<Common.ProductId>>,
    user : Principal,
    productId : Common.ProductId
  ) {
    switch (wishlists.get(user)) {
      case (?list) {
        let filtered = list.filter(func(id) { id != productId });
        list.clear();
        list.append(filtered);
      };
      case null {};
    }
  };

  // ---- Order helpers ----

  public func placeOrder(
    orders : Map.Map<Common.OrderId, Types.Order>,
    state : { var nextOrderId : Nat },
    buyer : Principal,
    productId : Common.ProductId,
    quantity : Nat,
    shippingAddress : Text,
    paymentMethod : Text
  ) : Types.Order {
    let id = state.nextOrderId;
    state.nextOrderId += 1;
    let order : Types.Order = {
      id;
      buyer;
      productId;
      quantity;
      shippingAddress;
      paymentMethod;
      status = #Pending;
      createdAt = Time.now();
    };
    orders.add(id, order);
    order
  };

  public func getOrder(
    orders : Map.Map<Common.OrderId, Types.Order>,
    id : Common.OrderId
  ) : ?Types.Order {
    orders.get(id)
  };

  public func listOrdersByUser(
    orders : Map.Map<Common.OrderId, Types.Order>,
    user : Principal
  ) : [Types.Order] {
    orders.values().filter(func(o : Types.Order) : Bool { Principal.equal(o.buyer, user) }).toArray(
      
    )
  };

  // ---- Membership helpers ----

  public func getMembership(
    memberships : Map.Map<Principal, Types.MemberTier>,
    user : Principal
  ) : Types.MemberTier {
    switch (memberships.get(user)) {
      case (?tier) { tier };
      case null { #Standard };
    }
  };

  public func upgradeMembership(
    memberships : Map.Map<Principal, Types.MemberTier>,
    user : Principal,
    newTier : Types.MemberTier
  ) {
    memberships.add(user, newTier)
  };
};

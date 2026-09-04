/* =========================================================
   SLOW STUDIO DEMO 2.0
   DEMO STATE
   Browser only · No Supabase
========================================================= */

(() => {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const DEMO_MARKET =
    params
      .get("market")
      ?.toUpperCase() === "MY"
      ? "MY"
      : "SG";


  const MARKET = {

    SG: {
      code: "SG",
      country: "Singapore",
      currency: "SGD",
      symbol: "S$",
    },

    MY: {
      code: "MY",
      country: "Malaysia",
      currency: "MYR",
      symbol: "RM",
    },

  }[DEMO_MARKET];


  const STORAGE_KEY =
    `slow-studio-demo-2-${DEMO_MARKET.toLowerCase()}`;


  const clone = (value) =>
    JSON.parse(
      JSON.stringify(value)
    );


  const uid = (prefix = "demo") =>
    `${prefix}-${Date.now()}-${Math.random()
      .toString(16)
      .slice(2)}`;


  /* =========================================================
     SEED DATA
  ========================================================= */

  const seed = {

    navCollapsed: false,

    navGroups: {
      my_store: true,
      customers: true,
      marketing: false,
      design: false,
      business: false,
    },

    tab: "dashboard",


    /* =====================================================
       STORE
    ===================================================== */

    store: {

      name:
        DEMO_MARKET === "MY"
          ? "Mori Bakehouse Malaysia"
          : "Mori Bakehouse Singapore",

      country:
        MARKET.country,

      currency:
        MARKET.currency,

      email:
        DEMO_MARKET === "MY"
          ? "hello@moribakehouse.my"
          : "hello@moribakehouse.sg",

      phone:
        DEMO_MARKET === "MY"
          ? "+60 12-345 6789"
          : "+65 8123 4567",

      instagram:
        "@moribakehouse",

      description:
        "Small-batch bakes, made for slow mornings.",

      pickupNote:
        "Collection details will be sent after your order is confirmed.",

      paymentMethods:
        DEMO_MARKET === "MY"
          ? [
              "Touch 'n Go",
              "Bank Transfer",
              "Cash",
            ]
          : [
              "PayNow",
              "Bank Transfer",
              "Cash",
            ],

      orderingOpen: true,

    },


    /* =====================================================
       ORDERS
    ===================================================== */

    orders: [

      {
        id: "ORD-1005",

        customer_name:
          "Amanda Tan",

        customer_email:
          "amanda@example.com",

        customer_phone:
          "+65 8123 4567",

        total:
          DEMO_MARKET === "MY"
            ? 68
            : 22.4,

        payment_status:
          "paid",

        order_status:
          "confirmed",

        collection_date:
          "2026-09-06",

        collection_time:
          "11:00 AM - 12:00 PM",

        created_at:
          "2026-09-04T10:30:00",

        notes:
          "Less sweet if possible.",

        items: [
          {
            name:
              "Matcha Madeleines",
            quantity: 2,
            price:
              DEMO_MARKET === "MY"
                ? 21
                : 6.8,
          },

          {
            name:
              "Brown Butter Financier",
            quantity: 2,
            price:
              DEMO_MARKET === "MY"
                ? 13
                : 4.4,
          },
        ],

      },


      {
        id: "ORD-1004",

        customer_name:
          "Rachel Lim",

        customer_email:
          "rachel@example.com",

        customer_phone:
          "+65 8234 5678",

        total:
          DEMO_MARKET === "MY"
            ? 76
            : 24,

        payment_status:
          "submitted",

        order_status:
          "awaiting_confirmation",

        collection_date:
          "2026-09-06",

        collection_time:
          "2:00 PM - 3:00 PM",

        created_at:
          "2026-09-04T09:10:00",

        notes: "",

        items: [
          {
            name:
              "Weekend Cake Box",
            quantity: 1,
            price:
              DEMO_MARKET === "MY"
                ? 76
                : 24,
          },
        ],

      },


      {
        id: "ORD-1003",

        customer_name:
          "Chloe Ng",

        customer_email:
          "chloe@example.com",

        customer_phone:
          "+65 8345 6789",

        total:
          DEMO_MARKET === "MY"
            ? 42
            : 13.6,

        payment_status:
          "paid",

        order_status:
          "ready",

        collection_date:
          "2026-09-05",

        collection_time:
          "3:00 PM - 4:00 PM",

        created_at:
          "2026-09-03T18:45:00",

        notes: "",

        items: [
          {
            name:
              "Matcha Madeleines",
            quantity: 2,
            price:
              DEMO_MARKET === "MY"
                ? 21
                : 6.8,
          },
        ],

      },

    ],


    selectedOrderIds: [],

    expandedOrderIds: [],

    orderFilter: "all",

    orderSearch: "",

    bulkOrderMode: false,

    editingOrder: null,


    /* =====================================================
       PRODUCTS
    ===================================================== */

    menu: [

      {
        id: "demo-product-1",

        name:
          "Brown Butter Financier",

        category:
          "Bakes",

        price:
          DEMO_MARKET === "MY"
            ? 14
            : 4.5,

        stock: 12,

        low_stock_at: 4,

        visible: true,

        description:
          "Nutty, buttery and lightly caramelised.",

        is_bundle: false,

      },


      {
        id: "demo-product-2",

        name:
          "Matcha Madeleines",

        category:
          "Bakes",

        price:
          DEMO_MARKET === "MY"
            ? 21
            : 6.8,

        stock: 8,

        low_stock_at: 3,

        visible: true,

        description:
          "Soft madeleines with a gentle matcha finish.",

        is_bundle: false,

      },


      {
        id: "demo-product-3",

        name:
          "Weekend Cake Box",

        category:
          "Bundles",

        price:
          DEMO_MARKET === "MY"
            ? 76
            : 24,

        stock: 4,

        low_stock_at: 2,

        visible: true,

        description:
          "A weekend sharing box.",

        is_bundle: true,

      },

    ],


    productGroups: [],

    optionGroups: [],

    options: [],

    productOptionGroups: [],


    /* =====================================================
       PROMOS
    ===================================================== */

    promos: [

      {
        id: "promo-1",

        code:
          "FIRSTDROP",

        name:
          "First order treat",

        discount_type:
          "fixed",

        discount_value:
          DEMO_MARKET === "MY"
            ? 5
            : 1,

        minimum_spend: 0,

        usage_limit: 100,

        valid_until:
          "2026-12-31",

        active: true,
      },

    ],


    promoRedemptions: [],

    promoDraft: {

      code: "",

      discount_type:
        "fixed",

      discount_value: "",

      minimum_spend: "",

      usage_limit: "",

      valid_until: "",

      applicable_product_ids: [],

    },


    /* =====================================================
       REWARDS
    ===================================================== */

    loyaltySettings: {

      enabled: true,

      mode:
        "stamps",

      stamps_required: 8,

      reward_type:
        "fixed",

      reward_value:
        DEMO_MARKET === "MY"
          ? 10
          : 5,

    },


    customerLoyalty: {},

    loyaltyTransactions: [],


    /* =====================================================
       CUSTOMERS
    ===================================================== */

    customers: [

      {
        id: "customer-1",

        name:
          "Amanda Tan",

        email:
          "amanda@example.com",

        phone:
          "+65 8123 4567",

        orders: 4,

        spend:
          DEMO_MARKET === "MY"
            ? 280
            : 92.4,

        notes:
          "Prefers weekend collection.",

        marketing_email_opt_in:
          true,

        marketing_whatsapp_opt_in:
          true,
      },


      {
        id: "customer-2",

        name:
          "Rachel Lim",

        email:
          "rachel@example.com",

        phone:
          "+65 8234 5678",

        orders: 2,

        spend:
          DEMO_MARKET === "MY"
            ? 150
            : 48,

        notes: "",

        marketing_email_opt_in:
          true,

        marketing_whatsapp_opt_in:
          false,
      },

    ],


    customerNotes: {},

    selectedCustomerKey: null,


    /* =====================================================
       MESSAGES
    ===================================================== */

    messages: [

      {
        id:
          "message-1",

        customer:
          "Amanda Tan",

        order_id:
          "ORD-1005",

        channel:
          "WhatsApp",

        text:
          "Hi! Can I collect slightly earlier?",

        created_at:
          "2026-09-04T11:00:00",

        status:
          "unread",
      },

    ],


    messageDrafts: {},


    /* =====================================================
       NOTIFICATIONS
    ===================================================== */

    notificationSettings: {

      new_order_email:
        true,

      order_confirmation_email:
        true,

      ready_collection_email:
        true,

      low_stock:
        true,

      review_alert:
        true,

    },


    notificationTemplates: {

      order_confirmed: {
        subject:
          "Your order is confirmed",

        body:
          `Hi {customer_name},

Your order {order_id} has been confirmed.

Collection:
{collection_date}
{collection_time}

Thank you ♡`,
      },


      ready_collection: {
        subject:
          "Your order is ready for collection",

        body:
          `Hi {customer_name},

Your order {order_id} is ready for collection.

See you soon ♡`,
      },


      whatsapp_ready: {
        body:
          `Hi {customer_name} ♡

Your order {order_id} is ready for collection.

Collection:
{collection_date}
{collection_time}`,
      },

    },


    /* =====================================================
       AVAILABILITY
    ===================================================== */

    selectedAvailabilityDate:
      "2026-09-06",

    calendarMonth:
      "2026-09-01",

    availabilityMarket:
      DEMO_MARKET,

    weeklySchedule: [

      {
        day: 0,
        label: "Sunday",
        is_open: true,
        windows: [
          {
            range:
              "10:00 AM - 1:00 PM",
            capacity: 12,
          },
        ],
      },

      {
        day: 1,
        label: "Monday",
        is_open: false,
        windows: [],
      },

      {
        day: 2,
        label: "Tuesday",
        is_open: false,
        windows: [],
      },

      {
        day: 3,
        label: "Wednesday",
        is_open: false,
        windows: [],
      },

      {
        day: 4,
        label: "Thursday",
        is_open: false,
        windows: [],
      },

      {
        day: 5,
        label: "Friday",
        is_open: true,
        windows: [
          {
            range:
              "2:00 PM - 5:00 PM",
            capacity: 10,
          },
        ],
      },

      {
        day: 6,
        label: "Saturday",
        is_open: true,
        windows: [
          {
            range:
              "10:00 AM - 12:00 PM",
            capacity: 12,
          },
        ],
      },

    ],


    openingOverrides: [],

    availabilityDraft: null,


    /* =====================================================
       INVENTORY
    ===================================================== */

    inventory: [

      {
        id:
          "inventory-1",

        name:
          "Butter",

        unit:
          "g",

        quantity:
          2400,

        low_stock_at:
          800,

        supplier:
          "Demo Supplier",

        cost:
          DEMO_MARKET === "MY"
            ? 38
            : 12.5,

        pack_size:
          1000,
      },


      {
        id:
          "inventory-2",

        name:
          "Matcha",

        unit:
          "g",

        quantity:
          420,

        low_stock_at:
          150,

        supplier:
          "Demo Tea Supplier",

        cost:
          DEMO_MARKET === "MY"
            ? 280
            : 92,

        pack_size:
          500,
      },


      {
        id:
          "inventory-3",

        name:
          "Flour",

        unit:
          "g",

        quantity:
          5000,

        low_stock_at:
          1000,

        supplier:
          "Demo Supplier",

        cost:
          DEMO_MARKET === "MY"
            ? 14
            : 4.5,

        pack_size:
          1000,
      },

    ],


    inventoryReady:
      true,

    inventoryDraft:
      null,


    /* =====================================================
       RECIPES
    ===================================================== */

    recipes: [

      {
        id:
          "recipe-1",

        product_id:
          "demo-product-1",

        ingredients: [

          {
            inventory_id:
              "inventory-1",

            quantity:
              30,
          },

          {
            inventory_id:
              "inventory-3",

            quantity:
              35,
          },

        ],

      },


      {
        id:
          "recipe-2",

        product_id:
          "demo-product-2",

        ingredients: [

          {
            inventory_id:
              "inventory-1",

            quantity:
              28,
          },

          {
            inventory_id:
              "inventory-2",

            quantity:
              3,
          },

          {
            inventory_id:
              "inventory-3",

            quantity:
              32,
          },

        ],

      },

    ],


    recipeProductId: null,

    recipeDraftProductId: null,

    recipeDraft: null,

    recipeDirty: false,

    recipeZeroCost: false,

    costingMarket:
      DEMO_MARKET,


    /* =====================================================
       REVIEWS
    ===================================================== */

    reviews: [

      {
        id:
          "review-1",

        customer:
          "Amanda Tan",

        rating:
          5,

        comment:
          "Loved the madeleines — soft and buttery!",

        reply: "",

        status:
          "published",

        created_at:
          "2026-09-03T12:00:00",
      },


      {
        id:
          "review-2",

        customer:
          "Rachel Lim",

        rating:
          4,

        comment:
          "The cake box was lovely for sharing.",

        reply:
          "Thank you so much ♡",

        status:
          "published",

        created_at:
          "2026-09-02T14:00:00",
      },

    ],


    /* =====================================================
       MARKETING
    ===================================================== */

    marketingSearch: "",

    marketingSelectedEmails: [],

    marketingSelectedPhones: [],

    marketingManualContacts: [],

    marketingContactDraft: {

      customer_name: "",

      customer_email: "",

      customer_phone: "",

      marketing_email_opt_in:
        true,

      marketing_whatsapp_opt_in:
        false,

    },

    marketingSendBusy:
      false,

    marketingSendProgress:
      "",


    /* =====================================================
       FAQ
    ===================================================== */

    faq: [

      {
        id:
          "faq-1",

        question:
          "How do I place an order?",

        answer:
          "Select your items, choose a collection slot and complete the order form.",

        visible:
          true,
      },


      {
        id:
          "faq-2",

        question:
          "Where is collection?",

        answer:
          "Collection details will be shared after confirmation.",

        visible:
          true,
      },

    ],


    /* =====================================================
       DESIGN
    ===================================================== */

    settings: {

      theme:
        "warm",

      primary_color:
        "#6F5DE7",

      background_color:
        "#F5F2FB",

      heading_font:
        "Fraunces",

      body_font:
        "Work Sans",

      banner_heading:
        "Welcome to our store",

      banner_subtitle:
        "Small-batch bakes, made with care.",

      banner_button:
        "Shop Now",

      announcement:
        "",

    },


    settingsDraft:
      null,

    settingsSection:
      "welcome",


    /* =====================================================
       SUPPLIERS
    ===================================================== */

    suppliers: [

      {
        id:
          "supplier-1",

        name:
          "Demo Tea Supplier",

        email:
          "tea@example.com",

        phone:
          "+65 9000 0001",

        notes:
          "Matcha and tea ingredients.",
      },


      {
        id:
          "supplier-2",

        name:
          "Demo Baking Supplier",

        email:
          "baking@example.com",

        phone:
          "+65 9000 0002",

        notes:
          "Butter, flour and packaging.",
      },

    ],


    supplierDraft:
      null,


    /* =====================================================
       WHOLESALE
    ===================================================== */

    wholesaleItems: [

      {
        id:
          "wholesale-1",

        product:
          "Matcha Madeleines",

        minimum_quantity:
          20,

        wholesale_price:
          DEMO_MARKET === "MY"
            ? 16
            : 5.2,

        active:
          true,
      },

    ],


    wholesaleDraft:
      null,


    /* =====================================================
       INSPIRATION
    ===================================================== */

    inspirationIdeas: [

      {
        id:
          "idea-1",

        title:
          "Weekend tea pairing box",

        note:
          "Pair one baked item with one tea recommendation.",

        pinned:
          true,
      },


      {
        id:
          "idea-2",

        title:
          "Corporate gifting",

        note:
          "Simple bulk gifting package for offices.",

        pinned:
          false,
      },

    ],


    ideaDraft:
      null,

    quickIdea:
      "",


    /* =====================================================
       TEAM
    ===================================================== */

    teamMembers: [

      {
        id:
          "team-1",

        name:
          "Demo Owner",

        role:
          "Owner",

        email:
          "owner@example.com",

        active:
          true,
      },


      {
        id:
          "team-2",

        name:
          "Demo Assistant",

        role:
          "Team Member",

        email:
          "team@example.com",

        active:
          true,
      },

    ],


    currentUser: {
      name:
        "Demo Owner",

      role:
        "Owner",
    },


    currentTeamMember:
      null,

    teamDraft:
      null,

    editingTeamId:
      null,

    teamSection:
      "team",


    /* =====================================================
       ACTIVITY
    ===================================================== */

    activityLog: [

      {
        id:
          "activity-1",

        text:
          "Demo workspace opened",

        created_at:
          new Date()
            .toISOString(),
      },


      {
        id:
          "activity-2",

        text:
          "ORD-1005 confirmed",

        created_at:
          "2026-09-04T10:45:00",
      },

    ],


    /* =====================================================
       DASHBOARD
    ===================================================== */

    analyticsPeriod:
      "monthly",

    salesFrom:
      "",

    salesTo:
      "",

    dashboardRefreshing:
      false,

    dashboardLastUpdated:
      new Date(),

    dashboardFocusTarget:
      null,


    /* =====================================================
       OTHER
    ===================================================== */

    whatsappError:
      null,

    customerEmailSendingId:
      null,

    loading:
      false,

    loadError:
      null,

  };


  /* =========================================================
     LOAD
  ========================================================= */

  function load() {

    try {

      const saved =
        JSON.parse(
          localStorage.getItem(
            STORAGE_KEY
          ) || "null"
        );


      if (!saved) {

        return clone(seed);

      }


      return {

        ...clone(seed),

        ...saved,

        store: {

          ...clone(seed.store),

          ...(saved.store || {}),

          country:
            MARKET.country,

          currency:
            MARKET.currency,

        },

        settings: {

          ...clone(seed.settings),

          ...(saved.settings || {}),

        },

        notificationSettings: {

          ...clone(
            seed.notificationSettings
          ),

          ...(saved.notificationSettings ||
            {}),

        },

      };

    } catch (error) {

      console.warn(
        "Could not load demo state:",
        error
      );

      return clone(seed);

    }

  }


  let state =
    load();


  /* =========================================================
     SAVE
  ========================================================= */

  function save() {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
      );

    } catch (error) {

      console.warn(
        "Could not save demo state:",
        error
      );

    }

  }


  /* =========================================================
     RESET
  ========================================================= */

  function reset() {

    state =
      clone(seed);

    save();

    window.location.reload();

  }


  /* =========================================================
     UPDATE
  ========================================================= */

  function patch(
    key,
    value
  ) {

    state[key] =
      value;

    save();

  }


  function addActivity(text) {

    state.activityLog.unshift({

      id:
        uid("activity"),

      text,

      created_at:
        new Date()
          .toISOString(),

    });


    state.activityLog =
      state.activityLog
        .slice(0, 50);


    save();

  }


  /* =========================================================
     MONEY
  ========================================================= */

  function money(value) {

    const currency =
      MARKET.currency;

    const locale =
      DEMO_MARKET === "MY"
        ? "en-MY"
        : "en-SG";


    return new Intl.NumberFormat(
      locale,
      {
        style:
          "currency",

        currency,
      }
    ).format(
      Number(value || 0)
    );

  }


  /* =========================================================
     PUBLIC API
  ========================================================= */

  window.SlowStudioDemo = {

    get state() {
      return state;
    },

    get market() {
      return DEMO_MARKET;
    },

    get marketConfig() {
      return MARKET;
    },

    save,

    reset,

    patch,

    addActivity,

    money,

    uid,

    clone,

  };

})();

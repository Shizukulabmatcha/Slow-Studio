/* =========================================================
   SLOW STUDIO ADMIN — DEMO EDITION

   Based on Shizuku Lab Admin
   Browser only
   No Supabase
========================================================= */


/* =========================================================
   MARKET
========================================================= */

const ADMIN_WORKSPACE_MARKET =
  new URLSearchParams(
    window.location.search
  ).get("market") === "MY"
    ? "MY"
    : "SG";


const ADMIN_CUSTOMER_SHOP_URL =
  ADMIN_WORKSPACE_MARKET === "MY"
    ? "/shop?market=MY"
    : "/shop?market=SG";


/* =========================================================
   DEMO STATE

   state.js must load BEFORE this file
========================================================= */

if (!window.SlowStudioDemo) {
  throw new Error(
    "SlowStudioDemo state is missing. Load state.js before demo-admin.js."
  );
}


const astate =
  SlowStudioDemo.state;


/* =========================================================
   MAKE SURE ADMIN-ONLY STATE EXISTS
========================================================= */

astate.unlocked = true;

astate.welcomePending ??= false;
astate.welcomeTimer ??= null;

astate.navCollapsed ??= false;

astate.navGroups ??= {
  my_store: true,
  customers: true,
  marketing: false,
  design: false,
  business: false,
};

astate.navScrollTop ??= 0;

astate.tab ??= "dashboard";

astate.realtimeChannel ??= null;
astate.newOrderAlert ??= null;

astate.expandedPromoCode ??= null;
astate.editingPromoId ??= null;

astate.loyaltyDraft ??=
  astate.loyaltySettings
    ? { ...astate.loyaltySettings }
    : null;

astate.notificationDraft ??=
  astate.notificationSettings
    ? { ...astate.notificationSettings }
    : null;

astate.settingsDraft ??=
  astate.settings
    ? { ...astate.settings }
    : {};

astate.selectedCustomerKey ??= null;

astate.selectedAvailabilityDate ??=
  localDateText(
    new Date()
  );

astate.availabilityMarket ??=
  ADMIN_WORKSPACE_MARKET;

astate.settingsSection ??=
  "welcome";

astate.availabilityDraft ??=
  null;

astate.offlineOrderDraft ??=
  null;

astate.salesFrom ??= "";
astate.salesTo ??= "";

astate.analyticsPeriod ??=
  "monthly";

astate.calendarMonth ??=
  astate.selectedAvailabilityDate
    .slice(0, 7) + "-01";

astate.orderFilter ??=
  "all";

astate.orderSearch ??=
  "";

astate.expandedOrderIds ??=
  [];

astate.selectedOrderIds ??=
  [];

astate.bulkOrderMode ??=
  false;

astate.inventoryReady ??=
  true;

astate.inventoryDraft ??=
  null;

astate.recipeProductId ??=
  null;

astate.recipeDraftProductId ??=
  null;

astate.recipeDraft ??=
  null;

astate.recipeDirty ??=
  false;

astate.recipeZeroCost ??=
  false;

astate.costingMarket ??=
  ADMIN_WORKSPACE_MARKET;

astate.marketingSearch ??=
  "";

astate.marketingSelectedEmails ??=
  [];

astate.marketingSelectedPhones ??=
  [];

astate.marketingSendBusy ??=
  false;

astate.marketingSendProgress ??=
  "";

astate.marketingAttachmentUploading ??=
  false;

astate.teamDraft ??=
  null;

astate.editingTeamId ??=
  null;

astate.teamSection ??=
  "team";

astate.supplierDraft ??=
  null;

astate.wholesaleDraft ??=
  null;

astate.ideaDraft ??=
  null;

astate.quickIdea ??=
  "";

astate.editingOrder ??=
  null;

astate.loading =
  false;

astate.loadError =
  null;

astate.dashboardRefreshing ??=
  false;

astate.dashboardLastUpdated ??=
  new Date();

astate.dashboardFocusTarget ??=
  null;

astate.whatsappError ??=
  null;

astate.editing ??=
  null;

astate.customerEmailSendingId ??=
  null;


/* =========================================================
   SAVE DEMO
========================================================= */

function saveDemo() {
  SlowStudioDemo.save();
}


/* =========================================================
   MONEY
========================================================= */

function money(n) {

  const currency =
    ADMIN_WORKSPACE_MARKET === "MY"
      ? "MYR"
      : String(
          astate.settings?.store_currency ||
          astate.store?.currency ||
          "SGD"
        ).toUpperCase();


  const locale =
    currency === "MYR"
      ? "en-MY"
      : currency === "CNY"
        ? "zh-CN"
        : "en-SG";


  try {

    return new Intl.NumberFormat(
      locale,
      {
        style: "currency",
        currency,
      }
    ).format(
      Number(n || 0)
    );

  } catch (_) {

    return `${currency} ${Number(
      n || 0
    ).toFixed(2)}`;

  }
}


function marketMoney(
  n,
  market =
    astate.costingMarket
) {

  const currency =
    market === "MY"
      ? "MYR"
      : "SGD";


  return new Intl.NumberFormat(
    market === "MY"
      ? "en-MY"
      : "en-SG",
    {
      style: "currency",
      currency,
    }
  ).format(
    Number(n || 0)
  );
}


/* =========================================================
   BUNDLE PRICING

   Same logic as Shizuku Lab Admin
========================================================= */

function bundleStartingPriceAdmin(
  bundle
) {

  if (
    String(
      bundle?.bundle_pricing_mode ||
      "fixed"
    ) !== "sum_selected"
  ) {

    return Number(
      bundle?.discount_price ||
      bundle?.price ||
      0
    );

  }


  const allowedIds =
    Array.isArray(
      bundle?.bundle_product_ids
    )
      ? bundle.bundle_product_ids
          .map(String)
      : [];


  const choices =
    (astate.menu || [])
      .filter(
        product =>
          !product.is_bundle &&
          (
            !allowedIds.length ||
            allowedIds.includes(
              String(product.id)
            )
          )
      );


  const overrides =
    bundle?.bundle_option_prices &&
    typeof bundle
      .bundle_option_prices ===
      "object"
      ? bundle.bundle_option_prices
      : {};


  const prices =
    choices.map(
      product => {

        const override =
          Number(
            overrides[
              String(product.id)
            ]
          );


        return (
          Number.isFinite(
            override
          ) &&
          override >= 0
        )
          ? override
          : Number(
              product.discount_price ||
              product.price ||
              0
            );

      }
    );


  return (
    Number(
      bundle?.price || 0
    ) +
    (
      prices.length
        ? Math.min(...prices) * 2
        : 0
    )
  );
}


function bundleDisplayFromPriceAdmin(
  bundle
) {

  const saved =
    Number(
      bundle
        ?.bundle_display_from_price
    );


  return (
    Number.isFinite(saved) &&
    saved >= 0
  )
    ? saved
    : bundleStartingPriceAdmin(
        bundle
      );
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

  return String(
    value ?? ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}


/* =========================================================
   ORDER STATUS

   Same wording as Shizuku Lab Admin
========================================================= */

const PAY_LABEL = {

  awaiting_payment:
    "Awaiting payment",

  submitted:
    "Payment sent — pending confirmation",

  rejected:
    "Payment proof rejected",

  paid:
    "Paid",

};


const PAY_COLOR = {

  awaiting_payment:
    "#B78A2E",

  submitted:
    "#B78A2E",

  rejected:
    "#B33333",

  paid:
    "#4B5D3A",

};


const ORDER_LABEL = {

  pending:
    "Pending",

  awaiting_confirmation:
    "Awaiting confirmation",

  confirmed:
    "Confirmed",

  preparing:
    "Preparing",

  ready:
    "Ready for collection",

  collected:
    "Collected",

  cancelled:
    "Cancelled",

};


const ORDER_COLOR = {

  cancelled:
    "#B33333",

  preparing:
    "#A36D1E",

  ready:
    "#267A47",

};


/* =========================================================
   MARKETING DEFAULTS
========================================================= */

const DEFAULT_MARKETING_EMAIL_SUBJECT =
  "September Opening Dates + A Little Treat 🍵";


const DEFAULT_MARKETING_EMAIL_BODY =
`Hi there ♡

Our September opening dates are here

You can find our available collection dates and timings in the calendar attached. For the latest availability or any schedule updates, please refer to our ordering page.

And a little update for this month — we’re retiring our previous promo code and changing it to:

FIRSTDROP

Use FIRSTDROP to enjoy a little treat on your order ✨

One-time use per customer.

Thank you for supporting our little store ♡`;


const DEFAULT_MARKETING_WHATSAPP_BODY =
`Hi {customer_name} ♡

Our opening dates are here.

Please check our ordering page for the latest collection dates and timings.

Use FIRSTDROP to enjoy a little treat on your order ✨

Thank you for supporting us ♡`;


/* =========================================================
   DATE
========================================================= */

function localDateText(
  date
) {

  const y =
    date.getFullYear();

  const m =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const d =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  return `${y}-${m}-${d}`;
}


/* =========================================================
   AVAILABILITY
========================================================= */

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];


function weeklySchedule() {

  /*
   Demo State already contains
   the weekly schedule.
  */

  if (
    Array.isArray(
      astate.weeklySchedule
    ) &&
    astate.weeklySchedule
      .length === 7
  ) {

    return astate.weeklySchedule;

  }


  const schedule =
    WEEKDAYS.map(
      (label, day) => ({

        day,

        label,

        is_open:
          day === 0 ||
          day === 6,

        windows:
          day === 0
            ? [
                {
                  range:
                    "10:00 AM - 1:00 PM",

                  capacity:
                    null,
                },
              ]

            : day === 6
              ? [
                  {
                    range:
                      "10:00 AM - 12:00 PM",

                    capacity:
                      null,
                  },
                ]

              : [],

      })
    );


  astate.weeklySchedule =
    schedule;

  saveDemo();

  return schedule;
}


function weeklyAvailability(
  dateText
) {

  const date =
    new Date(
      `${dateText}T12:00:00`
    );


  const schedule =
    weeklySchedule();


  const day =
    schedule.find(
      item =>
        Number(item.day) ===
        date.getDay()
    );


  const windows =
    Array.isArray(
      day?.windows
    )
      ? day.windows
      : [];


  return {

    is_open:
      !!day?.is_open,

    collection_time:
      windows
        .map(
          item =>
            item.range
        )
        .filter(Boolean)
        .join(" | "),

    pickup_windows:
      windows,

  };
}


function availabilityForDate(
  dateText
) {

  const override =
    (astate.openingOverrides || [])
      .find(
        item =>
          item.collection_date ===
            dateText &&
          String(
            item.market_code ||
            ADMIN_WORKSPACE_MARKET
          ) ===
          astate.availabilityMarket
      );


  if (override) {

    return {

      is_open:
        !!override.is_open,

      collection_time:
        override.collection_time ||
        "",

      pickup_windows:
        Array.isArray(
          override.pickup_windows
        )
          ? override.pickup_windows

          : availabilityRanges(
              override
                .collection_time
            )
              .filter(Boolean)
              .map(
                range => ({
                  range,
                  capacity:
                    null,
                })
              ),

      override:
        true,

    };

  }


  return {

    ...weeklyAvailability(
      dateText
    ),

    override:
      false,

  };
}


function setAvailabilityDraft(
  dateText
) {

  astate
    .selectedAvailabilityDate =
    dateText;


  const value =
    availabilityForDate(
      dateText
    );


  astate.availabilityDraft = {

    collection_date:
      dateText,

    is_open:
      value.is_open,

    collection_time:
      value.collection_time,

    pickup_windows:
      (
        value.pickup_windows ||
        []
      ).map(
        item => ({
          ...item,
        })
      ),

  };

}


function selectAvailabilityDate(
  dateText
) {

  setAvailabilityDraft(
    dateText
  );

  saveDemo();

  render();

}


function setAvailabilityMarket(
  market
) {

  astate.availabilityMarket =
    market === "MY"
      ? "MY"
      : "SG";


  setAvailabilityDraft(
    astate
      .selectedAvailabilityDate ||
    localDateText(
      new Date()
    )
  );


  saveDemo();

  render();

}


function changeCalendarMonth(
  amount
) {

  const current =
    new Date(
      `${astate.calendarMonth}T12:00:00`
    );


  current.setMonth(
    current.getMonth() +
    Number(amount || 0)
  );


  astate.calendarMonth =
    `${current.getFullYear()}-${String(
      current.getMonth() + 1
    ).padStart(
      2,
      "0"
    )}-01`;


  saveDemo();

  render();

}


function onAvailabilityField(
  key,
  value
) {

  if (
    !astate.availabilityDraft
  ) {
    return;
  }


  astate
    .availabilityDraft[
      key
    ] =
    value;

}


function availabilityRanges(
  value
) {

  const text =
    String(
      value || ""
    );


  if (!text.trim()) {

    return [""];

  }


  return text
    .split("|")
    .map(
      item =>
        item.trim()
    );

}


function setWeeklyDayOpen(
  day,
  value
) {

  const row =
    weeklySchedule()
      .find(
        item =>
          Number(item.day) ===
          Number(day)
      );


  if (!row) {
    return;
  }


  row.is_open =
    !!value;


  if (
    row.is_open &&
    !row.windows.length
  ) {

    row.windows = [

      {
        range:
          "10:00 AM - 12:00 PM",

        capacity:
          null,
      },

    ];

  }


  saveDemo();

  render();

}


function setWeeklyWindow(
  day,
  index,
  key,
  value
) {

  const row =
    weeklySchedule()
      .find(
        item =>
          Number(item.day) ===
          Number(day)
      );


  if (
    !row?.windows?.[
      index
    ]
  ) {
    return;
  }


  row.windows[
    index
  ][key] =
    key === "capacity"
      ? (
          value === ""
            ? null
            : Math.max(
                1,
                Number(
                  value || 1
                )
              )
        )
      : value;


  saveDemo();

}


function addWeeklyWindow(
  day
) {

  const row =
    weeklySchedule()
      .find(
        item =>
          Number(item.day) ===
          Number(day)
      );


  if (!row) {
    return;
  }


  row.windows.push({

    range: "",

    capacity:
      null,

  });


  saveDemo();

  render();

}


function removeWeeklyWindow(
  day,
  index
) {

  const row =
    weeklySchedule()
      .find(
        item =>
          Number(item.day) ===
          Number(day)
      );


  if (!row) {
    return;
  }


  row.windows.splice(
    index,
    1
  );


  saveDemo();

  render();

}


function specialWindows() {

  const draft =
    astate.availabilityDraft;


  if (!draft) {

    return [];

  }


  if (
    !Array.isArray(
      draft.pickup_windows
    )
  ) {

    draft.pickup_windows =
      availabilityRanges(
        draft.collection_time
      ).map(
        range => ({
          range,
          capacity:
            null,
        })
      );

  }


  return draft
    .pickup_windows;

}


function setAvailabilityRange(
  index,
  value
) {

  const windows =
    specialWindows();


  if (!windows[index]) {

    windows[index] = {

      range: "",

      capacity:
        null,

    };

  }


  windows[index].range =
    value;


  astate
    .availabilityDraft
    .collection_time =
    windows
      .map(
        item =>
          item.range
      )
      .join(" | ");

}


function setAvailabilityCapacity(
  index,
  value
) {

  const windows =
    specialWindows();


  if (!windows[index]) {
    return;
  }


  windows[
    index
  ].capacity =
    value === ""
      ? null
      : Math.max(
          1,
          Number(
            value || 1
          )
        );

}


function addAvailabilityRange() {

  const windows =
    specialWindows();


  windows.push({

    range: "",

    capacity:
      null,

  });


  astate
    .availabilityDraft
    .collection_time =
    windows
      .map(
        item =>
          item.range
      )
      .join(" | ");


  render();

}


function removeAvailabilityRange(
  index
) {

  const windows =
    specialWindows();


  windows.splice(
    index,
    1
  );


  if (!windows.length) {

    windows.push({

      range: "",

      capacity:
        null,

    });

  }


  astate
    .availabilityDraft
    .collection_time =
    windows
      .map(
        item =>
          item.range
      )
      .join(" | ");


  render();

}


/* =========================================================
   SAVE SPECIAL CALENDAR DAY
   DEMO VERSION — NO SUPABASE
========================================================= */

async function saveAvailabilityOverride() {

  const entry =
    astate.availabilityDraft;


  if (
    !entry ||
    !entry.collection_date
  ) {
    return;
  }


  const button =
    document.getElementById(
      "availability-save-btn"
    );


  if (button) {

    button.textContent =
      "Saving…";

    button.disabled =
      true;

  }


  const pickupWindows =
    specialWindows()
      .filter(
        item =>
          String(
            item.range || ""
          ).trim()
      )
      .map(
        item => ({

          range:
            String(
              item.range
            ).trim(),

          capacity:
            item.capacity ==
            null
              ? null
              : Math.max(
                  1,
                  Number(
                    item.capacity
                  )
                ),

        })
      );


  const cleanWindows =
    pickupWindows
      .map(
        item =>
          item.range
      )
      .join(" | ");


  const payload = {

    id:
      `availability-${entry.collection_date}-${astate.availabilityMarket}`,

    market_code:
      astate
        .availabilityMarket,

    collection_date:
      entry.collection_date,

    is_open:
      !!entry.is_open,

    collection_time:
      entry.is_open
        ? cleanWindows
        : null,

    pickup_windows:
      entry.is_open
        ? pickupWindows
        : [],

  };


  astate.openingOverrides =
    [
      ...(
        astate
          .openingOverrides ||
        []
      ).filter(
        item =>
          !(
            item.collection_date ===
              payload.collection_date &&
            String(
              item.market_code ||
              "SG"
            ) ===
              String(
                payload.market_code
              )
          )
      ),

      payload,

    ];


  saveDemo();


  setAvailabilityDraft(
    payload.collection_date
  );


  if (button) {

    button.textContent =
      "Save day";

    button.disabled =
      false;

  }


  render();

}


/* =========================================================
   CLEAR SPECIAL CALENDAR DAY
========================================================= */

async function clearAvailabilityOverride() {

  const dateText =
    astate
      .selectedAvailabilityDate;


  const existing =
    (
      astate
        .openingOverrides ||
      []
    ).find(
      item =>
        item.collection_date ===
          dateText &&
        String(
          item.market_code ||
          "SG"
        ) ===
          astate
            .availabilityMarket
    );


  if (!existing) {

    return;

  }


  if (
    !confirm(
      "Remove this special calendar setting and use the normal weekly hours again?"
    )
  ) {

    return;

  }


  astate.openingOverrides =
    astate
      .openingOverrides
      .filter(
        item =>
          item.id !==
          existing.id
      );


  saveDemo();


  setAvailabilityDraft(
    dateText
  );


  render();

}


/* =========================================================
   LOAD ALL
   DEMO VERSION

   No database request.
========================================================= */

async function loadAll(
  options = {}
) {

  const silent =
    !!options.silent;


  if (!silent) {

    astate.loading =
      true;

    astate.loadError =
      null;

    render();

  }


  /*
   State already came from
   state.js / localStorage.
  */

  astate.settingsDraft = {

    ...(astate.settings ||
      {}),

  };


  astate.loyaltyDraft =
    astate.loyaltySettings
      ? {
          ...astate
            .loyaltySettings,
        }
      : null;


  astate.notificationDraft =
    astate
      .notificationSettings
      ? {
          ...astate
            .notificationSettings,
        }
      : null;


  if (
    !astate
      .selectedAvailabilityDate
  ) {

    astate
      .selectedAvailabilityDate =
      localDateText(
        new Date()
      );

  }


  if (
    !astate.calendarMonth
  ) {

    astate.calendarMonth =
      astate
        .selectedAvailabilityDate
        .slice(
          0,
          7
        ) +
      "-01";

  }


  setAvailabilityDraft(
    astate
      .selectedAvailabilityDate
  );


  astate.loading =
    false;


  astate
    .dashboardLastUpdated =
    new Date();


  saveDemo();

  render();

}


/* =========================================================
   REFRESH DASHBOARD
========================================================= */

async function refreshDashboard() {

  if (
    astate
      .dashboardRefreshing
  ) {

    return;

  }


  astate
    .dashboardRefreshing =
    true;


  astate.loadError =
    null;


  render();


  try {

    await loadAll({
      silent: true,
    });

  } finally {

    astate
      .dashboardRefreshing =
      false;


    astate
      .dashboardLastUpdated =
      new Date();


    saveDemo();

    render();

  }

}

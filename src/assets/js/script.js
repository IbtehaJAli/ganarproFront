// sidebar
$(".wrapper__sidebar__header__hamburger > svg").on("click", function (e) {
  e.preventDefault();
  $(".wrapper__backdrop").fadeIn("fast");
  $(".wrapper__menu").fadeIn("fast");
});

$(".wrapper__backdrop").on("click", function (e) {
  e.preventDefault();
  $(this).fadeOut("fast");
  $(".wrapper__menu").fadeOut("fast");
});

$("svg.menu_close").on("click", function (e) {
  e.preventDefault();
  $(".wrapper__backdrop").fadeOut("fast");
  $(".wrapper__menu").fadeOut("fast");
});

// search box
$(".search-box-input").on("click", function (e) {
  e.preventDefault();
  $(".input-group").hide();
  $(".wrapper__main__header__search").fadeIn("fast");
  $(".search_box").focus();
  // e.stopPropagation();
});

$(".project_search").on("click", function (e) {
  e.preventDefault();
  $(this).parent(".input").hide();
  $(".project_search_main").fadeIn("fast");
  $(".search_project").focus();
  // e.stopPropagation();
});

$(".close-search").on("click", function (e) {
  e.preventDefault();
  $(".input-group").show();
  $(".wrapper__main__header__search").fadeOut("fast");
});

$("#notification-icon").on("click", function (e) {
  e.preventDefault();
  $(".notification__box").fadeIn("fast");
  // e.stopPropagation();
});

$("#profile-icon").on("click", function (e) {
  e.preventDefault();
  $(".profile_box").fadeIn("fast");
  // e.stopPropagation();
});

$("#bar-link").on("click", function (e) {
  e.preventDefault();
  $(".territory").fadeIn("fast");
});

$(".submenu-one").on("click", function (e) {
  e.preventDefault();
  $(this).children(".menu-box").fadeIn("fast");
});
$(".submenu-two").on("click", function (e) {
  e.preventDefault();
  $(this).children(".menu-box").fadeIn("fast");
});
$(".submenu-three").on("click", function (e) {
  e.preventDefault();
  $(this).children(".menu-box").fadeIn("fast");
});

$(".updated-btn").on("click", function (e) {
  e.preventDefault();
  $(".project-box-menu-list").fadeIn("fast");
});

$("body").on("click", function (e) {
  if (
    $(e.target).closest(".notification__box").get(0) == null &&
    e.target.id !== "notification-icon"
  ) {
    if ($(".notification__box").is(":visible")) {
      $(".notification__box").fadeOut("fast");
    }
  }
  if (
    $(e.target).closest(".profile_box").get(0) == null &&
    e.target.id !== "profile-icon"
  ) {
    if ($(".profile_box").is(":visible")) {
      $(".profile_box").fadeOut("fast");
    }
  }

  if (
    $(e.target).closest(".territory").get(0) == null &&
    e.target.id !== "bar-link"
  ) {
    if ($(".territory").is(":visible")) {
      $(".territory").fadeOut("fast");
    }
  }
  if (
    $(e.target).closest(".wrapper__main__header__search").get(0) == null &&
    !e.target.classList.contains("search-box-input")
  ) {
    if ($(".wrapper__main__header__search").is(":visible")) {
      $(".input-group").show();
      $(".wrapper__main__header__search").fadeOut("fast");
    }
  }

  if (
    $(e.target).closest(".project_search_main").get(0) == null &&
    !e.target.classList.contains("project_search")
  ) {
    if ($(".project_search_main").is(":visible")) {
      $(".project_search").parent(".input").show();
      $(".project_search_main").hide();
    }
  }
  if (
    $(e.target).closest(".menu-box").get(0) == null &&
    !e.target.classList.contains("submenu-one")
  ) {
    if ($(".submenu-one > .menu-box").is(":visible")) {
      $(".submenu-one > .menu-box").fadeOut("fast");
    }
  }
  if (
    $(e.target).closest(".menu-box").get(0) == null &&
    !e.target.classList.contains("submenu-two")
  ) {
    if ($(".submenu-two > .menu-box").is(":visible")) {
      $(".submenu-two > .menu-box").fadeOut("fast");
    }
  }
  if (
    $(e.target).closest(".menu-box").get(0) == null &&
    !e.target.classList.contains("submenu-three")
  ) {
    if ($(".submenu-three > .menu-box").is(":visible")) {
      $(".submenu-three > .menu-box").fadeOut("fast");
    }
  }
  if (
    $(e.target).closest(".project-box-menu-list").get(0) == null &&
    !e.target.classList.contains("updated-btn") &&
    !e.target.classList.contains("text") &&
    !e.target.classList.contains("arrow")
  ) {
    if ($(".project-box-menu-list").is(":visible")) {
      $(".project-box-menu-list").fadeOut("fast");
    }
  }
});

// mobile
$("div.map-menu").on("click", function (e) {
  e.preventDefault();
  if ($("div.list-menu").hasClass("active")) {
    $("div.list-menu").removeClass("active");
  }
  $(this).addClass("active");
  $(".section-one").show();
  $(".section-two").hide();
});

$("div.list-menu").on("click", function (e) {
  e.preventDefault();
  if ($("div.map-menu").hasClass("active")) {
    $("div.map-menu").removeClass("active");
  }
  $(this).addClass("active");
  $(".section-two").show();
  $(".section-one").hide();
});

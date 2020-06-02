/**
* ModernDeck 8.0.2
* @license MIT
* https://github.com/dangeredwolf/ModernDeck
**/
var version = "8.0.2";

var buildId = 1854;

/*
	AsciiArtController.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/

window.ModernDeck = 8;
class AsciiArtController {
  static platformName() {
    let browserName = "Unknown Browser";
    let systemName = "Unknown System";

    if (navigator.userAgent.indexOf("ModernDeck/") > 0) {
      browserName = "App";
    } else if (navigator.userAgent.indexOf("Gecko/") > 0) {
      browserName = "Firefox";
    } else if (navigator.userAgent.indexOf("Edg/") > 0) {
      browserName = "Edge";
    } else if (navigator.userAgent.indexOf("OPR/") > 0) {
      browserName = "Opera";
    } else if (navigator.userAgent.indexOf("Chrome/") > 0) {
      browserName = "Chrome";
    } else if (navigator.userAgent.indexOf("Edge/") > 0) {
      browserName = "Edge (Legacy)";
    } else if (navigator.userAgent.indexOf("Safari/") > 0) {
      browserName = "Safari";
    }

    if (navigator.userAgent.indexOf("Windows NT") > 0) {
      systemName = "Windows";
    } else if (navigator.userAgent.indexOf("Mac OS X") > 0 && navigator.userAgent.indexOf("Mobile") > 0) {
      systemName = "iOS";
    } else if (navigator.userAgent.indexOf("Mac OS X") > 0) {
      systemName = "macOS";
    } else if (navigator.userAgent.indexOf("Android") > 0) {
      systemName = "Android";
    } else if (navigator.userAgent.indexOf("Linux") > 0) {
      systemName = "Linux";
    }

    return `${browserName} (${systemName})`;
  }

  static draw() {
    if (navigator.userAgent.indexOf("Gecko/") > 0) {
      return; // https://twitter.com/dangeredwolf/status/1263968859637395466
    }

    document.getElementsByTagName("html")[0].prepend(document.createComment(`
    █████████████████████████████████████████
   ███████████████████████████████████████████
  █████████████████████████████████████████████
  █████████████     ████████      ▐████████████
  ███████████▌     ███████         ▐███████████
  ██████████      ███████     ██    ▐██████████
  ████████▌     ████████     ████    ▐█████████ 	ModernDeck ${SystemVersion}
  ███████▌     ███████     ███████     ████████ 	Build ${buildId}
  ████████     ██████     ███████     ▐████████ 	${AsciiArtController.platformName()}
  █████████▌     ███     ███████     ▐█████████
  ███████████           ███████     ███████████ 	Made with love
  ████████████        ███████     ▐████████████ 	by dangered wolf
  █████████████████████████████████████████████
  ████████████████████████████████████████████▌
   ██████████████████████████████████████████▌
    ████████████████████████████████████████▌
                 ██████████████▌
                   ██████████▌
                     ██████▌
`));
  }

}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/*
	Utils.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	Shorthand function to create a new element, which is helpful for concise UI building.

	We could just make jQuery directly do it, but it's slower than calling native JS api and wrapped jQuery around it
*/

const handleErrors = (func, text) => {
  try {
    func();
  } catch (e) {
    console.error(text || "Caught an unexpected internal error");
    console.error(e);
    window.lastError = e;
  }
};
const make = function (a) {
  return $(document.createElement(a));
};

const exists = function (thing) {
  return typeof thing === "object" && thing !== null && thing.length > 0 || // Object can't be empty or null
  !!thing === true || typeof thing === "string" || typeof thing === "number";
};
function formatNumberI18n(number) {
  if (!window.mtdNumberFormat) {
    window.mtdNumberFormat = new Intl.NumberFormat(getFullLanguage().replace(/\_/g, "-"));
  }

  return window.mtdNumberFormat.format(number);
}
/*
	Helper function that rounds a number to the nearest hundredth (2nd decimal)
*/

function roundMe(val) {
  return Math.floor(val * 100) / 100;
}
/*
	function formatBytes(int val)

	Returns string: Number of bytes formatted into larger units (KB, MB, GB, TB)

	i.e. formatBytes(1000) -> "1 KB"
*/

function formatBytes(val) {
  if (val < Math.pow(10, 3)) {
    return formatNumberI18n(val) + " bytes";
  } else if (val < Math.pow(10, 6)) {
    return formatNumberI18n(roundMe(val / Math.pow(10, 3))) + I18n(" KB");
  } else if (val < Math.pow(10, 9)) {
    return formatNumberI18n(roundMe(val / Math.pow(10, 6))) + I18n(" MB");
  } else if (val < Math.pow(10, 12)) {
    return formatNumberI18n(roundMe(val / Math.pow(10, 9))) + I18n(" GB");
  } else {
    return formatNumberI18n(roundMe(val / Math.pow(10, 12))) + I18n(" TB");
  }
}
const isApp = typeof require !== "undefined";
/*
	Shorthand for creating a mutation observer and observing
*/

function mutationObserver(obj, func, parms) {
  return new MutationObserver(func).observe(obj, parms);
}
/*
	Returns ipcRenderer for electron app
*/

function getIpc() {
  if (!require) {
    return null;
  }

  return require('electron').ipcRenderer;
}

/*
	UIModal.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
class UIModal {
  constructor() {
    _defineProperty(this, "modalRoot", "#settings-modal");

    _defineProperty(this, "sharedRoot", false);
  }

  display() {
    new TD.components.GlobalSettings();
    $(this.modalRoot + ">.mdl").remove();
    $(this.modalRoot).append(this.element);
  }

  dismiss() {
    var _this$element$remove, _this$element;

    (_this$element$remove = (_this$element = this.element).remove) === null || _this$element$remove === void 0 ? void 0 : _this$element$remove.call(_this$element);

    if (!this.sharedRoot) {
      $(this.modalRoot).attr("style", "display: none;");
    }
  }

}

/*
	UIAlert.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	UIAlert(Object alertProps)

	alertProps is an object with the following options:

	String title: Title of the alert
	String message: Body message of the alert
	String buttonText: Button 1 text
	String button2Text: Button 2 text

	function button1Click: Button 1 click function
	function button2Click: Button 2 click function

	Note: make sure you call mtdPrepareWindows afterward to close the alert box

	String type: supported types are "confirm", "alert"
*/

class UIAlert extends UIModal {
  constructor(obj) {
    super();
    obj = obj || {};
    this.element = make("div").addClass("mdl mtd-alert");
    this.alertTitle = make("h2").addClass("mtd-alert-title").html(obj.title || I18n("ModernDeck"));
    this.alertBody = make("p").addClass("mtd-alert-body").html(obj.message || I18n("Alert"));
    this.alertButtonContainer = make("div").addClass("mtd-alert-button-container");
    this.alertButton = make("button").addClass("btn-primary btn mtd-alert-button").html(obj.buttonText || I18n("OK"));
    this.alertButtonContainer.append(this.alertButton);

    if (exists(obj.button2Text) || obj.type === "confirm") {
      this.alertButton2 = make("button").addClass("btn-primary btn mtd-alert-button mtd-alert-button-secondary").html(obj.button2Text || I18n("Cancel"));
      this.alertButtonContainer.append(this.alertButton2);
      this.alertButton2.click(obj.button2Click || mtdPrepareWindows);
    }

    this.alertButton.click(obj.button1Click || mtdPrepareWindows);
    this.element.append(this.alertTitle, this.alertBody, this.alertButtonContainer);
    this.display();
  }

}
window.originalAlert = window.alert;

window.alert = text => {
  return new UIAlert({
    message: text
  });
};

/*
	StylesheetExtensions.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	Returns true if specified stylesheet extension is enabled, false otherwise.
	Works with custom stylesheets. (see enableCustomStylesheetExtension for more info)
*/

function isStylesheetExtensionEnabled(name) {
  if ($("#mtd_custom_css_" + name).length > 0) {
    return true;
  }

  return !!document.querySelector("link.mtd-stylesheet-extension[href=\"" + mtdBaseURL + "resources/cssextensions/" + name + ".css\"\]");
}
/*
	Enables a certain stylesheet extension.
	Stylesheet extensions are loaded from resources/cssextensions/[name].css

	These are the predefined ModernDeck ones including colour themes, default light and dark themes, and various preferences

	For custom or dynamically defined ones, see enableCustomStylesheetExtension
*/

function enableStylesheetExtension(name) {
  if (name === "default" || $("#mtd_custom_css_" + name).length > 0) return; // This is where components are located

  let url = mtdBaseURL + "resources/cssextensions/" + name + ".css";

  if (name === "donors") {
    url = "https://api.moderndeck.org/v1/patrons/donors.css?v=" + version;
  }

  if (!isStylesheetExtensionEnabled(name)) {
    head.append(make("link").attr("rel", "stylesheet").attr("href", url).addClass("mtd-stylesheet-extension"));
  } else return;
}
/*
	disableStylesheetExtension(string name)

	Disables stylesheet extension by name. Function also works with custom stylesheet extensions
*/

function disableStylesheetExtension(name) {
  if (!isStylesheetExtensionEnabled(name)) return;
  $('head>link[href="' + mtdBaseURL + "resources/cssextensions/" + name + '.css"]').remove();

  if ($("#mtd_custom_css_" + name).length > 0) {
    $("#mtd_custom_css_" + name).remove();
  }
} // Custom stylesheet extensions are used for custom user CSS and for certain sliders, such as column width

function enableCustomStylesheetExtension(name, styles) {
  if (isStylesheetExtensionEnabled(name)) {
    $("#mtd_custom_css_" + name).html(styles);
    return;
  }

  head.append(make("style").html(styles).attr("id", "mtd_custom_css_" + name));
}

/*
	Column.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
function getColumnFromColumnNumber(num) {
  let result;
  $(".column").each((i, col) => {
    if (typeof $(col).data("column") !== "undefined") {
      if (parseInt($(col).data("column").match(/s\d+/g)[0].substr(1)) === num) {
        result = col;
      }
    }
  });
  return $(result);
}
function getColumnNumber(col) {
  return parseInt(col.data("column").match(/s\d+/g)[0].substr(1));
}
function updateColumnVisibility() {
  if (getPref$1("mtd_column_visibility") === false || isInWelcome) {
    return allColumnsVisible$1();
  }

  $(".column-content:not(.mtd-example-column)").attr("style", "display:block");
  setTimeout(() => {
    // wait for redraw
    $(".column").each((a, element) => {
      if ($(element).visible(true)) {
        $(element).find(".column-content:not(.mtd-example-column)").attr("style", "display:block");
      } else {
        $(element).find(".column-content:not(.mtd-example-column)").attr("style", "display:none");
      }
    });
  }, 20);
}
function allColumnsVisible$1() {
  $(".column-content:not(.mtd-example-column)").attr("style", "display:block");
}

/*
	StorageTweetenImport.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	Processes Tweeten Settings import
	obj = object converted from the raw JSON
*/

function importTweetenSettings(obj) {
  setPref("mtd_customcss", !!obj.dev ? obj.dev.customCSS || "" : "");

  if (exists(obj.dev)) {
    setPref("mtd_inspectElement", obj.dev.mode);
  }

  if (exists(obj.TDSettings)) {
    TD.settings.setAutoPlayGifs(obj.TDSettings.gifAutoplay);

    if (exists(obj.TDSettings.gifAutoplay)) {
      TD.settings.setAutoPlayGifs(obj.TDSettings.gifAutoplay);
    }

    if (exists(obj.TDSettings.sensitiveData)) {
      TD.settings.setDisplaySensitiveMedia(obj.TDSettings.sensitiveData);
    }

    if (exists(obj.TDSettings.tweetStream)) {
      TD.settings.setUseStream(obj.TDSettings.tweetStream);
    }

    if (exists(obj.TDSettings.linkShortener)) {
      TD.settings.setLinkShortener(obj.TDSettings.linkShortener ? "bitly" : "twitter");

      if (obj.TDSettings.linkShortener.toggle === true && !!obj.TDSettings.linkShortener.bitlyApiKey && !!obj.TDSettings.linkShortener.bitlyUsername) {
        TD.settings.setBitlyAccount({
          login: obj.TDSettings.linkShortener.bitlyUsername || TD.settings.getBitlyAccount().login,
          apiKey: obj.TDSettings.linkShortener.bitlyApiKey || TD.settings.getBitlyAccount().apiKey
        });
      }
    }
  }

  if (exists(obj.customTitlebar)) {
    setPref("mtd_nativetitlebar", !obj.customTitlebar);
  }

  if (exists(obj.customization)) {
    setPref("mtd_columnwidth", obj.customization.columnWidth || getPref$1("mtd_columnwidth"));

    if (obj.customization.completeBlack === true) {
      setPref("mtd_theme", "amoled");
    }

    setPref("mtd_noemojipicker", exists(obj.customization.emojis) ? obj.customization.emojis : false);
    setPref("mtd_newcharindicator", exists(obj.customization.charCount) ? !obj.customization.charCount : true);
    TD.settings.setTheme(obj.customization.theme || TD.settings.getTheme());

    if (exists(obj.customization.thinSB)) {
      setPref("mtd_scrollbar_style", obj.customization.thinSB ? "scrollbarsnarrow" : "scrollbarsdefault");
    }

    setPref("mtd_round_avatars", exists(obj.customization.roundAvi) ? obj.customization.roundAvi : true);

    if (exists(obj.customization.font)) {
      let percentage = 100;

      switch (obj.customization.font) {
        case "smallest":
          percentage = 90;
          break;

        case "smaller":
          percentage = 95;
          break;

        case "small":
          percentage = 100;
          break;

        case "large":
          percentage = 105;
          break;

        case "largest":
          percentage = 110;
          break;
      }

      setPref("mtd_fontsize", percentage);
    }
  }
}

/*
	ContextMenuFunctions.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
const contextMenuFunctions = {
  cut: () => {
    getIpc().send("cut");
  },
  copy: () => {
    getIpc().send("copy");
  },
  paste: () => {
    getIpc().send("paste");
  },
  undo: () => {
    getIpc().send("undo");
  },
  redo: () => {
    getIpc().send("redo");
  },
  selectAll: () => {
    getIpc().send("selectAll");
  },
  delete: () => {
    getIpc().send("delete");
  },
  openLink: e => {
    window.open(e);
  },
  copyLink: e => {
    const {
      clipboard
    } = require('electron');

    clipboard.writeText(e);
  },
  openImage: e => {
    window.open(e);
  },
  copyImageURL: e => {
    const {
      clipboard
    } = require('electron');

    clipboard.writeText(e);
  },
  copyImage: e => {
    getIpc().send("copyImage", e);
  },
  saveImage: e => {
    getIpc().send("saveImage", e);
  },
  inspectElement: e => {
    getIpc().send("inspectElement", e);
  },
  restartApp: e => {
    getIpc().send("restartApp", e);
  },
  newSettings: e => {
    openSettings();
  }
};

/*
	UIContextMenu.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	Helper function to create a context menu item
*/

function makeCMItem(p) {
  if (useNativeContextMenus || window.useSafeMode) {
    let dataact = p.dataaction;
    let data = p.data;
    let nativemenu = {
      label: p.text,

      click() {
        contextMenuFunctions[dataact](data);
      },

      enabled: p.enabled
    }; //nativemenu.click = ;

    return nativemenu;
  }

  let a = make("a").attr("href", "#").attr("data-action", p.dataaction).html(p.text).addClass("mtd-context-menu-item");
  let li = make("li").addClass("is-selectable").append(a);

  if (p.enabled === false) {
    // Crucially, also not undefined!
    a.attr("disabled", "disabled");
  } else {
    //a.click(contextMenuFunctions[p.dataaction]);
    a.click(() => {
      if (p.mousex && p.mousey) {
        document.elementFromPoint(p.mousex, p.mousey).focus();
      }

      contextMenuFunctions[p.dataaction](p.data);
      clearContextMenu();
    });
  }

  return li;
}
/*
	Helper function to create a context menu divider
*/


function makeCMDivider() {
  if (useNativeContextMenus || window.useSafeMode) {
    return {
      type: 'separator'
    };
  }

  return make("div").addClass("drp-h-divider");
}
/*
	Function that clears a context menu after it's been dismissed
*/


function clearContextMenu() {
  let removeMenu = $(".mtd-context-menu");
  removeMenu.addClass("mtd-fade-out").on("animationend", () => {
    removeMenu.remove();
  });
}
/*
	Helper function for the app to construct context menus that will be displayed
*/

function buildContextMenu(p) {
  let items = [];
  let x = p.x;
  let y = p.y;
  const xOffset = 2;
  const yOffset = 12;

  if (!window.useSafeMode && $(".mtd-context-menu").length > 0) {
    let removeMenu = $(".mtd-context-menu");
    removeMenu.addClass("mtd-fade-out");
    removeMenu.on("animationend", () => {
      removeMenu.remove();
    });
  }

  if (!window.useSafeMode && $(document.elementFromPoint(x, y)).hasClass("mtd-context-menu-item")) {
    return;
  }

  if (p.isEditable || exists(p.selectionText) && p.selectionText.length > 0) {
    if (p.isEditable) {
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "undo",
        text: I18n("Undo"),
        enabled: p.editFlags.canUndo
      }));
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "redo",
        text: I18n("Redo"),
        enabled: p.editFlags.canRedo
      }));
      items.push(makeCMDivider());
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "cut",
        text: I18n("Cut"),
        enabled: p.editFlags.canCut
      }));
    }

    items.push(makeCMItem({
      mousex: x,
      mousey: y,
      dataaction: "copy",
      text: I18n("Copy"),
      enabled: p.editFlags.canCopy
    }));

    if (p.isEditable) {
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "paste",
        text: I18n("Paste"),
        enabled: p.editFlags.canPaste
      }));
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "selectAll",
        text: I18n("Select all"),
        enabled: p.editFlags.canSelectAll
      }));
    }

    items.push(makeCMDivider());
  }

  if (p.linkURL !== '' && p.linkURL !== "https://tweetdeck.twitter.com/#") {
    items.push(makeCMItem({
      mousex: x,
      mousey: y,
      dataaction: "openLink",
      text: I18n("Open link in browser"),
      enabled: true,
      data: p.linkURL
    }));
    items.push(makeCMItem({
      mousex: x,
      mousey: y,
      dataaction: "copyLink",
      text: I18n("Copy link address"),
      enabled: true,
      data: p.linkURL
    }));
    items.push(makeCMDivider());
  }

  if (p.srcURL !== '') {
    if (exists(p.mediaType) && p.mediaType === "video") {
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "openImage",
        text: I18n("Open video in browser"),
        enabled: true,
        data: p.srcURL
      }));
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "saveImage",
        text: I18n("Save video..."),
        enabled: true,
        data: p.srcURL
      }));
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "copyImageURL",
        text: I18n("Copy video address"),
        enabled: true,
        data: p.srcURL
      }));
    } else {
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "openImage",
        text: I18n("Open image in browser"),
        enabled: true,
        data: p.srcURL
      }));
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "copyImage",
        text: I18n("Copy image"),
        enabled: true,
        data: {
          x: x,
          y: y
        }
      }));
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "saveImage",
        text: I18n("Save image..."),
        enabled: true,
        data: p.srcURL
      }));
      items.push(makeCMItem({
        mousex: x,
        mousey: y,
        dataaction: "copyImageURL",
        text: I18n("Copy image address"),
        enabled: true,
        data: p.srcURL
      }));
    }

    items.push(makeCMDivider());
  }

  if (getPref$1("mtd_inspectElement") || isDev) {
    items.push(makeCMItem({
      mousex: x,
      mousey: y,
      dataaction: "inspectElement",
      text: I18n("Inspect element"),
      enabled: true,
      data: {
        x: x,
        y: y
      }
    }));
  }

  if (useNativeContextMenus || window.useSafeMode) {
    return items;
  } else {
    let ul = make("ul");

    for (let i = 0; i < items.length; i++) {
      ul.append(items[i]);
    }

    let menu = make("menu").addClass("mtd-context-menu dropdown-menu").attr("style", "opacity:0;animation:none;transition:none").append(ul);

    if (items.length > 0) {
      setTimeout(() => {
        if (x + xOffset + menu.width() > $(document).width()) {
          x = $(document).width() - menu.width() - xOffset - xOffset;
        }

        if (y + yOffset + menu.height() > $(document).height()) {
          y = $(document).height() - menu.height();
        }

        menu.attr("style", `left:${x + xOffset}px!important;top:${y + yOffset}px!important`);
      }, 20);
    } else {
      menu.addClass("hidden");
    }

    return menu;
  }
}

/*
	PrefHandler.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	function loadPreferences()

	Loads preferences from storage and activates them
*/

function loadPreferences() {
  window.settingsData = settingsData$1;

  for (let key in settingsData$1) {
    if (!settingsData$1[key].enum) {
      for (let i in settingsData$1[key].options) {
        let prefKey = settingsData$1[key].options[i].settingsKey;
        let pref = settingsData$1[key].options[i];

        if (exists(prefKey)) {
          let setting;

          if (!hasPref(prefKey)) {
            setPref(prefKey, pref.default);
            setting = pref.default;
          } else {
            setting = getPref$1(prefKey);
          }

          switch (pref.type) {
            case "checkbox":
              if (setting === true) {
                parseActions$1(pref.activate, undefined, true);
              } else {
                parseActions$1(pref.deactivate, undefined, true);
              }

              break;

            case "dropdown":
            case "textbox":
            case "textarea":
            case "array":
            case "slider":
              parseActions$1(pref.activate, setting, true);
              break;
          }
        }
      }
    }
  }
}
/*
	This is used by the preference management system to activate preferences

	This allows for many simple preferences to be done completely in object notation with no extra JS
*/

function parseActions$1(a, opt, load) {
  for (let key in a) {
    switch (key) {
      case "enableStylesheet":
        enableStylesheetExtension(a[key]);
        break;

      case "disableStylesheet":
        disableStylesheetExtension(a[key]);
        break;

      case "htmlAddClass":
        if (!html.hasClass(a[key])) html.addClass(a[key]);
        break;

      case "htmlRemoveClass":
        html.removeClass(a[key]);
        break;

      case "func":
        if (typeof a[key] === "function") {
          try {
            a[key](opt, load);
          } catch (e) {
            console.error("Error occurred processing action function.");
            console.error(e);
            lastError = e;
            console.error("Dump of naughty function attached below");
            console.log(a[key]);
          }
        } else {
          throw "There's a func action, but it isn't a function? :thinking:";
        }

        break;
    }
  }
}

/*
	UISettings.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
let verTextId = 1;
let verText = "";

function internationaliseSettingString(str) {
  let matches = str.match(/{{.+?}}/g);
  (matches || []).forEach(i => {
    let translatedString = I18n(i.substr(2, i.length - 4));
    str = str.replace(i, translatedString);
  });
  return str;
} // opens legacy tweetdeck settings


function openLegacySettings() {
  $(".mtd-settings-panel").remove();
  new TD.components.GlobalSettings();
}
/*
	function openSettings()
	opens and settings panel, open to first page

	function openSettings(openMenu)
	opens and returns settings panel with string openMenu, the tabId of the corresponding settings page
*/

function openSettings$1(openMenu) {
  mtdPrepareWindows();
  let tabs = make("div").addClass("mtd-settings-tab-container mtd-tabs");
  let tabSelection = make("button").addClass("mtd-settings-tab mtd-settings-tab-selection");
  let container = make("div").addClass("mtd-settings-inner");
  let panel = make("div").addClass("mdl mtd-settings-panel").append(tabs).append(make("div").addClass("mtd-settings-inner-container").append(container));

  for (var key in settingsData$1) {
    // if set to false (NOT UNDEFINED, this is an optional parameter), skip it
    if (settingsData$1[key].enabled === false || settingsData$1[key].visible === false) {
      continue;
    }

    var tab = make("button").addClass("mtd-settings-tab").attr("data-action", key).html(internationaliseSettingString(settingsData$1[key].tabName)).click(function () {
      $(".mtd-settings-tab-selected").removeClass("mtd-settings-tab-selected").attr("aria-selected", "false");
      $(this).addClass("mtd-settings-tab-selected");
      $(this).attr("aria-selected", "true");
      /*
      	calculates how far to move over the settings menu
      	good thing arrays start at 0, as 0 would be 0px, it's the first one
      */

      container.attr("data-page-selected", $(this).attr("data-action"));
      tabSelection.css("top", $(this).index() * 50 + "px");
      container.css("margin-top", "-" + $(this).index() * 545 + "px");
    });
    container.on("transitionend", () => {
      let visiblePage = container.attr("data-page-selected"); // container.children().filter(`:not([id=${visiblePage}])`).addClass("hidden");
    });
    container.on("transitionstart", () => {// container.children().removeClass("hidden");
    });
    let subPanel = make("div").addClass("mtd-settings-subpanel mtd-col scroll-v").attr("id", key);

    if (!settingsData$1[key].enum && settingsData$1[key].enabled !== false && settingsData$1[key].visible !== false) {
      for (let prefKey in settingsData$1[key].options) {
        let pref = settingsData$1[key].options[prefKey];
        let option = make("div").addClass("mtd-settings-option").addClass("mtd-settings-option-" + pref.type);

        if (exists(pref.addClass)) {
          option.addClass(pref.addClass);
        }

        if (pref.enabled === false || pref.visible === false) {
          continue;
        }

        if (exists(pref.headerBefore)) {
          subPanel.append(make("h3").addClass("mtd-settings-panel-subheader").html(internationaliseSettingString(pref.headerBefore)));
        }

        if (exists(pref.settingsKey) && exists(pref.default) && !hasPref(pref.settingsKey)) {
          setPref(pref.settingsKey, pref.default);
        }

        let input, select, label, minimum, maximum, button, link;

        switch (pref.type) {
          case "checkbox":
            input = make("input").attr("type", "checkbox").attr("id", prefKey).change(function () {
              if (pref.savePreference !== false) {
                setPref(pref.settingsKey, $(this).is(":checked"));
              }

              parseActions$1($(this).is(":checked") ? pref.activate : pref.deactivate, $(this).val());
            });

            if (exists(pref.settingsKey) && getPref$1(pref.settingsKey) === true) {
              input.attr("checked", "checked");
            }

            if (!exists(pref.settingsKey) && exists(pref.queryFunction)) {
              if (pref.queryFunction()) {
                input.attr("checked", "checked");
              }
            }

            label = make("label").addClass("checkbox").html(internationaliseSettingString(pref.title)).append(input);
            option.append(label);

            if (exists(pref.initFunc)) {
              pref.initFunc(select);
            }

            break;

          case "dropdown":
            select = make("select").attr("type", "select").attr("id", prefKey).change(function () {
              parseActions$1(pref.activate, $(this).val());

              if (pref.savePreference !== false) {
                setPref(pref.settingsKey, $(this).val());
              }
            });

            for (let prefKey in pref.options) {
              if (!!pref.options[prefKey].value) {
                let newPrefSel = pref.options[prefKey];
                let newoption = make("option").attr("value", newPrefSel.value).html(internationaliseSettingString(newPrefSel.text));
                select.append(newoption);
              } else {
                let group = make("optgroup").attr("label", internationaliseSettingString(pref.options[prefKey].name));

                for (let subkey in pref.options[prefKey].children) {
                  let newSubPrefSel = pref.options[prefKey].children[subkey];
                  let newsuboption = make("option").attr("value", newSubPrefSel.value).html(internationaliseSettingString(newSubPrefSel.text));
                  group.append(newsuboption);
                }

                select.append(group);
              }
            }

            if (exists(pref.settingsKey)) {
              select.val(getPref$1(pref.settingsKey));
            } else if (!exists(pref.settingsKey) && exists(pref.queryFunction)) {
              select.val(pref.queryFunction());
            }

            label = make("label").addClass("control-label").html(internationaliseSettingString(pref.title));
            option.append(label, select);

            if (exists(pref.initFunc)) {
              pref.initFunc(select);
            }

            break;

          case "textbox":
            input = make("input").attr("type", "text").attr("id", prefKey);

            if (pref.instantApply === true) {
              input.on("input", function () {
                parseActions$1(pref.activate, $(this).val());

                if (pref.savePreference !== false) {
                  setPref(pref.settingsKey, $(this).val());
                }
              });
            } else {
              input.change(function () {
                parseActions$1(pref.activate, $(this).val());

                if (pref.savePreference !== false) {
                  setPref(pref.settingsKey, $(this).val());
                }
              });
            }

            if (exists(pref.settingsKey)) {
              input.val(getPref$1(pref.settingsKey));
            } else if (!exists(pref.settingsKey) && exists(pref.queryFunction)) {
              input.val(pref.queryFunction());
            }

            label = make("label").addClass("control-label").html(internationaliseSettingString(pref.title));

            if (exists(pref.initFunc)) {
              pref.initFunc(input);
            }

            option.append(label, input);
            break;

          case "textarea":
            input = make("textarea").addClass("mtd-textarea").attr("id", prefKey).attr("rows", "10").attr("cols", "80").attr("placeholder", pref.placeholder || "").attr("spellcheck", false);

            if (pref.instantApply === true) {
              input.on("input", function () {
                parseActions$1(pref.activate, $(this).val());

                if (pref.savePreference !== false) {
                  setPref(pref.settingsKey, $(this).val());
                }
              });
            } else {
              input.change(function () {
                parseActions$1(pref.activate, $(this).val());

                if (pref.savePreference !== false) {
                  setPref(pref.settingsKey, $(this).val());
                }
              });
            } // https://sumtips.com/snippets/javascript/tab-in-textarea/


            input.keydown(e => {
              let kC = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;

              if (kC == 9 && !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) // If it's a tab, but not Ctrl+Tab, Super+Tab, Shift+Tab, or Alt+Tab
                {
                  let oS = input[0].scrollTop;

                  if (input[0].setSelectionRange) {
                    let sS = input[0].selectionStart;
                    let sE = input[0].selectionEnd;
                    input[0].value = input[0].value.substring(0, sS) + "\t" + input[0].value.substr(sE);
                    input[0].setSelectionRange(sS + 1, sS + 1);
                    input[0].focus();
                  }

                  input[0].scrollTop = oS;
                  e.preventDefault();
                  return false;
                }

              return true;
            });

            if (exists(pref.settingsKey)) {
              input.val(getPref$1(pref.settingsKey));
            } else if (!exists(pref.settingsKey) && exists(pref.queryFunction)) {
              input.val(pref.queryFunction());
            }

            label = make("label").addClass("control-label").html(internationaliseSettingString(pref.title));

            if (exists(pref.initFunc)) {
              pref.initFunc(input);
            }

            option.append(label, input);
            break;

          case "slider":
            label = make("label").addClass("control-label");
            input = make("input").attr("type", "range").attr("min", pref.minimum).attr("max", pref.maximum).change(function () {
              parseActions$1(pref.activate, $(this).val());

              if (pref.savePreference !== false) {
                setPref(pref.settingsKey, $(this).val());
              }
            }).on("input", function () {
              label.html(`${internationaliseSettingString(pref.title)} <b> ${$(this).val()} ${internationaliseSettingString(pref.displayUnit || "")} </b>`);
            });

            if (exists(pref.settingsKey)) {
              input.val(parseInt(getPref$1(pref.settingsKey)));
            } else if (!exists(pref.settingsKey) && exists(pref.queryFunction)) {
              input.val(pref.queryFunction());
            } else if (exists(pref.default)) {
              input.val(pref.default);
            }

            label.html(internationaliseSettingString(pref.title) + " <b> " + input.val() + " " + (internationaliseSettingString(pref.displayUnit) || "") + "</b>");
            maximum = make("label").addClass("control-label mtd-slider-maximum").html(pref.maximum + (internationaliseSettingString(pref.displayUnit) || ""));
            minimum = make("label").addClass("control-label mtd-slider-minimum").html(pref.minimum + (internationaliseSettingString(pref.displayUnit) || ""));

            if (exists(pref.initFunc)) {
              pref.initFunc(input);
            }

            let sliderCont = make("div").addClass("mtd-slider-container").append(maximum, input, minimum);
            option.append(label, sliderCont);
            break;

          case "button":
            label = make("label").addClass("control-label").html(internationaliseSettingString(pref.label) || "");
            button = make("button").html(internationaliseSettingString(pref.title)).addClass("btn btn-positive mtd-settings-button").click(() => {
              parseActions$1(pref.activate, true);
            });

            if (exists(pref.initFunc)) {
              pref.initFunc(button);
            }

            option.append(label, button);
            break;

          case "buttons":
            label = make("label").addClass("control-label").html(internationaliseSettingString(pref.label) || "");
            option.append(label);
            pref.buttons.forEach(btn => {
              option.append(make("button").html(internationaliseSettingString(btn.text)).addClass("btn btn-positive mtd-settings-button").click(() => btn.func()));
            });

            if (exists(pref.initFunc)) {
              pref.initFunc(button);
            }

            break;

          case "link":
            link = make("a").html(internationaliseSettingString(pref.label)).addClass("mtd-settings-link").click(() => {
              parseActions$1(pref.activate, true);
            });

            if (exists(pref.initFunc)) {
              pref.initFunc(link);
            }

            option.append(link);
            break;
        }

        subPanel.append(option);
      }
    } else if (settingsData$1[key].enum === "aboutpage") {
      switch (verTextId) {
        case 0:
          verText = "";
          break;

        case 1:
          verText = I18n("Version");
          break;

        case 2:
          verText = I18n("Beta");
          break;

        case 3:
          verText = I18n("Developer Version");
          break;
      }

      let logo = make("i").addClass("mtd-logo icon-moderndeck icon");
      let h1 = make("h1").addClass("mtd-about-title").html("ModernDeck 8");
      let h2 = make("h2").addClass("mtd-version-title").html(verText + " " + SystemVersion + I18n(" (Build ") + buildId + ")");
      let logoCont = make("div").addClass("mtd-logo-container");

      if (!isApp) {
        logoCont.append(make("p").addClass("mtd-check-out-app").html(I18n("Did you know ModernDeck has a native app? <a href='https://moderndeck.org/'>Check it out!</a>")));
      }

      let info = make("p").html(I18n("Made with <i class=\"icon icon-heart mtd-about-heart\"></i> by <a href=\"https://twitter.com/dangeredwolf\" rel=\"user\" target=\"_blank\">dangeredwolf</a> in Columbus, OH since 2014<br>ModernDeck is <a href=\"https://github.com/dangeredwolf/ModernDeck/\" target=\"_blank\">an open source project</a> released under the MIT license."));
      let infoCont = make("div").addClass("mtd-about-info").append(info);
      logoCont.append(logo, h1, h2);
      subPanel.append(logoCont);
      let updateCont = makeUpdateCont();

      if (isApp && !html.hasClass("mtd-winstore") && !html.hasClass("mtd-macappstore")) {
        subPanel.append(updateCont);
      }

      if (html.hasClass("mtd-winstore")) {
        subPanel.append(make("div").append(make("h2").addClass("mtd-update-h3 mtd-update-managed").html(I18n("Updates for this version of ModernDeck are managed by the Microsoft Store.")), make("button").addClass("btn mtd-settings-button").html(I18n("Check for Updates")).click(() => open("ms-windows-store://updates"))));
      } else if (html.hasClass("mtd-macappstore")) {
        subPanel.append(make("div").append(make("h2").addClass("mtd-update-h3 mtd-update-managed").html(I18n("Thank you for purchasing ModernDeck from the App Store!")), make("button").addClass("btn mtd-settings-button").html(I18n("Check for Updates")).click(() => {
          open("macappstore://showUpdatesPage");
        })));
      }

      subPanel.append(infoCont);
    } else if (settingsData$1[key].enum === "mutepage") {
      let filterInput = make("input").addClass("js-filter-input").attr("name", "filter-input").attr("size", 30).attr("type", "text").attr("placeholder", I18n("Enter a word or phrase"));
      let selectFilterType = make("select").attr("name", "filter").addClass("js-filter-types").append(make("option").attr("value", "phrase").html(I18n("Words or phrases")), make("option").attr("value", "source").html(I18n("Tweet source"))).change(function () {
        filterInput.attr("placeholder", $(this).val() === "phrase" ? I18n("Enter a word or phrase") : I18n("eg TweetSpamApp"));
      });
      let muteButton = make("button").attr("name", "add-filter").addClass("js-add-filter btn-on-dark disabled btn-primary").html(I18n("Mute")).click(() => {
        if (filterInput.val().length > 0) {
          TD.controller.filterManager.addFilter(selectFilterType.val(), filterInput.val(), false);
          updateFilterPanel(filterList);
        }
      });
      let muteTypes = make("div").addClass("control-group").append(make("label").attr("for", "filter-types").addClass("control-label").html(I18n("Mute")), make("div").addClass("controls").append(selectFilterType));
      let muteInput = make("div").addClass("control-group").append(make("label").attr("for", "filter-input").addClass("control-label").html(I18n("Matching")), make("div").addClass("controls").append(filterInput)).on("input", function () {
        if ($(this).val().length > 0) {
          muteButton.removeClass("disabled");
        } else {
          muteButton.addClass("disabled");
        }
      });
      let muteAdd = make("div").addClass("control-group").append(make("div").addClass("controls js-add-filter-container").append(muteButton));
      let filterList = make("ul");
      let filterListGroup = make("div").addClass("js-filter-list").append(filterList);
      let form = make("form").addClass("js-global-settings frm").attr("id", "global-settings").attr("action", "#").append(make("fieldset").attr("id", "global_filter_settings").append(muteTypes, muteInput, muteAdd, filterListGroup));
      updateFilterPanel(filterList);
      subPanel.append(form);
    }

    tabs.append(tab);
    container.append(subPanel);
    tab.attr("aria-selected", "false");

    if (!exists(openMenu) && tab.index() === 0) {
      tab.addClass("mtd-settings-tab-selected");
      tab.attr("aria-selected", "true");
      tab.click();
    }

    if (exists(openMenu) && openMenu === key) {
      tab.addClass("mtd-settings-tab-selected");
      tab.attr("aria-selected", "true");
      tab.click();
    }
  }

  tabs.append(tabSelection);
  new TD.components.GlobalSettings();
  $("#settings-modal>.mdl").remove();
  $("#settings-modal").append(panel);
  return panel;
}
/*
	Event function to update the UI as the update status changes
*/

function updateUIChanged() {
  if (AutoUpdateController.h2) {
    $(window.updateh2).removeClass("hidden");
    $(window.updateh2).html(AutoUpdateController.h2);
  } else {
    $(window.updateh2).addClass("hidden");
  }

  if (AutoUpdateController.h3) {
    $(window.updateh3).removeClass("hidden");
    $(window.updateh3).html(AutoUpdateController.h3);
  } else {
    $(window.updateh3).addClass("hidden");
  }

  if (AutoUpdateController.tryAgain) {
    $(window.tryAgain).removeClass("hidden");
    $(window.tryAgain).html(AutoUpdateController.tryAgain);
  } else {
    $(window.tryAgain).addClass("hidden");
  }

  if (AutoUpdateController.restartNow) {
    $(window.restartNow).removeClass("hidden");
  } else {
    $(window.restartNow).addClass("hidden");
  }

  if (AutoUpdateController.icon) {
    $(window.updateIcon).removeClass("hidden");
    $(window.updateIcon).html(AutoUpdateController.icon);
  } else {
    $(window.updateIcon).addClass("hidden");
  }

  if (AutoUpdateController.spinner === true) {
    $(window.updateSpinner).removeClass("hidden");
  } else {
    $(window.updateSpinner).addClass("hidden");
  }
}
/*
	Controller function for app update page
*/


function mtdAppUpdatePage() {
  $(document).on("mtdUpdateUIChanged", updateUIChanged);

  const {
    ipcRenderer
  } = require("electron");

  setTimeout(() => {
    $(window.tryAgain).click(() => {
      ipcRenderer.send("checkForUpdates");
    });
    $(window.restartNow).click(() => {
      ipcRenderer.send("restartAndInstallUpdates");
    });

    if (!AutoUpdateController.isCheckingForUpdates) {
      ipcRenderer.send("checkForUpdates");
    }

    updateUIChanged();
  });
}
/*
	Creates the update container
*/


function makeUpdateCont() {
  let updateCont = make("div").addClass("mtd-update-container").html('<div class="mtd-update-spinner preloader-wrapper small active" id="updateSpinner"><div class="spinner-layer"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>').attr("id", "updateCont");
  let updateIcon = make("i").addClass("material-icon hidden").attr("id", "updateIcon");
  let updateh2 = make("h2").addClass("mtd-update-h2").html(I18n("Checking for updates...")).attr("id", "updateh2");
  let updateh3 = make("h3").addClass("mtd-update-h3 hidden").html("").attr("id", "updateh3");
  let tryAgain = make("button").addClass("btn hidden").html(I18n("Try Again")).attr("id", "tryAgain");
  let restartNow = make("button").addClass("btn hidden").html(I18n("Restart Now")).attr("id", "restartNow");
  updateCont.append(updateIcon, updateh2, updateh3, tryAgain, restartNow);

  if (typeof require !== "undefined" && !html.hasClass("mtd-winstore") && !html.hasClass("mtd-macappstore")) {
    mtdAppUpdatePage();
  }

  return updateCont;
}
/* Updates the mute list UI from twitter's backend */

function updateFilterPanel(filterList) {
  let filters = TD.controller.filterManager.getAll();
  filterList.html("");

  for (let n in filters) {
    let myFilter = filters[n];
    filterList.append(make("li").addClass("list-filter").append(make("div").addClass("mtd-mute-text mtd-mute-text-" + (myFilter.type === "source" ? "source" : "")), make("em").html(myFilter.value), make("input").attr("type", "button").attr("name", "remove-filter").attr("value", I18n("Remove")).addClass("js-remove-filter small btn btn-negative").click(() => {
      TD.controller.filterManager.removeFilter(myFilter);
      updateFilterPanel(filterList);
    })));
  }

  return filterList;
}

/*
	SafeMode.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	Enters safe mode, disabling most ModernDeck custom CSS. App-only right now.
*/

const enterSafeMode = () => {
  setPref("mtd_safemode", true);
  getIpc().send("restartApp");
};


/*
	DataUnsupportedLanguage.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
var unsupportedCodeTable = {
  af: "U stelselstelsel word nog nie deur ModernDeck ondersteun nie. Help om te vertaal:",
  am: "የስርዓት ቋንቋዎ ገና በአገር ደረጃ ገና አይደገፍም። ለመተርጎም እገዛ:",
  ar: "لغة نظامك غير مدعومة أصلاً بواسطة ModernDeck حتى الآن. مساعدة في الترجمة:",
  az: "Sisteminizin dili hələ ModernDeck tərəfindən dəstəklənmir. Tərcümə etməyə kömək edin:",
  be: "Мова вашай сістэмы яшчэ не падтрымліваецца ModernDeck. Дапамажыце перакласці:",
  bn: "আপনার সিস্টেমের ভাষা মডার্নডেক দ্বারা এখনও স্থানীয়ভাবে সমর্থিত নয়। সহায়তা অনুবাদ:",
  bg: "Вашият системен език все още не се поддържа от ModernDeck. Помощ за превода:",
  bs: "Vaš sistemski jezik još nije izvorno podržan od strane ModernDeck-a. Pomoć za prevođenje:",
  ca: "ModernDeck encara no és compatible amb el vostre llenguatge del sistema. Ajuda a traduir:",
  co: "A vostra lingua di u sistema ùn hè micca sustegnu nativamente da ModernDeck. Aiutate à traduce:",
  cs: "Váš systémový jazyk není nativně podporován programem ModernDeck. Pomozte překládat:",
  cy: "Nid yw iaith eich system yn cael ei chefnogi'n frodorol gan ModernDeck eto. Helpwch i gyfieithu:",
  da: "Dit systemsprog understøttes endnu ikke af ModernDeck. Hjælp med at oversætte:",
  de: "Ihre Systemsprache wird von ModernDeck noch nicht nativ unterstützt. Hilfe beim Übersetzen:",
  el: "Η γλώσσα του συστήματός σας δεν υποστηρίζεται εγγενώς από το ModernDeck. Βοήθεια μετάφρασης:",
  en: "Your system language is not natively supported by ModernDeck yet. Help translate: ",
  eo: "Via sistema lingvo ankoraŭ ne estas subtenata de ModernDeck. Helpu traduki:",
  es: "El idioma de su sistema no es compatible de forma nativa con ModernDeck todavía. Ayuda a traducir:",
  et: "Teie süsteemikeelt ei toeta veel ModernDeck. Aidake tõlkida:",
  eu: "Oraindik ez duzu ModernDeck-ek onartzen zure sistemaren hizkuntza. Laguntza itzultzen:",
  fa: "زبان سیستم شما هنوز توسط ModernDeck پشتیبانی نمی شود. کمک به ترجمه:",
  fi: "ModernDeck ei vielä tue järjestelmäkieltäsi. Auta kääntämään:",
  fj: "Na nomu vosa ni ivakarau e sega ni natively tokoni mai vei ModernDeck. Veivuke me vakadewataki: ",
  fr: "Le langage de votre système n'est pas encore pris en charge nativement par ModernDeck. Aide à traduire:",
  fy: "Jo systeemtaal wurdt noch net natuerlik stipe troch ModernDeck. Help oersette:",
  ga: "Ní thacaíonn ModernDeck le teanga do chórais go dúchasach fós. Cuidigh le haistriú:",
  gd: "Chan eil cànan an t-siostaim agad a ’faighinn taic dhùthchasach bho ModernDeck fhathast. Cuidich le eadar-theangachadh:",
  gl: "ModernDeck aínda non é compatible co seu idioma do sistema. Axuda a traducir:",
  gu: "તમારી સિસ્ટમ ભાષા મૂળરૂપે હજી મોડર્નડેક દ્વારા સપોર્ટેડ નથી. ભાષાંતરમાં સહાય કરો:",
  ka: "თქვენი სისტემის ენა ჯერ არ არის მხარდაჭერილი ModernDeck– ით. დახმარება თარგმნეთ:",
  ha: "ModernDeck ba shi da tallafi na asali. Taimaka fassara:",
  he: "שפת המערכת שלך עדיין לא נתמכת על ידי ModernDeck. עזרה בתרגום:",
  hi: "आपकी सिस्टम भाषा अभी तक ModernDeck द्वारा मूल रूप से समर्थित नहीं है। अनुवाद में मदद करें:",
  hr: "Jezik vašeg sustava ModernDeck još nije izvorno podržan. Pomoć za prevođenje:",
  ht: "Lang sistèm ou a pa sipòte pa ModernDeck ankò. Ede tradui:",
  hy: "Ձեր համակարգի լեզուն դեռ բնօրինակի չի աջակցում ModernDeck- ի կողմից: Օգնեք թարգմանել.",
  hu: "A ModernDeck még nem támogatja a rendszernyelv natív támogatását. Segíts a fordításban:",
  id: "Bahasa sistem Anda belum didukung oleh ModernDeck. Bantu menerjemahkan:",
  ig: "ModernDeck anaghị akwado asụsụ sistemụ gị. Nyere ntụgharị aka:",
  is: "ModernDeck styður ekki tungumál kerfisins þíns. Hjálpaðu okkur við að þýða:",
  it: "La lingua del tuo sistema non è ancora supportata nativamente da ModernDeck. Aiuta a tradurre:",
  ja: "ご使用のシステム言語は、ModernDeckではまだネイティブサポートされていません。 翻訳の手助け：",
  jv: "Bahasa sistem sampeyan durung didhukung kanthi asli dening ModernDeck. Pitulung nerjemahake:",
  ka: "თქვენი სისტემის ენა ჯერ არ არის მხარდაჭერილი ModernDeck– ით. დახმარება თარგმნეთ:",
  kk: "Сіздің жүйелік тіліңізді ModernDeck әлі қолдамайды. Аударуға көмек:",
  km: "ភាសាប្រព័ន្ធរបស់អ្នកមិនត្រូវបានគាំទ្រពីកំណើតដោយ ModernDeck នៅឡើយទេ។ ជួយបកប្រែ៖",
  kn: "ನಿಮ್ಮ ಸಿಸ್ಟಮ್ ಭಾಷೆಯನ್ನು ಇನ್ನೂ ಸ್ಥಳೀಯವಾಗಿ ModernDeck ಬೆಂಬಲಿಸುವುದಿಲ್ಲ. ಭಾಷಾಂತರಿಸಲು ಸಹಾಯ ಮಾಡಿ:",
  ko: "시스템 언어는 아직 ModernDeck에서 기본적으로 지원되지 않습니다. 번역 도움말 :",
  ku: "Zimanê pergala te ji hêla ModernDeck ve hîn nebûye piştgirî. Alîkarî wergerandin:",
  ky: "Системалык тилиңиз ModernDeck тарабынан азырынча колдоого алынбайт. Которууга жардам бериңиз:",
  la: "Tua ratio linguae, non tamen paternus subnixus ModernDeck. Auxilium interpretari:",
  lb: "Är System Sprooch gëtt nach net vum ModernDeck ënnerstëtzt. Hëlleft Iwwersetze:",
  lo: "ພາສາລະບົບຂອງທ່ານຍັງບໍ່ທັນໄດ້ຮັບການສະ ໜັບ ສະ ໜູນ ຈາກພາສາ ModernDeck ເທື່ອ. ຊ່ວຍແປ:",
  lt: "ModernDeck dar nepalaiko jūsų sistemos kalbos. Padėkite išversti:",
  lv: "ModernDeck jūsu sistēmas valodu vēl neatbalsta. Palīdziet tulkot:",
  mi: "Kaore ano te reo o to rohe e tautokohia ana e te ModernDeck. Āwhina whakamāori:",
  mk: "Вашиот системски јазик сеуште не е поддржан од ModernDeck. Помогне за превод:",
  ml: "നിങ്ങളുടെ സിസ്റ്റം ഭാഷയെ ഇതുവരെ ModernDeck പിന്തുണയ്‌ക്കുന്നില്ല. വിവർത്തനം ചെയ്യാൻ സഹായിക്കുക:",
  mg: "Ny fitenin'ny rafitrasao dia tsy vazaha teratany amin'ny ModernDeck. Hanampy handika:",
  mn: "Таны системийн хэлийг ModernDeck хэлээр хараахан дэмжихгүй байна. Орчуулахад туслах:",
  mr: "आपल्या सिस्टम भाषेस अद्याप मूळ रूपात ModernDeck द्वारे समर्थित नाही. भाषांतर मदत करा:",
  ms: "Bahasa sistem anda belum disokong oleh ModernDeck secara asli. Bantu terjemahkan:",
  mt: "Il-lingwa tas-sistema tiegħek għadha mhix appoġġata b'mod indiġenu minn ModernDeck. Għajnuna fit-traduzzjoni:",
  my: "သင်၏ system language ကို ModernDeck မှမူလအတိုင်းမထောက်ပံ့သေးပါ။ ဘာသာပြန်ကိုကူညီပါ။",
  ne: "तपाईंको प्रणाली भाषा मूल रूप मा ModernDeck द्वारा समर्थित छैन। मद्दत अनुवाद:",
  nl: "Uw systeemtaal wordt nog niet standaard door ModernDeck ondersteund. Help vertalen:",
  no: "Systemspråket ditt støttes ikke av ModernDeck ennå. Hjelp til å oversette:",
  ny: "Zilankhulo zanu sizothandiziridwa mwapadera ndi ModernDeck panobe. Thandizani kutanthauzira:",
  or: "ଆପଣଙ୍କର ସିଷ୍ଟମ୍ ଭାଷା ଏପର୍ଯ୍ୟନ୍ତ ModernDeck ଦ୍ୱାରା ସମର୍ଥିତ ନୁହେଁ | ଅନୁବାଦ କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ:",
  pa: "ਤੁਹਾਡੀ ਸਿਸਟਮ ਭਾਸ਼ਾ ਅਜੇ ਮੂਲ ਰੂਪ ਵਿੱਚ ModernDeck ਦੁਆਰਾ ਸਮਰਥਤ ਨਹੀਂ ਹੈ. ਸਹਾਇਤਾ ਅਨੁਵਾਦ:",
  pl: "Twój język systemowy nie jest jeszcze obsługiwany przez ModernDeck. Pomóż przetłumaczyć:",
  ps: "ستاسو د سیسټم ژبه په اصلي ډول د ModernDeck لخوا ملاتړ شوې نده. مرسته ژباړل:",
  pt: "O idioma do sistema ainda não é suportado nativamente pelo ModernDeck. Ajude a traduzir:",
  ro: "Limba dvs. de sistem nu este încă acceptată nativ de ModernDeck. Ajutor pentru traducere:",
  ru: "Ваш системный язык еще не поддерживается ModernDeck. Помогите перевести:",
  rw: "Ururimi rwa sisitemu ntabwo rushyigikiwe na ModernDeck kugeza ubu. Gufasha guhindura:",
  sd: "توھانجي سسٽم جي ٻولي اصلي طور تي تعاون ٿيل ناھي ModernDeck اڃا تائين. مدد ڪريو ترجمو:",
  si: "ඔබේ පද්ධති භාෂාවට ස්වදේශීයව සහාය නොදක්වයි ModernDeck තවම. පරිවර්තනය කිරීමට උදව් කරන්න:",
  sk: "Váš systémový jazyk nie je natívne podporovaný ModernDeck ešte. Pomôžte s prekladom:",
  sl: "Jezik vašega sistema izvorno ne podpira ModernDeck še. Pomoč pri prevajanju:",
  sm: "O lau gagana gagana e le o lagolagoina ile ModernDeck. Fesoasoani faaliliu:",
  sn: "Mutauro wako wechirongwa hausiko kutsigirwa nawo ModernDeck zvakadaro. Batsira kududzira:",
  so: "Luuqadaada nidaamku asal ahaan kuma taageeraan ModernDeck weli. Caawinta tarjumida:",
  sq: "Gjuha juaj e sistemit nuk mbështetet ende nga ModernDeck akoma. Ndihmoni në përkthimin:",
  sr: "ModernDeck системски језик још не подржава изворно. Помоћ за превођење:",
  st: "Puo ea sistimi ea hau ha e ts'ehetsoe ka tlhaho ke ModernDeck. Thusa ho fetolela:",
  su: "Bahasa sistem anjeun henteu didukung asli ModernDeck acan. Pitulung narjamahkeun:",
  sv: "Ditt systemspråk stöds inte av ModernDeck ännu. Hjälp med att översätta:",
  sw: "Lugha ya mfumo wako haihimiliwi na ModernDeck bado. Saidia kutafsiri:",
  ta: "உங்கள் கணினி மொழி இதற்கு சொந்தமாக ஆதரிக்கப்படவில்லை ModernDeck இன்னும். மொழிபெயர்க்க உதவுங்கள்:",
  te: "మీ సిస్టమ్ భాషకు స్థానికంగా మద్దతు లేదు ModernDeck ఇంకా. అనువదించడానికి సహాయం చేయండి:",
  th: "ภาษาระบบของคุณไม่ได้รับการสนับสนุนโดยกำเนิด ModernDeck ช่วยแปล:",
  tk: "Ulgam diliňiz aslynda goldanylmaýar ModernDeck. Terjime etmäge kömek:",
  tl: "Ang iyong wika wika ay hindi katutubong suportado ng ModernDeck pa. Tulong sa pagsasalin:",
  tg: "Забони системавии шумо бо дастгирии маҳаллӣ дастгирӣ намешавад ModernDeck ҳанӯз. Кӯмак ба тарҷума:",
  tr: "Sistem diliniz yerel olarak tarafından desteklenmiyor ModernDeck henüz. Çeviriye yardım et:",
  tt: "Сезнең система теле туган якта булмый ModernDeck әле. Тәрҗемә итүдә булыш:",
  uk: "Мова вашої системи не підтримується вродженою ModernDeck поки. Допоможіть перекласти:",
  ug: "سىستېما تىلىڭىزنى يەرلىك قوللىمايدۇ ModernDeck تېخى. تەرجىمە ياردەم:",
  ur: "آپ کے سسٹم کی زبان کو مقامی طور پر تائید حاصل نہیں ہےابھی تک ModernDeck. ترجمہ میں مدد کریں:",
  uz: "Tizim tili ona tomonidan qo'llab-quvvatlanmaydi ModernDeck hali. Tarjimaga yordam bering:",
  vi: "Ngôn ngữ hệ thống của bạn không được hỗ trợ bởi ModernDeck chưa. Trợ giúp dịch:",
  xh: "Ulwimi lwenkqubo yakho aluxhaswanga ngokwemveli ModernDeck okwangoku. Nceda uguqulele:",
  yi: "דיין סיסטעם שפּראַך איז נישט געבוירן געבוירן דורך ModernDeck נאָך. הילף איבערזעצן:",
  yo: "Ede eto rẹ ko jẹ ti abinibi nipasẹ ModernDeck sibẹsibẹ. Iranlọwọ pese:",
  zh: "ModernDeck尚不支持您的系統語言。 幫助翻譯：",
  zu: "Ulimi lohlelo lwakho alwesekelwa ngabomdabu I-ModernDeck kuze kube manje. Siza ukuhumusha:"
};

/*
	DataTranslationsMayBeInaccurate.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
var inaccuraciesCodeTable = {
  af: "Vertalings kan onvolledig of onakkuraat wees.",
  am: "ትርጉሞች ያልተሟላ ወይም ትክክል ላይሆኑ ይችላሉ።",
  ar: "قد تكون الترجمات غير مكتملة أو غير دقيقة.",
  az: "Tərcümələr natamam və ya qeyri-dəqiq ola bilər.",
  be: "Пераклады могуць быць няпоўнымі альбо недакладнымі.",
  bn: "অনুবাদগুলি অসম্পূর্ণ বা ভুল হতে পারে।",
  bg: "Преводите може да са непълни или неточни.",
  bs: "Prijevodi mogu biti nepotpuni ili netačni.",
  ca: "Les traduccions poden ser incompletes o inexactes.",
  co: "U traduzzione pò esse incompleta o imprecisa.",
  cs: "Překlady mohou být neúplné nebo nepřesné.",
  cy: "Gall cyfieithiadau fod yn anghyflawn neu'n anghywir.",
  da: "Oversættelser kan være ufuldstændige eller unøjagtige.",
  de: "Übersetzungen können unvollständig oder ungenau sein.",
  el: "Οι μεταφράσεις μπορεί να είναι ελλιπείς ή ανακριβείς.",
  en: "Translations may be incomplete or inaccurate.",
  eo: "Tradukoj povas esti nekompletaj aŭ malĝustaj.",
  es: "Las traducciones pueden ser incompletas o inexactas.",
  et: "Tõlked võivad olla puudulikud või ebatäpsed.",
  eu: "Itzulpenak osatu gabe edo zehaztugabeak izan daitezke.",
  fa: "ترجمه ها ممکن است ناقص یا نادرست باشد.",
  fi: "Käännökset voivat olla puutteellisia tai epätarkkoja.",
  fj: "E rawa ni sega ni taucoko na kena iVakadewa se cala.",
  fr: "Les traductions peuvent être incomplètes ou inexactes.",
  fy: "Oersettingen kinne ûnfolslein of unakkuraat wêze.",
  ga: "Féadfaidh aistriúcháin a bheith neamhiomlán nó míchruinn.",
  gd: "Faodaidh eadar-theangachadh a bhith neo-iomlan no mearachdach.",
  gl: "As traducións poden ser incompletas ou incorrectas.",
  gu: "અનુવાદો અપૂર્ણ અથવા અચોક્કસ હોઈ શકે છે.",
  ha: "Fassarorin na iya zama cikakke ko rashin daidaituwa.",
  he: "תרגומים עשויים להיות לא שלמים או לא מדויקים.",
  hi: "अनुवाद अधूरे या गलत हो सकते हैं।",
  hr: "Prijevodi mogu biti nepotpuni ili netočni.",
  ht: "Tradiksyon yo ka enkonplè oswa kòrèk.",
  hy: "Թարգմանությունները կարող են լինել թերի կամ անճիշտ:",
  hu: "Lehet, hogy a fordítás hiányos vagy pontatlan.",
  id: "Terjemahan mungkin tidak lengkap atau tidak akurat.",
  ig: "Nsụgharị nwere ike ịbụ ezughị ezu ma ọ bụ ezughị oke.",
  is: "Þýðingar geta verið ófullnægjandi eða ónákvæmar.",
  it: "Le traduzioni possono essere incomplete o inesatte.",
  ja: "翻訳は不完全または不正確な場合があります。",
  jv: "Terjemahan bisa uga ora lengkap utawa ora akurat.",
  ka: "თარგმანები შეიძლება იყოს არასრული ან არასწორი.",
  kk: "Аудармалар толық емес немесе дәл емес болуы мүмкін.",
  km: "ការបកប្រែអាចមិនពេញលេញឬមិនត្រឹមត្រូវ។",
  kn: "ಅನುವಾದಗಳು ಅಪೂರ್ಣ ಅಥವಾ ನಿಖರವಾಗಿಲ್ಲದಿರಬಹುದು.",
  ko: "번역이 불완전하거나 정확하지 않을 수 있습니다.",
  ku: "Dibe ku werger kêmasî an şaş be.",
  ky: "Котормолор толук эмес же так эмес болушу мүмкүн.",
  la: "Vulgate sit imperfecta sive parum diligens est.",
  lb: "Iwwersetzunge kënnen onkomplett oder net korrekt sinn.",
  lo: "ການແປອາດຈະບໍ່ຄົບຖ້ວນຫລືບໍ່ຖືກຕ້ອງ.",
  lt: "Vertimai gali būti neišsamūs arba netikslūs.",
  lv: "Tulkojumi var būt nepilnīgi vai neprecīzi.",
  mi: "Kaore pea i te tika, kaore i te tika nga whakamaoritanga.",
  mk: "Преводите може да бидат нецелосни или неточни.",
  ml: "വിവർത്തനങ്ങൾ അപൂർണ്ണമോ കൃത്യമല്ലാത്തതോ ആകാം.",
  mg: "Mety ho tsy feno na tsy marina ny dikan-teny.",
  mn: "Орчуулга дутуу эсвэл буруу байж болно.",
  mr: "भाषांतर अपूर्ण किंवा चुकीची असू शकते.",
  ms: "Terjemahan mungkin tidak lengkap atau tidak tepat.",
  mt: "It-traduzzjonijiet jistgħu ma jkunux kompluti jew mhux eżatti.",
  my: "ဘာသာပြန်ဆိုမှုများသည်မပြည့်စုံနိုင်သို့မဟုတ်မတိကျနိုင်ပါ။",
  ne: "अनुवाद अपूर्ण वा गलत हुन सक्छ।",
  nl: "Vertalingen zijn mogelijk onvolledig of onnauwkeurig.",
  no: "Oversettelser kan være ufullstendige eller unøyaktige.",
  ny: "Kutanthauzira kumatha kukhala kosakwanira kapena kolakwika.",
  or: "ଅନୁବାଦଗୁଡିକ ଅସମ୍ପୂର୍ଣ୍ଣ କିମ୍ବା ଭୁଲ ହୋଇପାରେ |",
  pa: "ਅਨੁਵਾਦ ਅਧੂਰੇ ਜਾਂ ਗਲਤ ਹੋ ਸਕਦੇ ਹਨ.",
  pl: "Tłumaczenia mogą być niepełne lub niedokładne.",
  ps: "ژباړې ممکن نیمګړې یا غلط وي.",
  pt: "As traduções podem estar incompletas ou imprecisas.",
  ro: "Traducerile pot fi incomplete sau inexacte.",
  ru: "Переводы могут быть неполными или неточными.",
  rw: "Ubuhinduzi bushobora kuba butuzuye cyangwa budahwitse.",
  sd: "ترجما نامڪمل يا غلط ٿي سگھن ٿا.",
  si: "පරිවර්තන අසම්පූර්ණ හෝ සාවද්‍ය විය හැකිය.",
  sk: "Preklady môžu byť neúplné alebo nepresné.",
  sl: "Prevodi so lahko nepopolni ali netočni.",
  sm: "O faʻaliliuga atonu e le atoatoa pe le saʻo.",
  sn: "Dudziro dzinogona kunge dzisina kukwana kana kuti dzisina kukwana.",
  so: "Tarjumadu waxay noqon karaan kuwo aan dhammaystirnayn ama khaldan yihiin.",
  sq: "Përkthimet mund të jenë të paplota ose të pasakta.",
  sr: "Преводи могу бити непотпуни или нетачни.",
  st: "Liphetolelo li ka ba tse sa felletseng kapa tse sa nepahalang.",
  su: "Tarjamahan panginten henteu lengkep atanapi henteu pas.",
  sv: "Översättningar kan vara ofullständiga eller felaktiga.",
  sw: "Tafsiri inaweza kuwa haijakamilika au sahihi.",
  ta: "மொழிபெயர்ப்புகள் முழுமையற்றதாகவோ அல்லது துல்லியமாகவோ இருக்கலாம்.",
  te: "అనువాదాలు అసంపూర్ణంగా లేదా సరికానివి కావచ్చు.",
  th: "การแปลอาจไม่สมบูรณ์หรือไม่ถูกต้อง",
  tk: "Terjimeler doly däl ýa-da nädogry bolup biler.",
  tl: "Ang mga pagsalin ay maaaring hindi kumpleto o hindi tumpak.",
  tg: "Тарҷумаҳо нопурра ё носаҳеҳ буда метавонанд.",
  tr: "Çeviriler eksik veya yanlış olabilir.",
  tt: "Тәрҗемәләр тулы булмаган яки төгәл булмаган булырга мөмкин.",
  uk: "Переклади можуть бути неповними або неточними.",
  ug: "تەرجىمىلەر تولۇق ياكى توغرا بولماسلىقى مۇمكىن.",
  ur: "ترجمے نامکمل یا غلط ہوسکتے ہیں۔",
  uz: "Tarjimalar to'liq emas yoki noaniq bo'lishi mumkin.",
  vi: "Bản dịch có thể không đầy đủ hoặc không chính xác.",
  xh: "Iitolikhi zinokungaphelelanga okanye zichanekile.",
  yi: "איבערזעצונגען קען זיין דערענדיקט אָדער ומפּינקטלעך.",
  yo: "Awọn iwe-itumọ le pe tabi aiṣe-deede.",
  zh: "翻译可能不完整或不准确。",
  zu: "Ukuhumusha kungenzeka kungapheleli noma kungalungile."
};

/*
	DataTextThatSaysLanguage.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
var languageText = {
  af: "Taal",
  am: "ቋንቋ",
  ar: "لغة",
  az: "Dil",
  be: "Мова",
  bn: "ভাষা",
  bg: "Език",
  bs: "Jezik",
  ca: "Llenguatge",
  co: "Lingua",
  cs: "Jazyk",
  cy: "Iaith",
  da: "Sprog",
  de: "Sprache",
  el: "Γλώσσα",
  en: "Language",
  eo: "Lingvo",
  es: "Idioma",
  et: "Keel",
  eu: "Hizkuntza",
  fa: "زبان",
  fi: "Kieli",
  fj: "Vosa",
  fr: "Langue",
  fy: "Taal",
  ga: "Teanga",
  gd: "Cànan",
  gl: "Lingua",
  gu: "ભાષા",
  ha: "Harshe",
  he: "שפה",
  hi: "भाषा: हिन्दी",
  hr: "Jezik",
  ht: "Lang",
  hy: "Լեզու",
  hu: "Nyelv",
  id: "Bahasa",
  ig: "Asụsụ",
  is: "Tungumál",
  it: "Linguaggio",
  ja: "言語",
  jv: "Basa",
  ka: "Ენა",
  kk: "Тіл",
  km: "ភាសា",
  kn: "ಭಾಷೆ",
  ko: "언어",
  ku: "Ziman",
  ky: "Tил",
  la: "Lingua",
  lb: "Sprooch",
  lo: "ພາສາ",
  lt: "Kalba",
  lv: "Valoda",
  mi: "Te Reo",
  mk: "Јазик",
  ml: "ഭാഷ",
  mg: "fiteny",
  mn: "Хэл",
  mr: "इंग्रजी",
  ms: "Bahasa",
  mt: "Lingwa",
  my: "ဘာသာစကား",
  ne: "भाषा",
  nl: "Taal",
  no: "Språk",
  ny: "Chilankhulo",
  or: "ଭାଷା",
  pa: "ਭਾਸ਼ਾ",
  pl: "Język",
  ps: "ژبه",
  pt: "Língua",
  ro: "Limba",
  ru: "Язык",
  rw: "Ururimi",
  sd: "ٻولي",
  si: "භාෂාව",
  sk: "Jazyk",
  sl: "Jezik",
  sm: "Gagana",
  sn: "Mutauro",
  so: "Luuqad",
  sq: "Gjuhe",
  sr: "Језик",
  st: "Puo",
  su: "Basa Sunda",
  sv: "Språk",
  sw: "Lugha",
  ta: "மொழி",
  te: "భాషా",
  th: "ภาษา",
  tk: "Dil",
  tl: "Wika",
  tg: "Забон",
  tr: "Dil",
  tt: "Тел",
  uk: "Мова",
  ug: "تىل",
  ur: "زبان",
  uz: "Til",
  vi: "Ngôn ngữ",
  xh: "Ulwimi",
  yi: "שפּראַך",
  yo: "Ede",
  zh: "语言",
  zu: "Ulimi"
};

/*
	UILanguagePicker.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
class UILanguagePicker extends UIModal {
  constructor() {
    super();
    window.languageData = i18nData;
    this.hasMadeChange = false;
    this.element = make("div").addClass("mdl mtd-alert mtd-language-picker");
    this.alertTitle = make("h2").addClass("mtd-alert-title").html("<i class='material-icon'>language</i>" + (languageText[navigator.language.substr(0, 2)] || languageText["en"]));
    this.alertButton = make("button").addClass("btn-primary btn mtd-alert-button hidden").html("OK");
    this.inaccuracy = make("div").addClass("mtd-unsupported-lang mtd-lang-inaccuracies").html((i18nData[navigator.language.substr(0, 2)] && i18nData[navigator.language.substr(0, 2)]["Translations may be incomplete or inaccurate."] ? i18nData[navigator.language.substr(0, 2)]["Translations may be incomplete or inaccurate."] : inaccuraciesCodeTable[navigator.language.substr(0, 2)] || inaccuraciesCodeTable["en"]) + " <a href='https://translate.moderndeck.org'>translate.moderndeck.org</a>");
    this.selectLanguage = make("select").attr("id", "mtd_language_select").append(make("option").val("default").html("-").attr("selected", "true").attr("disabled", "true"), make("option").val("bg").html("български"), make("option").val("cs").html("čeština"), make("option").val("de").html("Deutsche"), make("option").val("en_CA").html("English (Canada)"), make("option").val("en_US").html("English (United States)"), make("option").val("en_GB").html("English (United Kingdom)"), make("option").val("es_ES").html("Español (España)"), make("option").val("es_US").html("Español (Estados Unidos)"), make("option").val("es_419").html("Español (México)"), make("option").val("fr_CA").html("Français (Canada)"), make("option").val("fr_FR").html("Français (France)"), make("option").val("hr").html("Hrvatski"), make("option").val("no").html("norsk"), make("option").val("pl").html("Polskie"), make("option").val("pt_BR").html("Português (Brasil)"), make("option").val("ja").html("日本語"), make("option").val("ru").html("русский"), make("option").val("zh_CN").html("简体中文")).change(() => {
      this.alertTitle.html("<i class='material-icon'>language</i> " + (i18nData.Language[this.selectLanguage.val()] || i18nData.Language[this.selectLanguage.val().substr(0, 2)] || "broken"));
      this.hasMadeChange = true;
      this.alertButton.html(i18nData.OK[this.selectLanguage.val()] || i18nData.OK[this.selectLanguage.val().substr(0, 2)] || "OK");
      this.alertButton.removeClass("hidden");
      this.inaccuracy.html((i18nData[this.selectLanguage.val().substr(0, 2)] && i18nData[this.selectLanguage.val().substr(0, 2)]["Translations may be incomplete or inaccurate."] ? i18nData[this.selectLanguage.val().substr(0, 2)]["Translations may be incomplete or inaccurate."] : inaccuraciesCodeTable[this.selectLanguage.val().substr(0, 2)] || inaccuraciesCodeTable["en"]) + " <a href='https://translate.moderndeck.org'>translate.moderndeck.org</a>");
    });
    setTimeout(() => {
      let mainLang = $("#mtd_language_select>option[value=\"" + navigator.language.substr(0, 2) + "\"]");

      if (mainLang.length > 0) {
        mainLang.attr("selected", "true");
        this.selectLanguage.trigger("change");
      }

      let localLang = $("#mtd_language_select>option[value=\"" + navigator.language.replace(/\-/g, "_") + "\"]");

      if (localLang.length > 0) {
        localLang.attr("selected", "true");
        this.selectLanguage.trigger("change");
      }

      this.hasMadeChange = false;
      setTimeout(() => {
        this.hasMadeChange = false;
      });
    });
    window.inaccuraciesCodeTable = inaccuraciesCodeTable;
    this.alertBody = make("p").addClass("mtd-alert-body").append(this.selectLanguage);
    this.alertButtonContainer = make("div").addClass("mtd-alert-button-container");
    this.unsupportedLang = make("div").addClass("mtd-unsupported-lang").html((unsupportedCodeTable[navigator.language.substr(0, 2)] || unsupportedCodeTable["en"]) + " <a href='https://translate.moderndeck.org'>translate.moderndeck.org</a>");
    this.alertButtonContainer.append(this.alertButton);
    this.alertButton.click(() => {
      setPref("mtd_last_lang", navigator.language);
      setPref("mtd_lang", this.selectLanguage.val());

      if (getFullLanguage() !== this.selectLanguage.val() && getMainLanguage() !== this.selectLanguage.val()) {
        setTimeout(() => location.reload(), 200);
      } else {
        this.dismiss();
      }

      if (window.isInWelcome) {
        setTimeout(() => new window.UIWelcome(), 100);
      }
    });
    this.element.append(this.alertTitle, this.alertBody, this.alertButtonContainer);

    if (!i18nData.GIF[navigator.language.substr(0, 2)]) {
      this.element.append(this.unsupportedLang);
    } else {
      this.element.append(this.inaccuracy);
    } // if ($("#splash-modal").length < 1) {
    // 	this.modalRoot = ".login-container";
    // } else {


    this.modalRoot = "#splash-modal"; // }

    $(this.modalRoot).attr("style", "display: block;").append(this.element);
  }

}

/*
	DataTranslationCredits.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
const translationCredits = `
<b>български</b><br>
vancho1<br>
<a href="https://twitter.com/Khar0s" rel="user" target="_blank">Kharos</a><br>

<br><b>中文</b><br>
<a href="https://twitter.com/N0PELGND" rel="user" target="_blank">DatNopeLegend</a><br>

<br><b>čeština</b><br>
<a href="https://twitter.com/JamesTheWusky" rel="user" target="_blank">JamesTheWusky</a><br>

<br><b>Deutsche</b><br>
<a href="https://twitter.com/FLUFFSQUEAKER" rel="user" target="_blank">milanmat-fluffsqueaker</a><br>
<a href="https://twitter.com/ItsJustMirko" rel="user" target="_blank">Mirko</a><br>
<a href="https://twitter.com/Machtergreifung" rel="user" target="_blank">Machtergreifung</a><br>
<a href="https://twitter.com/TecraFox" rel="user" target="_blank">Tecra</a><br>

<br><b>Español</b><br>
<a href="https://twitter.com/klopma" rel="user" target="_blank">Carlos López</a><br>
<a href="https://twitter.com/dangeredwolf" rel="user" target="_blank">dangeredwolf</a><br>
<a href="https://twitter.com/en_penumbras" rel="user" target="_blank">en_penumbras</a><br>
<a href="https://twitter.com/FibonacciPrower" rel="user" target="_blank">Fibonacci Prower</a><br>
<a href="https://twitter.com/RichardWolfVI" rel="user" target="_blank">Juan Marulanda</a><br>
minyfriki<br>
<a href="https://twitter.com/tetrisdog" rel="user" target="_blank">tetrisdog</a><br>
TAKAHASHI Shuuji<br>

<br><b>Français</b><br>
<a href="https://twitter.com/COLAMAroro" rel="user" target="_blank">COLAMAroro</a><br>
<a href="https://twitter.com/eramdam" rel="user" target="_blank">Damien Erambert</a><br>
<a href="https://twitter.com/embraser01" rel="user" target="_blank">embraser01</a><br>
<a href="https://twitter.com/Fenrykos" rel="user" target="_blank">Fenrykos</a><br>
<a href="https://twitter.com/MuraseEtienne" rel="user" target="_blank">Étienne Murase</a><br>
<a href="https://twitter.com/Meylody_" rel="user" target="_blank">Mélodie</a><br>
<a href="https://twitter.com/Nintenloup_Wolf" rel="user" target="_blank">Nintenloup</a><br>
<a href="https://twitter.com/robot275" rel="user" target="_blank">Robot275</a><br>
<a href="https://twitter.com/ShadyFennec" rel="user" target="_blank">ShadyFennec</a><br>

<br><b>日本語</b><br>
<a href="https://twitter.com/hideki_0403" rel="user" target="_blank">ゆきねこ (hideki_0403)</a><br>
TAKAHASHI Shuuji<br>

<br><b>Hrvatski</b><br>
<a href="https://twitter.com/jptjohnny" rel="user" target="_blank">JPTJohnny</a><br>

<br><b>Polski</b><br>
<a href="https://twitter.com/4D3s12" rel="user" target="_blank">Ad3s12</a><br>
<a href="https://twitter.com/Patryk1023PL" rel="user" target="_blank">Patryk1023</a><br>
<a href="https://twitter.com/PeCeT_full" rel="user" target="_blank">PeCeT_full</a><br>
<a href="https://twitter.com/w1nk000" rel="user" target="_blank">w1nk000</a><br>

<br><b>Português (Brasil)</b><br>
<a href="https://twitter.com/eubyt" rel="user" target="_blank">Adrian César</a><br>
André Gama / ToeOficial<br>
Chef! / chefwireframe<br>

<br><b>русский</b><br>
<a href="https://twitter.com/Sominemo" rel="user" target="_blank">Sominemo</a><br>
<a href="https://twitter.com/coldarchie" rel="user" target="_blank">Archie</a><br>
<a href="https://twitter.com/reig_xvi" rel="user" target="_blank">Cyxtru</a><br>
<a href="https://twitter.com/Tailsray2" rel="user" target="_blank">Tailsray</a><br>
<br>
<br>
`;

/*
	DataSettings.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/

const ctrlShiftText = navigator.userAgent.indexOf("Mac OS X") > -1 ? "⌃⇧" : "{{Ctrl+Shift+}}";
let settingsData$1 = {
  themes: {
    tabName: "<i class='material-icon'>format_paint</i> {{Themes}}",
    options: {
      coretheme: {
        headerBefore: "{{Themes}}",
        title: "{{Core Theme}}",
        type: "dropdown",
        activate: {
          func: opt => {
            if (typeof opt === "undefined" || opt === "undefined") {
              throw "Attempt to pass undefined for mtd_core_theme. This will break TweetDeck across platforms. Something has to be wrong";
            }

            disableStylesheetExtension("dark");
            disableStylesheetExtension("light");

            if (useSafeMode) {
              return;
            }

            if (hasPref("mtd_highcontrast") && getPref$1("mtd_highcontrast") === true) {
              opt = "dark";
            }

            html.removeClass("dark").removeClass("light").addClass(opt);
            TD.settings.setTheme(opt);
            enableStylesheetExtension(opt);

            if (opt === "light" && (isStylesheetExtensionEnabled("amoled") || isStylesheetExtensionEnabled("darker"))) {
              disableStylesheetExtension("darker");
              disableStylesheetExtension("amoled");
              setPref("mtd_theme", "default");
            }

            if (opt === "dark" && isStylesheetExtensionEnabled("paper")) {
              disableStylesheetExtension("paper");
              setPref("mtd_theme", "default");
            }

            if (hasPref("mtd_customcss")) {
              disableStylesheetExtension("customcss");
              enableCustomStylesheetExtension("customcss", getPref$1("mtd_customcss"));
            }
          }
        },
        options: {
          dark: {
            value: "dark",
            text: "{{Dark}}"
          },
          light: {
            value: "light",
            text: "{{Light}}"
          }
        },
        savePreference: false,
        queryFunction: () => {
          html.addClass(TD.settings.getTheme());
          return TD.settings.getTheme();
        },
        settingsKey: "mtd_core_theme",
        default: "dark"
      },
      theme: {
        title: "{{Custom Theme}}",
        type: "dropdown",
        activate: {
          func: opt => {
            if (getPref$1("mtd_highcontrast") === true) {
              return;
            }

            if (useSafeMode) {
              return;
            }

            if (!hasPref("mtd_theme")) {
              setPref("mtd_theme", "default");
            }

            disableStylesheetExtension(getPref$1("mtd_theme"));
            disableStylesheetExtension("amoled");
            setPref("mtd_theme", opt);
            enableStylesheetExtension(opt || "default");

            if ((opt === "amoled" || opt === "darker") && TD.settings.getTheme() === "light") {
              TD.settings.setTheme("dark");
              disableStylesheetExtension("light");
              enableStylesheetExtension("dark");
              html.removeClass("light").addClass("dark");
            }

            if (opt === "paper" && TD.settings.getTheme() === "dark") {
              TD.settings.setTheme("light");
              disableStylesheetExtension("dark");
              enableStylesheetExtension("light");
              html.removeClass("dark").addClass("light");
            }

            if (opt === "black" && TD.settings.getTheme() === "dark") {
              disableStylesheetExtension("black");
              enableStylesheetExtension("amoled");
              setPref("mtd_theme", "amoled");
            }

            if (hasPref("mtd_customcss")) {
              disableStylesheetExtension("customcss");
              enableCustomStylesheetExtension("customcss", getPref$1("mtd_customcss"));
            }
          }
        },
        options: {
          default: {
            value: "default",
            text: "{{Default}}"
          },
          completeLight: {
            name: "{{Complete Light Themes}}",
            children: {
              paper: {
                value: "paper",
                text: "{{Paperwhite}}"
              }
            }
          },
          completeDark: {
            name: "{{Complete Dark Themes}}",
            children: {
              darker: {
                value: "darker",
                text: "{{Darker}}"
              },
              amoled: {
                value: "amoled",
                text: "{{AMOLED}}"
              }
            }
          },
          complementary: {
            name: "{{Complementary Themes}}",
            children: {
              black: {
                value: "black",
                text: "{{Black}}"
              },
              grey: {
                value: "grey",
                text: "{{Grey}}"
              },
              red: {
                value: "red",
                text: "{{Red}}"
              },
              orange: {
                value: "orange",
                text: "{{Orange}}"
              },
              yellow: {
                value: "yellow",
                text: "{{Yellow}}"
              },
              green: {
                value: "green",
                text: "{{Green}}"
              },
              teal: {
                value: "teal",
                text: "{{Teal}}"
              },
              cyan: {
                value: "cyan",
                text: "{{Cyan}}"
              },
              blue: {
                value: "blue",
                text: "{{Blue}}"
              },
              violet: {
                value: "violet",
                text: "{{Violet}}"
              },
              pink: {
                value: "pink",
                text: "{{Pink}}"
              }
            }
          }
        },
        settingsKey: "mtd_theme",
        default: "default"
      },
      selectedFont: {
        title: "{{Preferred Font}}",
        type: "dropdown",
        options: {
          Roboto: {
            value: "Roboto",
            text: "Roboto"
          },
          RobotoCondensed: {
            value: "RobotoCondensed",
            text: "Roboto Condensed"
          },
          RobotoSlab: {
            value: "RobotoSlab",
            text: "Roboto Slab"
          },
          RobotoMono: {
            value: "RobotoMono",
            text: "Roboto Mono"
          },
          OpenSans: {
            value: "OpenSans",
            text: "Open Sans"
          },
          Lato: {
            value: "Lato",
            text: "Lato"
          },
          Jost: {
            value: "Jost",
            text: "Jost"
          }
        },
        activate: {
          func: opt => {
            enableCustomStylesheetExtension("selectedFont", ":root{--selectedFont:" + opt + "!important}");
          }
        },
        settingsKey: "mtd_selectedfont",
        default: "Roboto"
      },
      customCss: {
        title: "{{Custom CSS (}}" + ctrlShiftText + "{{C disables it in case something went wrong)}}",
        type: "textarea",
        placeholder: ":root {\n" + "	--retweetColor:red;\n" + "	--primaryColor:#00ff00!important;\n" + "	--defaultFontOrder:Comic Sans MS;\n" + "}\n\n" + "a:hover {\n" + "	text-decoration:underline\n" + "}",
        activate: {
          func: opt => {
            setPref("mtd_customcss", opt);
            enableCustomStylesheetExtension("customcss", opt);
          }
        },
        settingsKey: "mtd_customcss",
        default: ""
      }
    }
  },
  appearance: {
    tabName: "<i class='material-icon'>rounded_corner</i> {{Appearance}}",
    options: {
      headposition: {
        headerBefore: "{{Navigation}}",
        title: "{{Navigation Style}}",
        type: "dropdown",
        activate: {
          func: opt => {
            if (opt === "top") {
              html.removeClass("mtd-head-left");
              html.removeClass("mtd-classic-nav");
              $(document).trigger("uiNavbarWidthChangeAction", {
                navbarWidth: "condensed"
              });
            } else if (opt === "left") {
              html.addClass("mtd-head-left");
              html.removeClass("mtd-classic-nav");
              $(document).trigger("uiNavbarWidthChangeAction", {
                navbarWidth: "condensed"
              });
            } else if (opt === "classic") {
              html.addClass("mtd-head-left");
              html.addClass("mtd-classic-nav");
            }

            setPref("mtd_headposition", opt);
          }
        },
        options: {
          top: {
            value: "top",
            text: "{{Top}}"
          },
          left: {
            value: "left",
            text: "{{Left}}"
          },
          classic: {
            value: "classic",
            text: "{{Left (Classic)}}"
          }
        },
        settingsKey: "mtd_headposition",
        default: "left"
      },
      fixedarrows: {
        title: "{{Use fixed-location media arrows for tweets with multiple photos}}",
        type: "checkbox",
        activate: {
          enableStylesheet: "fixedarrows"
        },
        deactivate: {
          disableStylesheet: "fixedarrows"
        },
        settingsKey: "mtd_usefixedarrows",
        default: true
      },
      altsensitive: {
        title: "{{Use alternative sensitive media workflow}}",
        type: "checkbox",
        activate: {
          enableStylesheet: "altsensitive",
          htmlAddClass: "mtd-altsensitive"
        },
        deactivate: {
          disableStylesheet: "altsensitive",
          htmlRemoveClass: "mtd-altsensitive"
        },
        settingsKey: "mtd_sensitive_alt",
        default: true
      },
      colNavAlwaysVis: {
        title: "{{Always display column icons in navigator}}",
        type: "checkbox",
        enabled: false,
        activate: {
          htmlAddClass: "mtd-column-nav-always-visible"
        },
        deactivate: {
          htmlRemoveClass: "mtd-column-nav-always-visible"
        },
        settingsKey: "mtd_column_nav_always_visible",
        default: true
      },
      nonewtweetsbutton: {
        title: "{{Enable \"New Tweets\" indicator}}",
        type: "checkbox",
        activate: {
          disableStylesheet: "nonewtweetsbutton"
        },
        deactivate: {
          enableStylesheet: "nonewtweetsbutton"
        },
        settingsKey: "mtd_nonewtweetsbutton",
        default: true
      },
      noemojipicker: {
        title: "{{Enable Emoji picker}}",
        type: "checkbox",
        activate: {
          htmlRemoveClass: "mtd-no-emoji-picker"
        },
        deactivate: {
          htmlAddClass: "mtd-no-emoji-picker"
        },
        settingsKey: "mtd_noemojipicker",
        enabled: false,
        default: true
      },
      scrollbarstyle: {
        headerBefore: "{{Display}}",
        title: "{{Scrollbar Style}}",
        type: "dropdown",
        activate: {
          func: opt => {
            disableStylesheetExtension("scrollbarsnarrow");
            disableStylesheetExtension("scrollbarsnone");
            enableStylesheetExtension(opt || "scrollbarsdefault");
          }
        },
        options: {
          scrollbarsdefault: {
            value: "scrollbarsdefault",
            text: "{{Original}}"
          },
          scrollbarsnarrow: {
            value: "scrollbarsnarrow",
            text: "{{Narrow}}"
          },
          scrollbarsnone: {
            value: "scrollbarsnone",
            text: "{{Hidden}}"
          }
        },
        settingsKey: "mtd_scrollbar_style",
        default: "scrollbarsnarrow"
      },
      columnwidth: {
        title: "{{Column width}}",
        type: "slider",
        activate: {
          func: opt => {
            setPref("mtd_columnwidth", opt);
            enableCustomStylesheetExtension("columnwidth", `:root{--columnSize:${opt}px!important}`);
          }
        },
        minimum: 275,
        maximum: 500,
        settingsKey: "mtd_columnwidth",
        displayUnit: "px",
        default: 325
      },
      fontSize: {
        title: "{{Font size}}",
        type: "slider",
        activate: {
          func: opt => {
            setPref("mtd_fontsize", opt);
            enableCustomStylesheetExtension("fontsize", `html{font-size:${opt / 100 * 16}px!important}`);
          }
        },
        minimum: 75,
        maximum: 130,
        settingsKey: "mtd_fontsize",
        displayUnit: "{{%}}",
        default: 100
      },
      avatarSize: {
        title: "{{Profile picture size}}",
        type: "slider",
        activate: {
          func: opt => {
            //setPref("mtd_avatarsize",opt);
            enableCustomStylesheetExtension("avatarsize", `:root{--avatarSize:${opt}px!important}`);
          }
        },
        minimum: 24,
        maximum: 64,
        enabled: true,
        settingsKey: "mtd_avatarsize",
        displayUnit: "px",
        default: 48
      },
      roundprofilepics: {
        title: "{{Use round profile pictures}}",
        type: "checkbox",
        activate: {
          disableStylesheet: "squareavatars"
        },
        deactivate: {
          enableStylesheet: "squareavatars"
        },
        settingsKey: "mtd_round_avatars",
        default: true
      },
      newcharindicator: {
        title: "{{Use new character limit indicator}}",
        type: "checkbox",
        activate: {
          enableStylesheet: "newcharacterindicator"
        },
        deactivate: {
          disableStylesheet: "newcharacterindicator"
        },
        settingsKey: "mtd_newcharindicator",
        default: true
      },
      nocontextmenuicons: {
        title: "{{Display contextual icons in menus}}",
        type: "checkbox",
        activate: {
          disableStylesheet: "nocontextmenuicons"
        },
        deactivate: {
          enableStylesheet: "nocontextmenuicons"
        },
        settingsKey: "mtd_nocontextmenuicons",
        default: true
      },
      sensitive: {
        title: "{{Display media that may contain sensitive content}}",
        type: "checkbox",
        activate: {
          func: () => {
            TD.settings.setDisplaySensitiveMedia(true);
          }
        },
        deactivate: {
          func: () => {
            TD.settings.setDisplaySensitiveMedia(false);
          }
        },
        savePreference: false,
        queryFunction: () => {
          return TD.settings.getDisplaySensitiveMedia();
        }
      }
    }
  },
  tweets: {
    tabName: "<i class='Icon icon-twitter-bird'></i> {{Tweets}}",
    options: {
      stream: {
        headerBefore: "{{Function}}",
        title: "{{Stream Tweets in real time}}",
        type: "checkbox",
        savePreference: false,
        activate: {
          func: () => {
            TD.settings.setUseStream(true);
          }
        },
        deactivate: {
          func: () => {
            TD.settings.setUseStream(false);
          }
        },
        queryFunction: () => {
          return TD.settings.getUseStream();
        }
      },
      columnvisibility: {
        title: "{{Improve Timeline performance by not rendering off-screen columns}}",
        type: "checkbox",
        activate: {
          func: opt => {
            allColumnsVisible$1();
            updateColumnVisibility(); // setPref("mtd_column_visibility",opt);
          }
        },
        deactivate: {
          func: opt => {
            allColumnsVisible$1(); // setPref("mtd_column_visibility",opt);
          }
        },
        settingsKey: "mtd_column_visibility",
        default: navigator.userAgent.match("Firefox") === null // Firefox is so much faster that column visibility is unlikely to benefit

      },
      autoplayGifs: {
        title: "{{Automatically play GIFs}}",
        type: "checkbox",
        savePreference: false,
        activate: {
          func: () => {
            TD.settings.setAutoPlayGifs(true);
          }
        },
        deactivate: {
          func: () => {
            TD.settings.setAutoPlayGifs(false);
          }
        },
        queryFunction: () => {
          return TD.settings.getAutoPlayGifs();
        }
      },
      startupNotifications: {
        title: "{{Show notifications on startup}}",
        type: "checkbox",
        savePreference: false,
        activate: {
          func: () => {
            TD.settings.setShowStartupNotifications(true);
          }
        },
        deactivate: {
          func: () => {
            TD.settings.setShowStartupNotifications(false);
          }
        },
        queryFunction: () => {
          return TD.settings.getShowStartupNotifications();
        }
      },
      useModernDeckSounds: {
        title: "{{Use custom ModernDeck alert sound}}",
        type: "checkbox",
        activate: {
          func: () => {
            $(document.querySelector("audio")).attr("src", mtdBaseURL + "resources/alert_3.mp3");
          }
        },
        deactivate: {
          func: () => {
            $(document.querySelector("audio")).attr("src", $(document.querySelector("audio>source")).attr("src"));
          }
        },
        settingsKey: "mtd_sounds",
        default: true
      },
      linkshort: {
        headerBefore: "{{Link Shortening}}",
        title: "{{Link Shortener Service}}",
        type: "dropdown",
        activate: {
          func: set => {
            if (shortener === "twitter") {
              $(".bitlyUsername").addClass("hidden");
              $(".bitlyApiKey").addClass("hidden");
            } else if (shortener === "bitly") {
              $(".bitlyUsername").removeClass("hidden");
              $(".bitlyApiKey").removeClass("hidden");
            }

            TD.settings.setLinkShortener(set);
          }
        },
        savePreference: false,
        queryFunction: () => {
          let shortener = TD.settings.getLinkShortener();

          if (shortener === "twitter") {
            $(".bitlyUsername").addClass("hidden");
            $(".bitlyApiKey").addClass("hidden");
          } else if (shortener === "bitly") {
            $(".bitlyUsername").removeClass("hidden");
            $(".bitlyApiKey").removeClass("hidden");
          }

          return shortener;
        },
        options: {
          twitter: {
            value: "twitter",
            text: "{{Twitter}}"
          },
          bitly: {
            value: "bitly",
            text: "{{Bit.ly}}"
          }
        }
      },
      bitlyUsername: {
        title: "{{Bit.ly Username}}",
        type: "textbox",
        activate: {
          func: set => {
            TD.settings.setBitlyAccount({
              apiKey: (TD.settings.getBitlyAccount() && TD.settings.getBitlyAccount().apiKey ? TD.settings.getBitlyAccount() : {
                apiKey: ""
              }).apiKey,
              login: set
            });
          }
        },
        savePreference: false,
        queryFunction: () => {
          return (TD.settings.getBitlyAccount() && TD.settings.getBitlyAccount().login ? TD.settings.getBitlyAccount() : {
            login: ""
          }).login;
        }
      },
      bitlyApiKey: {
        title: "{{Bit.ly API Key}}",
        type: "textbox",
        addClass: "mtd-big-text-box",
        activate: {
          func: set => {
            TD.settings.setBitlyAccount({
              login: (TD.settings.getBitlyAccount() && TD.settings.getBitlyAccount().login ? TD.settings.getBitlyAccount() : {
                login: ""
              }).login,
              apiKey: set
            });
          }
        },
        savePreference: false,
        queryFunction: () => {
          return (TD.settings.getBitlyAccount() && TD.settings.getBitlyAccount().apiKey ? TD.settings.getBitlyAccount() : {
            apiKey: ""
          }).apiKey;
        }
      }
    }
  },
  mutes: {
    tabName: "<i class='material-icon'>volume_off</i> {{Mutes}}",
    options: {},
    enum: "mutepage"
  },
  accessibility: {
    tabName: "<i class='material-icon'>accessibility</i> {{Accessibility}}",
    options: {
      accoutline: {
        headerBefore: "{{Accessibility}}",
        title: "{{Always show outlines around focused items (}}" + ctrlShiftText + "A {{to toggle)}}",
        type: "checkbox",
        activate: {
          htmlAddClass: "mtd-acc-focus-ring"
        },
        deactivate: {
          htmlRemoveClass: "mtd-acc-focus-ring"
        },
        settingsKey: "mtd_outlines",
        default: false
      },
      highcont: {
        title: "{{Enable High Contrast theme (}}" + ctrlShiftText + "H {{to toggle)}}",
        type: "checkbox",
        activate: {
          func: opt => {
            if (TD.settings.getTheme() === "light") {
              TD.settings.setTheme("dark");
              disableStylesheetExtension("light");
              enableStylesheetExtension("dark");
            }

            disableStylesheetExtension(getPref$1("mtd_theme") || "default");
            setPref("mtd_theme", "amoled");
            setPref("mtd_highcontrast", true);
            enableStylesheetExtension("amoled");
            enableStylesheetExtension("highcontrast");
          }
        },
        deactivate: {
          func: opt => {
            setPref("mtd_highcontrast", false);
            disableStylesheetExtension("highcontrast");
          }
        },
        settingsKey: "mtd_highcontrast",
        default: false
      }
    }
  },
  app: {
    tabName: "<i class='icon icon-moderndeck'></i> {{App}}",
    enabled: isApp,
    options: {
      nativeTitlebar: {
        headerBefore: "{{App}}",
        title: "{{Use native OS title bar (restarts ModernDeck)}}",
        type: "checkbox",
        activate: {
          func: () => {
            if (!exists($(".mtd-settings-panel")[0])) {
              return;
            }

            setPref("mtd_nativetitlebar", true);

            const {
              ipcRenderer
            } = require('electron');

            if (!!ipcRenderer) ipcRenderer.send("setNativeTitlebar", true);
          }
        },
        deactivate: {
          func: () => {
            if (!exists($(".mtd-settings-panel")[0])) {
              return;
            }

            setPref("mtd_nativetitlebar", false);

            const {
              ipcRenderer
            } = require('electron');

            if (!!ipcRenderer) ipcRenderer.send("setNativeTitlebar", false);
          }
        },
        settingsKey: "mtd_nativetitlebar",
        default: false
      },
      nativeEmoji: {
        title: "{{Use native Emoji Picker}}",
        type: "checkbox",
        activate: {
          func: (opt, load) => {
            if (!load) {
              $(document).trigger("uiDrawerHideDrawer");
            }

            setPref("mtd_nativeEmoji", true);
          }
        },
        deactivate: {
          func: (opt, load) => {
            if (!load) {
              $(document).trigger("uiDrawerHideDrawer");
            }

            setPref("mtd_nativeEmoji", false);
          }
        },
        enabled: false,
        settingsKey: "mtd_nativeEmoji",
        default: false
      },
      nativeContextMenus: {
        title: "{{Use OS native context menus}}",
        type: "checkbox",
        activate: {
          func: () => {
            useNativeContextMenus = true;
          }
        },
        deactivate: {
          func: () => {
            useNativeContextMenus = false;
          }
        },
        settingsKey: "mtd_nativecontextmenus",
        default: isApp ? process.platform === "darwin" : false
      },
      updateChannel: {
        title: "{{App update channel}}",
        type: "dropdown",
        activate: {
          func: opt => {
            if (!isApp) {
              return;
            }

            setPref("mtd_updatechannel", opt);
            setTimeout(() => {
              const {
                ipcRenderer
              } = require("electron");

              if (!!ipcRenderer) {
                ipcRenderer.send("changeChannel", opt);
                ipcRenderer.send("checkForUpdates");
              }
            }, 300);
          }
        },
        options: {
          latest: {
            value: "latest",
            text: "{{Stable}}"
          },
          beta: {
            value: "beta",
            text: "{{Beta}}"
          }
        },
        enabled: !document.getElementsByTagName("html")[0].classList.contains("mtd-winstore") && !document.getElementsByTagName("html")[0].classList.contains("mtd-macappstore"),
        settingsKey: "mtd_updatechannel",
        default: "latest"
      },
      trayEnabled: {
        headerBefore: "{{Tray}}",
        title: "{{Show ModernDeck in the system tray}}",
        type: "checkbox",
        activate: {
          func: () => {
            if (typeof require === "undefined") {
              return;
            }

            const {
              ipcRenderer
            } = require("electron");

            ipcRenderer.send("enableTray");
          }
        },
        deactivate: {
          func: () => {
            if (typeof require === "undefined") {
              return;
            }

            const {
              ipcRenderer
            } = require("electron");

            ipcRenderer.send("disableTray");
          }
        },
        settingsKey: "mtd_systemtray",
        default: typeof process !== "undefined" && process.platform !== "darwin"
      },
      backgroundNotifications: {
        title: "{{Run ModernDeck in the background to deliver notifications}}",
        type: "checkbox",
        activate: {
          func: () => {
            if (typeof require === "undefined") {
              return;
            }

            const {
              ipcRenderer
            } = require("electron");

            ipcRenderer.send("enableBackground");
          }
        },
        deactivate: {
          func: () => {
            if (typeof require === "undefined") {
              return;
            }

            const {
              ipcRenderer
            } = require("electron");

            ipcRenderer.send("disableBackground");
          }
        },
        settingsKey: "mtd_background",
        default: false
      },
      inspectElement: {
        headerBefore: "{{Developer}}",
        title: "{{Show Inspect Element in context menus}}",
        type: "checkbox",
        activate: {
          func: () => {
            setPref("mtd_inspectElement", true);
          }
        },
        deactivate: {
          func: () => {
            setPref("mtd_inspectElement", false);
          }
        },
        settingsKey: "mtd_inspectElement",
        default: false
      },
      mtdSafeMode: {
        title: "{{Safe mode}}",
        label: "{{Is something broken? Enter Safe Mode.}}",
        type: "link",
        activate: {
          func: () => {
            enterSafeMode();
          }
        },
        enabled: isApp
      }
    }
  },
  system: {
    tabName: "<i class='material-icon'>storage</i> {{System}}",
    options: {
      mtdResetSettings: {
        title: "{{Reset settings}}",
        label: "<i class=\"icon material-icon mtd-icon-very-large\">restore</i><b>{{Reset settings}}</b><br>{{If you want to reset ModernDeck to default settings, you can do so here. This will restart ModernDeck.}}",
        type: "button",
        activate: {
          func: () => {
            purgePrefs();

            if (isApp) {
              const {
                ipcRenderer
              } = require('electron');

              ipcRenderer.send('restartApp');
            } else {
              window.location.reload();
            }
          }
        },
        settingsKey: "mtd_resetSettings"
      },
      mtdClearData: {
        title: "{{Clear data}}",
        label: "<i class=\"icon material-icon mtd-icon-very-large\">delete_forever</i><b>{{Clear data}}</b><br>{{This option clears all caches and preferences. This option will log you out and restart ModernDeck.}}",
        type: "button",
        activate: {
          func: () => {
            if (isApp) {
              const {
                ipcRenderer
              } = require('electron');

              ipcRenderer.send('destroyEverything');
            }
          }
        },
        settingsKey: "mtd_resetSettings",
        enabled: isApp
      },
      mtdSaveBackup: {
        title: "{{Save backup}}",
        label: "<i class=\"icon material-icon mtd-icon-very-large\">save_alt</i><b>{{Save backup}}</b><br>{{Saves your preferences to a file to be loaded later.}}",
        type: "button",
        activate: {
          func: () => {
            const app = require("electron").remote;

            const dialog = app.dialog;

            const fs = require("fs");

            const {
              ipcRenderer
            } = require('electron');

            let preferences = JSON.stringify(store.store);
            dialog.showSaveDialog({
              title: I18n("ModernDeck Preferences"),
              filters: [{
                name: I18n("Preferences JSON File"),
                extensions: ["json"]
              }]
            }, file => {
              if (file === undefined) {
                return;
              }

              fs.writeFile(file, preferences, e => {});
            });
          }
        },
        settingsKey: "mtd_backupSettings",
        enabled: isApp
      },
      mtdLoadBackup: {
        title: "{{Load backup}}",
        label: "<i class=\"icon material-icon mtd-icon-very-large\">refresh</i><b>{{Load backup}}</b><br>{{Loads your preferences that you have saved previously. This will restart ModernDeck.}}",
        type: "button",
        activate: {
          func: () => {
            const app = require("electron").remote;

            const dialog = app.dialog;

            const fs = require("fs");

            const {
              ipcRenderer
            } = require('electron');

            dialog.showOpenDialog({
              filters: [{
                name: I18n("Preferences JSON File"),
                extensions: ["json"]
              }]
            }, file => {
              if (file === undefined) {
                return;
              }

              fs.readFile(file[0], "utf-8", (e, load) => {
                store.store = JSON.parse(load);
                ipcRenderer.send("restartApp");
              });
            });
          }
        },
        settingsKey: "mtd_loadSettings",
        enabled: isApp
      },
      mtdTweetenImport: {
        title: "{{Import Tweeten settings}}",
        label: "<i class=\"icon material-icon mtd-icon-very-large\">refresh</i><b>{{Import Tweeten settings}}</b><br>{{Imports your Tweeten settings to ModernDeck. This will restart ModernDeck.}}",
        type: "button",
        activate: {
          func: () => {
            const app = require("electron").remote;

            const dialog = app.dialog;

            const fs = require("fs");

            const {
              ipcRenderer
            } = require('electron');

            dialog.showOpenDialog({
              filters: [{
                name: I18n("Tweeten Settings JSON"),
                extensions: ["json"]
              }]
            }, file => {
              if (file === undefined) {
                return;
              }

              fs.readFile(file[0], "utf-8", (e, load) => {
                importTweetenSettings(JSON.parse(load));
                setTimeout(() => {
                  ipcRenderer.send("restartApp");
                }, 500); // We wait to make sure that native TweetDeck settings have been propagated
              });
            });
          }
        },
        settingsKey: "mtd_tweetenImportSettings",
        enabled: isApp
      },
      tdLegacySettings: {
        title: "{{Legacy settings}}",
        label: "{{Did TweetDeck add a new feature we're missing? Visit legacy settings}}",
        type: "link",
        activate: {
          func: () => {
            openLegacySettings();
          }
        }
      }
    }
  },
  language: {
    tabName: "<i class='material-icon'>language</i> {{Language}}",
    options: {
      mtdResetSettings: {
        title: "{{Change Language}}",
        label: "<b>{{Changing your language will restart ModernDeck}}</b>",
        type: "button",
        activate: {
          func: () => {
            mtdPrepareWindows();
            new UILanguagePicker();
          }
        },
        settingsKey: "mtd_resetSettings"
      },
      translationCredits: {
        label: "{{Some awesome people have helped translate ModernDeck into other languages}}",
        type: "buttons",
        buttons: [{
          text: "{{Help Translate}}",
          func: () => open("http://translate.moderndeck.org/project/tweetdeck/invite")
        }, {
          text: "{{Translation Credits}}",
          func: () => new UIAlert({
            title: I18n("Translation Credits"),
            message: translationCredits
          }).alertButton.remove()
        }]
      }
    }
  },
  about: {
    tabName: "<i class='material-icon'>info_outline</i> {{About}}",
    tabId: "about",
    options: {},
    enum: "aboutpage"
  },
  internalSettings: {
    enabled: false,
    options: {
      collapsedColumns: {
        type: "array",
        activate: {
          func: e => {
            if (!e) {
              return;
            }

            e.forEach((a, i) => {
              getColumnFromColumnNumber(a).addClass("mtd-collapsed");
            });
            setTimeout(() => {
              $(document).trigger("uiMTDColumnCollapsed");
            }, 300);
          }
        },
        settingsKey: "mtd_collapsed_columns",
        default: []
      },
      lastVersion: {
        type: "textbox",
        activate: {
          func: e => {
            if (window.SystemVersion !== getPref$1("mtd_last_version")) ;
          }
        },
        settingsKey: "mtd_last_version",
        default: []
      },
      replaceFavicon: {
        type: "checkbox",
        activate: {
          func: () => {
            $("link[rel=\"shortcut icon\"]").attr("href", mtdBaseURL + "resources/img/favicon.ico");
          }
        },
        settingsKey: "mtd_replace_favicon",
        savePreference: false,
        default: true
      }
    }
  }
};

/*
	StoragePreferences.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
let store$1;

if (isApp) {
  const Store = require('electron-store');

  store$1 = new Store({
    name: "mtdsettings"
  });
}

function getPref$1(id, defaul) {
  if (id === "mtd_core_theme") {
    return TD.settings.getTheme();
  }

  let val;

  if (store$1) {
    if (store$1.has(id)) val = store$1.get(id);else val = undefined;
  } else {
    val = localStorage.getItem(id);
  }
  if (typeof val === "undefined") return defaul;
  if (val === "true") return true;else if (val === "false") return false;else return val;
}
/*
	purgePrefs()
	Purges all settings. This is used when you reset ModernDeck in settings

	https://github.com/dangeredwolf/ModernDeck/wiki/Preference-Management-Functions
*/

function purgePrefs() {
  for (let key in localStorage) {
    if (key.indexOf("mtd_") >= 0) {
      localStorage.removeItem(key);
    }
  }

  if (isApp) {
    store$1.clear();
  }
}
/*
	setPref(String preferenceKey, [mixed types] value)
	Sets preference to value

	https://github.com/dangeredwolf/ModernDeck/wiki/Preference-Management-Functions
*/

function setPref(id, p) {
  if (id === "mtd_core_theme") {
    return;
  }

  if (exists(store$1)) {
    // Newer versions of electron-store are more strict about using delete vs. set undefined
    if (typeof p !== "undefined") {
      store$1.set(id, p);
    } else {
      store$1.delete(id);
    }
  } else {
    localStorage.setItem(id, p);
  }
}
/*
	hasPref(String preferenceKey)
	return boolean: whether or not the preference manager (electron-store on app, otherwise localStorage) contains a key

	https://github.com/dangeredwolf/ModernDeck/wiki/Preference-Management-Functions
*/

function hasPref(id) {
  let hasIt;

  if (typeof id === "undefined") {
    throw "id not specified for hasPref";
  }

  if (id === "mtd_core_theme") {
    return true;
  }

  if (exists(store$1)) {
    hasIt = store$1.has(id);
  } else {
    hasIt = localStorage.getItem(id) !== null && typeof localStorage.getItem(id) !== "undefined" && localStorage.getItem(id) !== undefined;
  }
  return hasIt;
}
/*
	dumpPreferences()

	returns string: dump of user preferences, for diag function
*/

function dumpPreferences() {
  let prefs = "";

  for (let key in settingsData$1) {
    if (!settingsData$1[key].enum) {
      for (let i in settingsData$1[key].options) {
        let prefKey = settingsData$1[key].options[i].settingsKey;
        let pref = settingsData$1[key].options[i];

        if (exists(prefKey) && pref.type !== "button" && pref.type !== "link") {
          prefs += prefKey + ": " + (getPref$1(prefKey) || "[not set]") + "\n";
        }
      }
    }
  }

  return prefs;
}

/*
	TweetDeck i18n v2
	Copyright (c) 2018-2020 dangered wolf, et al.
	Released under the MIT license
*/
let tweetDeckTranslateInitial;
let langFull;
let langRoot; // ModernDeck specific code, safe to ignore within tweetdeck-i18n

if (window.ModernDeck) {
  console.log("I18n: Detected ModernDeck");
  langFull = getPref$1("mtd_lang");

  if (!langFull) {
    langFull = navigator.language.replace("-", "_");
  }

  langRoot = langFull.substring(0, 2);
} else {
  console.log("I18n: Detected TweetDeck i18n");
  langFull = "ja_JP"; //navigator.language.replace("-","_");

  langRoot = "ja"; //navigator.language.substring(0,2);
}

const getFullLanguage = () => langFull;
const getMainLanguage = () => langRoot;
const getFallbackLanguage = () => "en";
const mustachePatches = {
  "keyboard_shortcut_list.mustache": {
    "Open Navigation Drawer/Menu": 1,
    "Command palette — <b>NEW!</b>": 1,
    "Cmd &#8984;": 1,
    "Like": 1,
    "Add Column": 1,
    "Actions": 1,
    "Reply": 1,
    "Retweet": 1,
    "New Tweet": 1,
    "Direct Message": 1,
    "View user profile": 1,
    "View Tweet details": 1,
    "Close Tweet details": 1,
    "Send Tweet": 1,
    "Enter": 1,
    "Backspace": 1,
    "Ctrl": 1,
    "Add column": 1,
    "This menu": 1,
    "Right": 1,
    "Left": 1,
    "Down": 1,
    "Up": 1,
    "Navigation": 1,
    "Column 1－9": 1,
    "Final column": 1,
    "Expand/Collapse navigation": 1,
    "Search": 1,
    "Return": 1
  },
  "twitter_profile_social_proof.mustache": {
    "and": 1
  },
  "status/tweet_detail.mustache": {
    "Reply to": 1
  },
  "menus/quality_filter_info.mustache": {
    "Quality filter {{qualityFilterText}}": 1
  },
  "lists/edit_list_details.mustache": {
    "Under 100 characters, optional": 1
  },
  "customtimeline/edit_customtimeline.mustache": {
    "Under 160 characters, optional": 1
  },
  "menus/dm_conversations_menu.mustache": {
    "Delete conversation": 1
  }
};
const I18n = function (a, b, c, d, e, f) {
  if (!a) {
    console.warn("The I18n function was supposed to receive data but didn't. Here's some other information, if they aren't undefined: ", a, b, c, d, e);
    return "";
  }

  a = String(a);

  if ((a.includes("{{{") || a.includes("{{")) && !f) {
    let hmm = I18n(a, b, c, d, e, 1);
    let no = I18n(hmm, b, c, d, e, 2);
    return no;
  } // if (a.includes("{{{") && f === 2) {
  // 	for (const key in b) {
  // 		const replaceMe = b[key][getFullLanguage()] || b[key][getMainLanguage()] || b[key][getFallbackLanguage()];
  //
  // 		a = a.replace(/\{\{\{"+key+"\}\}\}/g,"\{\{\{"+replaceMe+"\}\}\}");
  // 	}
  // 	return a;
  // }


  if (a.includes("{{") && f === 2) {
    return tweetDeckTranslateInitial(a, b, c, d, e);
  }

  if (a.substr(0, 6) === "From @") {
    // 2020-05-04: I don't remember if this edge case is still necessary
    return I18n(a.substr(0, 4)) + " @" + a.substr(6);
  }

  if (!b || f === 1) {
    if (i18nData[a]) {
      return i18nData[a][getFullLanguage()] || i18nData[a][getMainLanguage()] || i18nData[a][getFallbackLanguage()];
    } else {
      console.warn("Missing string translation: " + a);
      return ( "") + a;
    }
  } else {
    for (const key in b) {
      a = a.replace("{{" + key + "}}", b[key]);
    }

    return a;
  }
};

function patchColumnTitle() {
  if (TD && mR) {
    var columnData = mR.findFunction("getColumnTitleArgs")[0].columnMetaTypeToTitleTemplateData;

    for (var key in columnData) {
      columnData[key].title = I18n(columnData[key].title);
    }
  } else {
    console.log("Waiting for mR to be ready...");
    setTimeout(patchColumnTitle, 10);
    return;
  }
}

function patchButtonText() {
  if (TD && mR) {
    let buttonData = mR.findFunction("tooltipText");

    for (let i = 0; i < buttonData.length; i++) {
      if (buttonData[i]) {
        if (buttonData[i].buttonText) {
          for (const key in buttonData[i].buttonText) {
            buttonData[i].buttonText[key] = I18n(buttonData[i].buttonText[key]);
          }
        }

        if (buttonData[i].tooltipText) {
          for (const key in buttonData[i].tooltipText) {
            buttonData[i].tooltipText[key] = I18n(buttonData[i].tooltipText[key]);
          }
        }
      }
    }
  } else {
    console.log("Waiting for mR to be ready...");
    setTimeout(patchButtonText, 10);
    return;
  }
}

function patchColumnTitleAddColumn() {
  if (TD && TD.controller && TD.controller.columnManager && TD.controller.columnManager.DISPLAY_ORDER) {
    let columnData = TD.controller.columnManager.DISPLAY_ORDER;

    for (const key in columnData) {
      columnData[key].title = I18n(columnData[key].title);

      if (columnData[key].attribution) {
        columnData[key].attribution = I18n(columnData[key].attribution);
      }
    }
  } else {
    console.log("Waiting for DISPLAY_ORDER and etc to be ready...");
    setTimeout(patchColumnTitleAddColumn, 10);
    return;
  }
}

function patchMustaches() {
  if (TD_mustaches) {
    for (const key in mustachePatches) {
      if (TD_mustaches[key]) {
        for (const key2 in mustachePatches[key]) {
          try {
            TD_mustaches[key] = TD_mustaches[key].replace(new RegExp(key2, "g"), I18n(key2));
          } catch (e) {
            console.error("An error occurred while replacing mustache " + key2 + " in " + key);
            console.error(e);
          }
        }
      } else {
        console.warn("Mustache " + key + " was specified but was not found");
      }
    }
  } else {
    console.log("Waiting on TD_mustaches...");
    setTimeout(patchMustaches, 10);
    return;
  }
}

function patchMiscStrings() {
  if (TD && TD.constants && TD.constants.TDApi) {
    for (const key2 in TD.constants.TDApi) {
      TD.constants.TDApi[key2] = I18n(key2);
    }
  } else {
    console.log("Waiting on TDApi...");
    setTimeout(patchMiscStrings, 10);
    return;
  }

  if (TD && TD.controller && TD.controller.columnManager) {
    if (TD.controller.columnManager.DISPLAY_ORDER_PROFILE) {
      for (const key2 in TD.controller.columnManager.DISPLAY_ORDER_PROFILE) {
        let prof = TD.controller.columnManager.DISPLAY_ORDER_PROFILE[key2];
        prof.title = I18n(prof.title);
      }
    }

    if (TD.controller.columnManager.MENU_TITLE) {
      for (const key2 in TD.controller.columnManager.MENU_TITLE) {
        TD.controller.columnManager.MENU_TITLE[key2] = I18n(TD.controller.columnManager.MENU_TITLE[key2]);
      }
    }

    if (TD.controller.columnManager.MENU_ATTRIBUTION) {
      for (const key2 in TD.controller.columnManager.MENU_ATTRIBUTION) {
        TD.controller.columnManager.MENU_ATTRIBUTION[key2] = I18n(TD.controller.columnManager.MENU_ATTRIBUTION[key2]);
      }
    }

    if (TD.controller.columnManager.MODAL_TITLE) {
      for (const key2 in TD.controller.columnManager.MODAL_TITLE) {
        TD.controller.columnManager.MODAL_TITLE[key2] = I18n(TD.controller.columnManager.MODAL_TITLE[key2]);
      }
    } // let apiErrors = findFunction("This user has been");
    // if (apiErrors[0]) {
    // 	for (const key2 in apiErrors[0]) {
    // 		console.log(key2);
    // 		apiErrors[0][key2] =
    // 		I18n(apiErrors[0][key2]);
    // 	}
    // }
    // if (apiErrors[1]) {
    // 	for (const key2 in apiErrors[1]) {
    // 		console.log(key2);
    // 		apiErrors[1][key2] =
    // 		I18n(apiErrors[1][key2]);
    // 	}
    // }

  } else {
    console.log("Waiting on TDApi...");
    setTimeout(patchMiscStrings, 10);
    return;
  }
}

function patchTDFunctions() {
  if (mR && mR.findFunction && mR.findFunction("en-x-psaccent")[0]) {
    tweetDeckTranslateInitial = mR.findFunction("en-x-psaccent")[0].default;
    mR.findFunction("en-x-psaccent")[0].default = I18n;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newMonths = [];
    months.forEach(month => newMonths.push(I18n(month)));
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let newShortMonths = [];
    shortMonths.forEach(month => newShortMonths.push(I18n(month)));
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let newDays = [];
    days.forEach(day => newDays.push(I18n(day)));
    const shortDays = ["ABBREV_SUNDAY", "ABBREV_MONDAY", "ABBREV_TUESDAY", "ABBREV_WEDNESDAY", "ABBREV_THURSDAY", "ABBREV_FRIDAY", "ABBREV_SATURDAY"];
    const englishShortDays = ["S", "M", "T", "W", "T", "F", "S"];
    let newShortDays = [];
    shortDays.forEach((day, i) => {
      let translatedDay = I18n(day);

      if (translatedDay.match("ABBREV") !== null) {
        translatedDay = englishShortDays[i];
      }

      newShortDays.push(translatedDay);
    });
    mR.findFunction("jQuery")[0].tools.dateinput.localize("en", {
      months: newMonths.join(","),
      shortMonths: newShortMonths.join(","),
      days: newDays.join(","),
      shortDays: newShortDays.join(",")
    });
    let firstDay = parseInt(I18n("CALENDAR_FIRST_DAY_NUMBER"));

    if (isNaN(firstDay)) {
      firstDay = 0;
    }

    mR.findFunction("jQuery")[0].tools.dateinput.conf.firstDay = firstDay;
  } else {
    setTimeout(patchTDFunctions, 10);
  }
}

function startI18nEngine() {
  if (window.TweetDecki18nStarted) {
    return;
  }

  window.TweetDecki18nStarted = true; // Developer helper function to find strings within the mustache cluster

  window.findMustaches = str => {
    let results = {};

    for (let mustache in TD_mustaches) {
      if (TD_mustaches[mustache].match(str)) {
        results[mustache] = TD_mustaches[mustache];
      }
    }

    return results;
  };

  patchTDFunctions();
  patchMiscStrings();
  patchColumnTitle();
  patchButtonText();
  patchColumnTitleAddColumn();
  patchMustaches();
}
window.I18n = I18n;
startI18nEngine();

class AutoUpdateController {
  constructor() {
    _defineProperty(this, "h3", void 0);

    _defineProperty(this, "h2", void 0);

    _defineProperty(this, "tryAgain", void 0);

    _defineProperty(this, "restartNow", void 0);

    _defineProperty(this, "spinner", void 0);

    _defineProperty(this, "icon", void 0);

    _defineProperty(this, "isCheckingForUpdates", void 0);
  }

  static initialize() {
    if (typeof require === "undefined") {
      return;
    }

    const {
      ipcRenderer
    } = require("electron");

    ipcRenderer.on("error", (e, args, f, g) => {
      AutoUpdateController.h2 = I18n("There was a problem checking for updates.");
      AutoUpdateController.spinner = false;

      if (args === null || args === void 0 ? void 0 : args.code) {
        AutoUpdateController.h3 = `${args.domain || ""} ${args.code || ""} ${args.errno || ""} ${args.syscall || ""} ${args.path || ""}`;
      } else if (f) {
        AutoUpdateController.h3 = f.match(/^(Cannot check for updates: )(.)+\n/g);
      } else {
        AutoUpdateController.h3 = I18n("An unknown error occurred. Please try again shortly.");
      }

      AutoUpdateController.icon = "error_outline";
      AutoUpdateController.tryAgain = I18n("Try Again");
      AutoUpdateController.restartNow = false;
      AutoUpdateController.isCheckingForUpdates = false;
      $(document).trigger("mtdUpdateUIChanged");
    });
    ipcRenderer.on("checking-for-update", (e, args) => {
      AutoUpdateController.icon = undefined;
      AutoUpdateController.spinner = true;
      AutoUpdateController.h2 = I18n("Checking for updates...");
      AutoUpdateController.h3 = undefined;
      AutoUpdateController.updateh3 = undefined;
      AutoUpdateController.tryAgain = undefined;
      AutoUpdateController.restartNow = false;
      $("[id='update'] .mtd-welcome-next-button").html(I18n("Skip") + "<i class='icon icon-arrow-r'></i>");
      AutoUpdateController.isCheckingForUpdates = true;
      $(document).trigger("mtdUpdateUIChanged");
    });
    ipcRenderer.on("update-available", (e, args) => {
      AutoUpdateController.icon = undefined;
      AutoUpdateController.spinner = true;
      AutoUpdateController.h2 = I18n("Updating...");
      AutoUpdateController.h3 = undefined;
      AutoUpdateController.tryAgain = undefined;
      AutoUpdateController.restartNow = false;
      AutoUpdateController.isCheckingForUpdates = true;
      $(document).trigger("mtdUpdateUIChanged");
    });
    ipcRenderer.on("download-progress", (e, args) => {
      AutoUpdateController.icon = undefined;
      AutoUpdateController.spinner = true;
      AutoUpdateController.h2 = I18n("Downloading update...");
      AutoUpdateController.h3 = Math.floor(args.percent) + I18n("% complete (") + formatBytes(args.transferred) + I18n("/") + formatBytes(args.total) + I18n("; ") + formatBytes(args.bytesPerSecond) + "/s)";
      AutoUpdateController.tryAgain = undefined;
      AutoUpdateController.restartNow = false;
      AutoUpdateController.isCheckingForUpdates = true;
      $(document).trigger("mtdUpdateUIChanged");
    });
    ipcRenderer.on("update-downloaded", (e, args) => {
      AutoUpdateController.spinner = false;
      AutoUpdateController.icon = "update";
      AutoUpdateController.h2 = I18n("Update downloaded");
      AutoUpdateController.h3 = I18n("Restart ModernDeck to complete the update");
      AutoUpdateController.tryAgain = undefined;
      AutoUpdateController.restartNow = true;
      AutoUpdateController.isCheckingForUpdates = false;
      $(document).trigger("mtdUpdateUIChanged");
    });
    ipcRenderer.on("update-not-available", (e, args) => {
      AutoUpdateController.spinner = false;
      AutoUpdateController.h2 = I18n("You're up to date");
      AutoUpdateController.icon = "check_circle";
      AutoUpdateController.h3 = SystemVersion + I18n(" is the latest version.");
      AutoUpdateController.tryAgain = I18n("Check Again");
      AutoUpdateController.restartNow = false;
      $("[id='update'] .mtd-welcome-next-button").html(I18n("Next") + "<i class='icon icon-arrow-r'></i>");
      AutoUpdateController.isCheckingForUpdates = false;
      $(document).trigger("mtdUpdateUIChanged");
    });
  }

}

/*
	UIDiag.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	diag makes it easier for developers to narrow down user-reported bugs.
	You can call this via command line, or by pressing Ctrl+Alt+D
*/

function diag() {
  let log = "";
  log += I18n("The following diagnostic report contains information about your version of ModernDeck.\
	It contains a list of your preferences, but does not contain information related to your Twitter account(s).\
	A ModernDeck developer may request a copy of this diagnostic report to help diagnose problems.\n\n");
  log += "======= Begin ModernDeck Diagnostic Report =======\n\n";
  log += "\nModernDeck Version " + version + " (Build " + buildId + ")";
  log += "\nTD.buildID: " + (TD && TD.buildID ? TD.buildID : "[not set]");
  log += "\nTD.version: " + (TD && TD.version ? TD.version : "[not set]");
  log += "\nisDev: " + isDev;
  log += "\nisApp: " + isApp;
  log += "\nmtd-winstore: " + html.hasClass("mtd-winstore");
  log += "\nmtd-macappstore: " + html.hasClass("mtd-macappstore");
  log += "\nUser agent: " + navigator.userAgent;
  log += "\n\nLoaded extensions:\n";
  let loadedExtensions = [];
  $(".mtd-stylesheet-extension").each(e => {
    loadedExtensions[loadedExtensions.length] = $(".mtd-stylesheet-extension")[e].href.match(/(([A-z0-9_\-])+\w+\.[A-z0-9]+)/g);
  });
  log += loadedExtensions.join(", ");
  log += "\n\nLoaded external components:\n";
  let loadedComponents = [];
  $(".mtd-stylesheet-component").each(e => {
    loadedComponents[loadedComponents.length] = $(".mtd-stylesheet-component")[e].href.match(/(([A-z0-9_\-])+\w+\.[A-z0-9]+)/g);
  });
  log += loadedComponents.join(", ");
  log += "\n\nUser preferences: \n" + dumpPreferences();
  log += "\n\n======= End ModernDeck Diagnostic Report =======\n";
  console.log(log);

  try {
    showDiag(log);
  } catch (e) {
    console.error("An error occurred trying to show the diagnostic menu");
    console.error(e);
    lastError = e;
  }
}
/*
	Helper for diag() which renders the diagnostic results on screen if possible
*/

function showDiag(str) {
  mtdPrepareWindows();
  let diagText = make("p").addClass('mtd-diag-text').html(str.replace(/\n/g, "<br>"));
  let container = make("div").addClass("mtd-settings-inner mtd-diag-inner scroll-v").append(diagText);
  let panel = make("div").addClass("mdl mtd-settings-panel").append(container);
  new TD.components.GlobalSettings();
  $("#settings-modal>.mdl").remove();
  $("#settings-modal").append(panel);
  return panel;
}

/*
	DataWelcome.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
const demoColumn = `<section class="column js-column will-animate"><div class="column-holder js-column-holder"><div class="flex flex-column height-p--100 column-panel"><header class="flex-shrink--0 column-header"><i class="pull-left icon column-type-icon icon-home"></i><div class="flex column-title flex-justify-content--space-between"><div class="flex column-header-title flex-align--center flex-grow--2 flex-wrap--wrap"><span class=column-heading>${I18n("Home")}</span> <span class="txt-ellipsis attribution txt-mute txt-sub-antialiased vertical-align--baseline">@dangeredwolf</span></div></div></header><div class="flex flex-column height-p--100 mtd-example-column column-content flex-auto position-rel"><div class="position-rel column-scroller scroll-v"><div class="chirp-container js-chirp-container"><article class="is-actionable stream-item"><div class="item-box js-show-detail js-stream-item-content"><div class="js-tweet tweet"><header class="flex flex-align--baseline flex-row js-tweet-header tweet-header"><a class="account-link block flex-auto link-complex"><div class="position-rel item-img obj-left tweet-img"><img class="avatar pin-top-full-width tweet-avatar"src=https://pbs.twimg.com/profile_images/1134136444577091586/LBv0Nhjq_normal.png style=border-radius:10px!important></div><div class=nbfc><span class="txt-ellipsis account-inline"><b class="fullname link-complex-target">ModernDeck</b> <span class="txt-mute username">@ModernDeck</span></span></div></a><time class="txt-mute flex-shrink--0 tweet-timestamp"><a class="no-wrap txt-size-variable--12">${I18n("now")}</a></time></header><div class="js-tweet-body tweet-body"><div class="txt-ellipsis nbfc txt-size-variable--12"></div><p class="js-tweet-text tweet-text with-linebreaks"style=padding-bottom:0>This tweet is quite light!</div></div><footer class="cf tweet-footer"><ul class="full-width js-tweet-actions tweet-actions"><li class="pull-left margin-r--10 tweet-action-item"><a class="position-rel tweet-action js-reply-action"href=# rel=reply><i class="pull-left icon txt-center icon-reply"></i> <span class="margin-t--1 pull-right txt-size--12 margin-l--2 icon-reply-toggle js-reply-count reply-count">1</span> <span class=is-vishidden>${I18n("Reply")}</span> <span class=reply-triangle></span></a><li class="pull-left margin-r--10 tweet-action-item"><a class=tweet-action href=# rel=retweet><i class="pull-left icon txt-center icon-retweet icon-retweet-toggle js-icon-retweet"></i> <span class="margin-t--1 pull-right txt-size--12 icon-retweet-toggle js-retweet-count margin-l--3 retweet-count">4</span></a><li class="pull-left margin-r--10 tweet-action-item"><a class="position-rel tweet-action js-show-tip"href=# rel=favorite data-original-title=""><i class="pull-left icon txt-center icon-favorite icon-favorite-toggle js-icon-favorite"></i> <span class="margin-t--1 pull-right txt-size--12 margin-l--2 icon-favorite-toggle js-like-count like-count">20</span></a><li class="pull-left margin-r--10 tweet-action-item position-rel"><a class=tweet-action href=# rel=actionsMenu><i class="icon icon-more txt-right"></i></a></ul></footer><div class=js-show-this-thread></div></div></article></div></div></div></div><div class="flex flex-column height-p--100 column-panel column-detail js-column-detail"></div><div class="flex flex-column height-p--100 column-panel column-detail-level-2 js-column-social-proof"></div></div></section>`;
let _welcomeData = {
  welcome: {
    title: "<i class='icon icon-moderndeck icon-xxlarge mtd-welcome-head-icon' style='color:var(--secondaryColor)'></i>" + I18n("Welcome to ModernDeck!"),
    body: I18n("We're glad to have you here. Click Next to continue."),
    nextFunc: () => {
      let currentTheme = settingsData$1.themes.options.coretheme.queryFunction();
      $(window.mtd_welcome_dark).click(() => {
        parseActions(settingsData$1.themes.options.coretheme.activate, "dark");
        $(".mtd-welcome-inner .tweet-text").html(I18n("This tweet is quite dark!"));
      });
      $(window.mtd_welcome_light).click(() => {
        parseActions(settingsData$1.themes.options.coretheme.activate, "light");
        $(".mtd-welcome-inner .tweet-text").html(I18n("This tweet is quite light!"));
      });

      switch (currentTheme) {
        case "dark":
          mtd_welcome_dark.click();
          break;

        case "light":
          mtd_welcome_light.click();
          break;
      }

      if (typeof require === "undefined" || !isApp || html.hasClass("mtd-winstore") || html.hasClass("mtd-macappstore")) {
        return;
      }

      const {
        ipcRenderer
      } = require('electron');

      ipcRenderer.send('checkForUpdates');
    }
  },
  update: {
    title: I18n("Checking for updates..."),
    body: I18n("This should only take a few seconds."),
    html: "",
    enabled: false,
    nextText: I18n("Skip")
  },
  theme: {
    title: I18n("Pick a core theme"),
    body: I18n("There are additional options for themes in <i class='icon icon-settings'></i> <b>Settings</b>"),
    html: `<div class="obj-left mtd-welcome-theme-picker">
			<label class="fixed-width-label radio">
			<input type="radio" name="theme" id="mtd_welcome_dark" value="dark">
				${I18n("Dark")}
			</label>
			<label class="fixed-width-label radio">
			<input type="radio" name="theme" id="mtd_welcome_light" value="light">
				${I18n("Light")}
			</label>
		</div>` + demoColumn,
    prevFunc: () => {
      if (!require || !isApp || html.hasClass("mtd-winstore") || html.hasClass("mtd-macappstore")) {
        return;
      }

      const {
        ipcRenderer
      } = require("electron");

      ipcRenderer.send("checkForUpdates");
    },
    nextFunc: () => {
      $(window.mtd_welcome_top).click(() => parseActions(settingsData$1.appearance.options.headposition.activate, "top"));
      $(window.mtd_welcome_left).click(() => parseActions(settingsData$1.appearance.options.headposition.activate, "left"));
      $(window.mtd_welcome_classic).click(() => parseActions(settingsData$1.appearance.options.headposition.activate, "classic"));
      let pos = getPref$1("mtd_headposition");

      if (pos === "top") {
        $("input[value='top']").click();
      } else if (pos === "classic") {
        $("input[value='classic']").click();
      } else {
        $("input[value='left']").click();
      }
    }
  },
  layout: {
    title: I18n("Select a layout"),
    body: I18n("<b>Top:</b> Your column icons are laid out along the top. Uses navigation drawer.<br>") + I18n("<b>Left:</b> Your column icons are laid out along the left side. Uses navigation drawer.<br>") + I18n("<b>Left (Classic):</b> Left, but uses classic TweetDeck navigation methods instead of drawer."),
    html: `<div class="obj-left mtd-welcome-theme-picker">
			<label class="fixed-width-label radio">
			<input type="radio" name="layout" id="mtd_welcome_top" value="top">
				${I18n("Top")}
			</label>
			<label class="fixed-width-label radio">
			<input type="radio" name="layout" id="mtd_welcome_left" value="left">
				${I18n("Left")}
			</label>
			<label class="fixed-width-label radio">
			<input type="radio" name="layout" id="mtd_welcome_classic" value="classic">
				${I18n("Left (Classic)")}
			</label>
		</div>`,
    nextFunc: () => {
      if (getPref$1("mtd_headposition") === "classic") {
        $(".mtd-settings-subpanel:last-child .mtd-welcome-body").html(_welcomeData.done.body.replace("YOU_SHOULDNT_SEE_THIS", I18n("the settings menu <i class='icon icon-settings'></i>")));
      } else {
        $(".mtd-settings-subpanel:last-child .mtd-welcome-body").html(_welcomeData.done.body.replace("YOU_SHOULDNT_SEE_THIS", I18n("the navigation drawer <i class='icon mtd-nav-activator'></i>")));
      }
    }
  },
  done: {
    title: I18n("You're set for now!"),
    body: I18n("Don't worry, there are plenty of other options to make ModernDeck your own.<br><br>These options are located in <i class='icon icon-settings'></i> <b>Settings</b>, accessible via YOU_SHOULDNT_SEE_THIS"),
    html: ""
  }
};

/*
	UIWelcome.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
let welcomeData = _welcomeData;
const debugWelcome = false;
class UIWelcome extends UIModal {
  constructor() {
    super();
    window.isInWelcome = true;

    try {
      allColumnsVisible();
    } catch (e) {}

    welcomeData.update.enabled = isApp && !html.hasClass("mtd-winstore") && !html.hasClass("mtd-macappstore");
    welcomeData.update.html = makeUpdateCont();
    mtdPrepareWindows();
    disableStylesheetExtension("light");
    enableStylesheetExtension("dark");
    setTimeout(() => {
      $("#settings-modal").off("click");
    }, 0);
    $(".app-content,.app-header").remove();
    $(".application").attr("style", `background-image:url(${mtdBaseURL}resources/img/bg1.jpg)`);
    $(".message-banner").attr("style", "display: none;");

    if ($(".mtd-language-picker").length > 0) {
      //language > welcome
      return;
    }

    this.container = make("div").addClass("mtd-settings-inner mtd-welcome-inner");
    this.element = make("div").addClass("mdl mtd-settings-panel").append(this.container);

    for (var key in welcomeData) {
      let welc = welcomeData[key];

      if (welc.enabled === false) {
        continue;
      }

      let subPanel = make("div").addClass("mtd-settings-subpanel mtd-col scroll-v").attr("id", key);
      subPanel.append(make("h1").addClass("mtd-welcome-head").html(welc.title), make("p").addClass("mtd-welcome-body").html(welc.body));

      if (welc.html) {
        subPanel.append(make("div").addClass("mtd-welcome-html").html(welc.html));
      }

      let button = make("button").html("<i class='icon icon-arrow-l'></i>" + I18n("Previous")).addClass("btn btn-positive mtd-settings-button mtd-welcome-prev-button").click(function () {
        $(".mtd-settings-inner").css("margin-left", (subPanel.index() - 1) * -700 + "px");

        if (typeof welc.prevFunc === "function") {
          welc.prevFunc();
        }
      });
      let button2 = make("button").html((key === "update" ? I18n("Skip") : I18n("Next")) + "<i class='icon icon-arrow-r'></i>").addClass("btn btn-positive mtd-settings-button mtd-welcome-next-button").click(function () {
        $(".mtd-settings-inner").css("margin-left", (subPanel.index() + 1) * -700 + "px");

        if (typeof welc.nextFunc === "function") {
          welc.nextFunc();
        }
      });

      if (key === "done") {
        button2.html(I18n("Done")).off("click").click(() => {
          setPref("mtd_welcomed", true);
          window.location.reload();
        });
      }

      subPanel.append(button, button2);
      this.container.append(subPanel);
    }

    this.display();
    let theme = TD.settings.getTheme();

    if (theme === "dark") {
      $("input[value='dark']").click();
    } else if (theme === "light") {
      $("input[value='light']").click();
    }

    return this;
  }

}

/*
	DataMustaches.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
const _newLoginPage = '<div class="app-signin-wrap mtd-signin-wrap">\
	<div class="js-signin-ui app-signin-form pin-top pin-right txt-weight-normal">\
		<section class="js-login-form form-login startflow-panel-rounded" data-auth-type="twitter">\
			<h2 class="form-legend padding-axl">\
				Good evening!\
			</h2>\
			<h3 class="form-legend padding-axl">\
				' + I18n("Welcome to ModernDeck") + '\
			</h3>\
			<i class="icon icon-moderndeck"></i>\
			<div class="margin-a--16">\
				<div class="js-login-error form-message form-error-message error txt-center padding-al margin-bxl is-hidden">\
					<p class="js-login-error-message">\
						' + I18n("An unexpected error occurred. Please try again later.") + '\
					</p>\
				</div>\
				<a href="https://mobile.twitter.com/login?hide_message=true&amp;redirect_after_login=https%3A%2F%2Ftweetdeck.twitter.com%2F%3Fvia_twitter_login%3Dtrue" class="Button Button--primary block txt-size--18 txt-center btn-positive">\
					' + I18n("Sign in with Twitter") + '\
				</a>\
				<div class="divider-bar"></div>\
			</section>\
		</div>\
	</div>\
</div>';
const spinnerSmall = '<div class="preloader-wrapper active">\
	<div class="spinner-layer small">\
		<div class="circle-clipper left">\
			<div class="circle"></div>\
		</div>\
		<div class="gap-patch">\
			<div class="circle"></div>\
		</div>\
		<div class="circle-clipper right">\
			<div class="circle"></div>\
		</div>\
	</div>\
</div>';
const spinnerLarge = '<div class="preloader-wrapper active">\
	<div class="spinner-layer">\
		<div class="circle-clipper left">\
			<div class="circle"></div>\
		</div>\
		<div class="gap-patch">\
			<div class="circle"></div>\
		</div>\
		<div class="circle-clipper right">\
			<div class="circle"></div>\
		</div>\
	</div>\
</div>';
const spinnerTiny = '<div class="preloader-wrapper active">\
	<div class="spinner-layer tiny">\
		<div class="circle-clipper left">\
			<div class="circle"></div>\
		</div>\
		<div class="gap-patch">\
			<div class="circle"></div>\
		</div>\
		<div class="circle-clipper right">\
			<div class="circle"></div>\
		</div>\
	</div>\
</div>';
const buttonSpinner = '<div class="js-spinner-button-active icon-center-16 spinner-button-icon-spinner preloader-wrapper active tiny">\
	<div class="spinner-layer small">\
		<div class="circle-clipper left">\
			<div class="circle"></div>\
		</div>\
		<div class="gap-patch">\
			<div class="circle"></div>\
		</div>\
		<div class="circle-clipper right">\
			<div class="circle"></div>\
		</div>\
	</div>\
</div>';

/*
	UIGifPicker.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
const giphyKey = "Vb45700bexRDqCkbMdUmBwDvtkWT9Vj2"; // swiper no swipey

let lastGiphyURL = "";
let isLoadingMoreGifs = false;
function initGifPanel() {
  $(".mtd-gif-button").off("click").click(() => {
    checkGifEligibility();

    if ($(".mtd-gif-button").hasClass("is-disabled")) {
      return;
    }

    if (window.mtdEmojiPicker) {
      try {
        window.mtdEmojiPicker.hidePicker();
      } catch (e) {
        console.error("failed to hide emoji picker");
        console.error(e);
        lastError = e;
      }
    }

    if ($(".mtd-gif-container").length <= 0) {
      createGifPanel();
    }

    $(".mtd-gif-container").toggleClass("mtd-gif-container-open");

    if ($(".mtd-gif-container").hasClass("mtd-gif-container-open")) {
      $(".mtd-gif-search").val("");
      trendingGifPanel();
    } else {
      $(".mtd-gif-container").remove();
    }
  });
}
/*
	Creates the GIF panel, also handles scroll events to load more GIFs
*/

function createGifPanel() {
  if ($(".mtd-gif-container").length > 0) {
    return;
  }

  checkGifEligibility();
  $(".drawer .compose-text-container").after(make("div").addClass("scroll-v popover mtd-gif-container").append(make("div").addClass("mtd-gif-header").append( //make("h1").addClass("mtd-gif-header-text").html(I18n("Trending")),
  make("input").addClass("mtd-gif-search").attr("placeholder", I18n("Search GIFs...")).change(() => {
    searchGifPanel($(".mtd-gif-search").val());
  }), make("img").attr("src", mtdBaseURL + "resources/img/giphy2.png").addClass("mtd-giphy-logo"), make("button").addClass("mtd-gif-top-button").append(make("i").addClass("icon icon-arrow-u"), I18n("Go back up")).click(() => {
    $(".drawer .compose>.compose-content>.antiscroll-inner.scroll-v.scroll-styled-v").animate({
      scrollTop: "0px"
    });
  }), make("div").addClass("mtd-gif-no-results list-placeholder hidden").html(I18n("We couldn't find anything matching what you searched. Give it another shot."))), make("div").addClass("mtd-gif-column mtd-gif-column-1"), make("div").addClass("mtd-gif-column mtd-gif-column-2")));
  $(".drawer .compose>.compose-content>.antiscroll-inner.scroll-v.scroll-styled-v").scroll(function () {
    // no fancy arrow functions, we're using $(this)
    if ($(this).scrollTop() > $(document).height() - 200) {
      $(".mtd-gif-header").addClass("mtd-gif-header-fixed popover");
    } else {
      $(".mtd-gif-header").removeClass("mtd-gif-header-fixed popover");
    }

    if (isLoadingMoreGifs) {
      return;
    }

    if ($(this).scrollTop() + $(this).height() > $(this).prop("scrollHeight") - 200) {
      isLoadingMoreGifs = true;
      loadMoreGifs();
    }
  });
} // https://staxmanade.com/2017/02/how-to-download-and-convert-an-image-to-base64-data-url/


async function getBlobFromUrl(imageUrl) {
  let res = await fetch(imageUrl);
  let blob = await res.blob();
  return new Promise((resolve, reject) => {
    resolve(blob);
    return blob;
  });
}
/*
	Renders a specific GIF, handles click function
*/


function renderGif(preview, mainOg) {
  let main = mainOg;
  return make("img").attr("src", preview).click(function () {
    getBlobFromUrl(main).then(img => {
      let eventThing = {
        originalEvent: {
          dataTransfer: {
            files: [img]
          }
        }
      };
      let buildEvent = jQuery.Event("dragenter", eventThing);
      let buildEvent2 = jQuery.Event("drop", eventThing);
      console.info("alright so these are the events we're gonna be triggering:");
      console.info(buildEvent);
      console.info(buildEvent2);
      $(".mtd-gif-container").removeClass("mtd-gif-container-open").delay(300).remove();
      $(document).trigger(buildEvent);
      $(document).trigger(buildEvent2);
    });
  });
}
/*
	Renders GIF results page
*/


function renderGifResults(data, error) {
  $(".mtd-gif-container .preloader-wrapper").remove();
  let col1 = $(".mtd-gif-column-1");
  let col2 = $(".mtd-gif-column-2");
  $(".mtd-gif-no-results").addClass("hidden");

  if (data.length === 0 || data === "error") {
    col1.children().remove();
    col2.children().remove();
    $(".mtd-gif-no-results").removeClass("hidden");

    if (data === "error") {
      $(".mtd-gif-no-results").html(I18n("An error occurred while trying to fetch results.") + (error || ""));
    } else {
      $(".mtd-gif-no-results").html(I18n("We couldn't find anything matching what you searched. Give it another shot."));
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (i % 2 === 0) {
      col1.append(renderGif(data[i].images.preview_gif.url, data[i].images.original.url));
    } else {
      col2.append(renderGif(data[i].images.preview_gif.url, data[i].images.original.url));
    }
  }
}
/*
	Main thread for a gif panel search
*/


function searchGifPanel(query) {
  $(".mtd-gif-column-1").children().remove();
  $(".mtd-gif-column-2").children().remove();
  $(".mtd-gif-no-results").addClass("hidden");
  isLoadingMoreGifs = true;
  let sanitiseQuery = query.replace(/\s/g, "+").replace(/\&/g, "&amp;").replace(/\?/g, "").replace(/\//g, " OR ");
  lastGiphyURL = "https://api.giphy.com/v1/gifs/search?q=" + sanitiseQuery + "&api_key=" + giphyKey + "&limit=20";
  $.ajax({
    url: lastGiphyURL
  }).done(e => {
    renderGifResults(e.data);
  }).error(e => {
    console.error("Error trying to fetch gifs");
    console.error(e);
    lastError = e;
    renderGifResults("error", e);
  }).always(() => {
    isLoadingMoreGifs = false;
  });
}
/*
	GIF panel when you first open it up, showing trending GIFs
*/


function trendingGifPanel() {
  $(".mtd-gif-column-1").children().remove();
  $(".mtd-gif-column-2").children().remove();
  $(".mtd-gif-no-results").addClass("hidden");
  isLoadingMoreGifs = true;
  lastGiphyURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + giphyKey + "&limit=20";
  $.ajax({
    url: lastGiphyURL
  }).done(e => {
    renderGifResults(e.data);
  }).error(e => {
    console.log(e);
    console.error("Error trying to fetch gifs");
    lastError = e;
    renderGifResults("error", e);
  }).always(() => {
    isLoadingMoreGifs = false;
  });
}
/*
	Let's load some more gifs from Giphy, triggered by scrolling
*/


function loadMoreGifs() {
  isLoadingMoreGifs = true;
  $.ajax({
    url: lastGiphyURL + "&offset=" + $(".mtd-gif-container img").length
  }).done(e => {
    renderGifResults(e.data);
  }).error(e => {
    console.log(e);
    console.error("Error trying to fetch gifs");
    lastError = e;
    renderGifResults("error", e);
  }).always(() => {
    isLoadingMoreGifs = false;
  });
}
/*
	Disables adding GIFs if there's already an image (or GIF) attached to a Tweet.

	You can only send 1 GIF per tweet after all.
*/


function checkGifEligibility() {
  let disabledText = ""; // has added images

  if ($(".compose-media-grid-remove,.compose-media-bar-remove").length > 0) {
    disabledText = I18n("You cannot upload a GIF with other images");
  } // has quoted tweet


  if ($(".compose-content .quoted-tweet").length > 0) {
    disabledText = I18n("Quoted Tweets cannot contain GIFs");
  }

  if (disabledText !== "") {
    $(".mtd-gif-button").addClass("is-disabled").attr("data-original-title", disabledText);
    $(".mtd-gif-container").remove();
  } else {
    $(".mtd-gif-button").removeClass("is-disabled").attr("data-original-title", "");
  }
}

/*
	UINavDrawer.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
/*
	function getProfileInfo()

	Returns object of default account profile info, used to show your profile pic and background in nav drawer
*/

function getProfileInfo() {
  var _TD, _TD$cache, _TD$cache$twitterUser, _TD$cache$twitterUser2, _TD$cache$twitterUser3, _TD$storage, _TD$storage$accountCo, _TD$storage$accountCo2, _TD$storage$accountCo3;

  return ((_TD = TD) === null || _TD === void 0 ? void 0 : (_TD$cache = _TD.cache) === null || _TD$cache === void 0 ? void 0 : (_TD$cache$twitterUser = _TD$cache.twitterUsers) === null || _TD$cache$twitterUser === void 0 ? void 0 : (_TD$cache$twitterUser2 = _TD$cache$twitterUser.getByScreenName) === null || _TD$cache$twitterUser2 === void 0 ? void 0 : (_TD$cache$twitterUser3 = _TD$cache$twitterUser2.call(_TD$cache$twitterUser, (_TD$storage = TD.storage) === null || _TD$storage === void 0 ? void 0 : (_TD$storage$accountCo = _TD$storage.accountController) === null || _TD$storage$accountCo === void 0 ? void 0 : (_TD$storage$accountCo2 = _TD$storage$accountCo.getPreferredAccount("twitter")) === null || _TD$storage$accountCo2 === void 0 ? void 0 : (_TD$storage$accountCo3 = _TD$storage$accountCo2.state) === null || _TD$storage$accountCo3 === void 0 ? void 0 : _TD$storage$accountCo3.username)) === null || _TD$cache$twitterUser3 === void 0 ? void 0 : _TD$cache$twitterUser3.results[0]) || null;
}
/* Puts your profile picture and header in the navigation drawer :)  */


function profileSetup() {
  let profileInfo = getProfileInfo();

  if (profileInfo === null || typeof profileInfo === "undefined" || typeof profileInfo._profileBannerURL === "undefined" || profileInfo.profileImageURL === "undefined") {
    setTimeout(profileSetup, 150);
    return;
  }

  let bannerPhoto = profileInfo._profileBannerURL.search("empty") > 0 ? "" : profileInfo._profileBannerURL;
  let avatarPhoto = profileInfo.profileImageURL.replace("_normal", "");
  let name = profileInfo.name;
  let username = profileInfo.screenName;
  $(mtd_nd_header_image).attr("style", "background-image:url(" + bannerPhoto + ");"); // Fetch header and place in nav drawer

  $(mtd_nd_header_photo).attr("src", avatarPhoto) // Fetch profile picture and place in nav drawer
  .mouseup(() => {
    let profileLinkyThing = $(document.querySelector(".account-settings-bb a[href=\"https://twitter.com/" + getProfileInfo().screenName + "\"]"));
    mtdPrepareWindows();

    if (profileLinkyThing.length > -1) {
      setTimeout(() => {
        profileLinkyThing.click();
      }, 200);
    }
  });
  $(mtd_nd_header_username).html(name); // Fetch twitter handle and place in nav drawer

  $(mtd_nd_header_atname).html("@" + username); // Fetch twitter handle and place in nav drawer
}

function UINavDrawer() {
  $(".app-header-inner").append(make("a").attr("id", "mtd-navigation-drawer-button").attr("data-original-title", I18n("Navigation drawer")).addClass("js-header-action mtd-drawer-button link-clean cf app-nav-link").html('<div class="obj-left"><div class="mtd-nav-activator"></div><div class="nbfc padding-ts"></div>').click(() => {
    if (exists(mtd_nav_drawer_background)) {
      $("#mtd_nav_drawer_background").removeClass("hidden");
    }

    if (exists(mtd_nav_drawer)) {
      $("#mtd_nav_drawer").attr("class", "mtd-nav-drawer");
    }
  }));
  $("body").append(make("div").attr("id", "mtd_nav_drawer").addClass("mtd-nav-drawer hidden").append(make("img").attr("id", "mtd_nd_header_image").addClass("mtd-nd-header-image").attr("style", ""), make("img").addClass("avatar mtd-nd-header-photo").attr("id", "mtd_nd_header_photo").attr("src", "").click(() => {
    $('a[data-user-name="' + getProfileInfo().screenName + '"][rel="user"][href="#"]')[0].click();
  }), make("div").addClass("mtd-nd-header-username").attr("id", "mtd_nd_header_username").html("PROFILE ERROR"), make("div").addClass("mtd-nd-header-atname").attr("id", "mtd_nd_header_atname").html("Tell @dangeredwolf i said hi"), make("button").addClass("btn mtd-nav-button mtd-nav-first-button").attr("id", "tdaccsbutton").append(make("i").addClass("icon icon-user-switch")).click(() => {
    mtdPrepareWindows();
    $(".js-show-drawer.js-header-action").click();
  }).append(I18n("Your accounts")), make("button").addClass("btn mtd-nav-button").attr("id", "addcolumn").append(make("i").addClass("icon icon-plus")).click(() => {
    mtdPrepareWindows();
    TD.ui.openColumn.showOpenColumn();
  }).append(I18n("Add column")), make("div").addClass("mtd-nav-divider"), make("button").addClass("btn mtd-nav-button").attr("id", "kbshortcuts").append(make("i").addClass("icon icon-keyboard")).click(() => {
    mtdPrepareWindows();
    setTimeout(() => {
      $(".js-app-settings").click();
    }, 10);
    setTimeout(() => {
      $("a[data-action='keyboardShortcutList']").click();
    }, 20);
  }).append(I18n("Keyboard shortcuts")), make("button").addClass("btn mtd-nav-button").attr("id", "mtdsettings").append(make("i").addClass("icon icon-settings")).click(() => {
    openSettings$1();
  }).append(I18n("Settings")), make("div").addClass("mtd-nav-divider"), make("button").addClass("btn mtd-nav-button mtd-nav-group-expand").attr("id", "mtd_nav_expand").append(make("i").addClass("icon mtd-icon-arrow-down").attr("id", "mtd_nav_group_arrow")).click(() => {
    $("#mtd_nav_group").toggleClass("mtd-nav-group-expanded");
    $("#mtd_nav_group_arrow").toggleClass("mtd-nav-group-arrow-flipped");
    $("#mtd_nav_drawer").toggleClass("mtd-nav-drawer-group-open");
  }).append(I18n("More...")), make("div").addClass("mtd-nav-group mtd-nav-group-expanded").attr("id", "mtd_nav_group").append(make("button").addClass("btn mtd-nav-button").append(make("i").addClass("icon mtd-icon-changelog")).click(() => {
    mtdPrepareWindows();
    window.open("https://twitter.com/i/tweetdeck_release_notes");
  }).append(I18n("TweetDeck Release Notes")), make("button").addClass("btn mtd-nav-button").append(make("i").addClass("icon icon-search")).click(() => {
    mtdPrepareWindows();
    setTimeout(() => {
      $(".js-app-settings").click();
    }, 10);
    setTimeout(() => {
      $("a[data-action=\"searchOperatorList\"]").click();
    }, 20);
  }).append(I18n("Search tips")), make("div").addClass("mtd-nav-divider"), make("button").addClass("btn mtd-nav-button").attr("id", "mtd_signout").append(make("i").addClass("icon icon-logout")).click(() => {
    TD.controller.init.signOut();
  }).append(I18n("Sign out"))), make("div").addClass("mtd-nav-divider mtd-nav-divider-feedback"), make("button").addClass("btn mtd-nav-button mtd-nav-button-feedback").attr("id", "mtdfeedback").append(make("i").addClass("icon icon-feedback")).click(() => {
    window.open("https://github.com/dangeredwolf/ModernDeck/issues");
  }).append(I18n("Send feedback"))), make("div").attr("id", "mtd_nav_drawer_background").addClass("mtd-nav-drawer-background hidden").click(function () {
    $(this).addClass("hidden");
    $(mtd_nav_drawer).addClass("hidden");
    $(".mtd-nav-group-expanded").removeClass("mtd-nav-group-expanded");
    $("#mtd_nav_group_arrow").removeClass("mtd-nav-group-arrow-flipped");
  }));
  $(".mtd-nav-group-expanded").removeClass("mtd-nav-group-expanded");

  try {
    var _TD2, _TD2$config, _TD2$config$config_ov, _TD2$config$config_ov2;

    if ((_TD2 = TD) === null || _TD2 === void 0 ? void 0 : (_TD2$config = _TD2.config) === null || _TD2$config === void 0 ? void 0 : (_TD2$config$config_ov = _TD2$config.config_overlay) === null || _TD2$config$config_ov === void 0 ? void 0 : (_TD2$config$config_ov2 = _TD2$config$config_ov.tweetdeck_dogfood) === null || _TD2$config$config_ov2 === void 0 ? void 0 : _TD2$config$config_ov2.value) {
      $(".mtd-nav-group").append(make("button").addClass("btn mtd-nav-button").append(make("i").addClass("icon mtd-icon-command-pallete")).click(() => {
        mtdPrepareWindows();
        $(document).trigger("uiShowCommandPalette");
      }).append(I18n("Command palette")), make("button").addClass("btn mtd-nav-button").append(make("i").addClass("icon mtd-icon-developer")).click(() => {
        mtdPrepareWindows();
        $(document).trigger("uiReload", {
          params: {
            no_dogfood: 1
          }
        });
      }).append(I18n("Disable dev/dogfood")));
    }
  } catch (e) {
    console.error("An error occurred in navigationSetup while trying to verify if dev/dogfood features are enabled or not");
    console.error(e);
    lastError = e;
  }

  $(".mtd-nav-group-expanded").attr("style", "height:" + $(".mtd-nav-group-expanded").height() + "px");
  profileSetup();
}

/*
	FunctionPatcher.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
function FunctionPatcher() {
  if (window.localStorage && typeof require === "undefined") {
    window.localStorage.actuallyClear = window.localStorage.clear;

    window.localStorage.clear = () => {
      console.log("CLEAR");
      window.localStorage.removeItem("accountsLastVerified", undefined);
      window.localStorage.removeItem("guestID", undefined);
      window.localStorage.removeItem("length", undefined);
      window.localStorage.removeItem("twitterAccountID", undefined);
      window.localStorage.removeItem("typeaheadTopicsHash", undefined);
      window.localStorage.removeItem("typeaheadTopicsLastPrefetch", undefined);
      window.localStorage.removeItem("typeaheadUserHash", undefined);
      window.localStorage.removeItem("typeaheadUserLastPrefetch", undefined);
    };
  }

  if (window.TD && window.TD.util) {
    window.TD.util.isWrapperApp = () => true;

    window.deck = {
      osname: () => {
        if (navigator.appVersion.indexOf("Win") > -1) {
          return "windows";
        } else if (navigator.appVersion.indexOf("Mac") > -1) {
          return "osx";
        }

        return "linux";
      },
      getWrapperVersion: () => window.version,
      inApp: () => true,
      tearDown: () => {},
      doGrowl: (title, text, icon, tweet, column) => {
        console.warn("doGrowl: ", title, text, icon, tweet, column);
        let col = TD.controller.columnManager.get(column);
        let tweetObj;
        let notif = new Notification(title, {
          body: text,
          icon: icon,
          silent: true
        });

        notif.onclick = () => {
          col.updateArray.forEach(privateTweetObj => {
            if (privateTweetObj.id === tweet) {
              tweetObj = privateTweetObj;
            }
          });
          TD.ui.updates.showDetailView(col, tweetObj);
        };
      },
      setTheme: str => {
        console.log("Theme: " + str);
      },
      authenticateOn: () => {
        console.warn("authenticateOn");
        return {
          hide: () => {},
          deleteLater: () => {}
        };
      },
      closeLoadingScreen: () => {
        console.warn("closeLoadingScreen");
      }
    };
  } else {
    setTimeout(FunctionPatcher, 10);
  }
}

/*
	LanguageFunctionPatcher.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
function LanguageFunctionPatcher() {
  if (window.TD && window.TD.languages) {
    window.TD.languages.getSystemLanguageCode = function (e) {
      var t = getPref("mtd_lang").replace("_", "-").substr(0, 2);
      return e && (t = t.replace(/-[a-z]+$/i, "")), t;
    };
  } else {
    setTimeout(LanguageFunctionPatcher, 10);
  }
}

/*
	UILoginController.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
let ugltStarted = false;
let loginIntervalTick = 0; // Updates the "Good morning!" / "Good afternoon!" / "Good evening!"
// text on the login screen every once in a while (10s, ish)

function startUpdateGoodLoginText() {
  // Don't run if we already started
  if (ugltStarted) {
    return;
  }

  ugltStarted = true; // we've gotta update the image URL
  // we can't do this in the new login mustache because when it's initialised,
  // MTDURLExchange hasn't completed yet

  $(".startflow-background").attr("style", `background-image:url(${mtdBaseURL}resources/img/bg1.jpg)`);
  setInterval(() => {
    let text;
    let newDate = new Date();

    if (newDate.getHours() < 12) {
      text = I18n("Good morning!");
    } else if (newDate.getHours() < 18) {
      text = I18n("Good afternoon!");
    } else {
      text = I18n("Good evening!");
    }

    $(".form-login h2").html(text);
  }, 10000);
}
/*
	Checks if the signin form is available.

	If so, it activates the login page stylesheet extension
*/


function checkIfSigninFormIsPresent() {
  if ($(".app-signin-form").length > 0 || $("body>.js-app-loading.login-container:not([style])").length > 0) {
    html.addClass("signin-sheet-now-present");
    loginIntervalTick++;
    enableStylesheetExtension("loginpage");

    if (loginIntervalTick > 5) {
      clearInterval(loginInterval);
    }
  } else {
    disableStylesheetExtension("loginpage");
    html.removeClass("signin-sheet-now-present");
  }
} // replaces login page with moderndeck one

function loginTextReplacer() {
  if ($(".app-signin-wrap:not(.mtd-signin-wrap)").length > 0) {
    console.info("oh no, we're too late!");
    window.UILanguagePicker = UILanguagePicker;

    if (getPref$1("mtd_last_lang") !== navigator.language) {
      new UILanguagePicker();
    }

    $(".app-signin-wrap:not(.mtd-signin-wrap)").remove();
    $(".login-container .startflow").html(newLoginPage);
    startUpdateGoodLoginText();
  }
}

/*
	EmojiHelper.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/
function fromCodePoint(str) {
  let newStr = "";
  str = str.replace(/\*/g, "");
  str = str.split("-");
  str.forEach(a => {
    newStr += twemoji.convert.fromCodePoint(a);
  });
  return newStr;
}

/*
	FontHandler.js
	Copyright (c) 2014-2020 dangered wolf, et al
	Released under the MIT licence
*/

function fontParseHelper(a) {
  if (typeof a !== "object" || a === null) throw "you forgot to pass the object";
  return "@font-face{font-family:'" + (a.family || "Roboto") + "';font-style:" + (a.style || "normal") + ";font-weight:" + (a.weight || "400") + ";src:url(" + mtdBaseURL + "resources/fonts/" + a.name + "." + (a.extension || "woff2") + ") format('" + (a.format || "woff2") + "');" + "unicode-range:" + (a.range || "U+0000-FFFF") + "}\n";
}
/*
	Here, we inject our fonts

	ModernDeck uses Roboto as its general font for Latin (and Cyrillic?) scripts
	Noto Sans is used for whatever scripts Roboto doesn't cover

	font family Material is short for Material icons
	font family MD is short for ModernDeck. It contains ModernDeck supplemental icons
*/


function injectFonts() {
  if (window.injectedFonts) {
    return;
  }

  window.injectedFonts = true;
  $(document.head).append(make("style").html(fontParseHelper({
    family: "MD",
    name: "Icon/mdvectors"
  }) + fontParseHelper({
    family: "Material",
    name: "Icon/MaterialIcons"
  }) +
  /* Roboto Family */
  fontParseHelper({
    family: "Roboto",
    name: "Roboto/400-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "Roboto",
    name: "Roboto/400-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "Roboto",
    name: "Roboto/400-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "Roboto",
    name: "Roboto/400-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "Roboto",
    name: "Roboto/400-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "Roboto",
    name: "Roboto/400-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "Roboto",
    name: "Roboto/400-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) + fontParseHelper({
    family: "Roboto",
    weight: "500",
    name: "Roboto/500-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "Roboto",
    weight: "500",
    name: "Roboto/500-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "Roboto",
    weight: "500",
    name: "Roboto/500-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "Roboto",
    weight: "500",
    name: "Roboto/500-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "Roboto",
    weight: "500",
    name: "Roboto/500-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "Roboto",
    weight: "500",
    name: "Roboto/500-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "Roboto",
    weight: "500",
    name: "Roboto/500-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) +
  /* Roboto Slab Family */
  fontParseHelper({
    family: "RobotoSlab",
    name: "RobotoSlab/400-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "RobotoSlab",
    name: "RobotoSlab/400-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "RobotoSlab",
    name: "RobotoSlab/400-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "RobotoSlab",
    name: "RobotoSlab/400-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "RobotoSlab",
    name: "RobotoSlab/400-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "RobotoSlab",
    name: "RobotoSlab/400-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "RobotoSlab",
    name: "RobotoSlab/400-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) + fontParseHelper({
    family: "RobotoSlab",
    weight: "500",
    name: "RobotoSlab/500-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "RobotoSlab",
    weight: "500",
    name: "RobotoSlab/500-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "RobotoSlab",
    weight: "500",
    name: "RobotoSlab/500-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "RobotoSlab",
    weight: "500",
    name: "RobotoSlab/500-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "RobotoSlab",
    weight: "500",
    name: "RobotoSlab/500-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "RobotoSlab",
    weight: "500",
    name: "RobotoSlab/500-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "RobotoSlab",
    weight: "500",
    name: "RobotoSlab/500-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) +
  /* Roboto Mono Family */
  fontParseHelper({
    family: "RobotoMono",
    name: "RobotoMono/400-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "RobotoMono",
    name: "RobotoMono/400-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "RobotoMono",
    name: "RobotoMono/400-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "RobotoMono",
    name: "RobotoMono/400-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "RobotoMono",
    name: "RobotoMono/400-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "RobotoMono",
    name: "RobotoMono/400-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "RobotoMono",
    name: "RobotoMono/400-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) + fontParseHelper({
    family: "RobotoMono",
    weight: "500",
    name: "RobotoMono/500-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "RobotoMono",
    weight: "500",
    name: "RobotoMono/500-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "RobotoMono",
    weight: "500",
    name: "RobotoMono/500-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "RobotoMono",
    weight: "500",
    name: "RobotoMono/500-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "RobotoMono",
    weight: "500",
    name: "RobotoMono/500-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "RobotoMono",
    weight: "500",
    name: "RobotoMono/500-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "RobotoMono",
    weight: "500",
    name: "RobotoMono/500-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) +
  /* Roboto Condensed Family */
  fontParseHelper({
    family: "RobotoCondensed",
    name: "RobotoCondensed/400-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    name: "RobotoCondensed/400-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    name: "RobotoCondensed/400-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    name: "RobotoCondensed/400-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    name: "RobotoCondensed/400-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    name: "RobotoCondensed/400-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    name: "RobotoCondensed/400-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    weight: "700",
    name: "RobotoCondensed/700-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    weight: "700",
    name: "RobotoCondensed/700-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    weight: "700",
    name: "RobotoCondensed/700-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    weight: "700",
    name: "RobotoCondensed/700-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    weight: "700",
    name: "RobotoCondensed/700-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    weight: "700",
    name: "RobotoCondensed/700-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "RobotoCondensed",
    weight: "700",
    name: "RobotoCondensed/700-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) +
  /* Open Sans Family */
  fontParseHelper({
    family: "OpenSans",
    name: "OpenSans/400-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "OpenSans",
    name: "OpenSans/400-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "OpenSans",
    name: "OpenSans/400-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "OpenSans",
    name: "OpenSans/400-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "OpenSans",
    name: "OpenSans/400-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "OpenSans",
    name: "OpenSans/400-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "OpenSans",
    name: "OpenSans/400-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) + fontParseHelper({
    family: "OpenSans",
    weight: "600",
    name: "OpenSans/600-cyrillicext",
    range: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F"
  }) + fontParseHelper({
    family: "OpenSans",
    weight: "600",
    name: "OpenSans/600-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "OpenSans",
    weight: "600",
    name: "OpenSans/600-greekext",
    range: "U+1F00-1FFF"
  }) + fontParseHelper({
    family: "OpenSans",
    weight: "600",
    name: "OpenSans/600-greek",
    range: "U+0370-03FF"
  }) + fontParseHelper({
    family: "OpenSans",
    weight: "600",
    name: "OpenSans/600-viet",
    range: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB"
  }) + fontParseHelper({
    family: "OpenSans",
    weight: "600",
    name: "OpenSans/600-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "OpenSans",
    weight: "600",
    name: "OpenSans/600-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) +
  /* Jost Family */
  fontParseHelper({
    family: "Jost",
    name: "Jost/400-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "Jost",
    name: "Jost/400-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "Jost",
    name: "Jost/400-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) + fontParseHelper({
    family: "Jost",
    weight: "600",
    name: "Jost/600-cyrillic",
    range: "U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116"
  }) + fontParseHelper({
    family: "Jost",
    weight: "600",
    name: "Jost/600-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "Jost",
    weight: "600",
    name: "Jost/600-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) +
  /* Lato Family */
  fontParseHelper({
    family: "Lato",
    name: "Lato/400-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "Lato",
    name: "Lato/400-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) + fontParseHelper({
    family: "Lato",
    weight: "700",
    name: "Lato/700-latinext",
    range: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF"
  }) + fontParseHelper({
    family: "Lato",
    weight: "700",
    name: "Lato/700-latin",
    range: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD"
  }) +
  /* Noto Sans / Noto Sans CJK Family */
  fontParseHelper({
    family: "Noto Sans CJK",
    weight: "500",
    name: "NotoSans/NotoSansCJKjp-Medium",
    format: "opentype",
    extension: "otf"
  }) + fontParseHelper({
    family: "Noto Sans CJK",
    name: "NotoSans/NotoSansCJKjp-Regular",
    format: "opentype",
    extension: "otf"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansHI-Medium",
    range: "U+0900-097F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansHI-Regular",
    range: "U+0900-097F"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansArabic-Medium",
    range: "U+0600-06FF,U+0750–077F,U+08A0–08FF,U+FB50–FDFF,U+FE70–FEFF,U+10E60–10E7F,U+1EE00—1EEFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansArabic-Regular",
    range: "U+0600-06FF,U+0750–077F,U+08A0–08FF,U+FB50–FDFF,U+FE70–FEFF,U+10E60–10E7F,U+1EE00—1EEFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansArmenian-Medium",
    range: "U+0530-0580"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansArmenian-Regular",
    range: "U+0530-0580"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansBengali-Medium",
    range: "U+0980-09FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansBengali-Regular",
    range: "U+0980-09FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansBengali-Medium",
    range: "U+0980-09FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansBengali-Regular",
    range: "U+0980-09FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansBrahmi",
    range: "U+11000-1107F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansBuginese",
    range: "U+1A00-1A1B,U+1A1E-1A1F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansBuhid-Regular",
    range: "U+1740-1753"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansCanadianAboriginal",
    range: "U+1400-167F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansCarian-Regular",
    range: "U+102A0-102DF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansChakma-Regular",
    range: "U+11100-1114F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansCherokee-Regular",
    range: "U+11100-1114F"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansCherokee-Medium",
    range: "U+13A0-13F4,U+13F5,U+13F8-13FD"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansCherokee-Regular",
    range: "U+13A0-13F4,U+13F5,U+13F8-13FD"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansEthiopic-Medium",
    range: "U+1200-137F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansEthiopic-Regular",
    range: "U+1200-137F"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansGeorgian-Medium",
    range: "U+10A0-10FF,U+2D00-2D2F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansGeorgian-Regular",
    range: "U+10A0-10FF,U+2D00-2D2F"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansGujaratiUI-Bold",
    range: "U+0A80-0AFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansGujaratiUI",
    range: "U+0A80-0AFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansHebrew-Bold",
    range: "U+0590-05FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansHebrew-Regular",
    range: "U+0590-05FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansJavanese",
    range: "U+A980-A9DF"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansKannadaUI-Bold",
    range: "U+0C80-0CFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansKannadaUI",
    range: "U+0C80-0CFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansKayahLi-Regular",
    range: "U+A900-A92F"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansKhmerUI-Medium",
    range: "U+1780-17FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansKhmerUI-Regular",
    range: "U+1780-17FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansLaoUI-Medium",
    range: "U+0E80-0EFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansLaoUI-Regular",
    range: "U+0E80-0EFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansLisu-Regular",
    range: "U+A4D0-A4FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansMalayalamUI-Bold",
    range: "U+0D00-0D7F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansMalayalamUI",
    range: "U+0D00-0D7F"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansMyanmarUI-Bold",
    range: "U+1000-109F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansMyanmarUI-Regular",
    range: "U+1000-109F"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansOriyaUI-Medium",
    range: "U+0B00-0B7F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansOriyaUI",
    range: "U+0B00-0B7F"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansOriyaUI-Bold",
    range: "U+0B00-0B7F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansOsage-Regular",
    range: "U+104B0-104FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansOsmanya-Regular",
    range: "U+10480-104AF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansPhagsPa",
    range: "U+A840-A87F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansNewTaiLue-Regular",
    range: "U+1980-19DF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansNKo-Regular",
    range: "U+07C0-07FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansOlChiki-Regular",
    range: "U+1C50–1C7F"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansRunic-Regular",
    range: "U+16A0-16FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansShavian-Regular",
    range: "U+16A0-16FF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansSinhalaUI-Regular",
    range: "U+0D80-0DFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    weight: "500",
    name: "NotoSans/NotoSansSinhalaUI-Medium",
    range: "U+0D80-0DFF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansSundanese",
    range: "U+1B80-1BBF"
  }) + fontParseHelper({
    family: "Noto Sans",
    name: "NotoSans/NotoSansSyriacEastern",
    range: "U+0700-074F"
  }) + fontParseHelper({

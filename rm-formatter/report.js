function loadScript(src, callback) {
    var scriptElement = document.createElement('script');
    scriptElement.src = src;
    document.head.appendChild(scriptElement);
    scriptElement.onload = callback;
}

// List of library URLs
var libraryUrls = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js'
    // Add more library URLs as needed
];

// Function to load libraries sequentially
function loadLibraries(index) {
    if (index < libraryUrls.length) {
        loadScript(libraryUrls[index], function() {
            // Continue loading the next library
            loadLibraries(index + 1);
        });
    } else {
       $(function() {

          const dev = msg => { console.log(msg) }
          var id = "",
              val = "",
              ele = ""
      
          const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          
          setTimeout(()=> {
              $(".video-container").css("visibility", "visible")
          }, 3000)
      
          const isSupportedSessionStorage = () => {
              if (typeof(Storage) === "undefined") {
                  return false;
              }
              return true;
          }
          dev(isSupportedSessionStorage())
          const setSessionStorage = (ssName, ssValue) => {
              ssValue = JSON.stringify(ssValue)
              window.sessionStorage.setItem(ssName, ssValue);
          }
      
          const getSessionStorage = (ssName) => {
              var res = window.sessionStorage.getItem(ssName);
              res = JSON.parse(res)
              return res;
          }
      
          const gcbSettingsCustomization = {
      
              "updatesFieldsHide": 0,
              "updatesLabelHide": 0,
              "updatesFieldLabelText": "",
              "updatedLinksFieldsHide": 0,
              "updatedLinksLabelHide": 0,
              "updatedLinksFieldLabelText": "",
              "noteFieldsHide": 0,
              "noteLabelHide": 0,
              "noteLabelHide": 0,
              "noteFieldLabelText": "",
              "rtFieldsHide": 0,
              "rtLabelHide": 0,
              "rtLabelHide": 0,
              "rtFieldLabelText": "",
              "upsellFieldsHide": 0,
              "upsellLabelHide": 0,
              "upsellLabelHide": 0,
              "upsellFieldLabelText": "",
              "referenceLinkFieldsHide": 0,
              "referenceLinkLabelHide": 0,
              "referenceLinkFieldLabelText": "",
              "timeConsumedFieldsHide": 0,
              "timeConsumedLabelHide": 0,
              "timeConsumedFieldLabelText": "",
              "currentRole": "",
      
          }
      
          const gcbSettingsGeneral = {
      
              "darkmode": 1,
              "vidBG": 1,
      
          }
      
          const settingsCustomizationArrayId = {
      
              "updates": ["update", "gcb-updates"],
              "updatedLinks": ["updated-links", "gcb-links"],
              "note": ["note", "gcb-notes"],
              "upsell": ["upsell", "gcb-upsells"],
              "rt": ["rt", "gcb-rt"],
              "referenceLink": ["reference-links", "gcb-reference"],
              "timeConsumed": ["time-consumed", "gcb-time"]
      
          }
      
          if(isSupportedSessionStorage()) {
              if(isDarkMode) {
                  $("body, .modal").addClass("dark--theme")
                  $("#darkmode-switcher img").attr("src", "https://s13.gifyu.com/images/SC5Ey.png")
              } else {
                  $("body, .modal").removeClass("dark--theme")
              }
          }
      
          // check customiation settings onload
          if(!getSessionStorage("test1.customization.settings")) {
              setSessionStorage("test1.customization.settings", gcbSettingsCustomization )
              currentSettings = getSessionStorage("test1.customization.settings");
              if(currentSettings.currentRole == "") {
                let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('myrole')) 
                modal.show();
              }
          } else {
              var parent
              var currentSettings
              var text
              $("#gc-settings-fields .form-check-input").each(function(index){
                  ele = $(this)
                  parent = ele.parents(".settings--item").attr("id")
                  currentSettings = getSessionStorage("test1.customization.settings");
      
                  switch(parent) {
                      case "cb-updates":
                          if(ele.hasClass("rearm-field") && currentSettings.updatesFieldsHide == 1) {
                              ele.prop('checked', true);
                              $(`#${parent}`).find(".rearm-label, .customization-label").attr("disabled", true)
                              $(`#${settingsCustomizationArrayId.updates[0]}`).hide()
                          } else if(ele.hasClass("rearm-label") && ele.hasClass("rearm-label") && currentSettings.updatesLabelHide == 1) {
                              ele.prop('checked', true);
                              $(`#${settingsCustomizationArrayId.updates[1]}, #${settingsCustomizationArrayId.updates[1]}-list`).hide()
                          } else {
                              text = currentSettings.updatesFieldLabelText
                              if(ele.hasClass("customization-label") && text != "") {
                                  ele.prop('checked', true);
                                  $(`#${parent}`).find(".custom-text").css("display", "block").val(text)
                                  $(`#${settingsCustomizationArrayId.updates[1]}`).text(text)
                              }
                          }
                          break;
                      case "cb-updated-links":
                          if(ele.hasClass("rearm-field") && currentSettings.updatedLinksFieldsHide == 1) {
                              ele.prop('checked', true);
                              $(`#${parent}`).find(".rearm-label, .customization-label").attr("disabled", true)
                              $(`#${settingsCustomizationArrayId.updatedLinks[0]}`).hide()
                          } else if(ele.hasClass("rearm-label") && currentSettings.updatedLinksLabelHide == 1) {
                              ele.prop('checked', true);
                              $(`#${settingsCustomizationArrayId.updatedLinks[1]}, #${settingsCustomizationArrayId.updatedLinks[1]}-list`).hide()
                          } else {
                              text = currentSettings.updatedLinksFieldLabelText
                              if(ele.hasClass("customization-label") && text != "") {
                                  ele.prop('checked', true);
                                  $(`#${parent}`).find(".custom-text").css("display", "block").val(text)
                                  $(`#${settingsCustomizationArrayId.updatedLinks[1]}`).text(text)
                              }
                          }
                          break;
                      case "cb-note":
                          if(ele.hasClass("rearm-field") && currentSettings.noteFieldsHide == 1) {
                              ele.prop('checked', true);
                              $(`#${parent}`).find(".rearm-label, .customization-label").attr("disabled", true)
                              $(`#${settingsCustomizationArrayId.note[0]}`).hide()
                          } else if(ele.hasClass("rearm-label") && currentSettings.noteLabelHide == 1) {
                              ele.prop('checked', true);
                              $(`#${settingsCustomizationArrayId.note[1]}, #${settingsCustomizationArrayId.note[1]}-list`).hide()
                          } else {
                              text = currentSettings.noteFieldLabelText
                              if(ele.hasClass("customization-label") && text != "") {
                                  ele.prop('checked', true);
                                  $(`#${parent}`).find(".custom-text").css("display", "block").val(text)
                                  $(`#${settingsCustomizationArrayId.note[1]}`).text(text)
                              }
                          }
                          break;
                      case "cb-rt":
                          if(ele.hasClass("rearm-field") && currentSettings.rtFieldsHide == 1) {
                              ele.prop('checked', true);
                              $(`#${parent}`).find(".rearm-label, .customization-label").attr("disabled", true)
                              $(`#${settingsCustomizationArrayId.rt[0]}`).hide()
                          } else if(ele.hasClass("rearm-label") && currentSettings.rtLabelHide == 1) {
                              ele.prop('checked', true);
                              $(`#${settingsCustomizationArrayId.rt[1]}, #${settingsCustomizationArrayId.rt[1]}-list`).hide()
                          } else {
                              text = currentSettings.rtFieldLabelText
                              if(ele.hasClass("customization-label") && text != "") {
                                  ele.prop('checked', true);
                                  $(`#${parent}`).find(".custom-text").css("display", "block").val(text)
                                  $(`#${settingsCustomizationArrayId.rt[1]}`).text(text)
                              }
                          }
                          break;
                      case "cb-upsell":
                          if(ele.hasClass("rearm-field") && currentSettings.upsellFieldsHide == 1) {
                              ele.prop('checked', true);
                              $(`#${parent}`).find(".rearm-label, .customization-label").attr("disabled", true)
                              $(`#${settingsCustomizationArrayId.upsell[0]}`).hide()
                          } else if(ele.hasClass("rearm-label") && currentSettings.upsellLabelHide == 1) {
                              ele.prop('checked', true);
                              $(`#${settingsCustomizationArrayId.upsell[1]}, #${settingsCustomizationArrayId.upsell[1]}-list`).hide()
                          } else {
                              text = currentSettings.upsellFieldLabelText
                              if(ele.hasClass("customization-label") && text != "") {
                                  ele.prop('checked', true);
                                  $(`#${parent}`).find(".custom-text").css("display", "block").val(text)
                                  $(`#${settingsCustomizationArrayId.upsell[1]}`).text(text)
                              }
                          }
                          break;
                      case "cb-reference-link":
                          if(ele.hasClass("rearm-field") && currentSettings.referenceLinkFieldsHide == 1) {
                              ele.prop('checked', true);
                              $(`#${parent}`).find(".rearm-label, .customization-label").attr("disabled", true)
                              $(`#${settingsCustomizationArrayId.referenceLink[0]}`).hide()
                          } else if(ele.hasClass("rearm-label") && currentSettings.referenceLinkLabelHide == 1) {
                              ele.prop('checked', true);
                              $(`#${settingsCustomizationArrayId.referenceLink[1]}, #${settingsCustomizationArrayId.referenceLink[1]}-list`).hide()
                          } else {
                              text = currentSettings.referenceLinkFieldLabelText
                              if(ele.hasClass("customization-label") && text != "") {
                                  ele.prop('checked', true);
                                  $(`#${parent}`).find(".custom-text").css("display", "block").val(text)
                                  $(`#${settingsCustomizationArrayId.referenceLink[1]}`).text(text)
                              }
                          }
                          break;
                      case "cb-time-consumed":
                          if(ele.hasClass("rearm-field") && currentSettings.timeConsumedFieldsHide == 1) {
                              ele.prop('checked', true);
                              $(`#${parent}`).find(".rearm-label, .customization-label").attr("disabled", true)
                              $(`#${settingsCustomizationArrayId.timeConsumed[0]}`).hide()
                          } else if(ele.hasClass("rearm-label") && currentSettings.timeConsumedLabelHide == 1) {
                              ele.prop('checked', true);
                              $(`#${settingsCustomizationArrayId.timeConsumed[1]}`).hide()
                          } else {
                              text = currentSettings.timeConsumedFieldLabelText
                              if(ele.hasClass("customization-label") && text != "") {
                                  ele.prop('checked', true);
                                  $(`#${parent}`).find(".custom-text").css("display", "block").val(text)
                                  $(`#${settingsCustomizationArrayId.timeConsumed[1]}`).text(text)
                              }
                          }
                          break;
                      case "cb-role":
                          if(currentSettings.currentRole == "") {
                            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('myrole')) 
                            modal.show();
                            //   $("#myrole").modal("show");
                          } else {
                              var myRole = currentSettings.currentRole;
                              if(myRole == "Designer") {
                                  document.getElementById('desops1').checked = true;
                                  $("#upsell, #gcb-upsells, #gcb-upsells-list, #reference-links, #gcb-reference, #gcb-reference-list").css("display", "none")
                                  $("#gcb-upsells").parent().prev().css("display", "none")
                                  $("#gcb-reference").parent().prev().css("display", "none")
                              } else {
                                  document.getElementById('devops1').checked = true;
                              }
                              $("#gcb-role").text(myRole + ": ")
                              $('select#role option').each(function() {
                                  var option = $(this)
                                  if(option.data("type") != myRole && option.val() != "members") {
                                      option.hide();
                                  } else {
                                      option.show();
                                  }
                              });
                          }
                          break;
                      default:
                          break;
                  }
              })
          }
      
          // check general settings onload
          if(!getSessionStorage("test1.general.settings")) {
              setSessionStorage("test1.general.settings", gcbSettingsGeneral )
          } else {
              var GcurrentSettings = getSessionStorage("test1.general.settings");
              
              if(GcurrentSettings.darkmode == 1) {
                  $("body, .modal").addClass("dark--theme")
                  $("#darkmode-switcher img").attr("src", "https://s13.gifyu.com/images/SC5Ey.png");
              } else {
                  $("body, .modal").removeClass("dark--theme");
                  $("img#logo-gcb").attr("src", "https://s13.gifyu.com/images/SC1j8.png");
                  $(".video-container").html(`<iframe src="https://www.youtube.com/embed/Y1BmjPeatI4?%20&controls=0&autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>`);
              }

              if(GcurrentSettings.vidBG == 0) {
                  $(".video-container").remove();
                  document.getElementById('vid-bg').checked = true;
              }
          }
      
          // check current template onload
          if(!getSessionStorage("test1.active.template")) {
              setSessionStorage("test1.active.template", 0 )
          } else {
              var TcurrentSettings = getSessionStorage("test1.active.template");
          }
      
          $(document).on("click", "#myrole .modal-content .btn", function() {
                  var role = $(this).data("id");
                  var GcurrentSettings = getSessionStorage("test1.customization.settings");
                  GcurrentSettings.currentRole = role;
                  setSessionStorage("test1.customization.settings", GcurrentSettings )
                  if(role == "Designer") {
                      document.getElementById('desops1').checked = true;
                      $("#upsell, #gcb-upsells, #gcb-upsells-list, #reference-links, #gcb-reference, #gcb-reference-list").css("display", "none")
                      $("#gcb-upsells").parent().prev().css("display", "none")
                      $("#gcb-reference").parent().prev().css("display", "none")
                  } else {
                      document.getElementById('devops1').checked = true;
                      $("#upsell, #gcb-upsells, #gcb-upsells-list, #reference-links, #gcb-reference, #gcb-reference-list").css("display", "block")
                  }
                $("#gcb-role").text(role + ": ");
                $("select#role").find('option:first-child').prop('selected', true);
                $('select#role option').each(function() {
                    var option = $(this)
                    if(option.data("type") != role && option.val() != "members") {
                        option.hide();
                    } else {
                        option.show();
                    }
                });
                  let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('myrole')) 
                  modal.hide();
                //   $("#myrole").modal('hide');
          })
      
          // $("#settingsTabNav").modal('show');
      
          $('textarea:not(".textarea")').each(function () {
              this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
          }).on('input', function () {
              this.style.height = 'auto';
              this.style.height = (this.scrollHeight) + 'px';
          });
      
          $(document).on("keydown, change", ".gc-form .form-control", function() {
              var ele = $(this);

                if (ele.val()) {
                    ele.siblings("label").css("color", "transparent")
                } 
          })
      
          $(document).on('focus', 'textarea', function(){
              var ele = $(this);

              if (ele.val() || ele.parent().find("textarea").length > 0) {
                ele.siblings("label").css("color", "#27a599")
              } 
          });

          $(document).on('blur', 'textarea, .gc-form .form-control', function(){
            $(this).siblings("label").css("color", "transparent");
          });
      
          $(document).on("input", ".gc-form .form-control", function(){  
              
              ele = $(this);
              id = ele.attr("id")
              val = ele.val()
              dev(val)
              
              switch(id) {
                  case "greeting":
                      if( val == "") {
                          $("#gcb-greeting").text("Hi there,");
                      } else {
                          $("#gcb-greeting").text(val);
                      }
                      break;
                  case "introduction":
                      $("#gcb-introduction").text(val);
                      break;
                  case "update-list":
                      $("#gcb-link-list").text(val);
                      break;
                  case "reference-list":
                      $("#gcb-reference-list").text(val);
                      break;
                  case "update":
                      $("#gcb-link-list").text(val);
                      break;
                  case "note":
                    dev("note: " + val )
                      $("#gcb-note-list").text(val);
                      break;
                  case "rt":
                    dev("rt: " + val )
                      $("#gcb-rt-list").text(val);
                      break;
                  case "upsell":
                    dev("val: " + val )
                      $("#gcb-upsells-list").text(val);
                      break;
                  case "time-consumed-tt":
                      $("#gcb-time").text("Time Consumed: " + val);
                  default:
                      break;
              }
          });
      
          $("#time-consumed-tt").on("keypress", function(e) { e.preventDefault() })
      
          $(document).on("keydown", ".gc-dynamic-input textarea", function(e){
              
              var key = e.keyCode || e.charCode;
              const el = $(this)
              const parent = el.parents(".gc-dynamic-input")
              if(key == 13) {
                  e.preventDefault()
                  el.after('<textarea class="form-control shadow-none mb-1 textarea"></textarea>')
                  el.next().focus()
                  return;
              } 
      
              if(key == 8) {
                  if(el.val() == "") {
                      if(parent.find("textarea").length != 1) {
                          e.preventDefault()
                          var ind = el.index();
                          $(`#gcb-${parent.attr("id")}-list span`).eq(ind).remove();
                          $(`#gcb-${parent.attr("id")}-list br`).eq(ind).remove();
                          el.remove();
                          parent.find("textarea").eq(parent.find("textarea").length - 1).focus()
                      }
                  }
                  return;
              }
              
          }); 
      
          $(document).on("input", ".gc-dynamic-input textarea", function(){
              const parent = $(this).parents(".gc-dynamic-input")
      
              let ctr = parent.find("textarea").length;
              let currHtml = "";
              let leadChar = parent.find("textarea").val() ? "- " : "";
      
              for(let i = 0; i < ctr; i++) {
                  currHtml += "<span>" + leadChar + parent.find("textarea").eq(i).val() + "</span><br />"
              }
              $(`#gcb-${parent.attr("id")}-list`).html(currHtml);
              
          });
      
          $(document).on("change", "#gc-settings-fields .form-check-input", function(){
              
              const el = $(this)
              const parent = el.parents(".settings--item")
      
              if(el.hasClass("rearm-field")) {
                  if(el.is(':checked')) {
                      parent.find(".rearm-label").prop("checked", true).attr("disabled", true)
                      parent.find(".customization-label").attr("disabled", true)
                  } else {
                      parent.find(".customization-label").attr("disabled", false)
                      parent.find(".rearm-label").prop("checked", false).attr("disabled", false)
                  }
              } else if(el.hasClass("customization-label")) {
                  if(el.is(':checked')) {
                      parent.find(".custom-text").css("display", "block")
                  } else {
                      parent.find(".custom-text").css("display", "none")
                  }
              }
      
          });
      
          $(document).on("click", ".tool-clipboard.copy", function() {
              const containerid = "clipboardToCopy"; 
              const el = $(this)
              el.addClass("gcb-selected");
      
              setTimeout(function(){
                  el.removeClass("gcb-selected");
              }, 1200)
      
              if (window.getSelection) {
                  if (window.getSelection().empty) { // Chrome
                      window.getSelection().empty();
                  } else if (window.getSelection().removeAllRanges) { // Firefox
                      window.getSelection().removeAllRanges();
                  }
              } else if (document.selection) { // IE?
                  document.selection.empty();
              }
          
              if (document.selection) {
                  var range = document.body.createTextRange();
                  range.moveToElementText(document.getElementById(containerid));
                  range.select().createTextRange();
                  document.execCommand("copy");
              } else if (window.getSelection) {
                  var range = document.createRange();
                  range.selectNode(document.getElementById(containerid));
                  window.getSelection().addRange(range);
                  document.execCommand("copy");
              }
          })
      
          $(document).on("click", ".tool-clipboard.grammar-check", function() {
              const containerid = "clipboardToCopy"; 
              const el = $(this)
              el.addClass("gcb-selected");
      
              setTimeout(function(){
                  el.removeClass("gcb-selected");
              }, 1200)
      
              const message = 'Fix the grammar: "' + $("#clipboardToCopy").text() + '"';
              const encodedString = encodeURIComponent(message).replace(/%20/g, '+');
              const encodedStringv = encodedString.replace(/(\+)+/g, '+');
              const encodedStringd = encodedStringv.replace(/(%0A\+){3,}/g, "%0A+");
              const encodedStringr = encodedStringd.replace(/(\+)(?=%0A)/g, '');
              var baseUrl = 'https://iask.ai/?mode=question&options[detail_level]=detailed&q=';
              var newUrl = baseUrl + encodedStringr;
              window.open(newUrl, '_blank');
          })
      
          $(document).on("change", "select", function(){
              var el = $(this)
              var id = el.attr('id')
              var val = el.val()
              switch(id) {
                  case "role":
                      $("#gcb-role").text(getSessionStorage("test1.customization.settings").currentRole + ": " + val);
                      break;
                  default:
                      break;
              }
          }); 
      
          $("#logo-gcb").on("mouseover", function() {
              $("#body").css({opacity: "0", transition: "opacity 1s"})
          }).on("mouseout", function() {
              $("#body").css({opacity: "1", transition: "opacity 2s"})
          })
      
          $(document).on("click", "#darkmode-switcher", function() {
              ele = $(this)
              var darkModeImg = ele.find("img").attr("src");
              var currentSettings = getSessionStorage("test1.general.settings");
              if(currentSettings) {
                dev("1")
                  $(".modal").toggleClass("dark--theme")
                  ele.find("img").attr("src", darkModeImg == "https://s13.gifyu.com/images/SC5Ey.png" ? "https://s13.gifyu.com/images/SC5EO.png" : "https://s13.gifyu.com/images/SC5Ey.png")
              } else {
                dev(ele.find("img").attr("src"))
              }
          })
      
          $(document).on("click", "#save--settings", function(){
              if(!isSupportedSessionStorage) {
                  alert("Local Storage is not supported!");
                  return false;
              }
      
              if(getSessionStorage("test1.customization.settings")) {
                  var currentSettings = getSessionStorage("test1.customization.settings");
                  var parent = "";
                  var text = "";
      
                  $("#gc-settings-fields .form-check-input").each(function(index){
                      ele = $(this)
                      parent = ele.parents(".settings--item").attr("id")
      
                      switch(parent) {
                          case "cb-updates":
                              if(ele.hasClass("rearm-field")) {
                                  if(ele.is(':checked')) {
                                      currentSettings.updatesFieldsHide = 1
                                      $(`#${settingsCustomizationArrayId.updates[0]}`).hide()
                                      $(`#${settingsCustomizationArrayId.updates[1]}`).hide()
                                      $(`#${settingsCustomizationArrayId.updates[1]}-list`).hide()
                                  } else {
                                      currentSettings.updatesFieldsHide = 0
                                      $(`#${settingsCustomizationArrayId.updates[0]}`).show()
                                      $(`#${settingsCustomizationArrayId.updates[1]}`).show()
                                      $(`#${settingsCustomizationArrayId.updates[1]}-list`).show()
                                  }
                              } else if(ele.hasClass("customization-label")) {
                                  if(ele.is(':checked')) {
                                      text = $(`#${parent}`).find(".custom-text").val()
                                      currentSettings.updatesFieldLabelText = text
                                      $(`#${settingsCustomizationArrayId.updates[1]}`).text(text ? text : "")
                                  } else {
                                      currentSettings.updatesFieldLabelText = "";
                                      $(`#${settingsCustomizationArrayId.updates[1]}`).text("Here are the latest updates:")
                                  }
                              } else {
                                  if(ele.is(':checked')) {
                                      currentSettings.updatesLabelHide = 1
                                      $(`#${settingsCustomizationArrayId.updates[1]}`).hide()
                                  } else {
                                      currentSettings.updatesLabelHide = 0
                                      $(`#${settingsCustomizationArrayId.updates[1]}`).show()
                                  }
                              }
                              break;
                          case "cb-updated-links":
                              if(ele.hasClass("rearm-field")) {
                                  if(ele.is(':checked')) {
                                      currentSettings.updatedLinksFieldsHide = 1
                                      $(`#${settingsCustomizationArrayId.updatedLinks[0]}`).hide()
                                      $(`#${settingsCustomizationArrayId.updatedLinks[1]}`).hide()
                                      $(`#${settingsCustomizationArrayId.updatedLinks[1]}-list`).hide()
                                  } else {
                                      currentSettings.updatedLinksFieldsHide = 0
                                      $(`#${settingsCustomizationArrayId.updatedLinks[0]}`).show()
                                      $(`#${settingsCustomizationArrayId.updatedLinks[1]}`).show()
                                      $(`#${settingsCustomizationArrayId.updatedLinks[1]}-list`).show()
                                  }
                              } else if(ele.hasClass("customization-label")) {
                                  if(ele.is(':checked')) {
                                      text = $(`#${parent}`).find(".custom-text").val()
                                      currentSettings.updatedLinksFieldLabelText = text
                                      $(`#${settingsCustomizationArrayId.updatedLinks[1]}`).text(text ? text : "")
                                  } else {
                                      currentSettings.updatedLinksFieldLabelText = ""
                                      $(`#${settingsCustomizationArrayId.updatedLinks[1]}`).text("Updated Links:")
                                  }
                              } else {
                                  if(ele.is(':checked')) {
                                      currentSettings.updatedLinksLabelHide = 1
                                      $(`#${settingsCustomizationArrayId.updatedLinks[1]}`).hide()
                                  } else {
                                      currentSettings.updatedLinksLabelHide = 0
                                      $(`#${settingsCustomizationArrayId.updatedLinks[1]}`).show()
                                  }
                              }
                              break;
                          case "cb-note":
                              if(ele.hasClass("rearm-field")) {
                                  if(ele.is(':checked')) {
                                      currentSettings.noteFieldsHide = 1
                                      $(`#${settingsCustomizationArrayId.note[0]}`).hide()
                                      $(`#${settingsCustomizationArrayId.note[1]}`).hide()
                                      $(`#${settingsCustomizationArrayId.note[1]}-list`).hide()
                                  } else {
                                      currentSettings.noteFieldsHide = 0
                                      $(`#${settingsCustomizationArrayId.note[0]}`).show()
                                      $(`#${settingsCustomizationArrayId.note[1]}`).show()
                                      $(`#${settingsCustomizationArrayId.note[1]}-list`).show()
                                  }
                              } else if(ele.hasClass("customization-label")) {
                                  if(ele.is(':checked')) {
                                      text = $(`#${parent}`).find(".custom-text").val()
                                      currentSettings.noteFieldLabelText = text
                                      $(`#${settingsCustomizationArrayId.note[1]}`).text(text ? text : "")
                                  } else {
                                      currentSettings.noteFieldLabelText = ""
                                      $(`#${settingsCustomizationArrayId.note[1]}`).text("Notes:")
                                  }
                              } else {
                                  if(ele.is(':checked')) {
                                      currentSettings.noteLabelHide = 1
                                      $(`#${settingsCustomizationArrayId.note[1]}`).hide()
                                  } else {
                                      currentSettings.noteLabelHide = 0
                                      $(`#${settingsCustomizationArrayId.note[1]}`).show()
                                  }
                              }
                              break;
                          case "cb-rt":
                              if(ele.hasClass("rearm-field")) {
                                  if(ele.is(':checked')) {
                                      currentSettings.rtFieldsHide = 1
                                      $(`#${settingsCustomizationArrayId.rt[0]}`).hide()
                                      $(`#${settingsCustomizationArrayId.rt[1]}`).hide()
                                      $(`#${settingsCustomizationArrayId.rt[1]}-list`).hide()
                                  } else {
                                      currentSettings.rtFieldsHide = 0
                                      $(`#${settingsCustomizationArrayId.rt[0]}`).show()
                                      $(`#${settingsCustomizationArrayId.rt[1]}`).show()
                                      $(`#${settingsCustomizationArrayId.rt[1]}-list`).show()
                                  }
                              } else if(ele.hasClass("customization-label")) {
                                  if(ele.is(':checked')) {
                                      text = $(`#${parent}`).find(".custom-text").val()
                                      currentSettings.rtFieldLabelText = text
                                      $(`#${settingsCustomizationArrayId.rt[1]}`).text(text ? text : "")
                                  } else {
                                      currentSettings.rtFieldLabelText = ""
                                      $(`#${settingsCustomizationArrayId.rt[1]}`).text("Remaining Tasks:")
                                  }
                              } else {
                                  if(ele.is(':checked')) {
                                      currentSettings.rtLabelHide = 1
                                      $(`#${settingsCustomizationArrayId.rt[1]}`).hide()
                                  } else {
                                      currentSettings.rtLabelHide = 0
                                      $(`#${settingsCustomizationArrayId.rt[1]}`).show()
                                  }
                              }
                              break;
                          case "cb-upsell":
                              if(ele.hasClass("rearm-field")) {
                                  if(ele.is(':checked')) {
                                      currentSettings.upsellFieldsHide = 1
                                      $(`#${settingsCustomizationArrayId.upsell[0]}`).hide()
                                      $(`#${settingsCustomizationArrayId.upsell[1]}`).hide()
                                      $(`#${settingsCustomizationArrayId.upsell[1]}-list`).hide()
                                  } else {
                                      currentSettings.upsellFieldsHide = 0
                                      $(`#${settingsCustomizationArrayId.upsell[0]}`).show()
                                      $(`#${settingsCustomizationArrayId.upsell[1]}`).show()
                                      $(`#${settingsCustomizationArrayId.upsell[1]}-list`).show()
                                  }
                              } else if(ele.hasClass("customization-label")) {
                                  if(ele.is(':checked')) {
                                      text = $(`#${parent}`).find(".custom-text").val()
                                      currentSettings.upsellFieldLabelText = text
                                      $(`#${settingsCustomizationArrayId.upsell[1]}`).text(text ? text : "")
                                  } else {
                                      currentSettings.upsellFieldLabelText = ""
                                      $(`#${settingsCustomizationArrayId.upsell[1]}`).text("Upsells:")
                                  }
                              } else {
                                  if(ele.is(':checked')) {
                                      currentSettings.upsellLabelHide = 1
                                      $(`#${settingsCustomizationArrayId.upsell[1]}`).hide()
                                  } else {
                                      currentSettings.upsellLabelHide = 0
                                      $(`#${settingsCustomizationArrayId.upsell[1]}`).show()
                                  }
                              }
                              break;
                          case "cb-reference-link":
                              if(ele.hasClass("rearm-field")) {
                                  if(ele.is(':checked')) {
                                      currentSettings.referenceLinkFieldsHide = 1
                                      $(`#${settingsCustomizationArrayId.referenceLink[0]}`).hide()
                                      $(`#${settingsCustomizationArrayId.referenceLink[1]}`).hide()
                                      $(`#${settingsCustomizationArrayId.referenceLink[1]}-list`).hide()
                                  } else {
                                      currentSettings.referenceLinkFieldsHide = 0
                                      $(`#${settingsCustomizationArrayId.referenceLink[0]}`).show()
                                      $(`#${settingsCustomizationArrayId.referenceLink[1]}`).show()
                                      $(`#${settingsCustomizationArrayId.referenceLink[1]}-list`).show()
                                  }
                              } else if(ele.hasClass("customization-label")) {
                                  if(ele.is(':checked')) {
                                      text = $(`#${parent}`).find(".custom-text").val()
                                      currentSettings.referenceLinkFieldLabelText = text
                                      $(`#${settingsCustomizationArrayId.referenceLink[1]}`).text(text ? text : "")
                                  } else {
                                      currentSettings.referenceLinkFieldLabelText = ""
                                      $(`#${settingsCustomizationArrayId.referenceLink[1]}`).text("Reference Links:")
                                  }
                              } else {
                                  if(ele.is(':checked')) {
                                      currentSettings.referenceLinkLabelHide = 1
                                      $(`#${settingsCustomizationArrayId.referenceLink[1]}`).hide()
                                  } else {
                                      currentSettings.referenceLinkLabelHide = 0
                                      $(`#${settingsCustomizationArrayId.referenceLink[1]}`).show()
                                  }
                              }
                              break;
                          case "cb-time-consumed":
                              if(ele.hasClass("rearm-field")) {
                                  if(ele.is(':checked')) {
                                      currentSettings.timeConsumedFieldsHide = 1
                                      $(`#${settingsCustomizationArrayId.timeConsumed[0]}`).hide()
                                      $(`#${settingsCustomizationArrayId.timeConsumed[1]}`).hide()
                                  } else {
                                      currentSettings.timeConsumedFieldsHide = 0
                                      $(`#${settingsCustomizationArrayId.timeConsumed[0]}`).show()
                                      $(`#${settingsCustomizationArrayId.timeConsumed[1]}`).show()
                                  }
                              } else if(ele.hasClass("customization-label")) {
                                  if(ele.is(':checked')) {
                                      text = $(`#${parent}`).find(".custom-text").val()
                                      currentSettings.timeConsumedFieldLabelText = text
                                      $(`#${settingsCustomizationArrayId.timeConsumed[1]}`).text(text ? text : "")
                                  } else {
                                      currentSettings.timeConsumedFieldLabelText = ""
                                      $(`#${settingsCustomizationArrayId.timeConsumed[1]}`).text("Time Consumed:")
                                  }
                              } else {
                                  if(ele.is(':checked')) {
                                      currentSettings.timeConsumedLabelHide = 1
                                      $(`#${settingsCustomizationArrayId.timeConsumed[1]}`).hide()
                                  } else {
                                      currentSettings.timeConsumedLabelHide = 0
                                      $(`#${settingsCustomizationArrayId.timeConsumed[1]}`).show()
                                  }
                              }
                              break;
                          case "cb-role":
                              var radios = document.getElementsByName('inlineRadioOptions');
                              for (var i = 0; i < radios.length; i++) {
                                  if (radios[i].checked) {;
                                      var valR = radios[i].value;
                                      if(currentSettings.currentRole != valR) {
                                          currentSettings.currentRole = valR;
                                          console.log(valR)
                                          if(valR == "Designer") {
                                              $("#upsell, #gcb-upsells, #gcb-upsells-list, #reference-links, #gcb-reference, #gcb-reference-list").css("display", "none")
                                              $("#gcb-upsells").parent().prev().css("display", "none")
                                              $("#gcb-reference").parent().prev().css("display", "none")
                                          } else {
                                              $("#upsell, #gcb-upsells, #gcb-upsells-list, #reference-links, #gcb-reference, #gcb-reference-list").css("display", "block")
                                          }
                                          $("#gcb-role").text(valR + ": ");
                                          $("select#role").find('option:first-child').prop('selected', true);
                                          $('select#role option').each(function() {
                                              var option = $(this)
                                              if(option.data("type") != valR && option.val() != "members") {
                                                  option.hide();
                                              } else {
                                                  option.show();
                                              }
                                          });
                                      }
                                      break;
                                  }
                              }
                              break;
                          default:
                              break;
                      }
                  })
                  setSessionStorage("test1.customization.settings", currentSettings )
              }
      
              if(getSessionStorage("test1.general.settings")) {
                  var GcurrentSettings = getSessionStorage("test1.general.settings");
                  if(($("#settingsTabNav").hasClass("dark--theme") && GcurrentSettings.darkmode != 1) || !$("#settingsTabNav").hasClass("dark--theme") && GcurrentSettings.darkmode == 1) {
                    if($("#settingsTabNav").hasClass("dark--theme")) {
                        GcurrentSettings.darkmode = 1;
                        $("body").addClass("dark--theme");
                        $("img#logo-gcb").attr("src", "https://s13.gifyu.com/images/SC5wE.png");
                        $(".video-container").html(`<iframe src="https://www.youtube.com/embed/lrf-GAYUOkQ?&controls=0&autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>`);
                    } else {
                        GcurrentSettings.darkmode = 0;
                        $("body").removeClass("dark--theme");
                        $("img#logo-gcb").attr("src", "https://s13.gifyu.com/images/SC1j8.png");
                        $(".video-container").html(`<iframe src="https://www.youtube.com/embed/Y1BmjPeatI4?&controls=0&autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>`);
                    }
                  }
                  var doRestart = GcurrentSettings.vidBG;
                  if($("#vid-bg").is(':checked')) {
                    GcurrentSettings.vidBG = 0;
                  } else {
                    GcurrentSettings.vidBG = 1;
                  }
                  
                  setSessionStorage("test1.general.settings", GcurrentSettings )
                  if($("#vid-bg").is(':checked') && doRestart == 1) {
                    window.location.reload();
                  }
              }
          })
      
          var toastElList = [].slice.call(document.querySelectorAll('.toast'));
            var delay = 13000; // Initial delay
            var toastList = toastElList.map(function(toastEl, index) {
            delay += 2000; // Incrementing delay for each toast
            return new bootstrap.Toast(toastEl, {
                autohide: true,
                animation: true,
                delay: delay
            });
            });

            toastList.forEach(function(toast) {
                toast.show();
            });
      
      });    
    }
}

loadLibraries(0);

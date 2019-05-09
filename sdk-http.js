var PushAlertCo = new function() {
    this.mobilePos = 'mobileBottom';
    this.isMobile = false;
    this.seg_id = 0;
    this.method = 2;
    this.pa_id = 9480;
    this.subdomain = "mobiletech.pushalert.co";
    this.subdomain_url = "https://mobiletech.pushalert.co";
    this.domain = "localhost";
    this.pa_subdomain = "https://mobiletech.pushalert.co";
    this.subs_id = "";
    this.local_str = {
        "lt-subscribe-box-1": "Thanks for Subscribing!",
        "lt-subscribe-box-2": "Press close to continue.",
        "lt-popup-title": "Click on Allow to get notifications.",
        "lt-popup-subtitle": "Get real-time updates through Push Notifications.",
        "lt-close": "Close",
        "lt-side-widget-title": "Notifications",
        "lt-widget-title": "Website Notifications",
        "lt-widget-text": "Get notifications in real-time for staying up to date with content that matters to you.",
        "lt-widget-more-options-desktop": "Mouseover for more options",
        "lt-widget-more-options-mobile": "Tap for more options",
        "lt-subscribe": "Subscribe",
        "lt-unsubscribe": "Unsubscribe",
        "lt-not-now": "Not Now",
        "lt-unsubscribe-box-1": "Are you sure you want to unsubscribe?",
        "lt-yes": "Yes",
        "lt-no": "No",
        "lt-unblock-box-1": "Please unblock notification in order to subscribe.",
        "lt-unblock": "Unblock",
        "lt-cancel": "Cancel",
        "lt-notf-pref-title": "Notification Preferences",
        "lt-notf-pref-info-text": "You are currently subscribed to receive notifications.",
        "lt-notf-pref-stop-usage": "Stop Usage Tracking",
        "lt-notf-pref-stop-usage-confirm": "Usage tracking has been stopped.",
        "lt-notf-pref-view-data": "View My Data",
        "lt-notf-pref-view-data-confirm": "Please wait, getting your data...",
        "lt-notf-pref-unsubscribe": "Unsubscribe &amp; Delete All Data",
        "lt-notf-pref-unsubscribe-confirm": "Unsubscribed and all data deleted.",
        "lt-unblock-mobile": "You've blocked notifications, please click on the lock pad icon, go to site settings and enable \"Notifications\" under \"Permission\". Refresh the page.",
        "lt-unblock-chrome": "You've blocked notifications, please click on the lock pad icon, then set \"Notifications\" to \"Always allow on this site\". Refresh the page.",
        "lt-unblock-firefox": "You've blocked notifications, please click on the lock pad icon, then set \"Receive Notifications\" to \"Allow\" under \"Permissions\". Refresh the page."
    };
    this.cookie_id = "9480_1_";
    this.disableIframe = true;
    
    this.safariEnabled = false;
    this.safari_web_push_id="";
    this.safariReqInitiated = false;
    this.safari_icon = "https://pushalert.co/safari-icon/default.png";
    this.safari_web_name = "";
    
    this.enableSubdomainIntegration = false;
    
    this.enableWidget = 1;
    this.widgetTheme = 'round';
    this.widgetColor = '#337ab7';
    this.widgetText = 'Get notifications in real-time for staying up to date with content that matters to you.';
    this.widgetPosition = {
        "pa-ticker-position": "right",
        "pa-ticker-left": 10,
        "pa-ticker-right": 10,
        "pa-ticker-bottom": 10,
        "pa-notification-left": 50,
        "pa-notification-right": 50,
        "pa-notification-bottom": 70
    };
    
    this.isListening = false;
    this.isCSSEmbeded = false;
    this.enableAutoSubs = true;
    this.enableUnsubs = true;
    
    this.subscriptionStyle = {
        "subscriptionTheme": 1,
        "subscriptionThemePos": 1,
        "subscriptionOverlayOpacity": 0,
        "subscriptionBoxColor": "#fff",
        "subscriptionBtnAllowTxt": "Allow",
        "subscriptionBtnAllowColor": "#0e82e5",
        "subscriptionBtnAllowTxtColor": "#fff",
        "subscriptionBtnDenyTxt": "Later",
        "subscriptionBtnDenyColor": "#d3d3d3",
        "subscriptionBtnDenyTxtColor": "#888",
        "subscriptionTitle": "GET THE LATEST UPDATES FROM US",
        "subscriptionTitleTxtColor": "#333",
        "subscriptionMessage": "Click on Allow to get notifications",
        "subscriptionMessageTxtColor": "#777",
        "subscriptionBoxDelay": 3000
    };

    this.appendFrame = function (){
        var iframe = document.createElement('iframe');
        iframe.src = this.subdomain_url + "?action=frame-subscribe";
        iframe.height = '0';
        iframe.width = '0';
        iframe.style.visibility = 'hidden';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        this.registerMessageListener();
    }
    
    this.pa_eq = function(a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;
        // Unwrap any wrapped objects.
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
          // Strings, numbers, dates, and booleans are compared by value.
          case '[object String]':
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return a == String(b);
          case '[object Number]':
            // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
            // other numeric values.
            return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
          case '[object Date]':
          case '[object Boolean]':
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a == +b;
          // RegExps are compared by their source patterns and flags.
          case '[object RegExp]':
            return a.source == b.source &&
                   a.global == b.global &&
                   a.multiline == b.multiline &&
                   a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = aStack.length;
        while (length--) {
          // Linear search. Performance is inversely proportional to the number of
          // unique nested structures.
          if (aStack[length] == a) return bStack[length] == b;
        }
        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;
        // Recursively compare objects and arrays.
        if (className == '[object Array]') {
          // Compare array lengths to determine if a deep comparison is necessary.
          size = a.length;
          result = size == b.length;
          if (result) {
            // Deep compare the contents, ignoring non-numeric properties.
            while (size--) {
              if (!(result = this.pa_eq(a[size], b[size], aStack, bStack))) break;
            }
          }
        } else {
          // Objects with different constructors are not equivalent, but `Object`s
          // from different frames are.
          var aCtor = a.constructor, bCtor = b.constructor;
          if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                                   _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
            return false;
          }
          // Deep compare objects.
          for (var key in a) {
            if (_.has(a, key)) {
              // Count the expected number of properties.
              size++;
              // Deep compare each member.
              if (!(result = _.has(b, key) && this.pa_eq(a[key], b[key], aStack, bStack))) break;
            }
          }
          // Ensure that both objects contain the same number of properties.
          if (result) {
            for (key in b) {
              if (_.has(b, key) && !(size--)) break;
            }
            result = !size;
          }
        }
        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return result;
    };

    // Perform a deep comparison to check if two objects are equal.
    this.pa_isEqual = function(a, b) {
      return this.pa_eq(a, b, [], []);
    };
        
    this.appendPACSS = function() {
        if(!this.isCSSEmbeded){
            pa_head = document.head || document.getElementsByTagName('head')[0];
            
            var css = '#pa-push-notification{top:0;width:100%;position:absolute}.pa-push-notification{display:block;background:#fff;padding:15px;position:fixed;z-index:999999999;box-shadow:0 0 5px 0 #555;font-weight:300;max-width:400px;border-radius:3px;bottom:auto;top:10px;left:50%}.pa-push-notification.center,.pa-push-notification.Center{top:50%;left:50%}.pa-push-notification.topCenter{margin-top:auto!important}.pa-push-notification.bottomCenter{bottom:10px;top:auto;margin-top:auto!important}.pa-push-notification.topLeft{margin-left:auto!important;margin-top:auto!important;left:10px;right:auto}.pa-push-notification.topRight{margin-left:auto!important;margin-top:auto!important;right:10px}.pa-push-notification.bottomLeft{bottom:10px;margin-left:auto!important;margin-top:auto!important;top:auto;left:10px;right:auto}.pa-push-notification.bottomRight{bottom:10px;margin-left:auto!important;margin-top:auto!important;top:auto;right:10px}.pa-push-notification .pa-logo{float:left;margin-right:10px}.pa-push-notification-confirm img.pa-logo{margin:0 auto;width:64px;height:64px}.pa-push-notification p{margin:0}.pa-push-notification .pa-promo-text{overflow:hidden;margin-bottom:20px}.pa-push-notification .pa-actions{text-align:right;clear:both}.pa-push-notification-confirm .pa-actions button,.pa-push-notification .pa-actions a,.pa-push-notification .pa-actions button{background:#2e6dbd;color:#fff;border:1px solid #14498d;border-radius:3px;display:inline-block;padding:7px 30px;text-decoration:none;font-size:16px;font-weight:300;margin-left:8px;line-height:1;outline:0;cursor:pointer;margin-bottom:0}.pa-push-notification .pa-actions a.deny,.pa-push-notification .pa-actions button.deny{color:#444;background-color:#fff;margin:0;line-height:17px;font-size:15px}.pa-push-notification-confirm .pa-actions button.deny{color:#444;background-color:#fff;margin:0}.pa-push-notification-confirm a.powered_by,.pa-push-notification a.powered_by{position:absolute;bottom:2px;left:6px;color:#337ab7;font-size:11px;font-weight:400;text-decoration:none;line-height:normal}#pa-push-notification-confirm{top:0;width:100%;position:absolute;box-sizing:content-box;left:0}#pa-push-notification-confirm div{box-sizing:content-box}.pa-push-notification-confirm{display:block;background:#fff;padding:20px;position:fixed;z-index:999999999;box-shadow:0 0 5px 0 #555;font-weight:300;width:300px;border-radius:3px;left:50%;top:50%;text-align:center;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px}.pa-push-notification-confirm p{font-size:15px;margin:0;margin-top:20px;color:#797979}.pa-push-notification-confirm h2{margin:25px auto;font-size:1.5em;text-transform:none;letter-spacing:normal}.pa-push-notification-confirm p.pa-actions{margin-top:20px}.pa-push-notification-confirm a.powered_by{width:100%}.pa-subscribe-widget-side{position:fixed;top:50%;right:0;box-shadow:rgba(255,255,255,0.247059) 1px 1px 1px inset,rgba(0,0,0,0.498039) 0 1px 2px;background:#337ab7;border-radius:4px 0 0 4px;border:1px solid #fff;border-right:0;height:135px!important;width:30px;margin-top:-68px;cursor:pointer}.pa-subscribe-widget-side.pa-widget-left{left:0;right:auto;-moz-transform:scaleX(-1);-o-transform:scaleX(-1);-webkit-transform:scaleX(-1);transform:scaleX(-1)}.pa-subscribe-widget-side > svg{margin-left:0;margin-top:0;width:30px;height:136px}.pa-subscribe-widget-side.pa-widget-left > svg{transform:scaleX(-1)}.pa-subscribe-widget-side span.pa-sep{display:block;height:1px;background:#fff;border-top:1px solid #000;opacity:.25;width:100%;position:absolute;top:32px}.pa-subscribe-widget-side span.pa-text{color:#fff;transform:rotate(-90deg);position:absolute;left:-32px;top:64px;line-height:30px;padding-right:5px;text-shadow:0 -1px 0 rgba(0,0,0,0.8);letter-spacing:.6px}.pa-subscribe-widget-round{position:fixed;right:0;box-shadow:1px 1px 1px rgba(0,0,0,0.5);background:#337ab7;border-radius:100%;border-right:0;width:50px;height:50px!important;bottom:10px;right:10px;z-index:2147483647;cursor:pointer}.pa-subscribe-widget-round svg{margin-left:10px;margin-top:10px;background-size:cover;background-position-x:0;left:0;right:0;height:32px;width:32px}@keyframes pa-shake{10%,90%{transform:translate3d(-1px,0,0);transform:rotate(2deg);transform-origin:50% 0}20%,80%{transform:translate3d(2px,0,0);transform:rotate(-4deg);transform-origin:50% 0}30%,50%,70%{transform:translate3d(-4px,0,0);transform:rotate(8deg);transform-origin:50% 0}40%,60%{transform:translate3d(4px,0,0);transform:rotate(-8deg);transform-origin:50% 0}}.pa-subscribe-widget-round:hover>svg{animation:pa-shake .82s cubic-bezier(.36,.07,.19,.97) both;transform:translate3d(0,0,0);backface-visibility:hidden;perspective:1000px}.pa-subscribe-widget-round.pa-opened>svg{opacity:0}.pa-subscribe-widget-round.pa-opened>svg.close,.pa-subscribe-widget-round.pa-opened>svg.pa-close{opacity:1;animation:none}.pa-subscribe-widget-round.pa-opened,.pa-subscribe-widget-round:focus,.pa-subscribe-widget-round:hover,.pa-subscribe-widget-side.pa-opened,.pa-subscribe-widget-side:focus,.pa-subscribe-widget-side:hover,.pa-subscribe-widget-round.pa-unsubscribe.pa-opened,.pa-subscribe-widget-round.pa-unsubscribe.pa-desktop:focus,.pa-subscribe-widget-round.pa-unsubscribe.pa-desktop:hover,.pa-subscribe-widget-side.pa-unsubscribe.pa-desktop.pa-opened,.pa-subscribe-widget-side.pa-unsubscribe.pa-desktop:focus,.pa-subscribe-widget-side.pa-unsubscribe.pa-desktop:hover{outline:0;-webkit-tap-highlight-color:rgba(0,0,0,0);tap-highlight-color:rgba(0,0,0,0);opacity:1}.pa-subscribe-widget-round>svg{position:absolute;transition:opacity .35s ease-out}.pa-subscribe-widget-round svg.close,.pa-subscribe-widget-round svg.pa-close{margin-left:18px;margin-top:18px;background-size:cover;background-position-x:0;background-position-x:16px;opacity:0;transition:opacity .35s ease;height:16px;width:16px}.pa-subscribe-widget-round svg.pa-close-widget{left:42px;top:-8px;margin:0;opacity:1;height:18px;width:18px;padding:5px}.pa-subscribe-widget-round.pa-subscribe-widget-custom svg.pa-close-widget{left:50px;top:-8px;margin:0;opacity:1;height:10px;width:10px;padding:5px;animation:none}.pa-subscribe-widget-round.pa-unsubscribe,.pa-subscribe-widget-side.pa-unsubscribe{opacity:.65;transition:opacity .5s ease}.pushalert-notification-info{user-select:none;width:250px;background:#fff;border:1px solid #bbb;position:fixed;bottom:70px;right:50px;opacity:0;transform:scale(0) translateZ(0);transition:transform 150ms ease-in-out,opacity 150ms ease-in-out;transform-origin:right bottom;box-shadow:0 2px 6px 0 rgba(0,0,0,.4);border:0;border-radius:10px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;cursor:default}.pushalert-notification-info.pa-side-widget{bottom:auto;top:50%;transform-origin:right center}.pushalert-notification-info.pa-side-widget.pa-widget-left{right:auto;left:50px;transform-origin:left center}.pushalert-notification-info.pa-opened{transform:scale(1) translateZ(0)!important;opacity:1!important;z-index:2147483647}.pushalert-notification-info h2{letter-spacing:normal;font-size:16px;font-weight:500;margin:0;color:#fff;padding:10px;text-align:center;background:#337ab7;border-radius:10px 10px 0 0;opacity:.9;line-height:1.2em;display:block}.pushalert-notification-info-why{overflow:hidden}.pushalert-notification-info-why:hover .pushalert-notification-info-container{transform:translate3d(0,-42px,0)}.pa-no-branding .pushalert-notification-info-why:hover .pushalert-notification-info-container{transform:translate3d(0,-28px,0)}.pa-first-time .pushalert-notification-info-why:hover .pushalert-notification-info-container{transform:translate3d(0,0,0)}.pushalert-notification-info-why .pushalert-notification-info-container{transition:transform .35s}.pushalert-notification-info-why .pushalert-notification-info-container>div{position:relative;margin:10px 10px 5px;border:1px solid #eee}.pushalert-notification-info-container>div>img{margin:10px;position:absolute;width:48px;height:48px;left:0}.pushalert-notification-info-container>div>p{margin-left:69px;margin-top:10px;line-height:18px;margin-bottom:10px;margin-right:10px;font-size:15px;font-weight:300;color:#333;user-select:none;text-align:left}#pa-for-more-options{text-align:center;margin:0;font-weight:400;font-size:10px;line-height:10px;margin-bottom:5px;color:#aaa}.pushalert-notification-info-why:hover #pa-for-more-options{visibility:hidden}.pushalert-notification-info-why #pa-for-more-options{visibility:visible;transition:visibility 100ms}.pa-notification-info-actions{position:absolute;text-align:center;opacity:0;transition:visibility 0.35s,opacity 0.35s,transform .35s;transform:translate3d(0,0px,0);margin:0;margin-top:30px;width:100%;visibility:hidden}.pa-notification-info-actions.pa-first-time{display:none}.pa-first-time .pa-notification-info-actions.pa-first-time{position:relative;opacity:1;visibility:visible;margin-top:8px;display:block}.pa-no-branding .pa-notification-info-actions.pa-first-time{margin-bottom:9px}.pa-no-branding .pa-notification-info-actions.pa-first-time span{display:none}.pa-first-time .pushalert-notification-info-why #pa-for-more-options{display:none}.pa-notification-info-actions button{background:#33bea6;color:#fff;border:1px solid #299e8a;border-radius:3px;display:inline-block;padding:7px 15px;text-decoration:none;font-size:15px;font-weight:300;margin-left:8px;line-height:1;outline:0;cursor:pointer;margin-bottom:0;letter-spacing:normal;text-transform:none;height:auto;float:none}.pa-notification-info-actions button.pa-unsubscribe{color:#777 !important;border-color:#bbb;background:#fff;margin:0}.pushalert-notification-info-why:hover .pa-notification-info-actions{opacity:1;transform:translate3d(0,-42px,0);visibility:visible}.pa-no-branding .pushalert-notification-info-why:hover .pa-notification-info-actions{opacity:1;transform:translate3d(0,-42px,0);visibility:visible}.pa-first-time .pushalert-notification-info-why:hover .pa-notification-info-actions{opacity:0;transform:translate3d(0,0,0);visibility:hidden}.pa-first-time .pushalert-notification-info-why:hover .pa-notification-info-actions.pa-first-time{opacity:1;transform:translate3d(0,0,0);visibility:visible}.pa-notification-info-actions span,.pa-powered-by{color:#aaa;font-size:10px;margin-top:5px;display:block;margin-bottom:2px}.pa-notification-info-actions span a,.pa-powered-by a{color:#337ab7;text-decoration:none}.pa-notification-info-actions span a:hover,.pa-powered-by a:hover{color:#3a8bd0;text-decoration:none}.pa-no-branding .pa-notification-info-actions span{display:none}#pa-close-confirm{width:16px;position:absolute;padding:6px;right:0;top:0;display:none;cursor:pointer}#pa-close-confirm .pa-close-x{stroke:#bbb;fill:transparent;stroke-linecap:round;stroke-width:5}.pa-push-notification-safari-unblock{display:block;background:#fff;padding:20px;position:fixed;z-index:999999999;box-shadow:0 0 5px 0 #555;font-weight:300;width:920px;border-radius:3px;left:50%;top:50%;text-align:center;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px}.pa-push-notification-safari-unblock h2{margin:0 0 15px;color:#333;font-size:20px;line-height:1;letter-spacing:normal;font-weight:700}.pa-push-notification-safari-unblock a.powered_by{position:absolute;bottom:7px;left:6px;color:#337ab7;font-size:11px;font-weight:400;text-decoration:none;line-height:normal;width:100%}.pa-push-notification-safari-unblock .pa-unblock-img-container{position:relative}.pa-push-notification-safari-unblock .pa-unblock-img-container .pa-safari-unblock-txt{position:absolute;top:179px;left:372px;width:300px;font-size:13px;font-weight:500;text-align:left}.pa-push-notification-safari-unblock .pa-unblock-img-container .pa-safari-unblock-txt>img{height:16px;width:auto;vertical-align:text-bottom;margin-right:3px}div.pa-main-container-wrapper-th-1,div.pa-main-container-wrapper-th-2,div.pa-main-container-wrapper-th-3,div.pa-main-container-wrapper-th-4,div.pa-subs-msg-box-container-th-3,div.pa-subs-msg-box-container-th-4,div.pa-main-container-th-1,div.pa-subs-box-th-1,div.pa-main-container-th-2,div.pa-subs-box-th-2,p.pa-subs-title-txt,p.pa-subs-title-txt-th-3,p.pa-subs-title-txt-th-4,p.pa-subs-msg-txt,p.pa-subs-msg-txt-th-4,div.pa-subs-icon-container,div.pa-subs-msg-box-container,div.pa-subs-msg-box-container-th-2,div.pa-subs-btn-container,div.pa-subs-btn-container-th-2,a.pa-subs-btn-link,a.pa-subs-btn-link-th-2,a.pa-subs-btn-link-th-4,div.pa-subs-powered-by,div.pa-subs-powered-by-th-2,img.pa-icon-powered,a.pa-powered-by-txt,p.pa-subs-title-txt-th-2,div.pa-subs-btn-container-th-3,p.pa-subs-msg-txt-th-3,a.pa-subs-btn-link-th-3{margin:0;padding:0;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;font-size:15px;line-height:1;text-decoration:none;user-select:none;color:#333;background:none;text-align:left;-webkit-font-smoothing:antialiased;font-weight:400;z-index:9999;box-sizing:content-box}#pa-push-notification-subscription{z-index:2147483647}div.pa-main-container-wrapper-th-1{width:100%;position:fixed;top:0;left:0;right:0}div.pa-main-container-wrapper-th-2{width:100%;position:fixed;top:0;left:0;background:#fff;box-shadow:0 1px 5px rgba(0,0,0,.25);z-index:2147483647;right:0}div.pa-main-container-wrapper-th-3{width:100%;position:fixed;top:100px;left:0;opacity:0;right:0}div.pa-main-container-wrapper-th-4{position:fixed;top:10px;left:100px;right:auto;opacity:0}div.pa-main-container-th-1{margin:0 auto;max-width:420px}div.pa-main-container-th-2{margin:0 auto}div.pa-main-container-th-3{margin:0 auto;max-width:670px}div.pa-main-container-th-4{max-width:380px}div.pa-subs-box-th-1{min-height:64px;height:auto;padding:20px;background:#fff;position:relative;border-radius:0 0 5px 5px;box-shadow:0 0 8px rgba(0,0,0,0.35);border-top:0}div.pa-subs-box-th-2{height:auto;position:relative;text-align:center;max-width:1000px;margin:0 auto}div.pa-subs-box-th-3{height:auto;background:#fff;position:relative;border:0;border-radius:3px;box-shadow:0 0 8px rgba(0,0,0,0.35);text-align:center;margin-left:10px;margin-right:10px}div.pa-subs-box-th-4{min-height:64px;height:auto;padding:20px;background:#fff;position:relative;border-radius:3px;box-shadow:0 0 5px rgba(0,0,0,0.35);border-top:0}div.pa-main-container-wrapper-th-1.pa-th-1-center{opacity:0;position:fixed;top:50%;left:0;opacity:0;display:block;margin-top:-100px}div.pa-main-container-wrapper-th-1.pa-th-1-bottom,div.pa-main-container-wrapper-th-2.pa-th-2-bottom{top:auto;bottom:-500px}div.pa-main-container-wrapper-th-1.pa-th-1-top,div.pa-main-container-wrapper-th-2.pa-th-2-top{top:-500px;bottom:auto}div.pa-main-container-wrapper-th-1.pa-show-subs-box.pa-th-1-bottom,div.pa-main-container-wrapper-th-2.pa-show-subs-box.pa-th-2-bottom{top:auto;bottom:0;transition:top 500ms cubic-bezier(0.17,0.04,0.03,0.94),bottom 500ms cubic-bezier(0.17,0.04,0.03,0.94)}div.pa-main-container-wrapper-th-1.pa-show-subs-box.pa-th-1-top,div.pa-main-container-wrapper-th-2.pa-show-subs-box.pa-th-2-top{top:0;bottom:auto;transition:top 500ms cubic-bezier(0.17,0.04,0.03,0.94),bottom 500ms cubic-bezier(0.17,0.04,0.03,0.94)}div.pa-main-container-wrapper-th-1.pa-show-subs-box.pa-th-1-center,div.pa-main-container-wrapper-th-3.pa-show-subs-box{opacity:1;transition:opacity 500ms cubic-bezier(0.17,0.04,0.03,0.94)}div.pa-main-container-wrapper-th-4.pa-show-subs-box{opacity:1}div.pa-main-container-wrapper-th-4.pa-show-subs-box .pa-subs-box-th-4{animation:animatebottompa .8s}@keyframes animatebottompa{from{bottom:-15px;opacity:.5}to{bottom:0;opacity:1}}div.pa-main-container-wrapper-th-1.pa-th-1-bottom .pa-subs-box-th-1{border-radius:5px 5px 0 0;margin-top:8px}div.pa-main-container-wrapper-th-1.pa-th-1-center .pa-subs-box-th-1{border-radius:5px;box-shadow:0 0 8px rgba(0,0,0,0.35)}div.pa-subs-icon-container{position:absolute;top:20px}div.pa-subs-icon-container-th-3{display:inline-block;margin-top:15px;padding-right:5px;padding-left:5px}div.pa-subs-msg-box-container{margin-left:80px}div.pa-subs-msg-box-container-th-2{display:inline-block;margin:15px 10px 0}div.pa-subs-msg-box-container-th-3{display:inline-block;vertical-align:top;margin-top:15px;padding-left:5px;padding-right:5px}div.pa-subs-msg-box-container-th-4{display:inline-block;vertical-align:top;margin-top:15px;padding-left:5px;padding-right:5px}p.pa-subs-title-txt{color:#333;font-size:15px;font-weight:700;margin-bottom:15px;line-height:1.15em;letter-spacing:.02em;word-spacing:1px}p.pa-subs-title-txt-th-2{color:#333;font-size:18px;text-align:center;line-height:1.25em}p.pa-subs-title-txt-th-3{color:#333;font-size:15px;text-align:left;font-weight:700}p.pa-subs-title-txt-th-4{color:#333;font-size:15px;text-align:left;font-weight:700;margin-bottom:5px}p.pa-subs-msg-txt{color:#444;font-size:14px;font-weight:400;text-transform:none;line-height:1.15}p.pa-subs-msg-txt-th-3{color:#444;font-size:13px;font-weight:400;text-transform:none;margin-top:5px}p.pa-subs-msg-txt-th-4{color:#000;font-size:14px;text-transform:none;line-height:1.15;margin-bottom:10px}div.pa-subs-btn-container,div.pa-subs-btn-container-th-4{text-align:right}div.pa-subs-btn-container-th-2{display:inline-block;margin-top:15px}div.pa-subs-btn-container-th-2 .pa-subs-btn{margin-bottom:15px}div.pa-subs-btn-container-th-3{display:inline-block;vertical-align:top;padding-top:15px;padding-left:10px;padding-right:10px;text-align:center}div.pa-subs-btn-container-th-4 a.pa-subs-btn-link{font-size:14px}div.pa-subs-btn{display:inline-block}div.pa-subs-btn-th-3{display:inline-block;margin-bottom:15px}div.pa-subs-btn-th-4{display:inline-block}a.pa-subs-btn-link{display:block;min-width:60px;width:auto;text-align:center;padding:8px 12px;font-size:15px;background:#0e82e5;color:#fff;margin-top:15px}a.pa-subs-btn-link-th-2{display:block;min-width:60px;width:auto;text-align:center;padding:8px 12px;font-size:15px;background:#0e82e5;color:#fff}a.pa-subs-btn-link-th-3{display:block;min-width:60px;width:auto;text-align:center;padding:8px 12px;font-size:13px;background:#0e82e5;color:#fff;margin-left:10px}a.pa-subs-btn-link-th-4{display:block;min-width:50px;width:auto;text-align:center;padding:8px 12px;font-size:15px;margin-top:15px;background-color:#f9f9f9;color:#000;border:1px solid #bababa;border-radius:2px;box-shadow:0 1px 1px rgba(0,0,0,0.10)}a.pa-subs-btn-link-th-4:hover{background-color:#fdfdfd}div.pa-subs-btn #pa-allow-btn{background:#0e82e5;margin-left:20px}div.pa-subs-btn-th-3 #pa-allow-btn{background:#0e82e5}.pa-subs-btn-container-th-4 div.pa-subs-btn #pa-allow-btn{margin-left:10px}div.pa-subs-btn-th-3 #pa-deny-btn{background:#d3d3d3;color:#888}div.pa-subs-btn-th-4 #pa-deny-btn{margin-left:10px}div.pa-subs-btn-container-th-2 a#pa-deny-btn{background:none;color:#777;display:block;width:auto;text-decoration:none;text-align:center}div.pa-subs-powered-by{position:absolute;bottom:8px;left:10px}div.pa-subs-powered-by-th-2{position:absolute;right:2px;bottom:2px}div.pa-subs-powered-by-th-3{position:absolute;right:2px;bottom:-16px}div.pa-subs-powered-by-th-3 a.pa-powered-by-txt{font-size:13px;color:#337ab7}img.pa-icon-powered{margin-right:4px;vertical-align:bottom}a.pa-powered-by-txt{font-size:11px;vertical-align:bottom}a.pa-powered-by-txt:hover{text-decoration:underline}div.pa-subs-powered-by-th-2 a.pa-powered-by-txt{font-size:11px;vertical-align:bottom;color:#333}span.pa-powered-by-icon{margin-right:5px;display:inline-block}div.pa-main-container-th-2 div#pa-deny-btn{width:16px;height:16px;position:absolute;top:3px;right:3px;padding-left:10px;padding-bottom:10px;cursor:pointer;box-sizing:content-box;z-index:10000}.pa-powered-by-icon{width:14px;height:14px;margin-right:4px;vertical-align:bottom}.pa-subs-tnc-container{color:#777;font-size:12px;margin-top:20px;display:none}.pa-subs-tnc-container a{color:inherit;text-decoration:none}.pa-subs-tnc-container a:hover{text-decoration:underline}@media only screen and (max-device-width: 480px){.pa-push-notification{max-width:100%;right:auto;border-radius:0;bottom:0;top:auto;left:auto}.pa-push-notification.topCenter,.pa-push-notification.topLeft,.pa-push-notification.topRight{top:0;bottom:auto;left:0;right:0;margin:0!important}.pa-push-notification.Center{bottom:auto;left:15px;right:15px;margin-left:0!important}.pa-push-notification.bottomCenter,.pa-push-notification.bottomLeft,.pa-push-notification.bottomRight{margin:0!important;bottom:0;right:0;left:0}.pa-push-notification.mobileTop,.pa-push-notification.mobileTop,.pa-push-notification.mobileTop{top:0;bottom:auto;left:0;right:0;margin:0!important}.pa-push-notification.mobileCenter{bottom:auto;left:15px;right:15px;margin-left:0!important;top:50%}.pa-push-notification.mobileBottom,.pa-push-notification.mobileBottom,.pa-push-notification.mobileBottom{margin:0!important;bottom:0;right:0;left:0;top:auto}.pa-push-notification-confirm{width:100%;right:auto;border-radius:0;bottom:0;top:auto;left:auto;margin:0!important;padding:20px 0}.pa-push-notification-confirm p{margin-top:0}.pa-push-notification-confirm h2{margin-bottom:0;margin-top:20px}.pa-push-notification-confirm p.pa-actions{margin-top:30px}div.pa-main-container-wrapper-th-1{width:100%;position:fixed;top:auto;bottom:auto;left:0;right:0;margin:0}div.pa-main-container-th-1{max-width:100%;width:100%;margin:0}div.pa-main-container-wrapper-th-1.pa-th-1-bottom div.pa-subs-box-th-1{margin:0;border-radius:0;border:0}div.pa-main-container-wrapper-th-1.pa-th-1-top div.pa-subs-box-th-1{margin:0;border-radius:0;border:0}div.pa-main-container-wrapper-th-1.pa-th-1-center{margin-left:10px;margin-right:10px;width:auto}div.pa-main-container-wrapper-th-1.pa-th-1-center.pa-main-container-th-1{max-width:100%;margin:0 10px}div.pa-subs-powered-by{position:absolute;bottom:5px;text-align:center;width:100%;left:-10px}div.pa-subs-msg-box-container-th-2{margin-top:20px}a.pa-subs-btn-link-th-2{min-width:100px}div.pa-subs-btn-container{text-align:center;margin-bottom:10px}img.pa-subs-icon{height:40px;width:40px}div.pa-subs-msg-box-container{margin-left:65px}p.pa-subs-title-txt,p.pa-subs-title-txt-th-4{font-size:18px}p.pa-subs-msg-txt{font-size:16px}a.pa-subs-btn-link{display:block;min-width:100px;width:auto;text-align:center;padding:12px;font-size:16px;margin-top:20px;background:#0e82e5;color:#fff}p.pa-subs-msg-txt-th-3{text-align:center;font-size:14px}a.pa-subs-btn-link-th-3{font-size:14px}p.pa-subs-title-txt-th-3{text-align:center;font-size:16px}div.pa-subs-btn-container-th-2{margin-bottom:10px;text-align:center}div.pa-subs-powered-by-th-2{position:absolute;bottom:5px;width:100%;text-align:center}div.pa-main-container-wrapper-th-2 #pa-allow-btn{margin-left:0}div.pa-close-btn-th-2{top:4px;right:4px}div.pa-main-container-wrapper-th-4{left:0;right:0;top:0}div.pa-main-container-th-4{max-width:100%}div.pa-subs-btn-container-th-4{text-align:center;margin-bottom:2px}}@media only screen and (max-width: 300px){div.pa-main-container-wrapper-th-1 #pa-allow-btn{margin-left:0}}.pushalert-alerts-content{user-select:none;width:250px;background:#fff;border:1px solid #bbb;position:fixed;bottom:55px;opacity:0;transform:scale(0) translateZ(0);transition:transform 150ms ease-in-out,opacity 150ms ease-in-out;transform-origin:center bottom;box-shadow:0 2px 6px 0 rgba(0,0,0,.4);border:0;border-radius:5px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;cursor:default}.pushalert-alerts-content.pa-opened{transform:scale(1) translateZ(0)!important;opacity:1!important;z-index:2147483647}.pushalert-alerts-content:after{content:"";position:absolute;width:0;height:0;margin-left:-8px;bottom:-16px;left:50%;box-sizing:border-box;border:8px solid #000;border-color:transparent transparent #fff #fff;transform-origin:0 0;transform:rotate(-45deg);box-shadow:-2px 2px 3px 0 rgba(0,0,0,.3)}.pushalert-alerts-content-container{text-align:center;padding:15px 12px 5px}.pushalert-alerts-content-container p{line-height:1;font-size:15px;color:#333;padding:0;margin:2px 0 10px}.pushalert-alerts-content-button{margin-top:5px;font-size:16px;border:0;background:#33bea6;line-height:1;color:#fff;padding:10px 20px;border-radius:2px}.pushalert-alerts-header{user-select:none}p.pushalert-alerts-button-container{height:45px;overflow:hidden;line-height:1.3;color:#555;margin-bottom:4px}[dir="rtl"] .pa-subscribe-widget-round svg,.pa-subscribe-widget-round[dir="rtl"] svg{margin-left:0;-webkit-margin-start:8px}[dir="rtl"] .pa-subscribe-widget-round svg.pa-close,.pa-subscribe-widget-round[dir="rtl"] svg.pa-close{margin-left:0;-webkit-margin-start:16px}[dir="rtl"] .pushalert-notification-info-container>div>p{margin-left:0;-webkit-margin-start:69px;}[dir="rtl"] div.pa-subs-msg-box-container{margin-left:0;-webkit-margin-start:80px;margin-right:80px;}[dir="rtl"] .pushalert-notification-info-container>div>img{left:auto;right:0;}#paPriceDropAlt{background:#2196F3;color:#fff;border-radius:5px;}#paPriceDropMsg{background:#2196F3;position:fixed;z-index:99999;color:#fff;padding:12px 18px;line-height:1;border-radius:5px;width:220px;text-align:center;left:50%;margin-left:-110px;transition:all .2s ease;bottom:-50px}.pa-subscribe-widget-round.pa-subscribe-widget-custom{border-radius:5px;}.pa-subscribe-widget-round.pa-subscribe-widget-custom img{opacity:1;border:0;border-radius:5px;transition:opacity .5s ease}.pa-subscribe-widget-round.pa-subscribe-widget-custom.pa-opened img{opacity:0;}div.pa-main-container-wrapper-th-4,div.pa-subs-msg-box-container-th-4,p.pa-subs-title-txt-th-4,p.pa-subs-msg-txt-th-4,a.pa-subs-btn-link-th-4{text-align:start}[dir="rtl"] p.pa-subs-title-txt,[dir="rtl"] p.pa-subs-msg-txt{text-align:start}[dir="rtl"] .pa-main-container-th-1 div.pa-subs-btn-container{margin-top:10px;}#pa-subscribe-widget-side-text{position:absolute;top:20px;transform:rotate(-90deg);right:4px;font-family:sans-serif;font-size:14px;letter-spacing:.75px;display:block;transform-origin:right bottom;white-space:nowrap;color:#fff;font-weight:300;user-select:none}.pa-widget-left #pa-subscribe-widget-side-text{bottom:7px;transform:rotate(-90deg) scaleX(-1);top:auto}';
            var style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet){
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }
            pa_head.appendChild(style);
            
            this.isCSSEmbeded = true;
        }
    }
    
    this.initSubscriptionBox =function(){
        this.appendPACSS();
        setTimeout(this.createSubscriptionBox,this.subscriptionStyle.subscriptionBoxDelay);
    }

    this.createSubscriptionBox = function () {
    
        if(PushAlertCo.subscriptionStyle.subscriptionTheme==-1){
            return;
        }
        
        var subs_box_icon = "https://cdn.pushalert.co/img/pushalert-square-icon.png?0";
        var powered_by_icon = '<svg class="pa-powered-by-icon" viewBox="0 0 700 700"><path d="M349.5,656c47.63,0,86.25-29.51,86.25-53.71H263.25C263.25,626.49,301.87,656,349.5,656ZM571.94,529.53l0-.08A146.92,146.92,0,0,1,524.5,421.19V310A174.92,174.92,0,0,0,413.87,147.39V108.32a64.37,64.37,0,0,0-128.75,0v39.07A174.92,174.92,0,0,0,174.5,310V421.19a146.92,146.92,0,0,1-47.43,108.26l0,0.08a26.85,26.85,0,0,0,16.82,47.78H555.12A26.84,26.84,0,0,0,571.94,529.53ZM349.5,132.68a29,29,0,1,1,29.06-29A29.05,29.05,0,0,1,349.5,132.68Zm189-45.21L522,112.5A213.54,213.54,0,0,1,614.5,252.65l29.5-5.27A243.65,243.65,0,0,0,538.5,87.46Zm-362,25L160,87.46A243.65,243.65,0,0,0,54.5,247.38L84,252.65A213.55,213.55,0,0,1,176.48,112.5Z" fill="#337ab7" fill-rule="evenodd"/></svg>';
        var pa_subs_box = "";
        var pa_thm_pos = "";

        if(PushAlertCo.subscriptionStyle.subscriptionTheme == 0 && PushAlertCo.disableIframe){
            PushAlertCo.subscriptionStyle.subscriptionTheme = 1;
        }
        
        if (PushAlertCo.subscriptionStyle.subscriptionTheme == 1 && PushAlertCo.subscriptionStyle.subscriptionThemePos == 1) {
            pa_thm_pos = "pa-th-1-top";
        } else if (PushAlertCo.subscriptionStyle.subscriptionTheme == 1 && PushAlertCo.subscriptionStyle.subscriptionThemePos == 2) {
            pa_thm_pos = "pa-th-1-bottom";
        } else if (PushAlertCo.subscriptionStyle.subscriptionTheme == 1 && PushAlertCo.subscriptionStyle.subscriptionThemePos == 3) {
            pa_thm_pos = "pa-th-1-center";
        } 

        if (PushAlertCo.subscriptionStyle.subscriptionTheme == 1) {
            pa_subs_box = '<div class="pa-main-container-wrapper-th-1 pa-main-container-th-1 ' + pa_thm_pos + '" id="pa-push-notification-subscription">\
                                                            <div class="pa-subs-box-th pa-subs-box-th-1" style="background-color:' + PushAlertCo.subscriptionStyle.subscriptionBoxColor + ';">\
                                                                    <div class="pa-subs-icon-container">\
                                                                            <img class="pa-subs-icon" src="' + subs_box_icon + '" alt="PushAlert" width="64" height="64"/>\
                                                                    </div>\
                                                                    <div class="pa-subs-msg-box-container">\
                                                                            <div class="pa-subs-title-txt-container">\
                                                                            <p class="pa-subs-title-txt" style="color:' + PushAlertCo.subscriptionStyle.subscriptionTitleTxtColor + ';">' + PushAlertCo.subscriptionStyle.subscriptionTitle + '</p>\
                                                                            </div>\
                                                                            <div class="pa-subs-msg-txt-container">\
                                                                            <p class="pa-subs-msg-txt" style="color:' + PushAlertCo.subscriptionStyle.subscriptionMessageTxtColor + ';">' + PushAlertCo.subscriptionStyle.subscriptionMessage + '</p>\
                                                                            </div>\
                                                                    </div>\
                                                                    <div class="pa-subs-btn-container">\
                                                                            <div class="pa-subs-btn"><a class="pa-subs-btn-link" id="pa-deny-btn" href="#deny" style="background-color:' + PushAlertCo.subscriptionStyle.subscriptionBtnDenyColor + ';color:' + PushAlertCo.subscriptionStyle.subscriptionBtnDenyTxtColor + ';">' + PushAlertCo.subscriptionStyle.subscriptionBtnDenyTxt + '</a></div>\
                                                                            <div class="pa-subs-btn"><a class="pa-subs-btn-link" id="pa-allow-btn" href="#allow" style="background-color:' + PushAlertCo.subscriptionStyle.subscriptionBtnAllowColor + ';color:' + PushAlertCo.subscriptionStyle.subscriptionBtnAllowTxtColor + ';">' + PushAlertCo.subscriptionStyle.subscriptionBtnAllowTxt + '</a></div>\
                                                                    </div>\
                                                                    <div class="pa-subs-powered-by">\
                                                                            <a class="pa-powered-by-txt" rel="nofollow" href="https://pushalert.co" style="color:' + PushAlertCo.subscriptionStyle.subscriptionTitleTxtColor + ';" target="_blank">' + powered_by_icon + 'by PushAlert</a>\
                                                                    </div>\
                                                            </div>\
                                                    </div>';
        } 

        var paSubsContainer = document.createElement('div');
        paSubsContainer.innerHTML = pa_subs_box;
        document.body.appendChild(paSubsContainer);
        setTimeout(PushAlertCo.showSubscriptionBox, 0);
        
        document.getElementById("pa-allow-btn").onclick = function () {
            if(PushAlertCo.PAcheckBrowser()==="safari" && 'safari' in window && 'pushNotification' in window.safari){
                PushAlertCo.checkSafariPermission(window.safari.pushNotification.permission(PushAlertCo.safari_web_push_id));
            }
            else{
                if(PushAlertCo.disableIframe){
                    PushAlertCo.PA_POPUP();
                }
                else{
                    PushAlertCo.appendFrame();
                }
            }
            PushAlertCo.hideSubscriptionBox();
            return false;
        }

        document.getElementById("pa-deny-btn").onclick = function () {
            var result = [];
            result.status = 0;
            PushAlertCo.callbackOnFailure(result);
            PushAlertCo.setCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status', 'canceled', 9999);
            PushAlertCo.hideSubscriptionBox();
            return false;
        }
    };

    this.showSubscriptionBox = function () {
        var subs_box_container = document.getElementById("pa-push-notification-subscription");
        subs_box_container.className = subs_box_container.className + " pa-show-subs-box";
        var subs_box_overlay = document.getElementById("pa-push-notification-subscription-overlay");
        if (subs_box_overlay !== null && typeof subs_box_overlay !== 'undefined') {
            subs_box_overlay.style.transition = "opacity 500ms cubic-bezier(0.17, 0.04, 0.03, 0.94)";
            subs_box_overlay.style.opacity = PushAlertCo.subscriptionStyle.subscriptionOverlayOpacity;
        }
    }
    
    this.hideSubscriptionBox = function (){
        var paPNSOverlay = document.getElementById("pa-push-notification-subscription-overlay");
        var paPNS = document.getElementById("pa-push-notification-subscription");
        
        if(typeof paPNS !== 'undefined' && paPNS!==null){
            //var boxDiv = paPNS.getElementsByTagName("div")[0];
            paPNS.style.transition = 'opacity 1500ms cubic-bezier(0.17, 0.04, 0.03, 0.94), top 1500ms cubic-bezier(0.17, 0.04, 0.03, 0.94), bottom 1500ms cubic-bezier(0.17, 0.04, 0.03, 0.94)';
            
            paPNS.className = paPNS.className.replace(/pa-show-subs-box/i,'');
        }

        if(typeof paPNSOverlay !== 'undefined' && paPNSOverlay!==null){
            paPNSOverlay.style.opacity = '0';
        }
        
        setTimeout(function(){
            var paPNSOverlay = document.getElementById("pa-push-notification-subscription-overlay");
            var paPNS = document.getElementById("pa-push-notification-subscription");

            if(typeof paPNS !== 'undefined' && paPNS!==null){
               paPNS.parentElement.remove();
            }

            if(typeof paPNSOverlay !== 'undefined' && paPNSOverlay!==null){
               paPNSOverlay.remove();
            }
        }, 500);
    }
        
    this.confirmPushAlert = function (){
        this.appendPACSS();

        var paPushNotfCheck = document.getElementById('pa-push-notification-confirm');
        if(typeof paPushNotfCheck !== 'undefined' && paPushNotfCheck!==null){
           paPushNotfCheck.remove();
        }
        
        pa_alert = '<div class="pa-push-notification-confirm" style="position:fixed">\
                <img alt="logo" src="https://cdn.pushalert.co/icons/logo.png?0" height="64" width="64" class="pa-logo">\
                <h2>'+PushAlertCo.local_str['lt-subscribe-box-1']+'</h2>\
                <p>'+PushAlertCo.local_str['lt-subscribe-box-2']+'</p>\
                <p class="pa-actions">\
                        <button onclick="PushAlertCo.PA_OK()" class="allow">'+PushAlertCo.local_str['lt-close']+'</button>\
                </p>\
                <a rel="nofollow" href="https://pushalert.co/" class="powered_by" target="_blank">Powered by PushAlert</a>\
                <div id="pa-close-confirm">\
                    <svg viewBox="0 0 40 40">\
                        <path class="pa-close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>\
                    </svg>\
                </div>\
        </div>';

        //var paDivContainer = document.getElementById('pa-push-notification');
        var paDivContainer = document.createElement('div');
        paDivContainer.id = 'pa-push-notification-confirm';
        paDivContainer.innerHTML = pa_alert;
        paDivContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
        paDivContainer.style.zIndex = '2147483647';
        paDivContainer.style.position = 'absolute';
        document.body.appendChild(paDivContainer);

        var paDiv = document.getElementById('pa-push-notification-confirm').getElementsByTagName("div")[0];
        //paDivContainer.style.height = (document.body.clientHeight-paDiv.clientHeight) + 'px';
        var body = document.body,
            html = document.documentElement;
        var height = Math.max( body.scrollHeight, body.offsetHeight, 
                               html.clientHeight, html.scrollHeight, html.offsetHeight );
        paDivContainer.style.height = height + 'px';

        margin_left = (300 + 30)/2;
        paDiv.style.marginLeft = '-'+margin_left+'px';

        margin_top = (paDiv.clientHeight + 34)/2;
        paDiv.style.marginTop = '-'+margin_top+'px';

        if(this.isMobile && this.mobilePos==='mobileCenter'){
            paDiv.style.setProperty('margin-top', '-'+margin_top+'px', 'important');
        }
        else{
            paDiv.style.setProperty('margin-top', '-'+margin_top+'px');
        }
        
        var paConfirmClose = document.getElementById("pa-close-confirm");
        if(this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status")!==""){
            paConfirmClose.style.display = 'block';
        }
        paConfirmClose.addEventListener("click", function(){
            PushAlertCo.hidePushAlertConfirm();
        });
    }
    
    this.unsubscribe = function (){
        this.confirmUnsubscribe();
    }
        
    this.confirmUnsubscribe = function (){
        this.appendPACSS();


        pa_alert = '<div class="pa-push-notification-confirm">\
                <img alt="logo" src="https://cdn.pushalert.co/icons/logo.png?0" height="64" width="64" class="pa-logo">\
                <h2>'+PushAlertCo.local_str['lt-unsubscribe-box-1']+'</h2>\
                <p class="pa-actions">\
                        <button onclick="PushAlertCo.PA_UNSUBS_OK()" class="deny">'+PushAlertCo.local_str['lt-yes']+'</button> <button onclick="PushAlertCo.hidePushAlertConfirm()" class="allow">'+PushAlertCo.local_str['lt-no']+'</button>\
                </p>\
                <a rel="nofollow" href="https://pushalert.co/" class="powered_by" target="_blank">Powered by PushAlert</a>\
        </div>';

        //var paDivContainer = document.getElementById('pa-push-notification');
        var paDivContainer = document.createElement('div');
        paDivContainer.id = 'pa-push-notification-confirm';
        paDivContainer.innerHTML = pa_alert;
        paDivContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
        paDivContainer.style.zIndex = '2147483647';		
        document.body.appendChild(paDivContainer);

        var paDiv = document.getElementById('pa-push-notification-confirm').getElementsByTagName("div")[0];
        //paDivContainer.style.height = (document.body.clientHeight-paDiv.clientHeight) + 'px';
        var body = document.body,
            html = document.documentElement;
        var height = Math.max( body.scrollHeight, body.offsetHeight, 
                               html.clientHeight, html.scrollHeight, html.offsetHeight );
        paDivContainer.style.height = height + 'px';

        margin_left = (300 + 30)/2;
        paDiv.style.marginLeft = '-'+margin_left+'px';

        margin_top = (paDiv.clientHeight + 34)/2;
        paDiv.style.marginTop = '-'+margin_top+'px';

        if(this.isMobile && this.mobilePos==='mobileCenter'){
            paDiv.style.setProperty('margin-top', '-'+margin_top+'px', 'important');
        }
        else{
            paDiv.style.setProperty('margin-top', '-'+margin_top+'px');
        }
    }
    
    this.confirmUnblock = function (){
        this.appendPACSS();


        pa_alert = '<div class="pa-push-notification-confirm">\
                <img alt="logo" src="https://cdn.pushalert.co/icons/logo.png?0" height="64" width="64" class="pa-logo">\
                <h2>'+PushAlertCo.local_str['lt-unblock-box-1']+'</h2>\
                <p class="pa-actions">\
                        <button onclick="PushAlertCo.PA_Unblock()" class="allow">'+PushAlertCo.local_str['lt-unblock']+'</button> <button onclick="PushAlertCo.hidePushAlertConfirm()" class="deny">'+PushAlertCo.local_str['lt-cancel']+'</button>\
                </p>\
                <a rel="nofollow" href="https://pushalert.co/" class="powered_by" target="_blank">Powered by PushAlert</a>\
        </div>';

        //var paDivContainer = document.getElementById('pa-push-notification');
        var paDivContainer = document.createElement('div');
        paDivContainer.id = 'pa-push-notification-confirm';
        paDivContainer.innerHTML = pa_alert;
        paDivContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
        paDivContainer.style.zIndex = '2147483647';		
        document.body.appendChild(paDivContainer);

        var paDiv = document.getElementById('pa-push-notification-confirm').getElementsByTagName("div")[0];
        //paDivContainer.style.height = (document.body.clientHeight-paDiv.clientHeight) + 'px';
        var body = document.body,
            html = document.documentElement;
        var height = Math.max( body.scrollHeight, body.offsetHeight, 
                               html.clientHeight, html.scrollHeight, html.offsetHeight );
        paDivContainer.style.height = height + 'px';

        margin_left = (300 + 30)/2;
        paDiv.style.marginLeft = '-'+margin_left+'px';

        margin_top = (paDiv.clientHeight + 34)/2;
        paDiv.style.marginTop = '-'+margin_top+'px';

        if(this.isMobile && this.mobilePos==='mobileCenter'){
            paDiv.style.setProperty('margin-top', '-'+margin_top+'px', 'important');
        }
        else{
            paDiv.style.setProperty('margin-top', '-'+margin_top+'px');
        }
    }
    
    this.confirmSafariUnblock = function (){
        this.appendPACSS();
        
        pa_alert = '<div class="pa-push-notification-safari-unblock">\
                <h2>'+PushAlertCo.local_str['lt-unblock-box-1']+'</h2>\
                <div class="pa-unblock-img-container">\
                    <img alt="unblock instructions" src="https://cdn.pushalert.co/img/safari-push-notification-how-to-unblock.png?V=1" height="318" width="905">\
                    <div class="pa-safari-unblock-txt">\
                        <img alt="logo" src="'+this.safari_icon+'"/>\
                        '+this.safari_web_name+'\
                    </div>\
                </div>\
                <a rel="nofollow" href="https://pushalert.co/" class="powered_by" target="_blank">Powered by PushAlert</a>\
                 <div id="pa-close-confirm" style="display:block">\
                    <svg viewBox="0 0 40 40">\
                        <path class="pa-close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>\
                    </svg>\
                </div>\
        </div>';

        //var paDivContainer = document.getElementById('pa-push-notification');
        var paDivContainer = document.createElement('div');
        paDivContainer.id = 'pa-push-notification-confirm';
        paDivContainer.innerHTML = pa_alert;
        paDivContainer.style.backgroundColor = 'rgba(0,0,0,0.5)';
        paDivContainer.style.zIndex = '2147483647';		
        document.body.appendChild(paDivContainer);

        var paDiv = document.getElementById('pa-push-notification-confirm').getElementsByTagName("div")[0];
        //paDivContainer.style.height = (document.body.clientHeight-paDiv.clientHeight) + 'px';
        var body = document.body,
            html = document.documentElement;
        var height = Math.max( body.scrollHeight, body.offsetHeight, 
                               html.clientHeight, html.scrollHeight, html.offsetHeight );
        paDivContainer.style.height = height + 'px';

        margin_left = (920 + 30)/2;
        paDiv.style.marginLeft = '-'+margin_left+'px';

        margin_top = (paDiv.clientHeight + 34)/2;
        paDiv.style.marginTop = '-'+margin_top+'px';
        
        var paConfirmClose = document.getElementById("pa-close-confirm");
        paConfirmClose.addEventListener("click", function(){
            PushAlertCo.hidePushAlertConfirm();
        });
    }

    this.PA_OK = function (){
        this.PopupCenter(this.subdomain_url + '?action=frame-subscribed&segment='+this.seg_id, "PushAlert Confirmation", 300, 250);
        this.hidePushAlertConfirm();
    }
    
    this.PA_POPUP = function (){
        this.registerMessageListener();
        
        this.PopupCenter(this.subdomain_url + '?action=subscribe&segment='+this.seg_id, "PushAlert Confirmation", 450, 350);
    }
    
    this.PA_Unblock = function (){
        window.open(this.subdomain_url + '?segment='+this.seg_id);
        this.hidePushAlertConfirm();
        this.registerMessageListener();
    }
    
    this.PA_UNSUBS_OK = function (){
        var checkBrowser = this.PAcheckBrowser();
        
        if(checkBrowser==="safari"){
            this.unsubscribeSafari();
        }
        else{
            this.PopupCenter(this.subdomain_url + '?action=unsubscribe', "PushAlert Confirmation", 300, 250);
            this.registerMessageListener();
            this.hidePushAlertConfirm();
        }
    }

    this.PopupCenter = function(url, title, w, h) {
        // Fixes dual-screen position                         Most browsers      Firefox
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, title, 'menubar=no,location=no,resizable=no,scrollbars=no,status=no,location=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }
    }
    
    this.showSubscribeWidget = function (){
        this.appendPACSS();


        if(this.widgetTheme==='round'){
            pa_alert = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#fff" d="M16 30c2.2 0 3.9-1.3 3.9-2.5H12c0 1.1 1.8 2.5 4 2.5zm10.1-5.8a6.86 6.86 0 0 1-2.2-5v-5.1a7.84 7.84 0 0 0-5.1-7.4V5a2.8 2.8 0 0 0-2.57-3H16a3 3 0 0 0-3 3v1.8a8 8 0 0 0-5.1 7.4v5.1a6.3 6.3 0 0 1-2.2 4.9 1.23 1.23 0 0 0-.5 1c0 .2.1.4.1.6a1.23 1.23 0 0 0 1.1.7h19a1.23 1.23 0 0 0 1.1-.7 1.27 1.27 0 0 0 .1-.6 1.23 1.23 0 0 0-.5-1zM16 6.1a1.3 1.3 0 1 1 1.3-1.3A1.32 1.32 0 0 1 16 6.1z"/></svg>\
            <svg class="pa-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#fff" d="M18.83 16L31.4 3.42A2 2 0 0 0 28.6.6L16 13.16 3.42.6A2 2 0 1 0 .6 3.4L13.16 16 .6 28.58A2 2 0 0 0 3.4 31.4L16 18.84 28.58 31.4a2 2 0 1 0 2.83-2.82z"/></svg>';

            //var paDivContainer = document.getElementById('pa-push-notification');
            var paDivContainer = document.createElement('div');
            paDivContainer.id = 'pushalert-ticker';
            paDivContainer.className = 'pa-subscribe-widget-round';
            if(!this.isMobile){
                paDivContainer.className = paDivContainer.className + ' pa-desktop';
            }
            if(this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status")==="subscribed"){
                paDivContainer.className = paDivContainer.className + ' pa-unsubscribe';
            }
            paDivContainer.innerHTML = pa_alert;
            paDivContainer.style.backgroundColor = this.widgetColor;
            paDivContainer.style.height = "0px";
            paDivContainer.style.left = "auto";
            paDivContainer.style.right = "auto";
            if(this.widgetPosition['pa-ticker-position']==="right"){
                paDivContainer.style.right = this.widgetPosition['pa-ticker-right']+'px';
            }
            else{
                paDivContainer.style.left = this.widgetPosition['pa-ticker-left']+'px';
            }
            paDivContainer.style.bottom = this.widgetPosition['pa-ticker-bottom']+'px';
            
            paDivContainer.addEventListener("click", function(){
                if(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')==='subscribed'){
                    PushAlertCo.PA_NOTIFICATION_INFO_TOGGLE();
                }
                else if(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')==='' && !PushAlertCo.enableAutoSubs && PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_dialog')===''){
                    PushAlertCo.clearPAFirstTime(true);
                }
                else{
                    var checkBrowser = PushAlertCo.PAcheckBrowser();
                    if(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')==='unsubscribed' && checkBrowser==="safari"){
                        PushAlertCo.PA_NOTIFICATION_SUBS_INFO_TOGGLE();
                    }
                    else{
                        PushAlertCo.forceSubscribe();
                    }
                }
                PushAlertCo.hideSubscriptionBox();
            });
            document.body.appendChild(paDivContainer);

        }
        else{
            pa_alert = '<span class="pa-sep"></span>\
            <span id="pa-subscribe-widget-side-text">'+PushAlertCo.local_str['lt-side-widget-title']+'</span>\
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 136" enable-background="new 0 0 30 136"><style type="text/css">.st2{fill:#FFFFFF;} .st3{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}</style><g id="Layer_3"><path id="Forma_1" d="M16 25.3c1.5 0 2.6-.9 2.6-1.6h-5.3c.1.7 1.3 1.6 2.7 1.6zm6.8-3.8c-.9-.8-1.4-2-1.4-3.3v-3.4c0-2.3-1.4-4.2-3.4-5V8.6c0-1.1-.9-2-2-2s-2 .9-2 2v1.2c-2 .8-3.4 2.7-3.4 5v3.4c0 1.3-.6 2.5-1.4 3.3-.2.2-.3.4-.3.6 0 .1 0 .3.1.4.1.3.4.4.7.4h12.6c.3 0 .6-.2.7-.4.1-.1.1-.2.1-.4s-.1-.5-.3-.6zM16 9.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" class="st3"/><path id="Forma_1_1_" d="M21.8 8l-.5.8c1.5 1 2.5 2.5 2.8 4.3l.9-.2c-.4-2-1.5-3.8-3.2-4.9zM7 12.9l.9.1c.3-1.7 1.3-3.3 2.8-4.3l-.5-.7C8.5 9.1 7.4 10.9 7 12.9z" class="st3"/></g></svg>';

            //var paDivContainer = document.getElementById('pa-push-notification');
            var paDivContainer = document.createElement('div');
            paDivContainer.id = 'pushalert-ticker';
            paDivContainer.className = 'pa-subscribe-widget-side';
            if(!this.isMobile){
                paDivContainer.className = paDivContainer.className + ' pa-desktop';
            }
            if(this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status")==="subscribed"){
                paDivContainer.className = paDivContainer.className + ' pa-unsubscribe';
            }
            if(this.widgetPosition['pa-ticker-position']==="left"){
                paDivContainer.className = paDivContainer.className + ' pa-widget-left';
            }
            paDivContainer.innerHTML = pa_alert;
            paDivContainer.style.backgroundColor = this.widgetColor;
            paDivContainer.style.height = "0px";
            paDivContainer.style.zIndex = '2147483647';	
            
            paDivContainer.addEventListener("click", function(){
                if(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')==='subscribed'){
                    PushAlertCo.PA_NOTIFICATION_INFO_TOGGLE();
                }
                else if(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')==='' && !PushAlertCo.enableAutoSubs && PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_dialog')===''){
                    PushAlertCo.clearPAFirstTime(true);
                }
                else{
                    var checkBrowser = PushAlertCo.PAcheckBrowser();
                    if(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')==='unsubscribed' && checkBrowser==="safari"){
                        PushAlertCo.PA_NOTIFICATION_SUBS_INFO_TOGGLE();
                    }
                    else{
                        PushAlertCo.forceSubscribe();
                    }
                }
                PushAlertCo.hideSubscriptionBox();
            });
            
            document.body.appendChild(paDivContainer);

            //fix height
            var tmp_height = (document.getElementById("pa-subscribe-widget-side-text").offsetWidth + 49);
            document.getElementById("pushalert-ticker").style.setProperty("height", tmp_height+"px", "important");
            document.getElementById("pushalert-ticker").style.setProperty("margin-top", "-" + (tmp_height/2) + "px");
            if(this.isMobile){
            }
            else{
            }
        }
        
        this.addPANotificationInfo(!(this.widgetTheme==='round'));
    }
    
    this.addPANotificationInfo = function(isSideWidget){
        if(document.getElementsByClassName("pushalert-notification-info").length==0){
            var more_opts_text  = PushAlertCo.local_str['lt-widget-more-options-desktop'];
            if(this.isMobile){
                var more_opts_text  = PushAlertCo.local_str['lt-widget-more-options-mobile'];
            }
        var elem = '\
            <h2 style="background:'+this.widgetColor+'">'+PushAlertCo.local_str['lt-widget-title']+'</h2>\
            <div class="pushalert-notification-info-why">\
                <div class="pushalert-notification-info-container">\
                    <div>\
                        <img alt="logo" src="https://cdn.pushalert.co/img/pushalert-square-icon.png?0" height="48" width="48"/>\
                        <p>\
                            '+this.local_str['lt-widget-text']+'\
                        </p>\
                    </div>\
                    <p id="pa-for-more-options">'+ more_opts_text +'</p>\
                    <p class="pa-notification-info-actions">\
                        <button onclick="PushAlertCo.PA_NOTIFICATION_INFO_TOGGLE();PushAlertCo.PA_UNSUBS_OK()" class="pa-unsubscribe">'+PushAlertCo.local_str['lt-unsubscribe']+'</button>\
                        <button onclick="PushAlertCo.PA_NOTIFICATION_INFO_TOGGLE()">'+PushAlertCo.local_str['lt-cancel']+'</button>      \
                        <span>Notifications by <a rel="nofollow" href="https://pushalert.co" target="_blank">PushAlert</a></span>\
                    </p>\
                    <p class="pa-notification-info-actions pa-first-time">\
                        <button onclick="PushAlertCo.clearPAFirstTime(false);PushAlertCo.forceSubscribe()">'+PushAlertCo.local_str['lt-subscribe']+'</button> \
                        <button onclick="PushAlertCo.clearPAFirstTime(true)" class="pa-unsubscribe">'+PushAlertCo.local_str['lt-not-now']+'</button>\
                        <span>Notifications by <a rel="nofollow" href="https://pushalert.co" target="_blank">PushAlert</a></span>\
                    </p>\
                </div>\
            </div>\
        ';
            var paNotificationInfo = document.createElement('div');
            paNotificationInfo.className = 'pushalert-notification-info';
            if(isSideWidget){
                paNotificationInfo.className =  paNotificationInfo.className  + ' pa-side-widget';
                if(this.widgetPosition['pa-ticker-position']==="left"){
                    paNotificationInfo.className =  paNotificationInfo.className  + ' pa-widget-left';
                }
            }
            else{
                paNotificationInfo.style.left = "auto";
                paNotificationInfo.style.right = "auto";
                paNotificationInfo.style.transformOrigin = this.widgetPosition['pa-ticker-position'] + " bottom";
                if(this.widgetPosition['pa-ticker-position']==="right"){
                    paNotificationInfo.style.right = this.widgetPosition['pa-notification-right']+'px';
                }
                else{
                    paNotificationInfo.style.left = this.widgetPosition['pa-notification-left']+'px';
                }
                paNotificationInfo.style.bottom = this.widgetPosition['pa-notification-bottom']+'px';
            }
            paNotificationInfo.innerHTML = elem;
            paNotificationInfo.style.opacity = "0";
            paNotificationInfo.style.transform = "scale(0) translateZ(0)";
            document.body.appendChild(paNotificationInfo);
            
            if(isSideWidget){
                //var paNotfInfo = document.getElementsByClassName("pushalert-notification-info")[0]
                //paNotfInfo.style.marginTop = -paNotfInfo.clientHeight/2 + 'px';
                paNotificationInfo.style.marginTop = -paNotificationInfo.clientHeight/2 + 'px';
            }
            
            document.addEventListener('click', function(event) {
                var specifiedElemContent = document.querySelector(".pushalert-notification-info");
                var specifiedElemHeader = document.querySelector("#pushalert-ticker");
                if(specifiedElemContent!==null && specifiedElemContent.className.indexOf("pa-opened")>0){
                    var isClickInside = specifiedElemContent.contains(event.target) || specifiedElemHeader.contains(event.target);

                    if (!isClickInside) {
                        PushAlertCo.PA_NOTIFICATION_INFO_TOGGLE();
                    }
                }
            });
        }
    }
    
    this.paToggleClassName = function(elem, className) {
        if(typeof elem !== 'undefined' && elem!==null){       
            if (elem.className.indexOf(className) > 0) {
                elem.className = elem.className.replace(new RegExp(className, 'g'), "");
            } else {
                elem.className = elem.className + " " + className;
            }
        }
    }

    this.PA_NOTIFICATION_INFO_TOGGLE = function() {
        var paNotificationInfo = document.getElementsByClassName("pushalert-notification-info")[0];
        var paDivContainer = document.getElementById("pushalert-ticker");
        this.paToggleClassName(paNotificationInfo, "pa-opened");
        this.paToggleClassName(paDivContainer, "pa-opened");
    }
    
    this.PA_NOTIFICATION_SUBS_INFO_TOGGLE = function() {
        var paNotificationInfo = document.getElementsByClassName("pushalert-notification-info")[0];
        var paDivContainer = document.getElementById("pushalert-ticker");
        this.paToggleClassName(paNotificationInfo, "pa-first-time pa-opened");
        this.paToggleClassName(paDivContainer, "pa-opened");
    }
    
    this.clearPAFirstTime = function(shouldCancel) {
        var paNotificationInfo = document.getElementsByClassName("pushalert-notification-info")[0];
        var paDivContainer = document.getElementById("pushalert-ticker");
        this.paToggleClassName(paNotificationInfo, "pa-opened");
        this.paToggleClassName(paDivContainer, "pa-opened");
        paNotificationInfo.className = paNotificationInfo.className.replace("pa-first-time", "");
        this.setCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_dialog', '1', 9999);
        if(shouldCancel){
            this.setCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status', 'canceled', 9999);
        }
    }
    
    this.removeSubscribeWidget = function(){
        var elem = document.getElementById('pushalert-ticker');
        if(elem != undefined && elem!==null){
            elem.remove();
        }
    };

    this.hidePushAlertConfirm = function(){
        var paConfirm = document.getElementById('pa-push-notification-confirm');
        if(typeof paConfirm !== 'undefined' && paConfirm!==null){
           paConfirm.remove();
        }
    }

    this.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        var domain_name = this.domain;
        if(this.enableSubdomainIntegration){
            domain_name = location.hostname;
        }
        document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    }

    this.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    }
    
    this.getCurrentActualUrl = function(){
        var url = document.location.href;
        var social_url = '';
        var canonical_url = document.head.querySelector('link[rel="canonical"]');
        if(canonical_url!==null){
            url  = canonical_url.getAttribute("href");
        }
        else if(social_url!==''){
            var meta = document.head.querySelector('meta[property="og:url"]');
            if (meta!==null) { 
                url = meta.getAttribute("content"); 
            }
            else{
                meta = document.head.querySelector('meta[name="twitter:url"]');
                if (meta!==null) { 
                    url = meta.getAttribute("content"); 
                }
            }
        }
        
        return url;
    }

    this.PushAlertAddLoadEvent = function(func){
        window.addEventListener("load", function(){
            func();
        });
    }

    this.PA_AddEvent = function(element, eventName, fn) {
        if (element.addEventListener)
            element.addEventListener(eventName, fn, false);
        else if (element.attachEvent)
            element.attachEvent('on' + eventName, fn);
    }

    this.checkSubscription = function() {
        
        checkBrowser = this.PAcheckBrowser();
        if ((checkBrowser==="chrome" || checkBrowser==="firefox" || checkBrowser==="opera") || ('serviceWorker' in navigator && checkBrowser) || (this.safariEnabled && checkBrowser==="safari" && 'safari' in window && 'pushNotification' in window.safari)) {
            var isSubscribed = this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status");
            this.subs_id = decodeURIComponent(this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_id"));
            var safariPermissionData = "";
            if(checkBrowser==="safari"){
                safariPermissionData = window.safari.pushNotification.permission(this.safari_web_push_id);
            }
            if(isSubscribed=="subscribed" && this.subs_id!="" && (checkBrowser!=="safari" || (checkBrowser==="safari" && safariPermissionData.permission === 'granted'))){
                var result = [];
                result.success = true;
                result.subscriber_id = decodeURIComponent(this.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_id'));
                result.alreadySubscribed = true;

                PushAlertCo.checkAddAttributes();
                
                PushAlertCo.callbackOnSuccess(result);
                
                if(PushAlertCo.enableUnsubs){
                    PushAlertCo.showSubscribeWidget();
                    PushAlertCo.PAAddUnsubscribeClass();
                }
            }
            else if(isSubscribed=="denied" && (checkBrowser!=="safari" || (checkBrowser==="safari" && safariPermissionData.permission === 'denied'))){
                var result = [];
                result.status = -1;
                result.now = false;
                PushAlertCo.callbackOnFailure(result);
                PushAlertCo.showSubscribeWidget();
            }
            else if(isSubscribed=="unsubscribed"){
                var result = [];
                result.status = 1;
                PushAlertCo.subs_id = '';
                PushAlertCo.callbackOnFailure(result);
                PushAlertCo.showSubscribeWidget();
                
                PushAlertCo.setCookie("pa_" + PushAlertCo.cookie_id + "last_url", '-1', -1);
                PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_id", '-1', -1);
            }
            else if(isSubscribed=="canceled"){
                var result = [];
                result.status = 0;
                PushAlertCo.callbackOnFailure(result);
                PushAlertCo.showSubscribeWidget();
            }
            else{
                if(checkBrowser=='chrome' && !PushAlertCo.disableIframe){
                    this.checkIncognito(false);
                }
                else{
                    if(this.enableAutoSubs || this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_dialog")!==""){
                        PushAlertCo.showSubscribeWidget();
                        if(checkBrowser==="safari" && (isSubscribed==="subscribed" || isSubscribed==="denied")){
                            PushAlertCo.checkSafariPermission(safariPermissionData);
                        }
                        else{
                            this.initSubscriptionBox();
                        }
                    }
                    else{
                        //Show dialog with pa-first-time
                        this.PAShowFirstTime();
                    }
                }			
            }
            
            PushAlertCo.onScriptLoad();
            
        }
    }
    
    this.PAShowFirstTime = function(){
        this.showSubscribeWidget();
        var paNotificationInfo = document.getElementsByClassName("pushalert-notification-info")[0];
        var paDivContainer = document.getElementById("pushalert-ticker");
        this.paToggleClassName(paNotificationInfo, "pa-first-time pa-opened");
        this.paToggleClassName(paDivContainer, "pa-opened");
    }
    
    this.PAAddUnsubscribeClass = function(){
         var paDivContainer = document.getElementById("pushalert-ticker");
         if(typeof paDivContainer !== 'undefined' && paDivContainer!==null){
             paDivContainer.className = paDivContainer.className + ' pa-unsubscribe'; 
         }
    }
    
    this.PARemoveUnsubscribeClass = function(){
         var paDivContainer = document.getElementById("pushalert-ticker");
         if(typeof paDivContainer !== 'undefined' && paDivContainer!==null){
             paDivContainer.className = paDivContainer.className.replace(/pa-unsubscribe/g, ''); 
         }
    }

    this.PAcheckBrowser = function(){
        var userAgent = navigator.userAgent.toLocaleLowerCase();
        
        var iOS = /ipad|iphone|ipod/.test(userAgent) && !window.MSStream;
        if(iOS){
            return false;
        }

        if(userAgent.indexOf('mobile')<0){
            this.isMobile = false;
        }
        else{
            this.isMobile = true;
        }

        if(userAgent.indexOf('fb_iab')>=0 || userAgent.indexOf('; wv')>=0){//Facebook Browser and WebView
            return false;
        }
        else if(userAgent.indexOf('chrome')>=0 && userAgent.indexOf('opr\/')<0 && userAgent.indexOf('ucbrowser\/')<0 && userAgent.indexOf('edge\/')<0){
            var version = userAgent.match(/chrom(e|ium)\/([0-9]+)\./);
            version = version ? parseInt(version[2], 10) : false;
            if(version && version>=42){
                return "chrome";
            }
            else{
                return false;
            }
        }
        else if(userAgent.indexOf('firefox')>=0){
            var version = userAgent.match(/firefox\/([0-9]+)\./);
            version = version ? parseInt(version[1], 10) : false;
            if(version && version>=44 && !this.isMobile){
                return "firefox";
            }
            else if(version && version>=48 && this.isMobile){
                return "firefox";
            }
            else{
                return false;
            }
        }
        else if(userAgent.indexOf('opr\/')>=0){
            var version = userAgent.match(/opr\/([0-9]+)\./);
            version = version ? parseInt(version[1], 10) : false;
            if(version && version>=42 && !this.isMobile){
                return "opera";
            }
            else if(version && version>=37 && this.isMobile){
                return "opera";
            }
            else{
                return false;
            }
        }
        else if(userAgent.indexOf('ucbrowser\/')>=0){
            var version = userAgent.match(/ucbrowser\/([0-9]+)\./);
            version = version ? parseInt(version[1], 10) : false;
            if(version && version>=12 && this.isMobile){
                return "ucbrowser";
            }
            else{
                return false;
            }
        }
        else if(userAgent.indexOf('edge\/')>=0){
            var version = userAgent.match(/edge\/([0-9\.]+)/);
            version = parseFloat(version[1]);
            if(version && version>=17.17134){
                return "edge";
            }
            else{
                return false;
            }
        }
        else if(userAgent.indexOf('safari')>=0){
           if(!this.isMobile && 'pushNotification' in window.safari){
                return "safari";
            }
            else{
                return false;
            }
        }
        return false;
    }

    this.init = function(){
        var hostname = location.hostname.replace(/^www\./,'');

        if(hostname.indexOf(this.domain)==(hostname.length - this.domain.length)){
                if(document.readyState==='complete'){
                    PushAlertCo.checkSubscription();
                }
                else{
                    this.PushAlertAddLoadEvent(function(){
                        PushAlertCo.checkSubscription();
                    });
                }
        }
        
        if(this.enableWidget!==1){
            this.enableAutoSubs = true;
        }
    }

    this.checkIncognito = function(isForced) {
        var fs = window.RequestFileSystem || window.webkitRequestFileSystem;
        if (!fs) {
            if((this.enableAutoSubs || this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_dialog")!=="") || isForced){
                PushAlertCo.showSubscribeWidget();
                if(isForced){
                    if(PushAlertCo.disableIframe){
                        PushAlertCo.PA_POPUP();
                    }
                    else{
                        this.appendFrame();
                    }
                }
                else{
                    this.initSubscriptionBox();
                }
            }
            else{
                //Show dialog with pa-first-time
                this.PAShowFirstTime();
            }
            return;
        }
        fs(window.TEMPORARY, 100, function(fs) {
            if((PushAlertCo.enableAutoSubs || PushAlertCo.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_dialog")!=="") || isForced){
                PushAlertCo.showSubscribeWidget();
                if(isForced){
                    if(PushAlertCo.disableIframe){
                        PushAlertCo.PA_POPUP();
                    }
                    else{
                        PushAlertCo.appendFrame();
                    }
                }
                else{
                    PushAlertCo.initSubscriptionBox();
                }
            }
            else{
                //Show dialog with pa-first-time
                PushAlertCo.PAShowFirstTime();
            }
        }, function(err) {
            //incognito mode";
            //console.log("incognito mode");
        });
    }
    
    this.checkSafariPermission = function (permissionData) {
        if (permissionData==null || permissionData.permission === 'default') {
            PushAlertCo.safariReqInitiated = true;
            // This is a new web service URL and its validity is unknown.
            window.safari.pushNotification.requestPermission(
                'https://pushalert.co/safari-v1', // The web service URL.
                this.safari_web_push_id,     // The Website Push ID.
                {}, // Data that you choose to send to your server to help you identify the user.
                this.checkSafariPermission         // The callback function.
            );
        }
        else if (permissionData.permission === 'denied') {
            var result = [];
            result.status = -1;
            result.now = false;
            PushAlertCo.callbackOnFailure(result);
            PushAlertCo.setCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status', 'denied', 9999);
            PushAlertCo.PARemoveUnsubscribeClass();
        }
        else if (permissionData.permission === 'granted') {
            if(PushAlertCo.safariReqInitiated){
                PushAlertCo.sendSubSafari(permissionData.deviceToken);
                this.safariReqInitiated = false;
            }
            else{
                PushAlertCo.checkSubSafari(permissionData.deviceToken);
            }
        }
    };
    
    this.sendSubSafari = function(deviceToken) {
        //console.log(pushSubscription);
        //get endpoint
        var browser = [];
        var browser_info = PushAlertCo.getBrowserInfo();
        
        for (key in browser_info) {
          browser.push(key + '=' + encodeURIComponent(browser_info[key]));
        }

        browser = browser.join('&');
        browser = browser + "&pa_id="+PushAlertCo.pa_id;
        browser = browser + "&endpoint_url=safari";
        browser = browser + "&seg_id="+PushAlertCo.seg_id;

        var endPoint = deviceToken;
        fetch(PushAlertCo.pa_subdomain + "/subscribe/"+endPoint, {  
                method: 'post',  
                headers: {  
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                },  
                body: browser  
            })
            .then(function(res) {
                res.json().then(function(data) {
                    PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status","subscribed",9999);
                    PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_id",encodeURIComponent(data.subs_id),9999);
                    PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "already_subscribed","false", 9999);
                    
                    var result = [];
                    result.success = true;
                    result.subscriber_id = data.subs_id;
                    result.alreadySubscribed = false;
                    PushAlertCo.subs_id = data.subs_id;

                    PushAlertCo.checkAddAttributes();
                    
                    PushAlertCo.callbackOnSuccess(result);
                    
                    if(!PushAlertCo.enableUnsubs){
                        PushAlertCo.removeSubscribeWidget();
                    }
                    else{
                        PushAlertCo.PAAddUnsubscribeClass();
                    }
            }).catch(function(e) {
                    console.log('Error sending subscription to server:' + e.toString());
            }); 
        });
    };
    
    this.checkSubSafari = function(deviceToken) {
        //console.log(pushSubscription);
        //get endpoint
        var browser = [];
        var browser_info = PushAlertCo.getBrowserInfo();
        
        for (key in browser_info) {
          browser.push(key + '=' + encodeURIComponent(browser_info[key]));
        }

        browser = browser.join('&');
        browser = browser + "&pa_id="+PushAlertCo.pa_id;
        browser = browser + "&endpoint_url=safari";
        browser = browser + "&seg_id="+PushAlertCo.seg_id;

        var endPoint = deviceToken;
        fetch(PushAlertCo.pa_subdomain + "/check/"+endPoint, {  
                method: 'post',  
                headers: {  
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                },  
                body: browser  
            })
            .then(function(res) {
                res.json().then(function(data) {
                    if(data.status){
                        PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status","subscribed",9999);
                        PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_id",encodeURIComponent(data.subs_id),9999);
                        PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "already_subscribed","true", 9999);

                        var result = [];
                        result.success = true;
                        result.subscriber_id = data.subs_id;
                        result.alreadySubscribed = true;
                        PushAlertCo.subs_id = data.subs_id;

                        PushAlertCo.checkAddAttributes();
                        
                        PushAlertCo.callbackOnSuccess(result);

                        if(!PushAlertCo.enableUnsubs){
                            PushAlertCo.removeSubscribeWidget();
                        }
                        else{
                            PushAlertCo.PAAddUnsubscribeClass();
                        }
                    }
                    else{
                        PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status","unsubscribed",9999);
                        
                        var result = [];
                        result.status = 1;
                        PushAlertCo.subs_id = '';
                        PushAlertCo.callbackOnFailure(result);
                        PushAlertCo.showSubscribeWidget();
                        
                        PushAlertCo.setCookie("pa_" + PushAlertCo.cookie_id + "last_url", '-1', -1);
                        PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_id", '-1', -1);
                    }
                    
            }).catch(function(e) {
                    console.log('Error checking subscription to server:' + e.toString());
            }); 
        });
    };
    
    this.unsubscribeSafari = function() {
        var safariPermissionData = window.safari.pushNotification.permission(this.safari_web_push_id);
        
        if(safariPermissionData.permission==="granted"){
            fetch(PushAlertCo.pa_subdomain + "/unsubscribe/"+safariPermissionData.deviceToken, {  
                method: 'post',  
                headers: {  
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                },  
                body: 'pa_id=' + PushAlertCo.pa_id
            })
            .then(function(res) {
                res.json().then(function(data) {
                    PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status","unsubscribed",9999);

                    var result = [];
                    result.status = 1;
                    PushAlertCo.subs_id = '';
                    PushAlertCo.callbackOnFailure(result);
                    PushAlertCo.PARemoveUnsubscribeClass();
                    
                    PushAlertCo.setCookie("pa_" + PushAlertCo.cookie_id + "last_url", '-1', -1);
                    PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_id", '-1', -1);
                }).catch(function(e) {
                    console.log('Error sending subscription to server:', e);
                }); 
            });
        }
        else{
            PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status","unsubscribed",9999);

            var result = [];
            result.status = 1;
            PushAlertCo.subs_id = '';
            PushAlertCo.callbackOnFailure(result);
            PushAlertCo.PARemoveUnsubscribeClass();
            
            PushAlertCo.setCookie("pa_" + PushAlertCo.cookie_id + "last_url", '-1', -1);
            PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_id", '-1', -1);
        }
    };
    
    this.getBrowserInfo = function(){
        !function(e,o){this[e]=o()}("browser_info",function(){function e(e){function i(o){var i=e.match(o);return i&&i.length>1&&i[1]||""}function r(o){var i=e.match(o);return i&&i.length>1&&i[2]||""}var s,n=i(/(ipod|iphone|ipad)/i).toLowerCase(),a=/like android/i.test(e),d=!a&&/android/i.test(e),t=/CrOS/.test(e),m=/silk/i.test(e),w=/sailfish/i.test(e),b=/tizen/i.test(e),c=/(web|hpw)os/i.test(e),l=/windows phone/i.test(e),v=!l&&/windows/i.test(e),h=!n&&!m&&/macintosh/i.test(e),p=!d&&!w&&!b&&!c&&/linux/i.test(e),f=i(/edge\/(\d+(\.\d+)?)/i),u=i(/version\/(\d+(\.\d+)?)/i),k=/tablet/i.test(e)||/android/i.test(e)&&!/mobile/i.test(e),g=!k&&/[^-]mobi/i.test(e);/opera mini/i.test(e)?(s={name:"Opera Mini",operamini:o,majorVersion:i(/(?:opera mini)[\s\/](\d+(\.\d+)?)/i)||u,version:i(/(?:opera mini)\/([\d\.]+)/i)},g=o,k=!1):/opera|opr/i.test(e)?s={name:"Opera",opera:o,majorVersion:u||i(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i),version:i(/(?:opera|opr)\/([\d\.]+)/i)}:/ucbrowser/i.test(e)?s={name:"UC Browser",ucbrowser:o,majorVersion:i(/(?:ucbrowser)[\s\/](\d+(\.\d+)?)/i)||u,version:i(/(?:ucbrowser)\/([\d\.]+)/i)}:/acheetahi/i.test(e)?s={name:"CM Browser",cmbrowser:o,majorVersion:i(/(?:acheetahi)[\s\/](\d+(\.\d+)?)/i)||u,version:i(/(?:acheetahi)\/([\d\.]+)/i)}:/yabrowser/i.test(e)?s={name:"Yandex Browser",yandexbrowser:o,version:u||i(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:l?(s={name:"Windows Phone",windowsphone:o},f?(s.msedge=o,s.version=f):(s.msie=o,s.version=i(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(e)?s={name:"Internet Explorer",msie:o,version:i(/(?:msie |rv:)([\.\d]+)/i),majorVersion:i(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:t?s={name:"Chrome",chromeos:o,chromeBook:o,chrome:o,version:i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/chrome.+? edge/i.test(e)?s={name:"Microsoft Edge",msedge:o,version:f,majorVersion:i(/(?:edge)\/(\d+(\.\d+)?)/i)}:/chrome|crios|crmo/i.test(e)?s={name:"Chrome",chrome:o,version:i(/(?:chrome|crios|crmo)\/([\d\.]+)/i),majorVersion:i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:n?(s={name:"iphone"==n?"iPhone":"ipad"==n?"iPad":"iPod"},u&&(s.version=u)):w?s={name:"Sailfish",sailfish:o,version:i(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(e)?s={name:"SeaMonkey",seamonkey:o,version:i(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel/i.test(e)?(s={name:"Firefox",firefox:o,version:i(/(?:firefox|iceweasel)[ \/]([\d\.]+)/i),majorVersion:i(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)&&(s.firefoxos=o)):m?s={name:"Amazon Silk",silk:o,version:i(/silk\/(\d+(\.\d+)?)/i)}:d?s={name:"Android",version:u}:/phantom/i.test(e)?s={name:"PhantomJS",phantom:o,version:i(/phantomjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(e)||/rim\stablet/i.test(e)?s={name:"BlackBerry",blackberry:o,version:u||i(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:c?(s={name:"WebOS",webos:o,version:u||i(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(e)&&(s.touchpad=o)):s=/bada/i.test(e)?{name:"Bada",bada:o,version:i(/dolfin\/(\d+(\.\d+)?)/i)}:b?{name:"Tizen",tizen:o,version:i(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||u}:/safari/i.test(e)?{name:"Safari",safari:o,version:u}:{name:i(/^(.*)\/(.*) /),version:r(/^(.*)\/(.*) /)},!s.msedge&&/(apple)?webkit/i.test(e)?(s.name=s.name||"Webkit",s.webkit=o,!s.version&&u&&(s.version=u)):!s.opera&&/gecko\//i.test(e)&&(s.name=s.name||"Gecko",s.gecko=o,s.version=s.version||i(/gecko\/(\d+(\.\d+)?)/i)),s.msedge||!d&&!s.silk?n?(s[n]=o,s.ios=o):v?s.windows=o:h?s.mac=o:p&&(s.linux=o):s.android=o;var x="";s.windowsphone?x=i(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):n?(x=i(/os (\d+([_\s]\d+)*) like mac os x/i),x=x.replace(/[_\s]/g,".")):d?x=i(/android[ \/-](\d+(\.\d+)*)/i):s.webos?x=i(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):s.blackberry?x=i(/rim\stablet\sos\s(\d+(\.\d+)*)/i):s.bada?x=i(/bada\/(\d+(\.\d+)*)/i):s.tizen?x=i(/tizen[\/\s](\d+(\.\d+)*)/i):s.windows?x=i(/windows nt[\/\s](\d+(\.\d+)*)/i):s.mac&&(x=i(/mac os x[\/\s](\d+(_\d+)*)/i)),x&&(s.osversion=x);var y=x.split(".")[0];return k||"ipad"==n||d&&(3==y||4==y&&!g)||s.silk?s.tablet=o:(g||"iphone"==n||"ipod"==n||d||s.blackberry||s.webos||s.bada)&&(s.mobile=o),s.msedge||s.msie&&s.version>=10||s.yandexbrowser&&s.version>=15||s.chrome&&s.version>=20||s.firefox&&s.version>=20||s.safari&&s.version>=6||s.opera&&s.version>=10||s.ios&&s.osversion&&s.osversion.split(".")[0]>=6||s.blackberry&&s.version>=10.1?s.a=o:s.msie&&s.version<10||s.chrome&&s.version<20||s.firefox&&s.version<20||s.safari&&s.version<6||s.opera&&s.version<10||s.ios&&s.osversion&&s.osversion.split(".")[0]<6?s.c=o:s.x=o,s}var o=!0,i=e("undefined"!=typeof navigator?navigator.userAgent:"");i.test=function(e){for(var o=0;o<e.length;++o){var r=e[o];if("string"==typeof r&&r in i)return!0}return!1},i._detect=e;var r={};return i.mobile?r.type="mobile":i.tablet?r.type="tablet":r.type="desktop",i.android?r.os="android":i.ios?r.os="ios":i.windows?r.os="windows":i.mac?r.os="mac":i.linux?r.os="linux":i.windowsphone?r.os="windowsphone":i.webos?r.os="webos":i.blackberry?r.os="blackberry":i.bada?r.os="bada":i.tizen?r.os="tizen":i.sailfish?r.os="sailfish":i.firefoxos?r.os="firefoxos":i.chromeos?r.os="chromeos":r.os="unknown",i.osversion&&(r.osVer=i.osversion),i.chrome?r.browser="chrome":i.firefox?r.browser="firefox":i.opera?r.browser="opera":i.operamini?r.browser="operamini":i.ucbrowser?r.browser="ucbrowser":i.cmbrowser?r.browser="cmbrowser":i.safari||i.iosdevice&&("ipad"==i.iosdevice||"ipod"==i.iosdevice||"iphone"==i.iosdevice)?r.browser="safari":i.msie?r.browser="ie":i.yandexbrowser?r.browser="yandexbrowser":i.msedge?r.browser="edge":i.seamonkey?r.browser="seamonkey":i.blackberry?r.browser="blackberry":i.touchpad?r.browser="touchpad":i.silk?r.browser="silk":r.browser="unknown",i.version&&(r.browserVer=i.version),i.majorVersion&&(r.browserMajor=i.majorVersion),r.language=navigator.language||"",r.resoln_width=window.screen.width||"",r.resoln_height=window.screen.height||"",r.color_depth=window.screen.colorDepth||"",r.engine=navigator.product||"",r.userAgent=navigator.userAgent,"ucbrowser"===r.browser||"cmbrowser"===r.browser||"dolphin"===r.browser?devicePixelRatio=1:devicePixelRatio=window.devicePixelRatio||1,r.resoln_width=Math.round(r.resoln_width*devicePixelRatio),r.resoln_height=Math.round(r.resoln_height*devicePixelRatio),r});
        return browser_info;
    }

    this.listener = function(event){
        //console.log("event.origin: " + event.origin);
        if ( event.origin !== "https://" + PushAlertCo.subdomain && event.origin !== "https://www." + PushAlertCo.subdomain )
                return;

        if(event.data=="closed"){
            //console.log("Popup closed");
            //Success Callback
            var pa_status = PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status');
            if(pa_status=='subscribed'){
                var result = [];
                result.success = true;
                result.subscriber_id = decodeURIComponent(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_id'));
                var alreadySubscribed = PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'already_subscribed');
                if(alreadySubscribed==="true"){
                    result.alreadySubscribed = true;
                }
                else{
                    result.alreadySubscribed = false;
                }
                PushAlertCo.subs_id = result.subscriber_id;

                PushAlertCo.checkAddAttributes();
                
                PushAlertCo.callbackOnSuccess(result);

                if(!PushAlertCo.enableUnsubs){
                    PushAlertCo.removeSubscribeWidget();
                }
                else{
                    PushAlertCo.PAAddUnsubscribeClass();
                }
                PushAlertCo.setCookie('pa_' + PushAlertCo.cookie_id + 'last_url', PushAlertCo.getCurrentActualUrl(), 999);
            }
            else if(pa_status=='denied'){
                //Failure Callback
                var result = [];
                result.status = -1;
                result.now = false;
                PushAlertCo.callbackOnFailure(result);
            }
            else if(pa_status=='unsubscribed'){
                //Failure Callback
                var result = [];
                result.status = 1;
                PushAlertCo.subs_id = '';
                PushAlertCo.callbackOnFailure(result);
                PushAlertCo.PARemoveUnsubscribeClass();
                
                PushAlertCo.setCookie("pa_" + PushAlertCo.cookie_id + "last_url", '-1', -1);
                PushAlertCo.setCookie("pushalert_" + PushAlertCo.cookie_id + "subs_id", '-1', -1);
            }
            else{
                //Failure Callback
                var result = [];
                result.status = 0;
                PushAlertCo.callbackOnFailure(result);
            }
        }
        else{
            var data_sent = event.data.split("|");
            if(data_sent[0]=='pushalert_frame'){
                //Possible permissions - granted, denied, default
                if(data_sent[1]=='granted'){
                    PushAlertCo.confirmPushAlert();
                    if(!PushAlertCo.enableUnsubs){
                        PushAlertCo.removeSubscribeWidget();
                    }
                }
                else if(data_sent[1]=='denied'){
                    //Failure Callback
                    var result = [];
                    result.status = -1;
                    result.now = true;
                    PushAlertCo.callbackOnFailure(result);
                    PushAlertCo.setCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status', 'denied', 9999);
                }
                else if(data_sent[1]=='default'){//Canceled
                    //Failure Callback
                    var result = [];
                    result.status = 0;
                    PushAlertCo.callbackOnFailure(result);
                    PushAlertCo.setCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status', 'canceled', 9999);
                }
            }
            else if(data_sent[0]=='log'){
                //console.log("Popup: " + data_sent[1]);
            }
            else{
                data_sent[0]=data_sent[0].replace("pushalert_", "pushalert_" + PushAlertCo.cookie_id);
                if(data_sent[0]=="pushalert_" + PushAlertCo.cookie_id + "subs_id"){
                    PushAlertCo.setCookie(data_sent[0],encodeURIComponent(data_sent[1]),9999);
                    PushAlertCo.subs_id = data_sent[1];
                }
                else{
                    PushAlertCo.setCookie(data_sent[0],data_sent[1],9999);
                }
            }
        }
    }
    
    this.initArrayPush = function(){
        pushalertbyiw.push = function(data){
            if(typeof data !== 'undefined' && data!==null){
                if(data[0]=="addAttributes"){
                    if(typeof data[1]!=='undefined' && data[1]!==null){
                        PushAlertCo.addAttributes(data[1]);
                    }
                }
                else if(data[0]=="trackEvent"){
                    if(typeof data[1]!=='undefined' && data[1]!==null && typeof data[2]!=='undefined' && data[2]!==null){
                        PushAlertCo.trackEvent(data[1], data[2], data[3], data[4]);
                    }
                }else if(data[0]=="onReady"){
                    if(typeof data[1]!=='undefined' && data[1]!==null){
                        data[1]();
                    }
                }
                return Array.prototype.push.call(this, data);
            }
        };
    }
    
    this.checkSegmentFunction = function(){
        for(var i=0; i<pushalertbyiw.length;i++){
            if(pushalertbyiw[i][0]=="addAttributes"){
                if(typeof pushalertbyiw[i][1]!=='undefined' && pushalertbyiw[i][1]!==null){
                    PushAlertCo.addAttributes(pushalertbyiw[i][1]);
                }
            }
        }
    }
    
    this.checkAddAttributes = function(){
        for(var i=0; i<pushalertbyiw.length;i++){
            if(pushalertbyiw[i][0]=="addAttributes"){
                if(typeof pushalertbyiw[i][1]!=='undefined' && pushalertbyiw[i][1]!==null){
                    PushAlertCo.addAttributes(pushalertbyiw[i][1]);
                }
                break;
            }
        }
    }
    
    this.addAttributes = function(attributes){
        var isSubscribed = this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status");
        if(isSubscribed=="subscribed"){
        
            fetch("https://api.pushalert.co/js-api/addAttributes", {  
                    method: 'post',  
                    headers: {  
                      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                    },  
                    body: 'attributes='+encodeURIComponent(JSON.stringify(attributes))+'&pa_id='+PushAlertCo.pa_id+'&subs_id='+(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_id'))
                })
                .then(function(res) {
                    res.json().then(function(data) {
                }).catch(function(e) {
                    console.log("Error:", e);
                }); 
            });
        }
    }
    
    this.trackEvent = function(eventCategory, eventAction, eventLabel, eventValue){
        var isSubscribed = this.getCookie("pushalert_" + PushAlertCo.cookie_id + "subs_status");
        if(isSubscribed=="subscribed"){
            if(typeof eventLabel === 'undefined'){
                eventLabel="";
            }
            
            if(typeof eventValue === 'undefined'){
                eventValue=0;
            }
        
            fetch("https://api.pushalert.co/js-api/trackEvent", {  
                    method: 'post',  
                    headers: {  
                      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                    },  
                    body: 'eventCategory='+encodeURIComponent(eventCategory)+'&eventAction='+encodeURIComponent(eventAction)+'&eventLabel='+encodeURIComponent(eventLabel)+'&eventValue='+encodeURIComponent(eventValue)+'&pa_id='+PushAlertCo.pa_id+'&subs_id='+(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_id'))
                })
                .then(function(res) {
                    res.json().then(function(data) {
                }).catch(function(e) {
                    console.log("Error:", e);
                }); 
            });
        }
    }

    this.subInit = function(){
        (pushalertbyiw = window.pushalertbyiw || []).push(); //Just in case not defined;
        if(!this.isIframe()){
            if(!this.checkDisableAutoInit()){
                this.init();
            }
        
            this.checkSegmentFunction();
            this.initArrayPush();
        }
    }
    
        
    this.isIframe = function(){
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    this.checkDisableAutoInit = function(){
        (pushalertbyiw = window.pushalertbyiw || []).push(); //Just in case not defined;
        for(var i=0; i<pushalertbyiw.length;i++){
            if(pushalertbyiw[i][0]=="disableAutoInit"){
                return pushalertbyiw[i][1];
            }
        }
    }

    this.callbackOnSuccess = function(result){
        
        (pushalertbyiw = window.pushalertbyiw || []).push(); //Just in case not defined;
        for(var i=0; i<pushalertbyiw.length;i++){
            if(pushalertbyiw[i][0]=="onSuccess"){
                pushalertbyiw[i][1](result);
            }
        }
    }

    this.callbackOnFailure = function(result){
        
        (pushalertbyiw = window.pushalertbyiw || []).push(); //Just in case not defined;
        for(var i=0; i<pushalertbyiw.length;i++){
            if(pushalertbyiw[i][0]=="onFailure"){
                pushalertbyiw[i][1](result);
            }
        }
    }
    
    this.onScriptLoad = function(result){
        (pushalertbyiw = window.pushalertbyiw || []).push(); //Just in case not defined;
        for(var i=0; i<pushalertbyiw.length;i++){
            if(pushalertbyiw[i][0]=="onReady"){
                if(typeof pushalertbyiw[i][1]!=='undefined' && pushalertbyiw[i][1]!==null){
                    pushalertbyiw[i][1]();
                }
                break;
            }
        }
    }

    this.forceSubscribe = function(){ //this should only be called when 
        checkBrowser = this.PAcheckBrowser();
        if(checkBrowser==="safari"){
            var safariPermissionData = window.safari.pushNotification.permission(this.safari_web_push_id);
            if(safariPermissionData.permission==="denied"){
                this.confirmSafariUnblock();
            }
            else if(safariPermissionData.permission==="granted"){
                this.sendSubSafari(safariPermissionData.deviceToken);
            }
            else{
                this.checkSafariPermission(safariPermissionData.deviceToken);
            }
        }
        else{
            if(this.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')=='denied'){
                this.confirmUnblock();
            }
            else if(this.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')=='unsubscribed'){
                if(PushAlertCo.disableIframe){
                    PushAlertCo.PA_POPUP();
                }
                else{
                    this.registerMessageListener();
                    this.confirmPushAlert();
                }
            }
            else if(this.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')=='canceled' || this.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_status')===''){
                if(checkBrowser=='chrome' || checkBrowser=='opera'){
                    if(PushAlertCo.disableIframe){
                        PushAlertCo.PA_POPUP();
                    }
                    else{
                        this.checkIncognito(true);
                    }
                }
                else{
                    if(PushAlertCo.disableIframe){
                        PushAlertCo.PA_POPUP();
                    }
                    else{
                        PushAlertCo.appendFrame();
                    }
                }
            }
        }
    }
    
    this.registerMessageListener = function(){
        if (this.isListening){
            return;
        } else {
            this.isListening = true;
        }
        
        if (window.addEventListener) {
            addEventListener("message", this.listener, false)
        } else {
            attachEvent("onmessage", this.listener)
        }
    }
    
    this.requestSubscriberData = function() {
        fetch("https://api.pushalert.co/js-api/subsInfo", {  
                method: 'post',  
                headers: {  
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                },  
                body: 'pa_id='+PushAlertCo.pa_id+'&subs_id='+(PushAlertCo.getCookie('pushalert_' + PushAlertCo.cookie_id + 'subs_id'))
            })
            .then(function(res) {
                res.json().then(function(data) {
                    console.log(data);
                    var data_display = '';
                    var subs_info = data['subs_info'];
                    for(var key in subs_info) {
                        data_display += "<b>" + key + "</b>: " + subs_info[key] + "<br/>";
                    }
                    data_display += "<b>Last URL Visited</b>: " + PushAlertCo.getCookie("pa_" + PushAlertCo.cookie_id + "last_url") + "<br/>";
                    
                    var notfPrefContentChild = document.createElement('div');
                    notfPrefContentChild.style.textAlign = 'left';
                    notfPrefContentChild.style.padding = '0 20px';
                    notfPrefContentChild.style.maxHeight = '250px';
                    notfPrefContentChild.style.overflowY = 'auto';
                    notfPrefContentChild.style.wordWrap = 'break-word';
                    notfPrefContentChild.style.marginBottom = '10px';
                    notfPrefContentChild.innerHTML = data_display;
                    
                    var notfPrefContent = document.querySelector('.pa-notf-pref-content');
                    notfPrefContent.innerHTML = '';
                    notfPrefContent.appendChild(notfPrefContentChild);
                    
                    var notfPrefDialog = document.querySelector('.pa-notification-preference-dialog');
                    notfPrefDialog.style.marginTop = -(notfPrefDialog.clientHeight)/2 + 'px';
            }).catch(function(e) {
                console.log("Error:", e);
            }); 
        });
    }
    
    !function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t),e=(n>>16)+(t>>16)+(r>>16);return e<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;var e,i,a,h,d,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,h=v,d=m,l=o(l,g,v,m,n[e],7,-680876936),m=o(m,l,g,v,n[e+1],12,-389564586),v=o(v,m,l,g,n[e+2],17,606105819),g=o(g,v,m,l,n[e+3],22,-1044525330),l=o(l,g,v,m,n[e+4],7,-176418897),m=o(m,l,g,v,n[e+5],12,1200080426),v=o(v,m,l,g,n[e+6],17,-1473231341),g=o(g,v,m,l,n[e+7],22,-45705983),l=o(l,g,v,m,n[e+8],7,1770035416),m=o(m,l,g,v,n[e+9],12,-1958414417),v=o(v,m,l,g,n[e+10],17,-42063),g=o(g,v,m,l,n[e+11],22,-1990404162),l=o(l,g,v,m,n[e+12],7,1804603682),m=o(m,l,g,v,n[e+13],12,-40341101),v=o(v,m,l,g,n[e+14],17,-1502002290),g=o(g,v,m,l,n[e+15],22,1236535329),l=u(l,g,v,m,n[e+1],5,-165796510),m=u(m,l,g,v,n[e+6],9,-1069501632),v=u(v,m,l,g,n[e+11],14,643717713),g=u(g,v,m,l,n[e],20,-373897302),l=u(l,g,v,m,n[e+5],5,-701558691),m=u(m,l,g,v,n[e+10],9,38016083),v=u(v,m,l,g,n[e+15],14,-660478335),g=u(g,v,m,l,n[e+4],20,-405537848),l=u(l,g,v,m,n[e+9],5,568446438),m=u(m,l,g,v,n[e+14],9,-1019803690),v=u(v,m,l,g,n[e+3],14,-187363961),g=u(g,v,m,l,n[e+8],20,1163531501),l=u(l,g,v,m,n[e+13],5,-1444681467),m=u(m,l,g,v,n[e+2],9,-51403784),v=u(v,m,l,g,n[e+7],14,1735328473),g=u(g,v,m,l,n[e+12],20,-1926607734),l=c(l,g,v,m,n[e+5],4,-378558),m=c(m,l,g,v,n[e+8],11,-2022574463),v=c(v,m,l,g,n[e+11],16,1839030562),g=c(g,v,m,l,n[e+14],23,-35309556),l=c(l,g,v,m,n[e+1],4,-1530992060),m=c(m,l,g,v,n[e+4],11,1272893353),v=c(v,m,l,g,n[e+7],16,-155497632),g=c(g,v,m,l,n[e+10],23,-1094730640),l=c(l,g,v,m,n[e+13],4,681279174),m=c(m,l,g,v,n[e],11,-358537222),v=c(v,m,l,g,n[e+3],16,-722521979),g=c(g,v,m,l,n[e+6],23,76029189),l=c(l,g,v,m,n[e+9],4,-640364487),m=c(m,l,g,v,n[e+12],11,-421815835),v=c(v,m,l,g,n[e+15],16,530742520),g=c(g,v,m,l,n[e+2],23,-995338651),l=f(l,g,v,m,n[e],6,-198630844),m=f(m,l,g,v,n[e+7],10,1126891415),v=f(v,m,l,g,n[e+14],15,-1416354905),g=f(g,v,m,l,n[e+5],21,-57434055),l=f(l,g,v,m,n[e+12],6,1700485571),m=f(m,l,g,v,n[e+3],10,-1894986606),v=f(v,m,l,g,n[e+10],15,-1051523),g=f(g,v,m,l,n[e+1],21,-2054922799),l=f(l,g,v,m,n[e+8],6,1873313359),m=f(m,l,g,v,n[e+15],10,-30611744),v=f(v,m,l,g,n[e+6],15,-1560198380),g=f(g,v,m,l,n[e+13],21,1309151649),l=f(l,g,v,m,n[e+4],6,-145523070),m=f(m,l,g,v,n[e+11],10,-1120210379),v=f(v,m,l,g,n[e+2],15,718787259),g=f(g,v,m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,h),m=t(m,d);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function h(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function d(n){return a(i(h(n),8*n.length))}function l(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="0123456789abcdef",o="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),o+=e.charAt(t>>>4&15)+e.charAt(15&t);return o}function v(n){return unescape(encodeURIComponent(n))}function m(n){return d(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(this);
}

//Fetch API Support
!function(a){"use strict";function f(a){if("string"!=typeof a&&(a=String(a)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function g(a){return"string"!=typeof a&&(a=String(a)),a}function h(a){var c={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};return b.iterable&&(c[Symbol.iterator]=function(){return c}),c}function i(a){this.map={},a instanceof i?a.forEach(function(a,b){this.append(b,a)},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function j(a){return a.bodyUsed?Promise.reject(new TypeError("Already read")):void(a.bodyUsed=!0)}function k(a){return new Promise(function(b,c){a.onload=function(){b(a.result)},a.onerror=function(){c(a.error)}})}function l(a){var b=new FileReader,c=k(b);return b.readAsArrayBuffer(a),c}function m(a){var b=new FileReader,c=k(b);return b.readAsText(a),c}function n(a){for(var b=new Uint8Array(a),c=new Array(b.length),d=0;d<b.length;d++)c[d]=String.fromCharCode(b[d]);return c.join("")}function o(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);return b.set(new Uint8Array(a)),b.buffer}function p(){return this.bodyUsed=!1,this._initBody=function(a){if(this._bodyInit=a,a)if("string"==typeof a)this._bodyText=a;else if(b.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(b.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(b.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(b.arrayBuffer&&b.blob&&d(a))this._bodyArrayBuffer=o(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!b.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(a)&&!e(a))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=o(a)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof a?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):b.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},b.blob&&(this.blob=function(){var a=j(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?j(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(l)}),this.text=function(){var a=j(this);if(a)return a;if(this._bodyBlob)return m(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(n(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},b.formData&&(this.formData=function(){return this.text().then(t)}),this.json=function(){return this.text().then(JSON.parse)},this}function r(a){var b=a.toUpperCase();return q.indexOf(b)>-1?b:a}function s(a,b){b=b||{};var c=b.body;if("string"==typeof a)this.url=a;else{if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url,this.credentials=a.credentials,b.headers||(this.headers=new i(a.headers)),this.method=a.method,this.mode=a.mode,c||null==a._bodyInit||(c=a._bodyInit,a.bodyUsed=!0)}if(this.credentials=b.credentials||this.credentials||"omit",!b.headers&&this.headers||(this.headers=new i(b.headers)),this.method=r(b.method||this.method||"GET"),this.mode=b.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&c)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(c)}function t(a){var b=new FormData;return a.trim().split("&").forEach(function(a){if(a){var c=a.split("="),d=c.shift().replace(/\+/g," "),e=c.join("=").replace(/\+/g," ");b.append(decodeURIComponent(d),decodeURIComponent(e))}}),b}function u(a){var b=new i;return a.split(/\r?\n/).forEach(function(a){var c=a.split(":"),d=c.shift().trim();if(d){var e=c.join(":").trim();b.append(d,e)}}),b}function v(a,b){b||(b={}),this.type="default",this.status="status"in b?b.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in b?b.statusText:"OK",this.headers=new i(b.headers),this.url=b.url||"",this._initBody(a)}if(!a.fetch){var b={searchParams:"URLSearchParams"in a,iterable:"Symbol"in a&&"iterator"in Symbol,blob:"FileReader"in a&&"Blob"in a&&function(){try{return new Blob,!0}catch(a){return!1}}(),formData:"FormData"in a,arrayBuffer:"ArrayBuffer"in a};if(b.arrayBuffer)var c=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],d=function(a){return a&&DataView.prototype.isPrototypeOf(a)},e=ArrayBuffer.isView||function(a){return a&&c.indexOf(Object.prototype.toString.call(a))>-1};i.prototype.append=function(a,b){a=f(a),b=g(b);var c=this.map[a];this.map[a]=c?c+","+b:b},i.prototype.delete=function(a){delete this.map[f(a)]},i.prototype.get=function(a){return a=f(a),this.has(a)?this.map[a]:null},i.prototype.has=function(a){return this.map.hasOwnProperty(f(a))},i.prototype.set=function(a,b){this.map[f(a)]=g(b)},i.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this)},i.prototype.keys=function(){var a=[];return this.forEach(function(b,c){a.push(c)}),h(a)},i.prototype.values=function(){var a=[];return this.forEach(function(b){a.push(b)}),h(a)},i.prototype.entries=function(){var a=[];return this.forEach(function(b,c){a.push([c,b])}),h(a)},b.iterable&&(i.prototype[Symbol.iterator]=i.prototype.entries);var q=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];s.prototype.clone=function(){return new s(this,{body:this._bodyInit})},p.call(s.prototype),p.call(v.prototype),v.prototype.clone=function(){return new v(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new i(this.headers),url:this.url})},v.error=function(){var a=new v(null,{status:0,statusText:""});return a.type="error",a};var w=[301,302,303,307,308];v.redirect=function(a,b){if(w.indexOf(b)===-1)throw new RangeError("Invalid status code");return new v(null,{status:b,headers:{location:a}})},a.Headers=i,a.Request=s,a.Response=v,a.fetch=function(a,c){return new Promise(function(d,e){var f=new s(a,c),g=new XMLHttpRequest;g.onload=function(){var a={status:g.status,statusText:g.statusText,headers:u(g.getAllResponseHeaders()||"")};a.url="responseURL"in g?g.responseURL:a.headers.get("X-Request-URL");var b="response"in g?g.response:g.responseText;d(new v(b,a))},g.onerror=function(){e(new TypeError("Network request failed"))},g.ontimeout=function(){e(new TypeError("Network request failed"))},g.open(f.method,f.url,!0),"include"===f.credentials&&(g.withCredentials=!0),"responseType"in g&&b.blob&&(g.responseType="blob"),f.headers.forEach(function(a,b){g.setRequestHeader(b,a)}),g.send("undefined"==typeof f._bodyInit?null:f._bodyInit)})},a.fetch.polyfill=!0}}("undefined"!=typeof self?self:this);

PushAlertCo.subInit();
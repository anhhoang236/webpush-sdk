pa_unsubscribe = false;
pa_direct_subscribe = false;
seg_id=0;
frame_subscribe = false;
method = 2;
if (typeof domain_id === 'undefined') {
    domain_id=1;
}

var PushAlertCo = new function() {
    this.pushStatus = false;
    
    this.$ = function(id){
        var elem = document.getElementById(id);
        if(elem===null){
            return false;
        }
        else{
            return elem;
        }
    };
    
    this.init = function(){
        if ('serviceWorker' in navigator) {
            console.log('Service Worker is supported here');
            if(frame_subscribe){
                var perm = Notification.permission;
                var target = parent.postMessage ? parent : (parent.document.postMessage ? parent.document : undefined);
                
                if(perm=='default'){ //Ask
                    Notification.requestPermission()
                        .then(function(o) {
                            try{
                                target.postMessage("pushalert_frame|"+o, "*");
                            }
                            catch(e){
                                console.error('Error sending message', e);
                            };
                        });
                }
                else{
                    try{
                        target.postMessage("pushalert_frame|"+perm, "*");
                    }
                    catch(e){
                        console.error('Error sending message', e);
                    };
                }
            }
            else if(pa_unsubscribe){
                this.unsubscribe();
            }
            else{
                navigator.serviceWorker.register(sw_url+'sw.js').then(function(reg) {
                        PushAlertCo.checkSubscription();
                }).catch(function(err) {
                        console.log(':^(', err);
                });
                if(method!=2){
                    document.getElementById('unsubscribe').addEventListener("click", function(){
                        PushAlertCo.unsubscribe();
                    });
                }
            }
        }
    };

    this.checkSubscription = function() {
        
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.getSubscription().then(
            function(pushSubscription) {
                if(pushSubscription) {
                    PushAlertCo.pushStatus = true;
                    try{
                        window.opener.postMessage("pushalert_subs_status|subscribed", "*");
                    }
                    catch(e){};

                   PushAlertCo.checkSub(pushSubscription);

                    if(method!=2){
                        PushAlertCo.$('confirm').innerHTML = "Unsubscribe"
                        PushAlertCo.$('help-text').innerHTML = "Click below button to unsubscribe."
                        PushAlertCo.$('unsubscribe').style.display = 'inline-block';
                    }
                }
                else {
                    PushAlertCo.pushStatus = false;
                    
                    if(Notification.permission==="denied"){
                        try{
                            window.opener.postMessage("pushalert_subs_status|denied", "*");
                        }
                        catch(e){};

                        var paDivDenied = document.createElement('div');
                        paDivDenied.id = 'blocked-info';
                        
                        var css = "#blocked-info.blocked{\
    width: 240px;\
    border: 1px solid #ddd;\
    padding: 10px;\
    left: 75px;\
    position: fixed;\
    background: #fff;\
    top: 15px;\
    border-radius: 3px;\
    box-shadow: 0 0 10px #eee;\
    font-size: 15px;\
    text-align: left;\
    display:none;\
    opacity: 0;\
    transform: rotateX(-90deg);\
    transition: all 0.8s cubic-bezier(.36,-0.64,.34,1.76);\
}\
\
#blocked-info.blocked.show{\
    opacity: 1;\
    transform: none;\
    z-index: 2147483647;\
    transition: all 0.8s cubic-bezier(.36,-0.64,.34,1.76);\
}\
\
#blocked-info.blocked span{\
    position: absolute;\
    right: 4px;\
    top: 1px;\
    font-size: 11px;\
    cursor: pointer;\
    color: #ccc;\
}\
\
#blocked-info.blocked span::after{\
    content: \"\\2716\";\
}\
\
#blocked-info.blocked:after, #blocked-info.blocked:before {\
    bottom: 100%;\
    left: 60px;\
    border: solid transparent;\
    content: \" \";\
    height: 0;\
    width: 0;\
    position: absolute;\
    pointer-events: none;\
}\
\
#blocked-info.blocked:after {\
    border-color: transparent;\
    border-bottom-color: #fff;\
    border-width: 12px;\
    margin-left: -12px;\
}\
#blocked-info.blocked:before {\
    border-color: transparent;\
    border-bottom-color: #ddd;\
    border-width: 13px;\
    margin-left: -13px;\
}\
\
#blocked-info.blocked.firefox{\
    left:25px;\
}\
#blocked-info.blocked.firefox:after, #blocked-info.blocked.firefox:before {\
    left:45px;\
}\
\
#blocked-info.blocked.mobile{\
    left:5px;\
    top:11px;\
}\
\
#blocked-info.blocked.mobile:after, #blocked-info.blocked.mobile:before {\
    left:22px;\
}\
#blocked-info.blocked.mobile:after {\
    border-width: 10px;\
    margin-left: -10px;\
}\
#blocked-info.blocked.mobile:before {\
    border-width: 11px;\
    margin-left: -11px;\
}";
                                    
                        pa_head = document.head || document.getElementsByTagName('head')[0];
                        var link  = document.createElement('style');
                        link.type = 'text/css';
                        if (link.styleSheet){
                            link.styleSheet.cssText = css;
                        } else {
                            link.appendChild(document.createTextNode(css));
                        }
                        pa_head.appendChild(link);

                        userAgent = navigator.userAgent.toLowerCase();
                        if(userAgent.indexOf('mobile')>0){
                            paDivDenied.className = 'blocked mobile';
                            paDivDenied.innerHTML = 'You\'ve blocked notifications, please click on the lock pad icon, go to site settings and enable "Notifications" under "Permission". Refresh the page.';
                        }
                        else if(userAgent.indexOf('chrome')>0){
                            paDivDenied.className = 'blocked';
                            paDivDenied.innerHTML = 'You\'ve blocked notifications, please click on the lock pad icon, then set "Notifications" to "Always allow on this site". Refresh the page.';
                        }
                        else if(userAgent.indexOf('firefox')>0){
                            paDivDenied.className = 'blocked firefox';
                            paDivDenied.innerHTML = 'You\'ve blocked notifications, please click on the lock pad icon, then set "Receive Notifications" to "Allow" under "Permissions". Refresh the page.';
                        }
                        
                        var close_span = document.createElement('span');
                        close_span.onclick = function(){
                            paDivDenied.remove();
                        };
                        paDivDenied.appendChild(close_span);
                        paDivDenied.style.display = 'block';
                        document.body.appendChild(paDivDenied);
                        
                        setTimeout(function() {
                            paDivDenied.className = paDivDenied.className + " show";
                        }, 10);
                        
                        //PushAlertCo.$('confirm').innerHTML = "You're successfully unsubscribed."
                        PushAlertCo.$('help-text').innerHTML = "It seems notifications are blocked, please unblock in order to receive notification."
                        PushAlertCo.$('subscription-info').style.display='block';
                        PushAlertCo.$('loading-info').style.display='none';
                    }
                    else{
                        PushAlertCo.subscribePush();
                    }
                }
                    //console.log("Subscription Status: " + PushPushCo.pushStatus);
            }.bind(this)).catch(function(e) {
                    console.error('Error getting subscription', e);
            });
        });
};

    this.subscribePush = function () {
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
            .then(function(pushSubscription) {
                PushAlertCo.pushStatus = true;
                //Store this subscription on application server
                PushAlertCo.sendSub(pushSubscription);
                window.opener.postMessage("pushalert_subs_status|subscribed", "*");
            })
            .catch(function(e) {
                if (Notification.permission === 'denied') {
                    window.opener.postMessage("pushalert_subs_status|denied", "*");
                    window.close();
                }
                else{//Canceled
                    window.opener.postMessage("pushalert_subs_status|canceled", "*");
                    window.close();
                }
                console.error('Unable to register push subscription', e);
            });
        });
    };
    
    this.unsubscribe = function() {
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.getSubscription().then(
            function(pushSubscription) {
                if(pushSubscription) {
                    pushSubscription.unsubscribe().then(function(successful) {  
                        if(method!=2){
                            PushAlertCo.$('unsubscribe').style.display='none';
                            PushAlertCo.$('confirm').innerHTML = "You're successfully unsubscribed."
                            PushAlertCo.$('help-text').innerHTML = "You can close this window now."
                        }

                        var endPoint = pushSubscription.endpoint.slice(pushSubscription.endpoint.lastIndexOf('/')+1);
                        fetch(comm_url + "/unsubscribe/"+endPoint, {  
                            method: 'post',  
                            headers: {  
                              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                            },  
                            body: 'pa_id=' + pa_id + '&domain_id='+domain_id
                        })
                        .then(function(res) {
                            res.json().then(function(data) {
                                window.opener.postMessage("pushalert_subs_status|unsubscribed", "*");
                                window.close();
                            }).catch(function(e) {
                                console.log('Error sending subscription to server:' + e.toString());
                            }); 
                        }).catch(function(e) {  
                            console.error('Error getting subscription', e);
                        });
                    }).catch(function(e) {  
                            console.error('Error getting subscription', e);
                    });
                }
                else{
                    window.opener.postMessage("pushalert_subs_status|unsubscribed", "*");
                }
            }).catch(function(e) {
                    console.error('Error getting subscription', e);
            });
        });
    };
    
    this.getBrowserInfo = function () {
        !function(e,o){"undefined"!=typeof module&&module.exports?module.exports=o():"function"==typeof define&&define.amd?define(o):this[e]=o()}("browser_info",function(){function e(e){function i(o){var i=e.match(o);return i&&i.length>1&&i[1]||""}function r(o){var i=e.match(o);return i&&i.length>1&&i[2]||""}var s,n=i(/(ipod|iphone|ipad)/i).toLowerCase(),a=/like android/i.test(e),d=!a&&/android/i.test(e),t=/CrOS/.test(e),m=/silk/i.test(e),w=/sailfish/i.test(e),b=/tizen/i.test(e),c=/(web|hpw)os/i.test(e),l=/windows phone/i.test(e),v=!l&&/windows/i.test(e),h=!n&&!m&&/macintosh/i.test(e),p=!d&&!w&&!b&&!c&&/linux/i.test(e),f=i(/edge\/(\d+(\.\d+)?)/i),u=i(/version\/(\d+(\.\d+)?)/i),k=/tablet/i.test(e)||/android/i.test(e)&&!/mobile/i.test(e),g=!k&&/[^-]mobi/i.test(e);/opera mini/i.test(e)?(s={name:"Opera Mini",operamini:o,majorVersion:i(/(?:opera mini)[\s\/](\d+(\.\d+)?)/i)||u,version:i(/(?:opera mini)\/([\d\.]+)/i)},g=o,k=!1):/opera|opr/i.test(e)?s={name:"Opera",opera:o,majorVersion:u||i(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i),version:i(/(?:opera|opr)\/([\d\.]+)/i)}:/ucbrowser/i.test(e)?s={name:"UC Browser",ucbrowser:o,majorVersion:i(/(?:ucbrowser)[\s\/](\d+(\.\d+)?)/i)||u,version:i(/(?:ucbrowser)\/([\d\.]+)/i)}:/acheetahi/i.test(e)?s={name:"CM Browser",cmbrowser:o,majorVersion:i(/(?:acheetahi)[\s\/](\d+(\.\d+)?)/i)||u,version:i(/(?:acheetahi)\/([\d\.]+)/i)}:/yabrowser/i.test(e)?s={name:"Yandex Browser",yandexbrowser:o,version:u||i(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)}:l?(s={name:"Windows Phone",windowsphone:o},f?(s.msedge=o,s.version=f):(s.msie=o,s.version=i(/iemobile\/(\d+(\.\d+)?)/i))):/msie|trident/i.test(e)?s={name:"Internet Explorer",msie:o,version:i(/(?:msie |rv:)([\.\d]+)/i),majorVersion:i(/(?:msie |rv:)(\d+(\.\d+)?)/i)}:t?s={name:"Chrome",chromeos:o,chromeBook:o,chrome:o,version:i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:/chrome.+? edge/i.test(e)?s={name:"Microsoft Edge",msedge:o,version:f,majorVersion:i(/(?:edge)\/(\d+(\.\d+)?)/i)}:/chrome|crios|crmo/i.test(e)?s={name:"Chrome",chrome:o,version:i(/(?:chrome|crios|crmo)\/([\d\.]+)/i),majorVersion:i(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)}:n?(s={name:"iphone"==n?"iPhone":"ipad"==n?"iPad":"iPod"},u&&(s.version=u)):w?s={name:"Sailfish",sailfish:o,version:i(/sailfish\s?browser\/(\d+(\.\d+)?)/i)}:/seamonkey\//i.test(e)?s={name:"SeaMonkey",seamonkey:o,version:i(/seamonkey\/(\d+(\.\d+)?)/i)}:/firefox|iceweasel/i.test(e)?(s={name:"Firefox",firefox:o,version:i(/(?:firefox|iceweasel)[ \/]([\d\.]+)/i),majorVersion:i(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)},/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)&&(s.firefoxos=o)):m?s={name:"Amazon Silk",silk:o,version:i(/silk\/(\d+(\.\d+)?)/i)}:d?s={name:"Android",version:u}:/phantom/i.test(e)?s={name:"PhantomJS",phantom:o,version:i(/phantomjs\/(\d+(\.\d+)?)/i)}:/blackberry|\bbb\d+/i.test(e)||/rim\stablet/i.test(e)?s={name:"BlackBerry",blackberry:o,version:u||i(/blackberry[\d]+\/(\d+(\.\d+)?)/i)}:c?(s={name:"WebOS",webos:o,version:u||i(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)},/touchpad\//i.test(e)&&(s.touchpad=o)):s=/bada/i.test(e)?{name:"Bada",bada:o,version:i(/dolfin\/(\d+(\.\d+)?)/i)}:b?{name:"Tizen",tizen:o,version:i(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i)||u}:/safari/i.test(e)?{name:"Safari",safari:o,version:u}:{name:i(/^(.*)\/(.*) /),version:r(/^(.*)\/(.*) /)},!s.msedge&&/(apple)?webkit/i.test(e)?(s.name=s.name||"Webkit",s.webkit=o,!s.version&&u&&(s.version=u)):!s.opera&&/gecko\//i.test(e)&&(s.name=s.name||"Gecko",s.gecko=o,s.version=s.version||i(/gecko\/(\d+(\.\d+)?)/i)),s.msedge||!d&&!s.silk?n?(s[n]=o,s.ios=o):v?s.windows=o:h?s.mac=o:p&&(s.linux=o):s.android=o;var x="";s.windowsphone?x=i(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i):n?(x=i(/os (\d+([_\s]\d+)*) like mac os x/i),x=x.replace(/[_\s]/g,".")):d?x=i(/android[ \/-](\d+(\.\d+)*)/i):s.webos?x=i(/(?:web|hpw)os\/(\d+(\.\d+)*)/i):s.blackberry?x=i(/rim\stablet\sos\s(\d+(\.\d+)*)/i):s.bada?x=i(/bada\/(\d+(\.\d+)*)/i):s.tizen?x=i(/tizen[\/\s](\d+(\.\d+)*)/i):s.windows?x=i(/windows nt[\/\s](\d+(\.\d+)*)/i):s.mac&&(x=i(/mac os x[\/\s](\d+(_\d+)*)/i)),x&&(s.osversion=x);var y=x.split(".")[0];return k||"ipad"==n||d&&(3==y||4==y&&!g)||s.silk?s.tablet=o:(g||"iphone"==n||"ipod"==n||d||s.blackberry||s.webos||s.bada)&&(s.mobile=o),s.msedge||s.msie&&s.version>=10||s.yandexbrowser&&s.version>=15||s.chrome&&s.version>=20||s.firefox&&s.version>=20||s.safari&&s.version>=6||s.opera&&s.version>=10||s.ios&&s.osversion&&s.osversion.split(".")[0]>=6||s.blackberry&&s.version>=10.1?s.a=o:s.msie&&s.version<10||s.chrome&&s.version<20||s.firefox&&s.version<20||s.safari&&s.version<6||s.opera&&s.version<10||s.ios&&s.osversion&&s.osversion.split(".")[0]<6?s.c=o:s.x=o,s}var o=!0,i=e("undefined"!=typeof navigator?navigator.userAgent:"");i.test=function(e){for(var o=0;o<e.length;++o){var r=e[o];if("string"==typeof r&&r in i)return!0}return!1},i._detect=e;var r={};return i.mobile?r.type="mobile":i.tablet?r.type="tablet":r.type="desktop",i.android?r.os="android":i.ios?r.os="ios":i.windows?r.os="windows":i.mac?r.os="mac":i.linux?r.os="linux":i.windowsphone?r.os="windowsphone":i.webos?r.os="webos":i.blackberry?r.os="blackberry":i.bada?r.os="bada":i.tizen?r.os="tizen":i.sailfish?r.os="sailfish":i.firefoxos?r.os="firefoxos":i.chromeos?r.os="chromeos":r.os="unknown",i.osversion&&(r.osVer=i.osversion),i.chrome?r.browser="chrome":i.firefox?r.browser="firefox":i.opera?r.browser="opera":i.operamini?r.browser="operamini":i.ucbrowser?r.browser="ucbrowser":i.cmbrowser?r.browser="cmbrowser":i.safari||i.iosdevice&&("ipad"==i.iosdevice||"ipod"==i.iosdevice||"iphone"==i.iosdevice)?r.browser="safari":i.msie?r.browser="ie":i.yandexbrowser?r.browser="yandexbrowser":i.msedge?r.browser="edge":i.seamonkey?r.browser="seamonkey":i.blackberry?r.browser="blackberry":i.touchpad?r.browser="touchpad":i.silk?r.browser="silk":r.browser="unknown",i.version&&(r.browserVer=i.version),i.majorVersion&&(r.browserMajor=i.majorVersion),r.language=navigator.language||"",r.resoln_width=window.screen.width||"",r.resoln_height=window.screen.height||"",r.color_depth=window.screen.colorDepth||"",r.engine=navigator.product||"",r.userAgent=navigator.userAgent,"ucbrowser"===r.browser||"cmbrowser"===r.browser||"dolphin"===r.browser?devicePixelRatio=1:devicePixelRatio=window.devicePixelRatio||1,r.resoln_width=Math.round(r.resoln_width*devicePixelRatio),r.resoln_height=Math.round(r.resoln_height*devicePixelRatio),r});
        return browser_info;
    }

    this.sendSub = function(pushSubscription) {
            //console.log(pushSubscription);
            //get endpoint
            var browser = [];
            var browser_info = PushAlertCo.getBrowserInfo();
            for (key in browser_info) {
              browser.push(key + '=' + encodeURIComponent(browser_info[key]));
            }
            
            browser = browser.join('&');
            browser = browser + "&pa_id="+pa_id + '&domain_id='+domain_id;
            last_indexof_slash = pushSubscription.endpoint.lastIndexOf('/');
            browser = browser + "&endpoint_url="+encodeURIComponent(pushSubscription.endpoint.substr(0, last_indexof_slash));
            browser = browser + '&subs_info=' + encodeURIComponent(JSON.stringify(pushSubscription));
            browser = browser + "&seg_id="+seg_id;
            
            browser = browser + "&referrer="+document.referrer;

            var endPoint = pushSubscription.endpoint.slice(last_indexof_slash+1);
            fetch(comm_url + "/subscribe/"+endPoint, {  
                    method: 'post',  
                    headers: {  
                      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                    },  
                    body: browser  
                })
                .then(function(res) {
                    res.json().then(function(data) {
                        try{
                            window.opener.postMessage("pushalert_subs_id|"+data.subs_id, "*");
                        }
                        catch(e){};
                        if(data.welcome_enable){
                            var requireInteraction = true;
                            if(data.hasOwnProperty('welcome_req_interaction') && data.welcome_req_interaction === false) {
                                    requireInteraction = false;
                            }
                            
                            var actions = [];
                            var extra_data = [];
                            extra_data.url = data.welcome_url;
                            extra_data.url_id = 0;
                            extra_data.uid = 0;
                            if(typeof data.action1_title !== 'undefined'){
                                    actions[0] = {action: 'action1', title: data.action1_title};
                                    extra_data.action1 = data.action1_url;
                            }
                            if(typeof data.action2_title !== 'undefined'){
                                    actions[1] = {action: 'action2', title: data.action2_title};
                                    extra_data.action2 = data.action2_url;
                            }
                            
                             navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {      
                                serviceWorkerRegistration.showNotification(data.welcome_title, {  
                                    body: data.welcome_msg,  
                                    icon: data.welcome_icon,
                                    requireInteraction: requireInteraction,
                                    data: extra_data,
                                    actions: actions
                                }); 
                                setTimeout(function() {
                                    window.close();
                                }, 500);
                            });
                        }
                        else{
                            window.close();
                        }
                }).catch(function(e) {
                        console.log('Error sending subscription to server:' + e.toString());
                }); 
            });
    
//            var endPoint = pushSubscription.endpoint.slice(pushSubscription.endpoint.lastIndexOf('/')+1);
//            fetch("https://pushalert.in/subscribe/"+endPoint).then(function(res) {
//                    res.json().then(function(data) {
//                            //console.log(data);
//                            window.close();
//                    }).catch(function(e) {
//                            console.log('Error sending subscription to server:' + e.toString());
//                    }); 
//            });
    };
    
    this.checkSub = function(pushSubscription) {
            //get endpoint
            var browser = [];
            var browser_info = PushAlertCo.getBrowserInfo();
            for (key in browser_info) {
              browser.push(key + '=' + encodeURIComponent(browser_info[key]));
            }
            
            browser = browser.join('&');
            browser = browser + "&pa_id="+pa_id + '&domain_id='+domain_id;
            last_indexof_slash = pushSubscription.endpoint.lastIndexOf('/');
            browser = browser + "&endpoint_url="+encodeURIComponent(pushSubscription.endpoint.substr(0, last_indexof_slash));
            browser = browser + '&subs_info=' + encodeURIComponent(JSON.stringify(pushSubscription));
            browser = browser + "&seg_id="+seg_id;

            var endPoint = pushSubscription.endpoint.slice(last_indexof_slash+1);
            fetch(comm_url + "/check/"+endPoint, {  
                    method: 'post',  
                    headers: {  
                      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                    },  
                    body: browser  
                })
                .then(function(res) {
                    res.json().then(function(data) {
                        if(data.status){
                            try{
                                window.opener.postMessage("pushalert_subs_id|"+data.subs_id, "*");
                                window.opener.postMessage("pushalert_already_subscribed|true", "*");
                            }
                            catch(e){};
                        }
                        
                        if(!pa_unsubscribe){
                            window.close();
                        }
                }).catch(function(e) {
                        console.log('Error checking subscription to server:' + e.toString());
                }); 
            });
    };
    
    this.getParameterByName = function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    this.logIntoParentWindow = function(text){
        try{
            window.opener.postMessage('log|'+text, "*");
        }
        catch(e){
            //console.error("Log Into Parent: " + e.toString());
        }
    }
    
    
    if(this.getParameterByName('action')==='unsubscribe'){
        pa_unsubscribe = true;
    }
    else if(this.getParameterByName('action')==='subscribe'){
        pa_direct_subscribe = true;
    }

    if(this.getParameterByName('segment')!==null){
        seg_id = this.getParameterByName('segment');
    }

    if(this.getParameterByName('action')==='frame-subscribe'){
        frame_subscribe = true;
    }
    
    var subs_info_div = document.getElementById('subscription-info');
    var loading_info_div = document.getElementById('loading-info');
    if(pa_direct_subscribe){
        if(subs_info_div !== null){
            subs_info_div.style.display='block';
        }
        
        if(loading_info_div !== null){
            loading_info_div.style.display='none';
        }
    }
    else{
        if(subs_info_div !== null){
            subs_info_div.style.display='none';
        }
        
        if(loading_info_div !== null){
            loading_info_div.style.display='block';
        }
    }
    
    if(!frame_subscribe){
        window.onbeforeunload = function() {
            try{
                window.opener.postMessage('closed', '*');
            }
            catch(e){}
        };
    }
};
PushAlertCo.init();
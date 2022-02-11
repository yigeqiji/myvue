import Vue from "vue"
import store from "@/store";

var ue=window.ue;
if (typeof ue != "object" || typeof ue.interface != "object" || ue.interface.broadcast != "function") {
    if (typeof ue != "object")
        ue = {};

    // mobile
    ue.interface = {};
    ue.interface.broadcast = function (name, data) {

        if (typeof name != "string")
            return;

        var args = [name, ""];
        if (typeof data != "undefined")
            args[1] = data;

        var hash = encodeURIComponent(JSON.stringify(args));
        if (typeof history == "object" && typeof history.pushState == "function") {
            // console.log(window.location.href.split("#")[1].toString())
            let url=window.location.href.split("#")[1]
            history.pushState({}, "", "#" + hash);
            history.pushState({}, "", "#" + url);
        }
        else {
            document.location.hash = hash;
            document.location.hash = encodeURIComponent("[]");
        }
    };
}
else
    (function (obj) {


        // desktop
        ue.interface = {};
        ue.interface.broadcast = function (name, data) {
            if (typeof name != "string")
                return;

            if (typeof data != "undefined")
                obj.broadcast(name, JSON.stringify(data));
            else
                obj.broadcast(name, "");
        };
    })(ue.interface);

// create the global ue4(...) helper function
var ue4 = ue.interface.broadcast;
var ueinterface = ue.interface;

ueinterface.For=function(d){
    store.commit("setUeApi",d+Math.random(1))
    return d
}

ueinterface.FlushData=function(d){
    store.commit("changeFlushStatus",d+Math.random(1))
}
ueinterface.SwitchVideo=function(d){
    store.commit("changeCameraVideos",d)
}

ueinterface.refreshUI = function () {
    window.location.reload();
}

Vue.prototype.$ue4=ue4

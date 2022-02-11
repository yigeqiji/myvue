// import Vue from "vue"
const ue = window.ue;
const isHasUE = (typeof ue !== "undefined" && ue !== null ? true : false);
console.log("UE initial status:",isHasUE);

class Observer {
    constructor() {
        this.subscribers = [];
    }

    addSubscriber(callback) {
        this.subscribers[this.subscribers.length] = callback;
    }

    removeSubscriber(callback) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete this.subscribers[i];
            }
        }
    }

    removeAllSubscriber() {
        this.subscribers.splice(0, this.subscribers.length);
    }

    publish(what) {
        for (var i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === "function") {
                this.subscribers[i](what);
            }
        }
    }
}

const co = function(genFunc){
    let gen = genFunc();

    let next = function(value){
        let ret = gen.next(value);

        if (!ret.done) {
            ret.value(next);
        }
    };
    next();
}

//passive function-------------------------------------------------------------------------
const OnLoginSuccess = new Observer();
const OnChangeSize = new Observer();
const OnSpawnDeviceClick = new Observer();
const OnCameraDeviceClick = new Observer();
const OnSwitchVideo = new Observer();
const OnSceneSensorData = new Observer();
const OnCraneSensorData = new Observer();
const OnVideoPlayEnd = new Observer();

function RemoveAllListeners() {
    OnLoginSuccess.removeAllSubscriber();
    OnChangeSize.removeAllSubscriber();
    OnSpawnDeviceClick.removeAllSubscriber();
    OnCameraDeviceClick.removeAllSubscriber();

    OnSwitchVideo.removeAllSubscriber();
    OnVideoPlayEnd.removeAllSubscriber();
}

//initiative function----------------------------------------------------------------------
function SetMinmapVisible(visible) {
    return function (callback) {
        if (!isHasUE) {
            console.log("ue initial faild! can't call function!~");
            return;
        }
        ue.webapi.setminmapvisible(visible)
            .then(function (ret) {
                callback(ret);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

function PlayVideo(url) {
    return function (callback) {
        if (!isHasUE) {
            console.log("ue initial faild! can't call function!~");
            return;
        }
        ue.webapi.playvideo(url)
            .then(function (ret) {
                callback(ret);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}
function CloseVideo() {
    return function (callback) {
        if (!isHasUE) {
            console.log("ue initial faild! can't call function!~");
            return;
        }
        ue.webapi.closevideo()
            .then(function (ret) {
                callback(ret);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}
function CloseDeviceInfo() {
    return function (callback) {
        if (!isHasUE) {
            console.log("ue initial faild! can't call function!~");
            return;
        }
        ue.webapi.closedeviceinfo()
            .then(function (ret) {
                callback(ret);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

function SetTalkStatus(id,isbegin) {
    return function (callback) {
        if (!isHasUE) {
            console.log("ue initial faild! can't call function!~");
            return;
        }
        ue.webapi.settalkstatus(id,isbegin)
            .then(function (ret) {
                callback(ret);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

function CloseApp() {
    return function (callback) {
        if (!isHasUE) {
            console.log("ue initial faild! can't call function!~");
            return;
        }
        ue.webapi.closeapp()
            .then(function (ret) {
                callback(ret);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}

function MinimizeApp() {
    return function (callback) {
        if (!isHasUE) {
            console.log("ue initial faild! can't call function!~");
            return;
        }
        ue.webapi.minimizeapp()
            .then(function (ret) {
                callback(ret);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}
//----设置token
// alert("token")
// OnLoginSuccess.addSubscriber((token)=>{alert(token)})
/* 调用ue方法示例
    let that=this
      this.$ue.co(function*(){
        yield that.$ue.PlayVideo(url);
      })
* */
console.log("Load Interface Success!");
export default window.Interface = {
    isHasUE,
    co,

    OnLoginSuccess,
    OnChangeSize,
    OnSpawnDeviceClick,
    OnCameraDeviceClick,
    OnSwitchVideo,
    OnSceneSensorData,
    OnCraneSensorData,
    OnVideoPlayEnd,

    RemoveAllListeners,
    
    SetMinmapVisible,
    PlayVideo,
    //暂未使用
    CloseVideo,
    CloseDeviceInfo,
    SetTalkStatus,
    CloseApp,
    MinimizeApp,

}

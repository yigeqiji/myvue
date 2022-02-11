import Vue from 'vue'

import './styles/quasar.scss'
import 'quasar/dist/quasar.ie.polyfills'
import lang from 'quasar/lang/zh-hans.js'
import '@quasar/extras/material-icons/material-icons.css'


import {
    Quasar,
    Notify,
    Dialog,
    Loading,
    QCarousel,
    QCarouselControl,
    QCarouselSlide,
    QSelect,
    QItem,
    QItemSection,
    QDate,
    QTime,
    QPopupProxy,
    QInput,
    QTable,
    QTh
} from 'quasar'

Vue.use(Quasar, {
    plugins: [
        Notify, Dialog,Loading, QCarousel, QCarouselControl, QCarouselSlide, QSelect, QItem, QItemSection, QDate, QTime, QPopupProxy, QInput, QTable, QTh
    ],
    components:{

    },
    configs: {
        Dialog: {persistent: true},
        Loading:{backgroundColor: 'yellow',}
    },
    lang: lang
})

let $dialog=(title,message,persistent=true,okCallback,otherConfigs)=>{
    return Dialog.create({
        title,message,persistent,...otherConfigs
    }).onOk((res)=>{
        okCallback&&okCallback(res)
    })

}

let $successDialog=(message,persistent=true,okCallback,otherConfigs)=>{
    return Dialog.create({
        message,persistent,style:"background:rgba(170,234,195,1)",color:'rgba(255,255,255,0.5)',textColor:"white",...otherConfigs
    }).onOk((res)=>{
        okCallback&&okCallback(res)
    })

}
let $warnDialog=(title,message,persistent=true,okCallback,otherConfigs)=>{
    return Dialog.create({
        title,message,persistent,style:"background:rgba(32,41,92,0.5);color:white;",...otherConfigs
    }).onOk((res)=>{
        okCallback&&okCallback(res)
    })

}

let $notify=(message,position="right",otherConfigs)=>{
    Notify.create({message,position,...otherConfigs})
}
let $successNotify=(message,position="right",otherConfigs)=>{
    Notify.create({type:"positive",message,position,color:"m-positive",...otherConfigs})
}
let $warnNotify=(message,position="center",otherConfigs)=>{
    Notify.create({type:"negative",message,position,color:"m-negative",...otherConfigs})
}

Vue.prototype.$dialog = $dialog
Vue.prototype.$successDialog = $successDialog
Vue.prototype.$warnDialog = $warnDialog

Vue.prototype.$notify = $notify
Vue.prototype.$successNotify = $successNotify
Vue.prototype.$warnNotify = $warnNotify

Vue.prototype.$loading = Loading
export {$dialog,$warnDialog,$notify,$warnNotify,Loading}

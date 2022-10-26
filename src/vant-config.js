import { NavBar, Tabbar, Search, TabbarItem, Icon, NoticeBar, Swipe, SwipeItem, Tab, Tabs, Popup, Cell, Toast ,Loading ,Overlay  } from 'vant'

const vantComponents = [
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    NoticeBar,
    Swipe,
    SwipeItem,
    Tab,
    Tabs,
    Popup,
    Cell,
    Toast,
    Loading,
    Overlay ,
    

]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}
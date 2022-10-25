
import { NavBar, Tabbar, Search, TabbarItem, Icon, NoticeBar, Swipe, SwipeItem,Popup,Cell, Image as VanImage, Tab, Tabs } from 'vant'
const vantComponents = [
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    NoticeBar, 
    Swipe, 
    SwipeItem,
    Popup,
    Cell,
    VanImage,
    Tab,
    Tabs,
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}
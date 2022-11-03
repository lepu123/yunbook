import { NavBar, Tabbar, Search, TabbarItem, Icon, NoticeBar, Swipe, SwipeItem, CellGroup, Tab, Tabs, Popup, Cell, Toast ,Loading ,Overlay , Image as VanImage, List  } from 'vant'

const vantComponents = [
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    NoticeBar, 
    Swipe, 
    SwipeItem,
    CellGroup,
    Tab,
    Tabs,
    Popup,
    Cell,
    Toast,
    Loading,
    Overlay,
    VanImage,
    List,
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}
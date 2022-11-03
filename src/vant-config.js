import { Checkbox,CheckboxGroup,Button,Uploader,SidebarItem,Sidebar,NavBar, Slider, Tabbar, Search, TabbarItem, Icon, NoticeBar, Swipe, SwipeItem, CellGroup, Tab, Tabs, Popup, Cell, Toast, Loading, Overlay, Image as VanImage ,CountDown ,ShareSheet ,Badge    } from 'vant'

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
    Checkbox,
    CheckboxGroup,
    Button,
    Uploader,
    SidebarItem,
    Sidebar,
    Slider,
    CountDown,
    ShareSheet,
    Badge 
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}
import { Checkbox, CheckboxGroup, NavBar, Tabbar, Search, TabbarItem, Icon, NoticeBar, Swipe, SwipeItem, CellGroup, Tab, Tabs, Popup, Cell, Toast, Loading, Overlay, Image as VanImage, Button, Uploader, Slider, SidebarItem, Sidebar, ShareSheet, Badge, CountDown } from 'vant'

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
    Slider,
    Sidebar,
    SidebarItem,
    ShareSheet,
    Badge,
    CountDown,
    Checkbox,
    CheckboxGroup,
    Button, 
    Uploader,

]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}
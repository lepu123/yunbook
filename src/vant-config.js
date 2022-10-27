import { Image as VanImage, NavBar, Tabbar, Search, TabbarItem, Icon, NoticeBar, Swipe, SwipeItem,Popup,Cell, CellGroup,Overlay   } from 'vant'

const vantComponents = [
    VanImage,
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
    CellGroup,
    Overlay  
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}
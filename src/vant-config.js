import { Image as VanImage, NavBar, Tabbar, Search, TabbarItem, Icon, NoticeBar, Swipe, SwipeItem } from 'vant'

const vantComponents = [
    VanImage,
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    NoticeBar, 
    Swipe, 
    SwipeItem
]

export default {
    install(Vue) {
        vantComponents.forEach(Component => {
            Vue.use(Component)
        })
    }
}